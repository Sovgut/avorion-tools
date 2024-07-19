import { Info } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Option,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import {
  FC,
  Fragment,
  memo,
  SyntheticEvent,
  useCallback,
  useContext,
} from "react";
import { ComponentIcon } from "~components/component-icon";
import { StationIcon } from "~components/station-icon";
import { IntlContext } from "~contexts/intl";
import { CommodityMetadata } from "~data/commodities/metadata";
import { StationMetadata } from "~data/stations/metadata";
import { IStationVariation } from "~data/stations/types";
import { useFactory } from "~pages/factories/hook/use-factory";

export const CurrentStation: FC = memo(() => {
  const intlContext = useContext(IntlContext);
  const factory = useFactory();

  const calculatePaybackCycles = useCallback((variation: IStationVariation) => {
    if (!variation.cost || !variation.profitPerCycle) return 0;

    return variation.cost / variation.profitPerCycle;
  }, []);

  const onVariationChange = useCallback(
    (_: SyntheticEvent | null, value: number | null) => {
      if (value === null) return;

      factory.setStationVariation(value);
    },
    [],
  );

  const calculateStationCost = useCallback((variation: IStationVariation) => {
    let ingredientValue = 0;
    let resultValue = 0;

    for (const [commodity, amount] of variation.ingredients) {
      const good = CommodityMetadata[commodity];
      ingredientValue = ingredientValue + good.price * amount;
    }

    for (const [commodity, amount] of variation.results) {
      const good = CommodityMetadata[commodity];
      resultValue = resultValue + good.price * amount;
    }

    const diff = resultValue - ingredientValue;
    let costs = 2500000; // 2.5m minimum for a factory

    costs = costs + diff * 3500;
    return costs;
  }, []);

  const calculateUpgradeCost = useCallback(
    (variation: IStationVariation, size: 1 | 2 | 3 | 4 | 5 | 6) => {
      let ingredientValue = 0;
      let resultValue = 0;

      for (const [commodity, amount] of variation.ingredients) {
        const good = CommodityMetadata[commodity];
        ingredientValue = ingredientValue + good.price * amount;
      }

      for (const [commodity, amount] of variation.results) {
        const good = CommodityMetadata[commodity];
        resultValue = resultValue + good.price * amount;
      }

      const diff = resultValue - ingredientValue;
      const costs = diff * 1000 * size;

      return costs;
    },
    [],
  );

  const variation =
    StationMetadata[factory.station].variations[factory.stationVariationIndex];

  return (
    <Stack spacing={1} sx={{ width: "50%", p: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "max-content auto",
          gap: "1rem",
        }}
      >
        <Stack alignItems="start" justifyContent="space-between">
          <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
            <StationIcon type={factory.station} size="128px" />
          </Stack>
          <Select
            placeholder="Variation..."
            value={factory.stationVariationIndex}
            onChange={onVariationChange}
          >
            {StationMetadata[factory.station].variations.map((_, index) => (
              <Option key={index} value={index}>
                {intlContext.text("STATION", factory.station)} #{index + 1}
              </Option>
            ))}
          </Select>
        </Stack>

        <fieldset>
          <Stack>
            <Typography>{intlContext.text("UI", "cost")}</Typography>
            <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
              <Typography fontFamily="monospace">└</Typography>
              <Typography fontFamily="monospace" color="success">
                ¢{calculateStationCost(variation).toLocaleString()}
              </Typography>
            </Stack>

            <Typography>{intlContext.text("UI", "profit")}</Typography>
            <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
              <Typography fontFamily="monospace">└</Typography>
              <Typography fontFamily="monospace" color="success">
                ¢{variation.profitPerCycle?.toLocaleString()}
              </Typography>
            </Stack>

            <Typography>{intlContext.text("UI", "required-cargo")}</Typography>
            <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
              <Typography fontFamily="monospace">└</Typography>
              <Typography fontFamily="monospace" color="success">
                {variation.requiredPC?.toLocaleString()}
              </Typography>
            </Stack>

            <Stack sx={{ minWidth: "fit-content" }}>
              <Typography>{intlContext.text("UI", "roi-cycles")}</Typography>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace">└</Typography>
                <Typography fontFamily="monospace" color="success">
                  {parseInt(
                    calculatePaybackCycles(variation).toString(),
                    10,
                  ).toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ minWidth: "fit-content" }}>
              <Typography>Upgrade cost</Typography>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  ├
                </Typography>
                <Typography
                  fontFamily="monospace"
                  lineHeight="1.1"
                  color="success"
                >
                  ¢{calculateUpgradeCost(variation, 1).toLocaleString()}
                </Typography>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  S
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  ├
                </Typography>
                <Typography
                  fontFamily="monospace"
                  lineHeight="1.1"
                  color="success"
                >
                  ¢{calculateUpgradeCost(variation, 2).toLocaleString()}
                </Typography>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  M
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  ├
                </Typography>
                <Typography
                  fontFamily="monospace"
                  lineHeight="1.1"
                  color="success"
                >
                  ¢{calculateUpgradeCost(variation, 3).toLocaleString()}
                </Typography>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  L
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  ├
                </Typography>
                <Typography
                  fontFamily="monospace"
                  lineHeight="1.1"
                  color="success"
                >
                  ¢{calculateUpgradeCost(variation, 4).toLocaleString()}
                </Typography>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  XL
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  ├
                </Typography>
                <Typography
                  fontFamily="monospace"
                  lineHeight="1.1"
                  color="success"
                >
                  ¢{calculateUpgradeCost(variation, 5).toLocaleString()}
                </Typography>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  XXL
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  └
                </Typography>
                <Typography
                  fontFamily="monospace"
                  lineHeight="1.1"
                  color="success"
                >
                  ¢{calculateUpgradeCost(variation, 6).toLocaleString()}
                </Typography>
                <Typography fontFamily="monospace" lineHeight="1.1">
                  XXXL
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </fieldset>
      </Box>

      {variation.ingredients.length > 0 && (
        <fieldset>
          <legend>{intlContext.text("UI", "ingredients")}</legend>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">
                  <Typography color="neutral">
                    {intlContext.text("UI", "commodity")}
                  </Typography>
                </th>
                <th align="right" style={{ width: "150px" }}>
                  <Typography color="neutral">
                    {intlContext.text("UI", "cost")}
                  </Typography>
                </th>
                <th align="right" style={{ width: "150px" }}>
                  <Tooltip
                    title={intlContext.text("UI", "profit-hint")}
                    variant="outlined"
                    placement="top"
                  >
                    <Stack
                      direction="row"
                      spacing={0.25}
                      alignItems="center"
                      sx={{
                        cursor: "help",
                        textDecoration: "underline",
                        width: "max-content",
                      }}
                    >
                      <Typography color="neutral">Count</Typography>
                      <Typography color="neutral">/</Typography>
                      <Typography color="neutral">
                        {intlContext.text("UI", "cycle")}
                      </Typography>
                    </Stack>
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {variation.ingredients.map(
                ([commodity, count], ingredientIndex) => (
                  <tr key={ingredientIndex}>
                    <td>
                      <Stack direction="row">
                        <ComponentIcon type={commodity} />
                        <Typography>
                          {intlContext.text("COMMODITY", commodity)}
                        </Typography>
                      </Stack>
                    </td>
                    <td align="right">
                      <Typography fontFamily="monospace" color="warning">
                        ¢{CommodityMetadata[commodity].price.toLocaleString()}
                      </Typography>
                    </td>
                    <td align="right">
                      <Typography fontFamily="monospace">{count}</Typography>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </fieldset>
      )}

      {variation.results.length > 0 && (
        <fieldset>
          <legend>{intlContext.text("UI", "results")}</legend>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">
                  <Typography color="neutral">
                    {intlContext.text("UI", "commodity")}
                  </Typography>
                </th>
                <th align="right" style={{ width: "150px" }}>
                  <Typography color="neutral">
                    {intlContext.text("UI", "cost")}
                  </Typography>
                </th>
                <th align="right" style={{ width: "150px" }}>
                  <Tooltip
                    title={intlContext.text("UI", "profit-hint")}
                    variant="outlined"
                    placement="top"
                  >
                    <Stack
                      direction="row"
                      spacing={0.25}
                      alignItems="center"
                      sx={{
                        cursor: "help",
                        textDecoration: "underline",
                        width: "max-content",
                      }}
                    >
                      <Typography color="neutral">Count</Typography>
                      <Typography color="neutral">/</Typography>
                      <Typography color="neutral">
                        {intlContext.text("UI", "cycle")}
                      </Typography>
                    </Stack>
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {variation.results.map(([commodity, count], ingredientIndex) => (
                <tr key={ingredientIndex}>
                  <td>
                    <Stack direction="row">
                      <ComponentIcon type={commodity} />
                      <Typography>
                        {intlContext.text("COMMODITY", commodity)}
                      </Typography>
                    </Stack>
                  </td>
                  <td align="right">
                    <Typography fontFamily="monospace" color="success">
                      ¢{CommodityMetadata[commodity].price.toLocaleString()}
                    </Typography>
                  </td>
                  <td align="right">
                    <Typography fontFamily="monospace">{count}</Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>
      )}
    </Stack>
  );
});
