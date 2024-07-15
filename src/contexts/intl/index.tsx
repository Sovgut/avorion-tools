import {createContext, ReactNode, useState} from "react";
import {CACHE_LANG} from "~constants/common";
import {IntlLabel, LanguageType} from "~contexts/intl/storage/types";
import {INTL_STORAGE} from "~contexts/intl/storage";
import { LocalState } from "@sovgut/state";

type Context = {
    language: LanguageType;
    text<Scope extends keyof IntlLabel>(scope: Scope, label: IntlLabel[Scope]): string;
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
    const [language, setLanguage] = useState<LanguageType>((LocalState.get(CACHE_LANG, { fallback: window.navigator.language ?? "en-US" })) as LanguageType);

    function selectLanguage(language: LanguageType) {
        LocalState.set(CACHE_LANG, language);

        setLanguage(language);
    }

    function text<Scope extends keyof IntlLabel>(scope: Scope, label: IntlLabel[Scope]): string {
        const storage = INTL_STORAGE[scope];
        const translation = storage[language] || storage["en-US"];
        const section = translation[label as keyof typeof translation];

        return section || String();
    }

    return <IntlContext.Provider value={{language, selectLanguage, text}}>
        {children}
    </IntlContext.Provider>
}