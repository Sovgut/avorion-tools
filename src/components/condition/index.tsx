import {Children, Fragment, ReactNode} from "react";

type Props = {
    is: boolean;
    children: ReactNode | [ReactNode, ReactNode?];
}

export function Condition({is, children}: Props) {
    const [first, second] = Children.toArray(children);

    return <Fragment>{is ? first : (second ?? null)}</Fragment>;
}