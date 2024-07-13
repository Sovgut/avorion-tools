import { CopyAll, Search } from "@mui/icons-material";
import { Box, DialogTitle, Divider, IconButton, Input, Link, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import { ChangeEventHandler, FC, FormEventHandler, Fragment, KeyboardEvent, KeyboardEventHandler, MouseEventHandler, memo, useCallback, useContext, useEffect, useState } from "react";
import { ComponentType } from "~constants/enums/components";
import { SellerType } from "~constants/enums/sellers";
import { ComponentsMeta } from "~constants/meta/components";
import { SellersMeta } from "~constants/meta/sellers";
import { IntlContext } from "~contexts/intl";
import { INTL_STORAGE } from "~contexts/intl/storage";
import { useBreakpoint } from "~hooks/breakpoints";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event";

export const GlobalSearch: FC = memo(() => {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>(String());
    const [commodities, setCommodities] = useState<ComponentType[]>([]);
    const [stations, setStations] = useState<SellerType[]>([]);
    const breakpoint = useBreakpoint();
    const intlContext = useContext(IntlContext);

    useEffect(() => {
        window.addEventListener('keydown', onShortcut);

        return function cleanup() {
            window.removeEventListener('keydown', onShortcut);
        }
    }, []);

    const renderCommoditiesMetadata = useCallback((type: ComponentType) => {
        let dangerous = null;
        let illegal = null;

        if (ComponentsMeta[type].illegal) {
            illegal =
                <Typography color="warning" level="body-sm">{intlContext.text("UI", "illegal-cargo")}</Typography>;
        }

        if (ComponentsMeta[type].dangerous) {
            dangerous =
                <Typography color="danger" level="body-sm">{intlContext.text("UI", "dangerous-cargo")}</Typography>;
        }

        return (
            <Stack direction="column" spacing={2}>
                {dangerous}
                {illegal}
            </Stack>
        )
    }, []);

    const onShortcut: EventListener = useCallback((event: any) => {
        if (event.key === "F2") {
            setSearch(String());
            setStations([]);
            setCommodities([]);
            setOpen((pv) => !pv);
        }
    }, []);

    const onModalClose = useCallback(() => {
        setSearch(String());
        setStations([]);
        setCommodities([]);
        setOpen(false);
    }, []);

    const onModalOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const processSearch = useCallback((search: string) => {
        if (search.length === 0) {
            setStations([]);
            setCommodities([]);

            return;
        }

        {

            const array = Object.keys(INTL_STORAGE.SELLER[intlContext.language]).map((key) => ({ key: INTL_STORAGE.SELLER[intlContext.language][key as SellerType], value: key }));
            const found = array.filter(seller => seller.key.toLowerCase().includes(search.toLowerCase()));

            setStations(found.map(seller => seller.value) as SellerType[]);
        }

        {
            const array = Object.keys(INTL_STORAGE.COMPONENT[intlContext.language]).map((key) => ({ key: INTL_STORAGE.COMPONENT[intlContext.language][key as ComponentType], value: key }));
            const found = array.filter(component => component.key.toLowerCase().includes(search.toLowerCase()));

            setCommodities(found.map(component => component.value) as ComponentType[]);
        }
    }, [intlContext.language, setStations, setCommodities]);

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setSearch(event.target.value);

        processSearch(event.target.value);
    }, [processSearch]);


    const onFormSubmit: FormEventHandler = useCallback((event) => {
        event.preventDefault();

        processSearch(search)
    }, [search, processSearch]);

    return (
        <Fragment>
            <IconButton onClick={onModalOpen} variant="plain" color="neutral" sx={{ width: 32, height: 32 }}>
                <Search fontSize="small" />
            </IconButton>

            <Modal open={open} onClose={onModalClose}>
                <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
                    <DialogTitle sx={{ pr: 2 }}>Global Search</DialogTitle>
                    <ModalClose onClick={onModalClose} />
                    <Divider />

                    <Stack direction="column" spacing={2}>
                        <Stack spacing={1}>
                            <Typography level="title-md">{intlContext.text("UI", "cargo-offset")}</Typography>
                            <form onSubmit={onFormSubmit}>
                                <Stack spacing={2}>
                                    <Input
                                        placeholder={intlContext.text("UI", "cargo-field-label")}
                                        value={search}
                                        onChange={onSearchChange} />
                                </Stack>
                            </form>
                        </Stack>

                        <Box maxHeight={400} sx={{ overflowY: "auto" }}>
                            {stations.length > 0 && <Typography level="title-md">Stations</Typography>}
                            {stations.length > 0 && (
                                <Stack direction="column" sx={{ paddingLeft: 4 }}>
                                    {stations.map((seller: SellerType) => (
                                        <Stack key={seller} direction="row" spacing={.5} alignItems="center">
                                            <Link href={SellersMeta[seller].link}
                                                color="primary"
                                                target="_blank"
                                                level="body-sm"
                                                sx={{ width: "max-content" }}>
                                                {intlContext.text("SELLER", seller)}
                                            </Link>
                                            {!breakpoint.sm && (
                                                <IconButton size="sm"
                                                    title={intlContext.text("UI", "copy")}
                                                    onClick={copyOnMouseEvent(intlContext.text("SELLER", seller))}>
                                                    <CopyAll />
                                                </IconButton>
                                            )}
                                        </Stack>
                                    ))}
                                </Stack>
                            )}

                            {commodities.length > 0 && <Typography level="title-md">Components</Typography>}
                            {commodities.map((commodity) => (
                                <Stack key={commodity} spacing={1}>
                                    <Divider />
                                    <Stack>
                                        <Stack spacing={2} direction="row">
                                            <Typography level="body-md">{intlContext.text("COMPONENT", commodity)}</Typography>
                                            {!breakpoint.sm && (
                                                <IconButton size="sm"
                                                    title={intlContext.text("UI", "copy")}
                                                    onClick={copyOnMouseEvent(intlContext.text("COMPONENT", commodity))}>
                                                    <CopyAll />
                                                </IconButton>
                                            )}
                                        </Stack>
                                        {renderCommoditiesMetadata(commodity)}

                                        <Box>
                                            <Typography level="title-md">{intlContext.text("UI", "can-be-found-in")}</Typography>

                                            <Stack sx={{ paddingLeft: 4 }}>
                                                {[SellerType.TurretFactory, SellerType.TurretFactorySupplier].map(seller => (
                                                    <Stack key={commodity + seller} direction="row" spacing={.5} alignItems="center">
                                                        <Link href={SellersMeta[seller].link}
                                                            color="primary"
                                                            target="_blank"
                                                            level="body-sm"
                                                            sx={{ width: "max-content" }}>
                                                            {intlContext.text("SELLER", seller)}
                                                        </Link>
                                                        {!breakpoint.sm && (
                                                            <IconButton size="sm"
                                                                title={intlContext.text("UI", "copy")}
                                                                onClick={copyOnMouseEvent(intlContext.text("SELLER", seller))}>
                                                                <CopyAll />
                                                            </IconButton>
                                                        )}
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </Box>

                                        <Box>
                                            <Typography level="title-md">{intlContext.text("UI", "guaranteed-in")}</Typography>
                                            <Stack sx={{ paddingLeft: 4 }}>
                                                {ComponentsMeta[commodity].sellers.map((seller: SellerType) => (
                                                    <Stack key={commodity + seller} direction="row" spacing={.5} alignItems="center">
                                                        <Link href={SellersMeta[seller].link}
                                                            color="primary"
                                                            target="_blank"
                                                            level="body-sm"
                                                            sx={{ width: "max-content" }}>
                                                            {intlContext.text("SELLER", seller)}
                                                        </Link>
                                                        {!breakpoint.sm && (
                                                            <IconButton size="sm"
                                                                title={intlContext.text("UI", "copy")}
                                                                onClick={copyOnMouseEvent(intlContext.text("SELLER", seller))}>
                                                                <CopyAll />
                                                            </IconButton>
                                                        )}
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>
                            ))}
                        </Box>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
})