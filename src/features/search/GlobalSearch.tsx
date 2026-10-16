import * as RDialog from '@radix-ui/react-dialog';
import { useMemo, useState } from 'react';
import { useGo } from '@/app/nav';
import { usePlan } from '@/features/planner/plan';
import { goodIcon, goods, producersOf, type StationType } from '@/game/database';
import { fmt, fmt2, useGameText, useT } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { uiActions } from '@/store/ui';
import { CloseIcon, GameIcon } from '@/ui';
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
          {mobile ? (
            <div className={s.mHead}>
              <label className={s.mField}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="7" cy="7" r="5" />
                  <path d="M11 11l3.5 3.5" strokeLinecap="round" />
                </svg>
                <input
                  className={s.mInput}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t('Stations & commodities…')}
                  aria-label={t('Search')}
                  enterKeyHint="search"
                />
                {q && (
                  <button type="button" className={s.mClear} aria-label={t('Clear')} onClick={() => setQ('')}>
                    <CloseIcon size={10} />
                  </button>
                )}
              </label>
              <button type="button" className={s.cancel} onClick={close}>
                {t('Cancel')}
              </button>
            </div>
          ) : (
            <div className={s.head}>
              <input
                className={s.input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('Stations & commodities…')}
                aria-label={t('Search')}
              />
              <kbd className={s.esc}>ESC</kbd>
            </div>
          )}
          {mobile && (
            <div className={`label ${s.mCount}`}>
              {t('COMMODITY')} · {rows.length}
            </div>
          )}
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
                  <button key={good.id} type="button" className={s.mRow} onClick={() => go.good(good.id)}>
                    <span className={s.mIcon}>
                      <GameIcon src={goodIcon(good.id)} size={20} color="var(--c-text)" />
                    </span>
                    <span className={s.mText}>
                      <span className={s.mTitle}>
                        <span className={s.mName}>{gt.good(good.id)}</span>
                        {badges}
                      </span>
                      <span className={s.mSub}>{main ? gt.station(main) : t('Not produced by any factory.')}</span>
                    </span>
                    <span className={s.mNums}>
                      <span className={s.mPrice}>¢{fmt(good.price)}</span>
                      <span className={s.mVol}>{fmt2(good.volume)} m³</span>
                    </span>
                  </button>
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
