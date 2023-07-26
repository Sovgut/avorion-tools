import {createContext, ReactNode, useState} from "react";
import {INTL} from "../intl";

interface IntlContextProps {
    language: string;

    text(scope: string, label: string): string;

    selectLanguage(language: string): void;
}

interface IntlContextProviderProps {
    children: ReactNode;
}

export const IntlContext = createContext<IntlContextProps>({
    language: "en-US",

    text: (scope: string, label: string) => String(),
    selectLanguage: (language: string) => {
    },
});

export function IntlContextProvider(props: IntlContextProviderProps) {
    const [language, setLanguage] = useState(localStorage.getItem("lang") ?? window.navigator.language ?? "en-US");

    function selectLanguage(language: string) {
        localStorage.setItem("lang", language);

        setLanguage(language);
    }

    function text(scope: string, label: string) {
        // @ts-ignore
        return INTL[scope][language][label] ?? INTL[scope]["en-US"][label];
    }

    return <IntlContext.Provider value={{language, selectLanguage, text}}>
        {props.children}
    </IntlContext.Provider>
}