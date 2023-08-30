import {Checkbox, Stack, Typography} from "@mui/joy";
import {useMemo} from "react";
import styles from './styles.module.css'
import {ComponentItemType} from "@/features/component-item-type";
import {ComponentAddCargo} from "@/features/component-add-cargo";
import {ComponentType} from "@/constants/enums/components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {checkboxAdd, checkboxRemove} from "@/reducers/checkbox";
import {computeQuantity} from "@/common/utils/computations/quantity";
import {ComponentsMeta} from "@/constants/meta/components";
import {ComponentSellers} from "@/features/component-sellers";

type ComponentItemProps = {
    type: ComponentType;
    value: number;
}

export function ComponentItem(props: ComponentItemProps) {
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const cargo = useSelector((state: RootState) => state.cargo);
    const dispatch = useDispatch();
    const quantity = useMemo(() => computeQuantity(cargo[props.type], props.value), [cargo, props]);

    function onCheckboxCheck() {
        if (checkbox[props.type]) {
            dispatch(checkboxRemove(props.type));
        } else {
            dispatch(checkboxAdd(props.type));
        }
    }

    return (
        <tr key={props.type}>
            <td>
                <Checkbox onChange={() => onCheckboxCheck()} checked={checkbox[props.type] || false}/>
            </td>
            <td>
                <Stack direction="row" spacing={1}>
                    <img className={styles.icon} src={ComponentsMeta[props.type].icon} alt={props.type}/>
                    <ComponentItemType type={props.type} isChecked={checkbox[props.type]}/>
                </Stack>
                <ComponentSellers type={props.type}/>
            </td>
            <td style={{textAlign: "right"}}>
                <Typography
                    color={quantity !== props.value ? "warning" : "primary"}
                    fontFamily="monospace"
                >
                    {quantity.toLocaleString()}
                </Typography>
            </td>
            <td>
                <ComponentAddCargo type={props.type}/>
            </td>
        </tr>
    )
}