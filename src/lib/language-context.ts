import { createContext } from 'react'

export type Language = 'en' | 'ru' | 'es' | 'de' | 'zh' | 'fr'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)