// Readable names for sector templates; the game never shows these, so they are not in its catalogs.
import type { Lang } from '@/store/settings';

const NAMES: Record<string, [string, string]> = {
  'sectors/colony': ['Colony', 'Колония'],
  'sectors/asteroidfieldminer': ['Mining asteroid field', 'Астероидное поле с шахтёром'],
  'sectors/loneconsumer': ['Lone consumer', 'Одинокий потребитель'],
  'sectors/lonescrapyard': ['Lone scrapyard', 'Одинокая свалка'],
  'sectors/loneshipyard': ['Lone shipyard', 'Одинокая верфь'],
  'sectors/lonetrader': ['Lone trader', 'Одинокий торговец'],
  'sectors/lonetradingpost': ['Lone trading post', 'Одинокий торговый пост'],
  'sectors/lonewormhole': ['Wormhole', 'Червоточина'],
  'sectors/factoryfield': ['Factory field', 'Промышленный сектор'],
  'sectors/miningfield': ['Mining field', 'Шахтёрский сектор'],
  'sectors/gates': ['Gate hub', 'Узел врат'],
  'sectors/ancientgates': ['Ancient gates', 'Древние врата'],
  'sectors/neutralzone': ['Neutral zone', 'Нейтральная зона'],
  'sectors/riftinvasionbase': ['Rift research base', 'База исследования разломов'],
  'sectors/pirateasteroidfield': ['Pirate asteroid field', 'Пиратское астероидное поле'],
  'sectors/piratefight': ['Pirate fight', 'Бой с пиратами'],
  'sectors/piratestation': ['Pirate station', 'Пиратская станция'],
  'sectors/asteroidfield': ['Asteroid field', 'Астероидное поле'],
  'sectors/containerfield': ['Container field', 'Поле контейнеров'],
  'sectors/massivecontainerfield': ['Massive container field', 'Большое поле контейнеров'],
  'sectors/smallasteroidfield': ['Small asteroid field', 'Малое астероидное поле'],
  'sectors/defenderasteroidfield': ['Guarded asteroid field', 'Охраняемое астероидное поле'],
  'sectors/wreckagefield': ['Wreckage field', 'Поле обломков'],
  'sectors/stationwreckage': ['Station wreckage', 'Обломки станции'],
  'sectors/smugglerhideout': ['Smuggler hideout', 'Укрытие контрабандистов'],
  'sectors/cultists': ['Cultists', 'Культисты'],
  'sectors/wreckageasteroidfield': ['Wreckage and asteroids', 'Обломки и астероиды'],
  'sectors/researchsatellite': ['Research satellite', 'Исследовательский спутник'],
  'sectors/functionalwreckage': ['Functional wreckage', 'Рабочие обломки'],
  'sectors/asteroidshieldboss': ['Asteroid shield boss', 'Босс с астероидным щитом'],
  'sectors/xsotanasteroids': ['Xsotan asteroids', 'Астероиды ксотан'],
  'sectors/xsotantransformed': ['Xsotan transformed sector', 'Сектор, изменённый ксотан'],
  'sectors/xsotanbreeders': ['Xsotan breeders', 'Гнездо ксотан'],
  'sectors/resistancecell': ['Resistance cell', 'Ячейка Сопротивления'],
  'sectors/teleporter': ['Teleporter', 'Телепорт'],
  'sectors/worldboss': ['World boss', 'Мировой босс'],
};

export function templateName(id: string, lang: Lang): string {
  const n = NAMES[id];
  if (!n) return id.replace(/^sectors\//, '');
  return lang === 'ru' ? n[1] : n[0];
}
