import { describe, expect, it } from 'vitest';
import { Compiler, runtimeImportNames } from './compiler';
import type { ModuleFactory } from './rt';
import { LuaState } from './rt';

/** Runs a Lua chunk and returns what it printed. */
function run(source: string): string[] {
  const js = new Compiler({ chunkName: 'test.lua' }).compileChunk(source);
  const factory = new Function('R', `const { ${runtimeImportNames.join(', ')} } = R; return ${js};`) as ModuleFactory;
  const out: string[] = [];
  const state = new LuaState({ modules: { 'test.lua': factory }, print: (s) => out.push(s) });
  state.run('test.lua');
  return out;
}

describe('multiple results', () => {
  const two = 'local function two() return 1, 2 end\n';

  it('expands a call in the last position', () => {
    expect(run(`${two}print(select('#', two()))`)).toEqual(['2']);
    expect(run(`${two}local t = {two()} print(#t)`)).toEqual(['2']);
  });

  it('truncates a parenthesized call to one value', () => {
    expect(run(`${two}print(select('#', (two())))`)).toEqual(['1']);
    expect(run(`${two}local t = {(two())} print(#t)`)).toEqual(['1']);
    expect(run(`${two}local function f() return (two()) end print(select('#', f()))`)).toEqual(['1']);
    expect(run(`local function f(...) return select('#', (...)) end print(f(1, 2, 3))`)).toEqual(['1']);
  });

  it('treats parentheses after a callee as arguments, not grouping', () => {
    expect(run(`${two}local function n(...) return select('#', ...) end print(n(two()))`)).toEqual(['2']);
    expect(run(`${two}local t = {n = function(...) return select('#', ...) end} print(t.n(two()))`)).toEqual(['2']);
  });
});
