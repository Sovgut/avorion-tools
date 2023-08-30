import {ReactNode} from "react";
import {Component} from "../../constants";

export interface IComponentContextProvider {
    children: ReactNode;
}

export interface IComponentContext {
    container: IComponentState;

    update(tKey: string, cType: Component, quantity: number): void;

    flat(): Component[];
}

export type IFlatComponentState = {
    [type in Component]: {
        key: string;
        quantity: number;
    }
}

export interface IComponentState {
    [tKey: string]: Partial<IFlatComponentState>
}