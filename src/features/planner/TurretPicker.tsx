// First visit and "+ New tab": pick a turret type, name the tab, create it.
import { useMemo, useState } from 'react';
import { useGo } from '@/app/nav';
import { goodById, goodIcon, iconUrl, turrets } from '@/game/database';
import type { Armament } from '@/game/schema';
import { fmt, useGameText, useT } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { plannerActions } from '@/store/planner';
import { uiActions } from '@/store/ui';
import { Button, GameIcon, TextInput } from '@/ui';
import s from './planner.module.css';
import { useStoredDispatch } from './storage';

const GROUPS: { id: Armament; label: string }[] = [
  { id: 'armed', label: 'ARMED' },
  { id: 'unarmed', label: 'UNARMED' },
  { id: 'defensive', label: 'DEFENSIVE' },
];

function usePicker() {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  const tabs = useAppSelector((st) => st.planner.tabs);
  const turretsAll = useAppSelector((st) => st.planner.turrets);
  const [query, setQuery] = useState('');
  const [pick, setPick] = useState(turrets[0]?.id ?? '');
  const [tabName, setTabName] = useState('');
  const first = tabs.length === 0;
  const q = query.trim().toLowerCase();
  const groups = useMemo(
    () =>
      GROUPS.map((g) => ({
        ...g,
        items: turrets.filter(
          (tt) => tt.armament === g.id && (!q || gt.turret(tt.id).toLowerCase().includes(q) || tt.name.toLowerCase().includes(q)),
        ),
      })).filter((g) => g.items.length > 0),
    [gt, q],
  );
  const selected = turrets.find((tt) => tt.id === pick) ?? turrets[0];
  const defName = first ? t('Main fleet') : t('Tab {n}', { n: tabs.length + 1 });
  const storedDispatch = useStoredDispatch();
  const [storageFull, setStorageFull] = useState(false);
  const create = () => {
    if (!selected) return;
    const created = storedDispatch(
      plannerActions.createTab({
        name: tabName.trim() || defName,
        type: selected.id,
        components: selected.ingredients.map((i) => i.good),
      }),
    );
    setStorageFull(!created);
    if (created) dispatch(uiActions.setPicking(false));
  };
  return {
    t,
    gt,
    tabs,
    turretsAll,
    first,
    query,
    setQuery,
    pick,
    setPick,
    tabName,
    setTabName,
    groups,
    selected,
    defName,
    create,
    storageFull,
    title: t(first ? 'Add your first turret' : 'New tab'),
    sub: t(
      first
        ? "Pick the turret you're building. You'll then copy the component counts from the in-game turret factory, and the planner works out what to buy."
        : 'Pick the first turret for this tab. You can add more turrets to it afterwards.',
    ),
    cancel: () => dispatch(uiActions.setPicking(false)),
    selectTab: (id: string) => {
      dispatch(plannerActions.selectTab(id));
      dispatch(uiActions.setPicking(false));
    },
  };
}

export function TurretPicker() {
  const p = usePicker();
  const go = useGo();
  const { t, gt } = p;
  return (
    <div className={s.grid}>
      <aside className={p.first ? `${s.rail} ${s.railIntro}` : s.rail}>
        <div className={`label ${s.railLabel}`}>{t('TABS')}</div>
        {p.first ? (
          <div className={s.railHint}>{t('Tabs group turrets, e.g. one per ship. Your first one is created with your first turret.')}</div>
        ) : (
          <>
            {p.tabs.map((tab) => (
              <div key={tab.id} className={s.tabRow}>
                <button type="button" className={s.tabBtn} onClick={() => p.selectTab(tab.id)}>
                  <span className={s.tabName}>{tab.name}</span>
                  <span className={s.count}>{p.turretsAll.filter((x) => x.tabId === tab.id).length}</span>
                </button>
              </div>
            ))}
            <div className={s.newTabActive}>{t('+ New tab')}</div>
          </>
        )}
      </aside>

      <section className={s.pickerMain}>
        <div className={s.titleRow}>
          <div>
            <h1 className={s.bigTitle} style={{ margin: 0 }}>
              {p.title}
            </h1>
            <div className={s.subtitle}>{p.sub}</div>
          </div>
          {!p.first && (
            <Button variant="outline" onClick={p.cancel}>
              {t('Cancel')}
            </Button>
          )}
        </div>
        <TextInput
          className={s.filter}
          value={p.query}
          onChange={(e) => p.setQuery(e.target.value)}
          placeholder={t('Filter turrets')}
          aria-label={t('Filter turrets')}
        />
        {p.groups.map((g) => (
          <div key={g.id} className={s.group}>
            <div className="label">{t(g.label)}</div>
            <div className={s.tiles}>
              {g.items.map((tt) => (
                <button
                  key={tt.id}
                  type="button"
                  className={s.tile}
                  aria-pressed={tt.id === p.selected?.id}
                  onClick={() => p.setPick(tt.id)}
                >
                  <GameIcon src={iconUrl(tt.icon)} size={26} color={tt.id === p.selected?.id ? 'var(--c-accent)' : 'var(--c-text)'} />
                  <span>{gt.turret(tt.id)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        {p.groups.length === 0 && <div className={s.empty}>{t('No turret matches.')}</div>}
      </section>

      <aside className={s.panel}>
        {p.selected && (
          <>
            <div className={s.selectedHead}>
              <div className={s.iconBox}>
                <GameIcon src={iconUrl(p.selected.icon)} size={36} color="var(--c-accent)" />
              </div>
              <div>
                <div className={s.small}>{t('Selected')}</div>
                <div className={s.selectedName}>{gt.turret(p.selected.id)}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={`label ${s.listHead}`}>
                <span>
                  {t('NEEDS')} · {p.selected.ingredients.length} {t('COMMODITIES')}
                </span>
                <span>{t('PRICE')}</span>
              </div>
              {p.selected.ingredients.map((i) => (
                <button key={i.good} type="button" className={s.recipeRow} onClick={() => go.good(i.good)}>
                  <GameIcon src={goodIcon(i.good)} size={20} />
                  <span>{gt.good(i.good)}</span>
                  <span className={s.price}>¢{fmt(goodById.get(i.good)?.price ?? 0)}</span>
                </button>
              ))}
            </div>
          </>
        )}
        <div className={s.panelBottom}>
          <label className={s.field}>
            <span className={s.small}>{t('Tab name')}</span>
            <TextInput
              className={s.tabInput}
              value={p.tabName}
              onChange={(e) => p.setTabName(e.target.value)}
              placeholder={p.defName}
              maxLength={60}
              onKeyDown={(e) => e.key === 'Enter' && p.create()}
            />
          </label>
          <Button variant="primary" size="lg" onClick={p.create}>
            {t('Create tab with {turret}', { turret: p.selected ? gt.turret(p.selected.id) : '' })}
          </Button>
          {p.storageFull && <div className={s.storageFull}>{t('Storage is full. Delete a tab or some blueprints to make room.')}</div>}
        </div>
      </aside>
    </div>
  );
}

export function MobileTurretPicker() {
  const p = usePicker();
  const { t, gt } = p;
  return (
    <>
      <div className={s.mPicker}>
        <div className={s.titleRow}>
          <h1 className={s.mTitle} style={{ margin: 0 }}>
            {p.title}
          </h1>
          {!p.first && (
            <Button variant="outline" onClick={p.cancel} style={{ height: 44, borderRadius: 10 }}>
              {t('Cancel')}
            </Button>
          )}
        </div>
        <div className={s.mSub}>{p.sub}</div>
        <TextInput className={s.mInput} value={p.query} onChange={(e) => p.setQuery(e.target.value)} placeholder={t('Filter turrets')} />
        {p.groups.map((g) => (
          <div key={g.id} className={s.group}>
            <div className="label">{t(g.label)}</div>
            <div className={s.mTiles}>
              {g.items.map((tt) => (
                <button
                  key={tt.id}
                  type="button"
                  className={s.mTile}
                  aria-pressed={tt.id === p.selected?.id}
                  onClick={() => p.setPick(tt.id)}
                >
                  <GameIcon src={iconUrl(tt.icon)} size={30} color={tt.id === p.selected?.id ? 'var(--c-accent)' : 'var(--c-text)'} />
                  <span>{gt.turret(tt.id)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        {p.groups.length === 0 && <div className={s.empty}>{t('No turret matches.')}</div>}
      </div>
      {p.selected && (
        <div className={s.mSticky}>
          <div className={s.mSelected}>
            <GameIcon src={iconUrl(p.selected.icon)} size={24} color="var(--c-accent)" />
            <span>{gt.turret(p.selected.id)}</span>
            <span className={s.small}>
              {p.selected.ingredients.length} · {t('commodities')}
            </span>
          </div>
          <TextInput
            className={s.mInput}
            value={p.tabName}
            onChange={(e) => p.setTabName(e.target.value)}
            placeholder={p.defName}
            maxLength={60}
          />
          <Button variant="primary" className={s.mBigBtn} onClick={p.create}>
            {t('Create tab with {turret}', { turret: gt.turret(p.selected.id) })}
          </Button>
          {p.storageFull && <div className={s.storageFull}>{t('Storage is full. Delete a tab or some blueprints to make room.')}</div>}
        </div>
      )}
    </>
  );
}
