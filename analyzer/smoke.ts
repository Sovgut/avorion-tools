// Runs the compiled generation scripts over a small region to catch scripts that no longer run.

import { NativeStub } from '../src/engine/avorion/natives';
import { call, first, index, type LuaTable, method } from '../src/engine/lua/runtime';
import type { GameFiles } from './game';
import { createScriptVM } from './vm';

export interface SmokeResult {
  sectors: number;
  withContent: number;
  stations: number;
  /** Natives that only have stand-ins but were used while generating. */
  stubLeaks: string[];
}

export function smokeTestGalaxy(game: GameFiles, files: string[]): SmokeResult {
  const { vm } = createScriptVM(game, files, { seed: 'avorion-tools' });
  const SectorSpecifics = vm.include('sectorspecifics');
  const FactoryPredictor = vm.include('factorypredictor') as LuaTable;
  const specs = first(call(SectorSpecifics)) as LuaTable;
  const seed = first(call(vm.state.G.get('GameSeed')));
  const stationTemplates = first(method(specs, 'getRegularStationSectors')) as LuaTable;
  // load every template (and the libraries they pull in) before counting stand-in uses
  method(specs, 'addTemplates');
  NativeStub.uses.clear();
  let sectors = 0;
  let withContent = 0;
  let stations = 0;
  for (let y = -12; y <= 12; y++) {
    for (let x = -499; x <= 500; x += 3) {
      sectors++;
      method(specs, 'initialize', x, y, seed);
      if (index(specs, 'regular') !== true && index(specs, 'offgrid') !== true) continue;
      withContent++;
      const script = first(method(specs, 'getScript'));
      if (index(specs, 'regular') === true && stationTemplates.get(script) === true) {
        stations++;
        const contents = first(call(index(index(specs, 'generationTemplate'), 'contents'), x, y)) as LuaTable;
        const factories = contents.get('factories');
        if (typeof factories === 'number' && factories > 0) call(FactoryPredictor.get('generateFactoryProductions'), x, y, factories);
      }
    }
  }
  return { sectors, withContent, stations, stubLeaks: [...NativeStub.uses.keys()].sort() };
}
