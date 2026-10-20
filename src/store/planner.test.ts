import { describe, expect, it } from 'vitest';
import { plannerActions as a, type PlannerState, plannerReducer } from './planner';

const run = (...actions: Parameters<typeof plannerReducer>[1][]) =>
  actions.reduce<PlannerState>((st, action) => plannerReducer(st, action), plannerReducer(undefined, { type: '@init' }));

/** Two tabs; the first holds one chaingun with counts, a price and a sector. */
function twoTabs() {
  let st = run(
    a.createTab({ name: 'Main', type: 'ChainGun', components: ['Steel', 'Servo'] }),
    a.createTab({ name: 'Second', type: 'Laser', components: ['Crystal'] }),
  );
  const [main, second] = st.tabs;
  const gun = st.turrets[0];
  st = plannerReducer(st, a.updateTurret({ id: gun.id, qty: 3, price: 1200, x: -71, y: -4 }));
  st = plannerReducer(st, a.setCount({ id: gun.id, good: 'Steel', count: 5 }));
  return { st: plannerReducer(st, a.selectTab(main.id)), main, second, gun };
}

describe('sendTurret', () => {
  it('moves a turret to another tab and keeps everything else about it', () => {
    const { st, second, gun } = twoTabs();
    const next = plannerReducer(st, a.sendTurret({ id: gun.id, copy: false, tabId: second.id }));
    const moved = next.turrets.find((x) => x.id === gun.id);
    expect(moved).toMatchObject({ tabId: second.id, qty: 3, price: 1200, x: -71, y: -4, counts: { Steel: 5, Servo: 0 } });
    expect(next.turrets).toHaveLength(st.turrets.length);
    expect(next.currentTabId).toBe(st.currentTabId);
  });

  it('copies a turret as an independent turret with a new id', () => {
    const { st, main, second, gun } = twoTabs();
    let next = plannerReducer(st, a.sendTurret({ id: gun.id, copy: true, tabId: second.id }));
    const copy = next.turrets.find((x) => x.tabId === second.id && x.type === 'ChainGun');
    expect(copy).toBeDefined();
    expect(copy?.id).not.toBe(gun.id);
    expect(copy).toMatchObject({ qty: 3, price: 1200, x: -71, y: -4, counts: { Steel: 5, Servo: 0 } });
    next = plannerReducer(next, a.setCount({ id: copy!.id, good: 'Steel', count: 9 }));
    expect(next.turrets.find((x) => x.id === gun.id)).toMatchObject({ tabId: main.id, counts: { Steel: 5 } });
  });

  it('creates the named tab for the turret without switching to it', () => {
    const { st, main, gun } = twoTabs();
    const next = plannerReducer(st, a.sendTurret({ id: gun.id, copy: false, newTab: '  Build order  ' }));
    const tab = next.tabs.at(-1);
    expect(tab?.name).toBe('Build order');
    expect(next.turrets.find((x) => x.id === gun.id)?.tabId).toBe(tab?.id);
    expect(next.currentTabId).toBe(main.id);
  });

  it('ignores an unknown turret or tab', () => {
    const { st, gun } = twoTabs();
    expect(plannerReducer(st, a.sendTurret({ id: 'nope', copy: true, tabId: st.tabs[1].id }))).toEqual(st);
    expect(plannerReducer(st, a.sendTurret({ id: gun.id, copy: false, tabId: 'nope' }))).toEqual(st);
  });
});
