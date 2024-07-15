import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "~store";
import { Box, Card, Container, Link, Typography } from "@mui/joy";
import { GettingStartedLayout } from "~layouts/getting-started";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import { TurretPicker } from "~components/turret-picker";
import { Center } from "~components/center";
import { AnimationControlContext } from "~contexts/animation-control";
import { motion } from "framer-motion";
import {
  PAGE_ANIMATION_CONTROLS,
  PAGE_ANIMATION_EXIT,
  PAGE_ANIMATION_INITIAL,
} from "~constants/common.ts";

export function GettingStartedPage() {
  const navigate = useNavigate();
  const turretStore = useSelector((state: RootState) => state.turret);
  const controls = useContext(AnimationControlContext);

  useEffect(() => {
    if (Object.keys(turretStore.entities).length > 0) {
      controls?.start(PAGE_ANIMATION_CONTROLS).then(() => {
        window.scrollTo(0, 0);
        navigate("/turret-planner", { replace: true });
      });
    }
  }, [controls, navigate, turretStore]);

  const componentClasses = clsx({
    [styles.animation]: true,
  });

  return (
    <motion.div
      animate={controls}
      initial={PAGE_ANIMATION_INITIAL}
      exit={PAGE_ANIMATION_EXIT}
      style={{ height: "calc(100vh - 90px)", overflow: "hidden" }}
    >
      <Box className={componentClasses}>
        <GettingStartedLayout>
          <Center vertical horizontal sx={{marginTop: -10}}>
            <Container>
              <Card variant="plain">
                <TurretPicker variant="soft"/>
                <Typography level="body-sm">
                  <Typography level="body-sm" color="success">
                    Avorion Tools
                  </Typography>{" "}
                  is a community work, and not officially created or maintained
                  by{" "}
                  <Link href="https://boxelware.de/" target="_blank">
                    Boxelware
                  </Link>
                  .
                </Typography>
              </Card>
            </Container>
          </Center>
        </GettingStartedLayout>
      </Box>
    </motion.div>
  );
}
