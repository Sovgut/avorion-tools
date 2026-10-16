import { useState } from 'react';
import { iconUrl, RARITIES, type RarityId, rarityById, turretById } from '@/game/database';
import { fmt, useGameText, useT } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { plannerActions } from '@/store/planner';
import { uiActions } from '@/store/ui';
import { Button, Dialog, GameIcon, IconButton, Segmented, TextInput } from '@/ui';
import s from './blueprints.module.css';

function storageKb(): string {
  try {
    let bytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!;
      bytes += (k.length + (localStorage.getItem(k)?.length ?? 0)) * 2;
    }
    return (bytes / 1024).toFixed(1);
  } catch {
    return '?';
  }
}

export function BlueprintDialog() {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  const state = useAppSelector((st) => st.ui.blueprints);
  const turret = useAppSelector((st) => st.planner.turrets.find((x) => x.id === state?.turretId));
  const tab = useAppSelector((st) => st.planner.tabs.find((x) => x.id === turret?.tabId));
  const all = useAppSelector((st) => st.planner.blueprints);
  const [name, setName] = useState('');
  const [rarity, setRarity] = useState<RarityId>('exceptional');
  const [forTurret, setForTurret] = useState(state?.turretId);
  if (forTurret !== state?.turretId) {
    setForTurret(state?.turretId);
    setName('');
  }

  const def = turret ? turretById.get(turret.type) : undefined;
  const open = !!state && !!turret && !!def;
  const close = () => dispatch(uiActions.openBlueprints(null));
  const list = def ? all.filter((b) => b.type === def.id) : [];
  const color = rarityById.get(rarity)?.color;

  const save = () => {
    if (!turret || !def) return;
    const n = name.trim() || `${gt.turret(def.id)} #${list.length + 1}`;
    dispatch(
      plannerActions.saveBlueprint({
        type: def.id,
        name: n,
        rarity,
        counts: { ...turret.counts },
        price: turret.price,
        x: turret.x,
        y: turret.y,
      }),
    );
    setName('');
    dispatch(uiActions.openBlueprints({ turretId: turret.id, mode: 'saved' }));
  };

  return (
    <Dialog open={open} onClose={close} title={def ? `${gt.turret(def.id)} · ${t('blueprints')}` : t('Blueprints')}>
      {open && (
        <div className={s.wrap}>
          <div className={s.head}>
            <GameIcon src={iconUrl(def.icon)} size={32} color="var(--c-accent)" />
            <div style={{ flex: 1 }}>
              <div className={s.title}>
                {gt.turret(def.id)} · {t('blueprints')}
              </div>
              <div className={s.sub}>
                {tab?.name} · ×{turret.qty}
              </div>
            </div>
            <IconButton label={t('Cancel')} onClick={close} />
          </div>
          <Segmented
            className={s.modes}
            segmentClassName={s.mode}
            value={state.mode}
            onChange={(mode) => dispatch(uiActions.openBlueprints({ turretId: turret.id, mode }))}
            options={[
              { value: 'save', label: t('Save current') },
              { value: 'saved', label: `${t('Saved')} · ${list.length}` },
            ]}
          />
          {state.mode === 'save' ? (
            <div className={s.body}>
              <label className={s.field}>
                <span className={s.small}>{t('Name')}</span>
                <TextInput
                  className={s.nameInput}
                  style={{ color }}
                  value={name}
                  maxLength={60}
                  placeholder={t('e.g. Rail Mk III')}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && save()}
                  autoFocus
                />
              </label>
              <div className={s.field}>
                <span className={s.small}>{t('Rarity')}</span>
                <div className={s.rarities}>
                  {[...RARITIES].reverse().map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={s.rarity}
                      aria-pressed={r.id === rarity}
                      style={{ color: r.color, borderColor: r.id === rarity ? r.color : undefined }}
                      onClick={() => setRarity(r.id)}
                    >
                      <span className={s.rDot} style={{ background: r.color }} />
                      {t(r.name)}
                    </button>
                  ))}
                </div>
              </div>
              <div className={s.preview}>
                {def.ingredients.map((i) => (
                  <div key={i.good} className={s.previewRow}>
                    <span>{gt.good(i.good)}</span>
                    <span className="mono">{fmt(turret.counts[i.good] ?? 0)}</span>
                  </div>
                ))}
                <div className={`${s.previewRow} ${s.previewExtra}`}>
                  <span>{t('Turret price, cr')}</span>
                  <span className="mono">{fmt(turret.price)}</span>
                </div>
                <div className={`${s.previewRow} ${s.previewExtra}`}>
                  <span>{t('Sector')}</span>
                  <span className="mono">
                    {turret.x}:{turret.y}
                  </span>
                </div>
              </div>
              <Button variant="primary" size="lg" onClick={save}>
                {t('Save blueprint')}
              </Button>
              <div className={s.storage}>
                <span>{t('Local storage')}</span>
                <span>{storageKb()} KB / 5 MB</span>
              </div>
            </div>
          ) : (
            <div className={s.list}>
              {list.map((b) => {
                const r = rarityById.get(b.rarity) ?? RARITIES[1];
                return (
                  <div key={b.id} className={s.item}>
                    <span className={s.rDot} style={{ background: r.color, width: 10, height: 10 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={s.itemName} style={{ color: r.color }}>
                        {b.name}
                      </div>
                      <div className={s.itemSum}>
                        {t(r.name)} · {def.ingredients.map((i) => b.counts[i.good] ?? 0).join(' · ')}
                      </div>
                      {(b.price !== undefined || b.x !== undefined) && (
                        <div className={s.itemSum}>
                          {b.price !== undefined && `¢${fmt(b.price)}`}
                          {b.price !== undefined && b.x !== undefined && ' · '}
                          {b.x !== undefined && `${t('sector')} ${b.x}:${b.y}`}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        dispatch(plannerActions.applyBlueprint({ turretId: turret.id, blueprintId: b.id }));
                        close();
                      }}
                    >
                      {t('Load')}
                    </Button>
                    <IconButton label={t('Delete blueprint')} danger onClick={() => dispatch(plannerActions.removeBlueprint(b.id))} />
                  </div>
                );
              })}
              {list.length === 0 && <div className={s.empty}>{t('No saved blueprints for this turret.')}</div>}
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
}
