import {createContext, ReactNode, useState} from "react";
import {INTL_STORAGE} from "./storage";
import {IIntlComponent, IIntlStation, IIntlStorage, IIntlTurret, IIntlUI, ILanguage} from "./storage/types";

interface IntlContextProps {
    language: string;

    text(scope: keyof IIntlStorage, label: keyof IIntlUI | keyof IIntlTurret | keyof IIntlComponent | keyof IIntlStation): string;

    selectLanguage(language: string): void;
}

interface IntlContextProviderProps {
    children: ReactNode;
}

export const IntlContext = createContext<IntlContextProps>({
    language: "en-US",

    text: (scope: keyof IIntlStorage, label: keyof IIntlUI | keyof IIntlTurret | keyof IIntlComponent | keyof IIntlStation) => String(),
    selectLanguage: (language: string) => {
    },
});

export function IntlContextProvider(props: IntlContextProviderProps) {
    const [language, setLanguage] = useState(localStorage.getItem("lang") ?? window.navigator.language ?? "en-US");

    function selectLanguage(language: string) {
        localStorage.setItem("lang", language);

        setLanguage(language);
    }

    function text(scope: keyof IIntlStorage, label: keyof IIntlUI & keyof IIntlTurret & keyof IIntlComponent & keyof IIntlStation): string {
        if (["en-US", "ru"].includes(language)) {
            return INTL_STORAGE[scope][language as ILanguage][label] || INTL_STORAGE[scope]["en-US"][label];
        }

        return INTL_STORAGE[scope]["en-US"][label];
    }

    return <IntlContext.Provider value={{language, selectLanguage, text}}>
        {props.children}
    </IntlContext.Provider>
}