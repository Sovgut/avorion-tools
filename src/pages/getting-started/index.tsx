import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~store";
import { Box, Card, Container, Link, Stack, Typography } from "@mui/joy";
import { GettingStartedLayout } from "~layouts/getting-started";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import { IntlContext } from "~contexts/intl";
import { TurretPicker } from "~components/turret-picker";
import { Header } from "~components/header";
import { Center } from "~components/center";
import { startPageAnimation } from "~reducers/page-animation";

export function GettingStartedPage() {
  const intlContext = useContext(IntlContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const turretStore = useSelector((state: RootState) => state.turret);
  const animationStore = useSelector((state: RootState) => state.animationPage);

  useEffect(() => {
    if (Object.keys(turretStore.entities).length > 0) {
      dispatch(
        startPageAnimation({
          page: "/turret-planner/getting-started",
          delay: 140,
        })
      );

      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
        navigate("/turret-planner", { replace: true });
      }, 150);

      return function cleanup() {
        clearTimeout(timeoutId);
      };
    }
  }, [navigate, turretStore]);

  const componentClasses = clsx({
    [styles.animation]: true,
    [styles.close]: !!animationStore["/turret-planner/getting-started"],
  });

  return (
    <Box>
      <Container
        maxWidth={false}
        sx={{ position: "fixed", width: "100%", zIndex: 2 }}
      >
        <Header />
      </Container>

      <Box className={componentClasses}>
        <GettingStartedLayout>
          <Center vertical horizontal>
            <Container>
              <Stack spacing={4}>
                <Typography level="h1" textAlign="center">
                  {intlContext.text("UI", "lets-add-turret")}
                </Typography>
                <Card sx={{ boxShadow: "sm" }}>
                  <TurretPicker />
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
    </Box>
  );
}
