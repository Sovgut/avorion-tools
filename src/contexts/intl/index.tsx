import {createContext, ReactNode, useState} from "react";
import {CACHE_LANG} from "~constants/common";
import {IntlStorage, IntlStorageLabel, LanguageType} from "~contexts/intl/storage/types";
import {INTL_STORAGE} from "~contexts/intl/storage";

type Context = {
    language: string;
    text(scope: keyof IntlStorage, label: keyof IntlStorageLabel): string;
    selectLanguage(language: string): void;
}

type Props = {
    children: ReactNode;
}

export const IntlContext = createContext<Context>({
    language: "en-US",
    text: () => String(),
    selectLanguage: () => undefined,
});

export function IntlContextProvider({children}: Props) {
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
        {children}
    </IntlContext.Provider>
}