
const dictionaries = {
  en: () => import('@@/src/dictionaries/en.json').then((module) => module.default),
  nl: () => import('@@/src/dictionaries/nl.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => dictionaries[locale]()