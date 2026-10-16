import { useState } from 'react';
import { useGo } from '@/app/nav';
import { Disclaimer } from '@/app/Shell';
import { type BuyHint, useBuyHints } from '@/features/galaxy/hints';
import { goodIcon, iconUrl, rarityById, turretById, turrets as turretTypes } from '@/game/database';
import { fmt, fmt2, fmtShort, useGameText, useT } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { MAX_COUNT, MAX_PRICE, MAX_QUANTITY, MAX_TABS, type PlannedTurret, plannerActions } from '@/store/planner';
import { PRICE_FACTOR_MAX, PRICE_FACTOR_MIN, settingsActions } from '@/store/settings';
import { uiActions } from '@/store/ui';
import { Button, Checkbox, CloseIcon, CoordInput, FitText, GameIcon, IconButton, NumberInput, Sheet, Switch, TextInput } from '@/ui';
import { useIsMobile } from '@/ui/hooks';
import { type NeedRow, type Plan, usePlan } from './plan';
import s from './planner.module.css';
import { MobileTurretPicker, TurretPicker } from './TurretPicker';

export function PlannerPage() {
  const mobile = useIsMobile();
  const tabs = useAppSelector((st) => st.planner.tabs);
  const picking = useAppSelector((st) => st.ui.picking);
  if (tabs.length === 0 || picking) return mobile ? <MobileTurretPicker /> : <TurretPicker />;
  return mobile ? <MobilePlanner /> : <DesktopPlanner />;
}

function useConfirmRemoveTab() {
  const t = useT();
  const dispatch = useAppDispatch();
  return (id: string, name: string) => {
    if (window.confirm(`${t('Remove')} "${name}"? ${t('All turrets in this tab will be deleted.')}`))
      dispatch(plannerActions.removeTab(id));
  };
}

function useConfirmRemoveTurret() {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  return (turret: PlannedTurret) => {
    if (window.confirm(`${t('Remove')} ${gt.turret(turret.type)} ${t('from this tab?')}`)) dispatch(plannerActions.removeTurret(turret.id));
  };
}

function useAddTurret() {
  const dispatch = useAppDispatch();
  return (type: string) => {
    const def = turretById.get(type);
    if (def) dispatch(plannerActions.addTurret({ type, components: def.ingredients.map((i) => i.good) }));
  };
}

// ---------------------------------------------------------------- desktop

function DesktopPlanner() {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  const { tabs, currentTabId, turrets } = useAppSelector((st) => st.planner);
  const plan = usePlan();
  const removeTab = useConfirmRemoveTab();
  const addTurret = useAddTurret();
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className={s.grid}>
      <aside className={s.rail}>
        <div className={`label ${s.railLabel}`}>{t('TABS')}</div>
        {tabs.map((tab) => (
          <div key={tab.id} className={s.tabRow} data-active={tab.id === currentTabId}>
            <button type="button" className={s.tabBtn} onClick={() => dispatch(plannerActions.selectTab(tab.id))}>
              <span className={s.tabName}>{tab.name}</span>
              <span className={s.count}>{turrets.filter((x) => x.tabId === tab.id).length}</span>
            </button>
            <IconButton label={t('Remove tab')} danger className={s.tabRemove} onClick={() => removeTab(tab.id, tab.name)} />
          </div>
        ))}
        {tabs.length < MAX_TABS && (
          <button type="button" className={s.newTab} onClick={() => dispatch(uiActions.setPicking(true))}>
            {t('+ New tab')}
          </button>
        )}
        <div className={s.tabsUsed}>
          {tabs.length} / {MAX_TABS} {t('tabs')}
        </div>
      </aside>

      <section className={s.main}>
        <div className={s.plannerHead}>
          <div style={{ minWidth: 0 }}>
            {plan.tab && <TabTitle id={plan.tab.id} name={plan.tab.name} />}
            <div className={s.meta}>
              {plan.turrets.length} {t('turret types')} · {plan.enabled.length} {t('counted in estimate')}
            </div>
          </div>
          <Button variant="primary" onClick={() => setAddOpen((o) => !o)} aria-expanded={addOpen}>
            {t('+ Add turret')}
          </Button>
        </div>
        {addOpen && (
          <div className={s.addGrid}>
            {turretTypes.map((tt) => (
              <button
                key={tt.id}
                type="button"
                className={s.addItem}
                onClick={() => {
                  addTurret(tt.id);
                  setAddOpen(false);
                }}
              >
                <GameIcon src={iconUrl(tt.icon)} size={22} color="var(--c-text)" />
                <span>{gt.turret(tt.id)}</span>
              </button>
            ))}
          </div>
        )}
        <div className={s.cards}>
          {plan.turrets.map((turret) => (
            <TurretCard key={turret.id} turret={turret} />
          ))}
        </div>
        {plan.turrets.length === 0 && <div className={s.emptyTab}>{t('No turrets in this tab yet. Use Add turret.')}</div>}
      </section>

      <aside className={`${s.panel} ${s.summary}`}>
        <Estimate plan={plan} />
        <CargoTable plan={plan} />
        <div style={{ marginTop: 'auto' }}>
          <Disclaimer />
        </div>
      </aside>
    </div>
  );
}

function TabTitle({ id, name }: { id: string; name: string }) {
  const t = useT();
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  if (editing) {
    const commit = () => {
      dispatch(plannerActions.renameTab({ id, name: draft }));
      setEditing(false);
    };
    return (
      <TextInput
        autoFocus
        className={s.tabTitleInput}
        value={draft}
        maxLength={60}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') setEditing(false);
        }}
      />
    );
  }
  return (
    <h1 style={{ margin: 0 }}>
      <button
        type="button"
        className={s.tabTitle}
        title={t('Rename tab')}
        onClick={() => {
          setDraft(name);
          setEditing(true);
        }}
      >
        {name}
      </button>
    </h1>
  );
}

function TurretCard({ turret }: { turret: PlannedTurret }) {
  const t = useT();
  const gt = useGameText();
  const go = useGo();
  const dispatch = useAppDispatch();
  const removeTurret = useConfirmRemoveTurret();
  const blueprints = useAppSelector((st) => st.planner.blueprints).filter((b) => b.type === turret.type);
  const def = turretById.get(turret.type);
  if (!def) return null;
  const upd = (p: Partial<PlannedTurret>) => dispatch(plannerActions.updateTurret({ id: turret.id, ...p }));
  const allZero = Object.values(turret.counts).every((v) => v === 0);
  return (
    <article className={s.card} data-off={!turret.enabled}>
      <div className={s.cardHead}>
        <GameIcon src={iconUrl(def.icon)} size={36} color={turret.enabled ? 'var(--c-accent)' : 'var(--c-muted)'} />
        <div className={s.cardTitle}>
          <div className={s.cardName}>{gt.turret(turret.type)}</div>
          <div className={s.sectorRow}>
            <span>{t('sector')}</span>
            <CoordInput className={s.coord} value={turret.x} onValue={(x) => upd({ x })} aria-label="x" />
            <span>:</span>
            <CoordInput className={s.coord} value={turret.y} onValue={(y) => upd({ y })} aria-label="y" />
          </div>
        </div>
        <Switch checked={turret.enabled} onChange={(enabled) => upd({ enabled })} label={t('Count in estimate')} />
        <IconButton label={t('Remove turret')} danger onClick={() => removeTurret(turret)} />
      </div>
      <div className={s.cardRow2}>
        <label className={s.field} style={{ gap: 5 }}>
          <span className={s.small}>{t('Quantity')}</span>
          <div className={s.stepper}>
            <button type="button" aria-label="−" onClick={() => upd({ qty: turret.qty - 1 })}>
              −
            </button>
            <NumberInput value={turret.qty} onValue={(qty) => upd({ qty: Math.max(1, qty) })} max={MAX_QUANTITY} />
            <button type="button" aria-label="+" onClick={() => upd({ qty: turret.qty + 1 })}>
              +
            </button>
          </div>
        </label>
        <label className={s.field} style={{ gap: 5 }}>
          <span className={s.small}>{t('Turret price, cr')}</span>
          <NumberInput className={s.priceInput} value={turret.price} onValue={(price) => upd({ price })} max={MAX_PRICE} />
        </label>
      </div>
      <div className={s.comps}>
        {def.ingredients.map((ing) => (
          <div key={ing.good} className={s.compRow}>
            <GameIcon src={goodIcon(ing.good)} size={20} />
            <button type="button" className={s.compName} tabIndex={-1} title={t('Open in Database')} onClick={() => go.good(ing.good)}>
              {gt.good(ing.good)}
            </button>
            <NumberInput
              className={s.compInput}
              value={turret.counts[ing.good] ?? 0}
              max={MAX_COUNT}
              attention={(turret.counts[ing.good] ?? 0) === 0}
              aria-label={gt.good(ing.good)}
              onValue={(count) => dispatch(plannerActions.setCount({ id: turret.id, good: ing.good, count }))}
            />
          </div>
        ))}
        {allZero && <div className={s.hint}>{t('Enter the counts shown in the in-game turret factory.')}</div>}
      </div>
      <div className={s.cardFoot}>
        <button
          type="button"
          className={s.linkBtn}
          onClick={() => dispatch(uiActions.openBlueprints({ turretId: turret.id, mode: 'saved' }))}
        >
          {t('Blueprints')}
        </button>
        {blueprints.map((b) => (
          <button
            key={b.id}
            type="button"
            className={s.bpChip}
            style={{ color: rarityColor(b.rarity) }}
            title={t('Load counts')}
            onClick={() => dispatch(plannerActions.setCounts({ id: turret.id, counts: b.counts }))}
          >
            {b.name}
          </button>
        ))}
        <button
          type="button"
          className={s.saveChip}
          onClick={() => dispatch(uiActions.openBlueprints({ turretId: turret.id, mode: 'save' }))}
        >
          {t('+ Save')}
        </button>
      </div>
    </article>
  );
}

const rarityColor = (id: string) => rarityById.get(id)?.color ?? '#dfdfdf';

function Estimate({ plan }: { plan: Plan }) {
  const t = useT();
  return (
    <div className={s.estimate}>
      <div className={s.estLabel}>{t('Estimated price')}</div>
      <FitText className={s.estValue} text={`≈ ${fmt(plan.estimate)}`} max={36} />
      <PriceSlider plan={plan} />
      <div className={`${s.kv} ${s.kvFirst}`}>
        <span>{t('Turret purchase')}</span>
        <span>{fmt(plan.turretSum)}</span>
      </div>
      <div className={s.kv}>
        <span>{t('Cargo volume')}</span>
        <span>{fmt2(plan.volume)} m³</span>
      </div>
    </div>
  );
}

const pricePct = (f: number) => ((f - PRICE_FACTOR_MIN) / (PRICE_FACTOR_MAX - PRICE_FACTOR_MIN)) * 100;
/** Price multiples the game produces: base price, and the turret factory's supplier. */
const PRICE_MARKS = [1, 3.25];

function priceNote(f: number): string {
  if (f < 1) return 'below base: a surplus and good relations';
  if (f <= 1.35) return 'usual factory and trading post prices';
  if (f < 3.25) return 'a shortage or poor relations';
  return "the turret factory's supplier";
}

/** Chooses what cargo costs at stations, as a multiple of its base price. */
function PriceSlider({ plan }: { plan: Plan }) {
  const t = useT();
  const dispatch = useAppDispatch();
  const f = plan.priceFactor;
  const nothingToBuy = plan.cargoCost === 0;
  return (
    <div className={s.price}>
      <div className={s.priceTrack}>
        {PRICE_MARKS.map((m) => (
          <span key={m} className={s.priceMark} style={{ left: `${pricePct(m)}%` }} />
        ))}
        <input
          type="range"
          className={s.priceRange}
          min={PRICE_FACTOR_MIN}
          max={PRICE_FACTOR_MAX}
          step={0.05}
          value={f}
          disabled={nothingToBuy}
          aria-label={t('Cargo price at stations')}
          aria-valuetext={`×${fmt2(f)}`}
          onChange={(e) => dispatch(settingsActions.setPriceFactor(Number(e.target.value)))}
        />
      </div>
      <div className={s.rangeLabels}>
        <span>
          {t('min')} {fmt(plan.min)}
        </span>
        <span>
          {t('max')} {fmt(plan.max)}
        </span>
      </div>
      <div className={s.priceNote}>
        {nothingToBuy ? (
          t(plan.rows.length > 0 ? 'All cargo is bought or in the hold.' : 'No cargo to buy: the estimate is the turret purchase.')
        ) : (
          <>
            <span className={s.priceFactor}>×{fmt2(f)}</span> {t(priceNote(f))}
          </>
        )}
      </div>
    </div>
  );
}

function CargoTable({ plan }: { plan: Plan }) {
  const t = useT();
  const go = useGo();
  const dispatch = useAppDispatch();
  const hints = useBuyHints(plan);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={s.cargoHead}>
        <span className={s.sectionTitle}>{t('Cargo required')}</span>
        <button type="button" className={s.linkBtn} onClick={() => dispatch(plannerActions.clearCargo())}>
          {t('Reset hold and marks')}
        </button>
      </div>
      <div className={`label ${s.cargoGrid} ${s.cargoHeadRow}`}>
        <span />
        <span>{t('COMMODITY')}</span>
        <span className={s.right}>{t('NEED')}</span>
        <span className={s.right} title={t('Already in your hold; taken off what is left to buy.')}>
          {t('IN HOLD')}
        </span>
        <span className={s.right}>{t('BUY')}</span>
      </div>
      {plan.rows.map((r) => (
        <CargoRow key={r.good} row={r} hint={hints.get(r.good)} onOpenGood={() => go.good(r.good)} />
      ))}
      {plan.rows.length === 0 && <div className={s.note}>{t('Nothing to buy yet. Enter component counts on the turret cards.')}</div>}
      {plan.rows.length > 0 && (
        <div className={s.note}>
          {t('Tick a good once it is bought in the game; it leaves the estimate. In hold is what you already carry.')}
        </div>
      )}
      <HintsFootnote plan={plan} hints={hints} />
    </div>
  );
}

function CargoRow({
  row: r,
  hint,
  mobile,
  onOpenGood,
}: {
  row: NeedRow;
  hint: BuyHint | undefined;
  mobile?: boolean;
  onOpenGood: () => void;
}) {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  return (
    <div className={s.cargoItem} data-bought={r.bought} style={mobile ? { padding: '4px 0', gap: 4 } : undefined}>
      <div className={mobile ? s.sheetGrid : s.cargoGrid}>
        <Checkbox
          checked={r.bought}
          label={`${t('Bought')}: ${gt.good(r.good)}`}
          onChange={(bought) => dispatch(plannerActions.setBought({ good: r.good, bought }))}
        />
        <button
          type="button"
          className={s.goodBtn}
          style={mobile ? { fontSize: 14 } : undefined}
          title={t('Open in Database')}
          onClick={onOpenGood}
        >
          <GameIcon src={goodIcon(r.good)} size={18} />
          <span className={`${s.ellipsis} ${s.goodName}`}>{gt.good(r.good)}</span>
        </button>
        <span className={s.needNum} title={fmt(r.need)}>
          {fmtShort(r.need)}
        </span>
        <NumberInput
          className={mobile ? s.sheetHave : s.haveInput}
          value={r.have}
          emptyAsZero={false}
          placeholder="0"
          max={MAX_COUNT}
          aria-label={`${t('IN HOLD')} ${gt.good(r.good)}`}
          onValue={(count) => dispatch(plannerActions.setCargo({ good: r.good, count }))}
        />
        <span
          className={s.buyNum}
          title={fmt(r.buy)}
          style={{ fontSize: mobile ? 14 : undefined, color: r.buy === 0 ? 'var(--c-green)' : undefined }}
        >
          {r.bought ? '✓' : fmtShort(r.buy)}
        </span>
      </div>
      {r.buy > 0 && hint && <HintChip hint={hint} good={r.good} mobile={mobile} />}
    </div>
  );
}

function HintChip({ hint, good, mobile }: { hint: BuyHint; good: string; mobile?: boolean }) {
  const t = useT();
  const go = useGo();
  return (
    <button
      type="button"
      className={mobile ? `${s.buyHint} ${s.sheetHint}` : s.buyHint}
      title={t('Show on galaxy map')}
      onClick={() => go.map(hint.x, hint.y, good)}
    >
      <span className={s.dot} />
      <span className={s.ellipsis} style={{ flex: 1 }}>
        {hint.station}
      </span>
      <span className={s.cyan}>
        {hint.x}:{hint.y}
      </span>
      {!mobile && (
        <span className={s.mutedMono}>
          {fmt(hint.distance)} {t('sec')}
        </span>
      )}
    </button>
  );
}

function HintsFootnote({ plan, hints }: { plan: Plan; hints: ReturnType<typeof useBuyHints> }) {
  const t = useT();
  const seed = useAppSelector((st) => st.settings.galaxy?.seed);
  if (!plan.rows.some((r) => r.buy > 0)) return null;
  if (hints.size > 0) {
    return (
      <div className={s.footNote}>
        {t('Nearest producers from galaxy seed')} {seed}
      </div>
    );
  }
  if (!seed) return <div className={s.footNote}>{t('Generate a galaxy to see where to buy.')}</div>;
  return null;
}

// ---------------------------------------------------------------- mobile

function MobilePlanner() {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  const { tabs, currentTabId, turrets } = useAppSelector((st) => st.planner);
  const plan = usePlan();
  const removeTab = useConfirmRemoveTab();
  const addTurret = useAddTurret();
  const [addOpen, setAddOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cargoOpen, setCargoOpen] = useState(false);

  return (
    <>
      <div className={s.mTabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={s.mTabChip}
            aria-pressed={tab.id === currentTabId}
            onClick={() => dispatch(plannerActions.selectTab(tab.id))}
          >
            {tab.name} <span className={s.count}>{turrets.filter((x) => x.tabId === tab.id).length}</span>
          </button>
        ))}
        {tabs.length < MAX_TABS && (
          <button type="button" className={s.mPlus} aria-label={t('New tab')} onClick={() => dispatch(uiActions.setPicking(true))}>
            +
          </button>
        )}
      </div>
      <div className={s.mHead}>
        <div style={{ minWidth: 0 }}>
          <div className={s.mTabTitle}>{plan.tab?.name}</div>
          <div className={s.mMeta}>
            {plan.turrets.length} {t('turret types')} · {plan.enabled.length} {t('counted in estimate')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {plan.tab && (
            <button
              type="button"
              className={s.mSquare}
              aria-label={t('Remove tab')}
              onClick={() => removeTab(plan.tab!.id, plan.tab!.name)}
            >
              <CloseIcon size={12} />
            </button>
          )}
          <Button variant="primary" style={{ height: 44, borderRadius: 10 }} onClick={() => setAddOpen((o) => !o)}>
            {t('+ Add turret')}
          </Button>
        </div>
      </div>
      {addOpen && (
        <div className={s.mAddGrid}>
          {turretTypes.map((tt) => (
            <button
              key={tt.id}
              type="button"
              className={s.mAddItem}
              onClick={() => {
                addTurret(tt.id);
                setAddOpen(false);
              }}
            >
              <GameIcon src={iconUrl(tt.icon)} size={22} color="var(--c-text)" />
              <span>{gt.turret(tt.id)}</span>
            </button>
          ))}
        </div>
      )}
      <div className={s.mCards}>
        {plan.turrets.map((turret) => (
          <MobileTurretCard
            key={turret.id}
            turret={turret}
            open={expanded === turret.id || plan.turrets.length === 1}
            onToggle={() => setExpanded((e) => (e === turret.id ? null : turret.id))}
          />
        ))}
        {plan.turrets.length === 0 && <div className={s.emptyTab}>{t('No turrets in this tab yet. Use Add turret.')}</div>}
      </div>
      <div className={s.mSummaryBar}>
        <button type="button" className={s.mSummaryBtn} onClick={() => setCargoOpen(true)}>
          <div className={s.mSummaryText}>
            <FitText className={s.mAvg} text={`≈ ${fmt(plan.estimate)}`} max={20} />
            <div className={s.mRange}>
              ×{fmt2(plan.priceFactor)} · {fmt2(plan.volume)} m³
            </div>
          </div>
          <span className={s.mCargoBadge}>
            {t('Cargo')} · {plan.rows.filter((r) => r.buy > 0).length}
          </span>
        </button>
      </div>
      <CargoSheet plan={plan} open={cargoOpen} onClose={() => setCargoOpen(false)} />
    </>
  );
}

function MobileTurretCard({ turret, open, onToggle }: { turret: PlannedTurret; open: boolean; onToggle: () => void }) {
  const t = useT();
  const gt = useGameText();
  const go = useGo();
  const dispatch = useAppDispatch();
  const removeTurret = useConfirmRemoveTurret();
  const blueprints = useAppSelector((st) => st.planner.blueprints).filter((b) => b.type === turret.type);
  const def = turretById.get(turret.type);
  if (!def) return null;
  const upd = (p: Partial<PlannedTurret>) => dispatch(plannerActions.updateTurret({ id: turret.id, ...p }));
  const allZero = Object.values(turret.counts).every((v) => v === 0);
  return (
    <article className={s.mCard} data-off={!turret.enabled}>
      <div className={s.mCardHead}>
        <button type="button" className={s.mExpand} aria-expanded={open} onClick={onToggle}>
          <GameIcon src={iconUrl(def.icon)} size={30} color={turret.enabled ? 'var(--c-accent)' : 'var(--c-muted)'} />
          <div style={{ minWidth: 0 }}>
            <div className={s.mCardName}>{gt.turret(turret.type)}</div>
            <div className={s.mCardMeta}>
              ×{turret.qty} · {turret.x}:{turret.y}
            </div>
          </div>
        </button>
        <div className={s.mSwitchWrap}>
          <Switch checked={turret.enabled} onChange={(enabled) => upd({ enabled })} label={t('Count in estimate')} />
        </div>
      </div>
      {open && (
        <div className={s.mBody}>
          <div className={s.mTwo}>
            <label className={s.field} style={{ gap: 4 }}>
              <span className={s.small}>{t('Quantity')}</span>
              <div className={s.mStep}>
                <button type="button" aria-label="−" onClick={() => upd({ qty: turret.qty - 1 })}>
                  −
                </button>
                <NumberInput value={turret.qty} onValue={(qty) => upd({ qty: Math.max(1, qty) })} max={MAX_QUANTITY} />
                <button type="button" aria-label="+" onClick={() => upd({ qty: turret.qty + 1 })}>
                  +
                </button>
              </div>
            </label>
            <label className={s.field} style={{ gap: 4 }}>
              <span className={s.small}>{t('Turret price, cr')}</span>
              <NumberInput className={s.mNumInput} value={turret.price} onValue={(price) => upd({ price })} max={MAX_PRICE} />
            </label>
          </div>
          <div className={s.mCoordRow}>
            <span>{t('sector')}</span>
            <CoordInput className={s.mCoord} value={turret.x} onValue={(x) => upd({ x })} aria-label="x" />
            <span className={s.mutedMono}>:</span>
            <CoordInput className={s.mCoord} value={turret.y} onValue={(y) => upd({ y })} aria-label="y" />
          </div>
          {def.ingredients.map((ing) => (
            <div key={ing.good} className={s.compRow}>
              <GameIcon src={goodIcon(ing.good)} size={20} />
              <button type="button" className={s.mCompName} tabIndex={-1} onClick={() => go.good(ing.good)}>
                {gt.good(ing.good)}
              </button>
              <NumberInput
                className={s.mCompInput}
                value={turret.counts[ing.good] ?? 0}
                max={MAX_COUNT}
                attention={(turret.counts[ing.good] ?? 0) === 0}
                aria-label={gt.good(ing.good)}
                onValue={(count) => dispatch(plannerActions.setCount({ id: turret.id, good: ing.good, count }))}
              />
            </div>
          ))}
          {allZero && <div className={s.hint}>{t('Enter the counts shown in the in-game turret factory.')}</div>}
          <div className={s.mFoot}>
            {blueprints.map((b) => (
              <button
                key={b.id}
                type="button"
                className={s.mChip}
                style={{ color: rarityColor(b.rarity) }}
                onClick={() => dispatch(plannerActions.setCounts({ id: turret.id, counts: b.counts }))}
              >
                {b.name}
              </button>
            ))}
            <button
              type="button"
              className={s.mChipDashed}
              onClick={() => dispatch(uiActions.openBlueprints({ turretId: turret.id, mode: 'save' }))}
            >
              {t('+ Save')}
            </button>
            <button
              type="button"
              className={s.mChipPlain}
              onClick={() => dispatch(uiActions.openBlueprints({ turretId: turret.id, mode: 'saved' }))}
            >
              {t('Blueprints')}
            </button>
            <button type="button" className={s.mRemove} aria-label={t('Remove turret')} onClick={() => removeTurret(turret)}>
              <CloseIcon size={12} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function CargoSheet({ plan, open, onClose }: { plan: Plan; open: boolean; onClose: () => void }) {
  const t = useT();
  const go = useGo();
  const dispatch = useAppDispatch();
  const hints = useBuyHints(plan);
  return (
    <Sheet open={open} onClose={onClose} title={t('Cargo required')}>
      <div className={s.sheetHead}>
        <div className={s.sheetTitleRow}>
          <span className={s.sheetTitle}>{t('Cargo required')}</span>
          <button type="button" className={s.sheetClose} aria-label={t('Cancel')} onClick={onClose}>
            <CloseIcon size={12} />
          </button>
        </div>
        <FitText className={s.sheetAvg} text={`≈ ${fmt(plan.estimate)}`} max={26} />
        <PriceSlider plan={plan} />
        <div className={s.rangeLabels}>
          <span>{t('Cargo volume')}</span>
          <span>{fmt2(plan.volume)} m³</span>
        </div>
      </div>
      <div className={`label ${s.sheetGrid} ${s.sheetHeadRow}`}>
        <span />
        <span>{t('COMMODITY')}</span>
        <span className={s.right}>{t('NEED')}</span>
        <span className={s.right}>{t('IN HOLD')}</span>
        <span className={s.right}>{t('BUY')}</span>
      </div>
      <div className={s.sheetBody}>
        {plan.rows.map((r) => (
          <CargoRow
            key={r.good}
            row={r}
            hint={hints.get(r.good)}
            mobile
            onOpenGood={() => {
              onClose();
              go.good(r.good);
            }}
          />
        ))}
        {plan.rows.length === 0 && <div className={s.note}>{t('Nothing to buy yet. Enter component counts on the turret cards.')}</div>}
        <Button variant="outline" className={s.sheetClear} onClick={() => dispatch(plannerActions.clearCargo())}>
          {t('Reset hold and marks')}
        </Button>
      </div>
    </Sheet>
  );
}
