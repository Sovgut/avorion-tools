import {createContext, ReactNode, useState} from "react";
import {CACHE_LANG} from "@/constants/common";
import {IntlStorage, IntlStorageLabel, LanguageType} from "@/contexts/intl/storage/types";
import {INTL_STORAGE} from "@/contexts/intl/storage";

interface IntlContextProps {
    language: string;

    text(scope: keyof IntlStorage, label: keyof IntlStorageLabel): string;

    selectLanguage(language: string): void;
}

interface IntlContextProviderProps {
    children: ReactNode;
}

export const IntlContext = createContext<IntlContextProps>({
    language: "en-US",

    text: () => String(),
    selectLanguage: () => undefined,
});

export function IntlContextProvider(props: IntlContextProviderProps) {
    const [language, setLanguage] = useState<LanguageType>((localStorage.getItem(CACHE_LANG) ?? window.navigator.language ?? "en-US") as LanguageType);

    function selectLanguage(language: LanguageType) {
        localStorage.setItem(CACHE_LANG, language);

        setLanguage(language);
    }

    function text(scope: keyof IntlStorage, label: keyof IntlStorageLabel): string {
        const storage = INTL_STORAGE[scope];
        const translation = storage[language] || storage["en-US"];
        const section = translation[label as keyof typeof translation];

        return section || String();
    }

    return <IntlContext.Provider value={{language, selectLanguage, text}}>
        {props.children}
    </IntlContext.Provider>
}