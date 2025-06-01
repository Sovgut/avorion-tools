import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useState} from "react";
import {CACHE_LANG} from "~constants/common";
import {IntlLabel, LanguageType} from "~contexts/intl/storage/types";
import {INTL_STORAGE} from "~contexts/intl/storage";
import { LocalState } from "@sovgut/state";
import { SUPPORTED_LANGUAGES } from "./constants";

type Context = {
    language: LanguageType;
    text<Scope extends keyof IntlLabel>(scope: Scope, label: IntlLabel[Scope]): string;
    setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

type Props = {
    children: ReactNode;
}

export const IntlContext = createContext<Context>({
    language: "en-US",
    text: () => String(),
    setLanguage: () => undefined,
});

export function IntlContextProvider({children}: Props) {
    const [language, setLanguage] = useState<LanguageType>("en-US");

    useLayoutEffect(() => {
        const language = LocalState.get(CACHE_LANG, { fallback: window.navigator.language as LanguageType });

        if (SUPPORTED_LANGUAGES.includes(language)) {
            setLanguage(language);
        }
    }, [])

    useEffect(() => {
        LocalState.set(CACHE_LANG, language);
    }, [language]);

    function text<Scope extends keyof IntlLabel>(scope: Scope, label: IntlLabel[Scope]): string {
        const storage = INTL_STORAGE[scope];
        const translation = storage[language] || storage["en-US"];
        const section = translation[label as keyof typeof translation];

        return section || label;
    }

    return <IntlContext.Provider value={{language, setLanguage, text}}>
        {children}
    </IntlContext.Provider>
}