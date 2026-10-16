// Readable names for sector templates; the game never shows these, so they are not in its catalogs.
// The names are English UI strings, translated like any other through useT().

const NAMES: Record<string, string> = {
  'sectors/colony': 'Colony',
  'sectors/asteroidfieldminer': 'Mining asteroid field',
  'sectors/loneconsumer': 'Lone consumer',
  'sectors/lonescrapyard': 'Lone scrapyard',
  'sectors/loneshipyard': 'Lone shipyard',
  'sectors/lonetrader': 'Lone trader',
  'sectors/lonetradingpost': 'Lone trading post',
  'sectors/lonewormhole': 'Wormhole',
  'sectors/factoryfield': 'Factory field',
  'sectors/miningfield': 'Mining field',
  'sectors/gates': 'Gate hub',
  'sectors/ancientgates': 'Ancient gates',
  'sectors/neutralzone': 'Neutral zone',
  'sectors/riftinvasionbase': 'Rift research base',
  'sectors/pirateasteroidfield': 'Pirate asteroid field',
  'sectors/piratefight': 'Pirate fight',
  'sectors/piratestation': 'Pirate station',
  'sectors/asteroidfield': 'Asteroid field',
  'sectors/containerfield': 'Container field',
  'sectors/massivecontainerfield': 'Massive container field',
  'sectors/smallasteroidfield': 'Small asteroid field',
  'sectors/defenderasteroidfield': 'Guarded asteroid field',
  'sectors/wreckagefield': 'Wreckage field',
  'sectors/stationwreckage': 'Station wreckage',
  'sectors/smugglerhideout': 'Smuggler hideout',
  'sectors/cultists': 'Cultists',
  'sectors/wreckageasteroidfield': 'Wreckage and asteroids',
  'sectors/researchsatellite': 'Research satellite',
  'sectors/functionalwreckage': 'Functional wreckage',
  'sectors/asteroidshieldboss': 'Asteroid shield boss',
  'sectors/xsotanasteroids': 'Xsotan asteroids',
  'sectors/xsotantransformed': 'Xsotan transformed sector',
  'sectors/xsotanbreeders': 'Xsotan breeders',
  'sectors/resistancecell': 'Resistance cell',
  'sectors/teleporter': 'Teleporter',
  'sectors/worldboss': 'World boss',
};

export function templateName(id: string): string {
  return NAMES[id] ?? id.replace(/^sectors\//, '');
}
