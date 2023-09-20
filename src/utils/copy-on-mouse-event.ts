import {MouseEvent} from "react";

export function copyOnMouseEvent<TMouseEvent = unknown>(text: string): (e: MouseEvent<TMouseEvent>) => void {
    return function $onMouseEvent(e: MouseEvent<TMouseEvent>) {
        e.stopPropagation();

        window.navigator.clipboard.writeText(text).then();
    };
}