import {createContext, ReactNode} from "react";
import {AnimationControls, useAnimation} from "framer-motion";

type Props = {
    children: ReactNode;
}

export const AnimationControlContext = createContext<AnimationControls | undefined>(undefined);

export function AnimationControlContextProvider({children}: Props) {
    const controls = useAnimation();

    return (
        <AnimationControlContext.Provider value={controls}>
            {children}
        </AnimationControlContext.Provider>
    );
}