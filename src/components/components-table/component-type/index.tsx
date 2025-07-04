import { useContext } from "react";
import { Box, Typography } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~store";
import { SxProps } from "@mui/joy/styles/types";
import {
  createComponentCheckbox,
  deleteComponentCheckbox,
} from "~reducers/checkbox.ts";
import { ComponentIcon } from "~components/component-icon";
import styles from "./styles.module.css";
import { useBreakpoint } from "~hooks/breakpoints";
import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";
import { Toggleble } from "~components/UI/Toggleble/Toggleble";
import { Copiable } from "~components/UI/Copiable/Copiable";
import { ButtonebleGrouble } from "~components/UI/ButtonebleGrouble/ButtonebleGrouble";

type Props = {
  type: Commodity;
};

export function ComponentItemType({ type }: Props) {
  const intlContext = useContext(IntlContext);
  const checkbox = useSelector((state: RootState) => state.checkbox);
  const dispatch = useDispatch();
  const breakpoint = useBreakpoint();

  function handleCheckbox() {
    if (checkbox.entities[type]) {
      dispatch(deleteComponentCheckbox(type));
    } else {
      dispatch(createComponentCheckbox({ type: type, value: true }));
    }
  }

  const sx: SxProps = { textDecoration: "none", opacity: 1 };
  let fontSize: "md" | number = "md";
  let color: "danger" | "warning" | undefined;

  if (breakpoint.sm) {
    fontSize = 12;
  }

  if (CommodityMetadata[type].dangerous) {
    color = "danger";
  }

  if (CommodityMetadata[type].illegal) {
    color = "warning";
  }

  return (
    <td
      style={{
        paddingLeft: 16,
        paddingRight: 0,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Box className={styles.component} sx={sx}>
        <ButtonebleGrouble>
          <Copiable value={intlContext.text("COMMODITY", type)} />
          <Toggleble onClick={handleCheckbox} value={!!checkbox.entities[type]}>
            <ComponentIcon type={type} />
            <Typography
              fontSize={fontSize}
              color={color}
              sx={sx}
              onClick={handleCheckbox}
            >
              {intlContext.text("COMMODITY", type)}
            </Typography>
          </Toggleble>
        </ButtonebleGrouble>
      </Box>
    </td>
  );
}
