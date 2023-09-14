import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "~store";
import {Box, Card, Container, Link, Stack, Typography} from "@mui/joy";
import {GettingStartedLayout} from "~layouts/getting-started";
import styles from "./styles.module.css";
import {clsx} from "clsx";
import {IntlContext} from "~contexts/intl";
import {TurretPicker} from "~components/turret-picker";
import {Center} from "~components/center";
import {AnimationControlContext} from "~contexts/animation-control";
import {motion} from "framer-motion";

export function GettingStartedPage() {
    const intlContext = useContext(IntlContext);
    const navigate = useNavigate();
    const turretStore = useSelector((state: RootState) => state.turret);
    const controls = useContext(AnimationControlContext);

    useEffect(() => {
        if (Object.keys(turretStore.entities).length > 0) {
            controls?.start({
                opacity: 0,
                transition: {duration: .150}
            })
                .then(() => {
                    window.scrollTo(0, 0);
                    navigate("/turret-planner", {replace: true});
                })
        }
    }, [controls, navigate, turretStore]);

    const componentClasses = clsx({
        [styles.animation]: true,
    });

    return (
        <motion.div
            animate={controls}
            initial={{opacity: 1}}
            exit={{opacity: 0}}
            style={{height: 'calc(100vh - 90px)', overflow: 'hidden'}}
        >
            <Box className={componentClasses}>
                <GettingStartedLayout>
                    <Center vertical horizontal>
                        <Container>
                            <Stack spacing={4}>
                                <Typography level="h1" textAlign="center">
                                    {intlContext.text("UI", "lets-add-turret")}
                                </Typography>
                                <Card sx={{boxShadow: "sm"}}>
                                    <TurretPicker/>
                                    <Typography level="body-sm">
                                        <b>Avorion Tools</b> is a community work, and not officially
                                        created or maintained by{" "}
                                        <Link href="https://boxelware.de/" target="_blank">
                                            Boxelware
                                        </Link>
                                        .
                                    </Typography>
                                </Card>
                            </Stack>
                        </Container>
                    </Center>
                </GettingStartedLayout>
            </Box>
        </motion.div>
    );
}
