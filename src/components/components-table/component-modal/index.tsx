import {DialogTitle, Modal, ModalClose, ModalDialog} from "@mui/joy";
import {ReactNode} from "react";
import {useBreakpoint} from "~hooks/breakpoints";

type Props = {
    open: boolean;
    title: string;
    children: ReactNode;

    onClose?: () => void;
}

export function ComponentItemModal({open, title, children, onClose}: Props) {
    const breakpoint = useBreakpoint();

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{minWidth: breakpoint.sm ? "auto" : 500}}>
                <DialogTitle sx={{p: 0}}>
                    {title}
                </DialogTitle>
                <ModalClose onClick={onClose}/>

                {children}
            </ModalDialog>
        </Modal>
    );
}