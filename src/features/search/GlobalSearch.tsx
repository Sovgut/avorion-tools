import * as RDialog from '@radix-ui/react-dialog';
import { useMemo, useState } from 'react';
import { useGo } from '@/app/nav';
import { usePlan } from '@/features/planner/plan';
import { goodIcon, goods, producersOf, type StationType } from '@/game/database';
import { fmt, fmt2, useGameText, useT } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { uiActions } from '@/store/ui';
import { GameIcon } from '@/ui';
import s from './search.module.css';

export function GlobalSearch({ mobile }: { mobile?: boolean }) {
  const t = useT();
  const gt = useGameText();
  const go = useGo();
  const dispatch = useAppDispatch();
  const open = useAppSelector((st) => st.ui.searchOpen);
  const plan = usePlan();
  const [q, setQ] = useState('');
  const close = () => dispatch(uiActions.setSearchOpen(false));

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    const list = goods.map((g) => {
      const producers = producersOf.get(g.id) ?? [];
      return { good: g, producers, main: producers[0] as StationType | undefined };
    });
    const match = (text: string) => text.toLowerCase().includes(query);
    return list
      .filter(
        ({ good, producers }) =>
          !query ||
          match(good.name) ||
          match(gt.good(good.id)) ||
          producers.some((p) => match(gt.station(p)) || match(p.id.replace(/-/g, ' '))),
      )
      .sort((a, b) => gt.good(a.good.id).localeCompare(gt.good(b.good.id)));
  }, [q, gt]);

  const openStation = (st: StationType | undefined, goodId: string) => (st ? go.station(st.id) : go.good(goodId));

  return (
    <RDialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) close();
        else setQ('');
      }}
    >
      <RDialog.Portal>
        {!mobile && <RDialog.Overlay className={s.backdrop} />}
        <RDialog.Content className={mobile ? s.mPanel : s.panel} aria-describedby={undefined} onOpenAutoFocus={() => setQ('')}>
          <RDialog.Title className={s.hidden}>{t('Search')}</RDialog.Title>
          <div className={mobile ? s.mHead : s.head}>
            <input
              className={mobile ? s.mInput : s.input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('Stations & commodities…')}
              aria-label={t('Search')}
            />
            {mobile ? (
              <button type="button" className={s.cancel} onClick={close}>
                {t('Cancel')}
              </button>
            ) : (
              <kbd className={s.esc}>ESC</kbd>
            )}
          </div>
          {!mobile && (
            <div className={`label ${s.grid} ${s.colHead}`}>
              <span>
                {t('COMMODITY')} · {rows.length}
              </span>
              <span className={s.right}>{t('PRICE')}</span>
              <span className={s.right}>{t('VOLUME')}</span>
              <span>{t('PRODUCED AT')}</span>
            </div>
          )}
          <div className={s.results}>
            {rows.map(({ good, main }) => {
              const need = plan.need.get(good.id);
              const badges = (
                <>
                  {good.dangerous && <span className={s.danger}>{t('DANGEROUS')}</span>}
                  {good.illegal && <span className={s.danger}>{t('ILLEGAL')}</span>}
                  {need ? (
                    <span className={s.plan}>
                      {t('PLAN')} ×{fmt(need)}
                    </span>
                  ) : null}
                </>
              );
              const chip = (
                <button type="button" className={main ? s.chipAccent : s.chip} onClick={() => openStation(main, good.id)}>
                  {main ? gt.station(main) : '-'}
                </button>
              );
              if (mobile) {
                return (
                  <div key={good.id} className={s.mRow}>
                    <button type="button" className={s.mName} onClick={() => go.good(good.id)}>
                      <GameIcon src={goodIcon(good.id)} size={22} color="var(--c-text)" />
                      <span style={{ flex: 1 }}>{gt.good(good.id)}</span>
                      <span className={s.price}>¢{fmt(good.price)}</span>
                    </button>
                    <div className={s.mMeta}>
                      {chip}
                      {badges}
                    </div>
                  </div>
                );
              }
              return (
                <div key={good.id} className={`${s.grid} ${s.row}`}>
                  <button type="button" className={s.name} onClick={() => go.good(good.id)}>
                    <GameIcon src={goodIcon(good.id)} size={22} color="var(--c-text)" />
                    <span>{gt.good(good.id)}</span>
                    {badges}
                  </button>
                  <span className={`${s.right} ${s.price}`}>¢{fmt(good.price)}</span>
                  <span className={`${s.right} ${s.vol}`}>{fmt2(good.volume)}</span>
                  <span>{chip}</span>
                </div>
              );
            })}
            {rows.length === 0 && <div className={s.empty}>{t('Nothing matches. Try a station name, like "mine".')}</div>}
          </div>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
