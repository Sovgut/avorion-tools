import { Box, Option, Select, Stack, Tooltip, Typography } from "@mui/joy";
import {
  FC,
  Fragment,
  memo,
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { ComponentIcon } from "~components/component-icon";
import { StationIcon } from "~components/station-icon";
import { IntlContext } from "~contexts/intl";
import { CommodityMetadata } from "~data/commodities/metadata";
import { StationMetadata } from "~data/stations/metadata";
import { IStationVariation } from "~data/stations/types";
import { useFactory } from "~pages/factories/hook/use-factory";
import { getUniqueStationCommodities } from "~utils/get-unique-station-commodities";

export const CurrentStation: FC = memo(() => {
  const intlContext = useContext(IntlContext);
  const factory = useFactory();

  const onVariationChange = useCallback(
    (_: SyntheticEvent | null, value: number | null) => {
      if (value === null) return;

      factory.setStationVariation(value);
    },
    []
  );

  const calculateStationCost = useCallback((variation: IStationVariation) => {
    if (variation.isConsumer) {
      let sum = 0;

      for (const commodity of variation.consumables) {
        const good = CommodityMetadata[commodity.type];
        sum = sum + good.price;
      }

      const base = 4000000;
      return base + Math.round(Math.sqrt(sum * 2500) / 10) * 8000;
    }

    let ingredientValue = 0;
    let resultValue = 0;

    for (const commodity of variation.ingredients) {
      const good = CommodityMetadata[commodity.type];
      ingredientValue = ingredientValue + good.price * commodity.amount;
    }

    for (const commodity of variation.results) {
      const good = CommodityMetadata[commodity.type];
      resultValue = resultValue + good.price * commodity.amount;
    }

    const diff = resultValue - ingredientValue;
    let costs = 2500000; // 2.5m minimum for a factory

    costs = costs + diff * 3500;
    return costs;
  }, []);

  const calculateUpgradeCost = useCallback(
    (variation: IStationVariation, size: 1 | 2 | 3 | 4 | 5) => {
      let ingredientValue = 0;
      let resultValue = 0;

      for (const commodity of variation.ingredients) {
        const good = CommodityMetadata[commodity.type];
        ingredientValue = ingredientValue + good.price * commodity.amount;
      }

      for (const commodity of variation.results) {
        const good = CommodityMetadata[commodity.type];
        resultValue = resultValue + good.price * commodity.amount;
      }

      const diff = resultValue - ingredientValue;
      const costs = diff * 1000 * size;

      return costs;
    },
    []
  );

  const calculatePaybackCycles = useCallback(
    (variation: IStationVariation) => {
      if (!variation.profitPerCycle) return 0;

      return calculateStationCost(variation) / variation.profitPerCycle;
    },
    [calculateStationCost]
  );

  const variation =
    StationMetadata[factory.station].variations[factory.stationVariationIndex];

  /**
   * Payback
   */
  const PB = useMemo(() => calculatePaybackCycles(variation), [variation]);

  /**
   * First upgrade
   */
  const FU = useMemo(() => calculateUpgradeCost(variation, 1), [variation]);

  return (
    <Stack spacing={1} sx={{ p: 1.25 }}>
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
            placeholder="..."
            value={factory.stationVariationIndex}
            key={`${factory.station}-${factory.stationVariationIndex}-${intlContext.language}`}
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

            {variation.profitPerCycle > 0 && (
              <Fragment>
                <Typography>{intlContext.text("UI", "profit")}</Typography>
                <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                  <Typography fontFamily="monospace">└</Typography>
                  <Typography fontFamily="monospace" color="success">
                    ¢{variation.profitPerCycle?.toLocaleString()}
                  </Typography>
                  <Typography fontFamily="monospace" color="neutral">
                    /
                  </Typography>
                  <Tooltip
                    placement="bottom"
                    variant="outlined"
                    slotProps={{
                      root: {
                        style: { maxWidth: "300px" },
                      } as any,
                    }}
                    arrow
                    title={intlContext.text("UI", "profit-hint")}
                  >
                    <Typography
                      fontFamily="monospace"
                      sx={{ textDecoration: "underline" }}
                    >
                      {intlContext.text("UI", "cycle")}
                    </Typography>
                  </Tooltip>
                </Stack>
              </Fragment>
            )}

            {variation.requiredPC > 0 && (
              <Fragment>
                <Typography>
                  {intlContext.text("UI", "required-cargo")}
                </Typography>
                <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                  <Typography fontFamily="monospace">└</Typography>
                  <Typography fontFamily="monospace" color="success">
                    {variation.requiredPC?.toLocaleString()}
                  </Typography>
                </Stack>
              </Fragment>
            )}

            {PB > 0 && (
              <Fragment>
                <Typography>{intlContext.text("UI", "roi-cycles")}</Typography>
                <Stack direction="row" sx={{ pl: 1 }} spacing={0.25}>
                  <Typography fontFamily="monospace">└</Typography>
                  <Typography fontFamily="monospace" color="success">
                    {parseInt(PB.toString(), 10).toLocaleString()}
                  </Typography>
                </Stack>
              </Fragment>
            )}

            {FU > 0 && (
              <Fragment>
                <Typography>
                  {intlContext.text("UI", "upgrade-cost")}
                </Typography>
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
                    └
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
              </Fragment>
            )}
          </Stack>
        </fieldset>
      </Box>

      {variation.consumables.length > 0 && (
        <fieldset style={{ borderColor: "#9d6363" }}>
          <legend>{intlContext.text("UI", "consumables")}</legend>
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
              </tr>
            </thead>
            <tbody>
              {getUniqueStationCommodities(variation.consumables).map(
                (commodity, ingredientIndex) => (
                  <tr key={ingredientIndex}>
                    <td>
                      <Stack direction="row">
                        <ComponentIcon type={commodity.type} />
                        <Typography>
                          {intlContext.text("COMMODITY", commodity.type)}
                        </Typography>
                      </Stack>
                    </td>
                    <td align="right">
                      <Typography fontFamily="monospace" color="warning">
                        ¢
                        {CommodityMetadata[
                          commodity.type
                        ].price.toLocaleString()}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </fieldset>
      )}

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
                  <Stack
                    direction="row"
                    spacing={0.25}
                    alignItems="center"
                    sx={{
                      width: "max-content",
                    }}
                  >
                    <Typography color="neutral">
                      {intlContext.text("UI", "count")}
                    </Typography>
                    <Typography color="neutral">/</Typography>
                    <Typography color="neutral">
                      {intlContext.text("UI", "cycle")}
                    </Typography>
                  </Stack>
                </th>
              </tr>
            </thead>
            <tbody>
              {getUniqueStationCommodities(variation.ingredients).map(
                (commodity, ingredientIndex) => (
                  <tr key={ingredientIndex}>
                    <td>
                      <Stack direction="row">
                        <ComponentIcon type={commodity.type} />
                        <Typography>
                          {intlContext.text("COMMODITY", commodity.type)}
                        </Typography>
                      </Stack>
                    </td>
                    <td align="right">
                      <Typography fontFamily="monospace" color="warning">
                        ¢
                        {CommodityMetadata[
                          commodity.type
                        ].price.toLocaleString()}
                      </Typography>
                    </td>
                    <td align="right">
                      <Typography fontFamily="monospace">
                        {commodity.amount}
                      </Typography>
                    </td>
                  </tr>
                )
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
                  <Stack
                    direction="row"
                    spacing={0.25}
                    alignItems="center"
                    sx={{
                      width: "max-content",
                    }}
                  >
                    <Typography color="neutral">
                      {intlContext.text("UI", "count")}
                    </Typography>
                    <Typography color="neutral">/</Typography>
                    <Typography color="neutral">
                      {intlContext.text("UI", "cycle")}
                    </Typography>
                  </Stack>
                </th>
              </tr>
            </thead>
            <tbody>
              {variation.results.map((commodity, ingredientIndex) => (
                <tr key={ingredientIndex}>
                  <td>
                    <Stack direction="row">
                      <ComponentIcon type={commodity.type} />
                      <Typography>
                        {intlContext.text("COMMODITY", commodity.type)}
                      </Typography>
                    </Stack>
                  </td>
                  <td align="right">
                    <Typography fontFamily="monospace" color="success">
                      ¢
                      {CommodityMetadata[commodity.type].price.toLocaleString()}
                    </Typography>
                  </td>
                  <td align="right">
                    <Typography fontFamily="monospace">
                      {commodity.amount}
                    </Typography>
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
