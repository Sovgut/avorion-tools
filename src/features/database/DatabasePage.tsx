import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { consumerPath, goodPath, stationPath, useGo } from '@/app/nav';
import { useGalaxy } from '@/features/galaxy/client';
import { sectorX, sectorY } from '@/features/galaxy/model';
import { nearestProducers } from '@/features/galaxy/queries';
import { usePlan } from '@/features/planner/plan';
import {
  consumerById,
  consumerStationsBuying,
  consumers,
  consumersOf,
  cycleProfit,
  db,
  goodById,
  goodIcon,
  goods,
  iconUrl,
  producersOf,
  type StationType,
  stationById,
  stationIcon,
  stations,
  turretsUsing,
} from '@/game/database';
import type { ConsumerStation, Good, Production } from '@/game/schema';
import { fmt, fmt2, type GameText, type T, useGameText, useT } from '@/i18n';
import { useAppSelector } from '@/store';
import { GameIcon, Segmented, Tag, TextInput } from '@/ui';
import { useIsMobile } from '@/ui/hooks';
import s from './database.module.css';

type Section = 'commodities' | 'stations' | 'consumers';

/** Contents field the generator reports for each consumer station. */
const CONSUMER_FIELD: Record<string, string> = {
  Habitat: 'habitats',
  Biotope: 'biotopes',
  Casino: 'casinos',
  EquipmentDock: 'equipmentDocks',
  MilitaryOutpost: 'militaryOutposts',
  ResearchStation: 'researchStations',
  RiftResearchStation: 'riftResearchCenters',
  Shipyard: 'shipyards',
  RepairDock: 'repairDocks',
  TravelHub: 'travelHubs',
  TurretFactory: 'turretFactories',
  Mine: 'mines',
};

export function DatabasePage() {
  const params = useParams();
  const mobile = useIsMobile();
  const section = (params.section as Section) ?? 'commodities';
  if (!['commodities', 'stations', 'consumers'].includes(section)) return <Navigate to="/database/commodities" replace />;
  const id = params.id ? decodeURIComponent(params.id) : undefined;
  if (mobile) return id ? <MobileDetail section={section} id={id} /> : <ListPane section={section} mobile />;
  const fallback = section === 'commodities' ? goods[0]?.id : section === 'stations' ? stations[0]?.id : consumers[0]?.id;
  const current = id ?? fallback;
  return (
    <div className={s.grid}>
      <ListPane section={section} current={current} />
      {current && <Detail section={section} id={current} />}
    </div>
  );
}

function ListPane({ section, current, mobile }: { section: Section; current?: string; mobile?: boolean }) {
  const t = useT();
  const gt = useGameText();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const match = (...texts: string[]) => !query || texts.some((x) => x.toLowerCase().includes(query));
  const goodItems = goods.filter((g) => match(g.name, gt.good(g.id))).sort((a, b) => gt.good(a.id).localeCompare(gt.good(b.id)));
  const stationItems = stations.filter((st) => match(st.id.replace(/-/g, ' '), gt.station(st)));
  const consumerItems = consumers.filter((c) => match(c.name, gt.text(c.name)));

  const item = (key: string, to: string, icon: string, label: string) => (
    <button
      key={key}
      type="button"
      className={mobile ? s.mItem : s.item}
      aria-current={current === key ? 'page' : undefined}
      onClick={() => navigate(to)}
    >
      <GameIcon src={icon} size={mobile ? 22 : 16} color={!mobile && current === key ? 'var(--c-text)' : 'var(--c-secondary)'} />
      <span className={s.itemLabel}>{label}</span>
      {mobile && <span className={s.chev}>›</span>}
    </button>
  );

  return (
    <aside className={mobile ? s.mList : s.rail}>
      <Segmented
        className={mobile ? s.mSeg : s.seg}
        segmentClassName={mobile ? s.mSegItem : undefined}
        value={section === 'commodities' ? 'commodities' : 'stations'}
        onChange={(v) => navigate(`/database/${v}`)}
        options={[
          { value: 'commodities', label: t('Commodities') },
          { value: 'stations', label: t('Stations') },
        ]}
      />
      <TextInput
        className={mobile ? s.mFilter : s.filter}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('Filter')}
        aria-label={t('Filter')}
      />
      <div className={s.items}>
        {section === 'commodities' ? (
          goodItems.map((g) => item(g.id, goodPath(g.id), goodIcon(g.id), gt.good(g.id)))
        ) : (
          <>
            {(['factories', 'mines'] as const).map((kind) => {
              const list = stationItems.filter((st) => st.mine === (kind === 'mines'));
              if (list.length === 0) return null;
              return (
                <div key={kind} className={s.itemGroup}>
                  <div className={`label ${s.groupLabel}`}>{t(kind === 'mines' ? 'Mines' : 'Factories')}</div>
                  {list.map((st) => item(st.id, stationPath(st.id), stationIcon(st), gt.station(st)))}
                </div>
              );
            })}
            {consumerItems.length > 0 && (
              <div className={s.itemGroup}>
                <div className={`label ${s.groupLabel}`}>{t('Consumer stations')}</div>
                {consumerItems.map((c) => item(c.id, consumerPath(c.id), goodIcon(c.goods[0] ?? ''), gt.text(c.name)))}
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

function Detail({ section, id }: { section: Section; id: string }) {
  if (section === 'commodities') {
    const g = goodById.get(id);
    return g ? <CommodityDetail good={g} /> : <Navigate to="/database/commodities" replace />;
  }
  if (section === 'stations') {
    const st = stationById.get(id);
    return st ? <StationDetail station={st} /> : <Navigate to="/database/stations" replace />;
  }
  const c = consumerById.get(id);
  return c ? <ConsumerDetail consumer={c} /> : <Navigate to="/database/stations" replace />;
}

function MobileDetail({ section, id }: { section: Section; id: string }) {
  const t = useT();
  const navigate = useNavigate();
  return (
    <div className={s.mPage}>
      <button type="button" className={s.back} onClick={() => navigate(`/database/${section === 'consumers' ? 'stations' : section}`)}>
        ‹ {t('Back')}
      </button>
      <Detail section={section} id={id} />
    </div>
  );
}

// ---------------------------------------------------------------- shared bits

function Recipe({ p, gt, size = 0 }: { p: Production; gt: GameText; size?: number }) {
  const go = useGo();
  const mult = size > 0 ? size + 1 : 1;
  return (
    <div className={s.recipe}>
      {p.ingredients.map((i) => (
        <button key={i.good} type="button" className={s.recipeChip} onClick={() => go.good(i.good)}>
          <GameIcon src={goodIcon(i.good)} size={14} />
          {fmt(i.amount * mult)} × {gt.good(i.good)}
        </button>
      ))}
      {p.ingredients.length > 0 && <span className={s.arrow}>→</span>}
      {p.results.map((r) => (
        <button key={r.good} type="button" className={`${s.recipeChip} ${s.recipeOut}`} onClick={() => go.good(r.good)}>
          <GameIcon src={goodIcon(r.good)} size={14} color="var(--c-accent)" />
          {fmt(r.amount * mult)} × {gt.good(r.good)}
        </button>
      ))}
    </div>
  );
}

function Stat({ label, value, tone, small }: { label: string; value: string; tone?: 'accent' | 'green'; small?: boolean }) {
  return (
    <div className={s.stat}>
      <div className={s.statLabel}>{label}</div>
      <div
        className={small ? s.statValueSm : s.statValue}
        style={{ color: tone === 'accent' ? 'var(--c-accent)' : tone === 'green' ? 'var(--c-green)' : undefined }}
      >
        {value}
      </div>
    </div>
  );
}

function PlanCallout({ good, t, gt }: { good: string; t: T; gt: GameText }) {
  const plan = usePlan();
  const need = plan.need.get(good);
  if (!need) return null;
  return (
    <div className={s.callout}>
      <div className={s.calloutTitle}>{t('In your plan')}</div>
      <div className={s.calloutText}>
        {plan.tab?.name} {t('needs')} {fmt(need)} × {gt.good(good)}.
      </div>
    </div>
  );
}

function NearbyProducers({ good }: { good: string }) {
  const t = useT();
  const go = useGo();
  const galaxy = useGalaxy();
  const plan = usePlan();
  const seed = useAppSelector((st) => st.settings.galaxy?.seed);
  const near = galaxy.state === 'ready' ? nearestProducers(galaxy.data, good, plan.position, 5) : [];
  return (
    <div className={s.side}>
      <div className={s.sideTitle}>{t('In your galaxy')}</div>
      {galaxy.state === 'ready' ? (
        <>
          <div className={s.sideSub}>
            {t('Seed')} {seed} · {t('nearest to')} {plan.position.x}:{plan.position.y}
          </div>
          {near.map((n) => (
            <button key={n.sector.i} type="button" className={s.nearRow} onClick={() => go.map(n.x, n.y, good)}>
              <span className={s.nearXY}>
                {n.x}:{n.y}
              </span>
              <span className={s.nearName}>{n.sector.name}</span>
              <span className={s.nearDist}>{fmt(n.distance)}</span>
            </button>
          ))}
          {near.length === 0 && <div className={s.muted}>{t('Not produced anywhere in this galaxy.')}</div>}
        </>
      ) : (
        <div className={s.muted}>
          {galaxy.state === 'loading' ? t('Generating galaxy…') : t('Generate a galaxy to see producers near you.')}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- commodity

function CommodityDetail({ good }: { good: Good }) {
  const t = useT();
  const gt = useGameText();
  const go = useGo();
  const plan = usePlan();
  const producers = producersOf.get(good.id) ?? [];
  const usedTurrets = turretsUsing.get(good.id) ?? [];
  const usedStations = consumersOf.get(good.id) ?? [];
  const buyers = consumerStationsBuying.get(good.id) ?? [];
  const tags: { name: string; color: string }[] = [];
  if (good.dangerous) tags.push({ name: t('DANGEROUS'), color: 'var(--c-red)' });
  if (good.illegal) tags.push({ name: t('ILLEGAL'), color: 'var(--c-red)' });
  if (good.stolen) tags.push({ name: t('STOLEN'), color: 'var(--c-red)' });
  if (good.suspicious) tags.push({ name: t('SUSPICIOUS'), color: 'var(--c-violet)' });
  if (usedTurrets.length) tags.push({ name: t('TURRET PART'), color: 'var(--c-secondary)' });
  if (plan.need.get(good.id)) tags.push({ name: t('IN PLAN'), color: 'var(--c-accent)' });

  return (
    <>
      <section className={s.main}>
        <div className={s.crumb}>
          {t('Database')} / {t('Commodities')} / <span>{gt.good(good.id)}</span>
        </div>
        <div className={s.hero}>
          <div className={s.heroIcon}>
            <GameIcon src={goodIcon(good.id)} size={60} color="var(--c-accent)" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className={s.title}>{gt.good(good.id)}</h1>
            {tags.length > 0 && (
              <div className={s.tags}>
                {tags.map((tag) => (
                  <Tag key={tag.name} color={tag.color}>
                    {tag.name}
                  </Tag>
                ))}
              </div>
            )}
            {gt.description(good.id) && <p className={s.desc}>{gt.description(good.id)}</p>}
          </div>
        </div>
        <div className={s.stats3}>
          <Stat label={t('Base price')} value={`¢${fmt(good.price)}`} tone="accent" />
          <Stat label={t('Volume')} value={`${fmt2(good.volume)} m³`} />
          <Stat label={t('Price per m³')} value={`¢${fmt(good.price / good.volume)}`} />
        </div>

        <div className={s.block}>
          <h2 className={s.h2}>{t('Produced by')}</h2>
          {producers.length > 0 ? (
            producers.map((st) => (
              <div key={st.id} className={s.box}>
                <button type="button" className={s.stationLink} onClick={() => go.station(st.id)}>
                  {gt.station(st)}
                </button>
                {st.variants
                  .filter((p) => p.results.some((r) => r.good === good.id))
                  .map((p) => (
                    <Recipe key={p.index} p={p} gt={gt} />
                  ))}
              </div>
            ))
          ) : (
            <div className={s.muted}>{t('Not produced by any factory.')}</div>
          )}
        </div>

        <div className={s.block}>
          <h2 className={s.h2}>{t('Used by')}</h2>
          <div className={s.usedGrid}>
            {usedTurrets.map((tt) => (
              <div key={tt.id} className={s.used}>
                <GameIcon src={iconUrl(tt.icon)} size={22} />
                <span>{gt.turret(tt.id)}</span>
                <span className={s.kind}>{t('TURRET')}</span>
              </div>
            ))}
            {usedStations.map((st) => (
              <button key={st.id} type="button" className={s.used} onClick={() => go.station(st.id)}>
                <GameIcon src={stationIcon(st)} size={22} />
                <span>{gt.station(st)}</span>
                <span className={s.kind}>{t('STATION')}</span>
              </button>
            ))}
            {buyers.map((c) => (
              <button key={c.id} type="button" className={s.used} onClick={() => go.consumer(c.id)}>
                <GameIcon src={goodIcon(c.goods[0] ?? '')} size={22} />
                <span>{gt.text(c.name)}</span>
                <span className={s.kind}>{t('STATION')}</span>
              </button>
            ))}
          </div>
          {usedTurrets.length + usedStations.length + buyers.length === 0 && <div className={s.muted}>{t('Nothing uses it.')}</div>}
        </div>
        <Source />
      </section>
      <aside className={s.panel}>
        <PlanCallout good={good.id} t={t} gt={gt} />
        <NearbyProducers good={good.id} />
      </aside>
    </>
  );
}

function Source() {
  const t = useT();
  return (
    <div className={s.source}>
      {t('Source: game data · prices are base values before faction and sector modifiers')} · Avorion {db.game.version}
    </div>
  );
}

// ---------------------------------------------------------------- station

function StationDetail({ station }: { station: StationType }) {
  const t = useT();
  const gt = useGameText();
  const go = useGo();
  const [variant, setVariant] = useState(0);
  const [size, setSize] = useState(1);
  const p = station.variants[Math.min(variant, station.variants.length - 1)];
  const mult = size + 1;
  const profit = cycleProfit(p) * mult;
  const cargo = p.ingredients.reduce((a, i) => a + i.amount * (goodById.get(i.good)?.volume ?? 0), 0) * mult;
  const main = p.results[0]?.good ?? station.titleGood;
  const consumersOfMain = consumersOf.get(main) ?? [];
  const turretsOfMain = turretsUsing.get(main) ?? [];
  const buyersOfMain = consumerStationsBuying.get(main) ?? [];

  const table = (title: string, rows: { good: string; amount: number }[], out: boolean) => (
    <div className={out ? s.tableOut : s.table}>
      <div className={`label ${s.tableRow} ${s.tableHead}`}>
        <span>{title}</span>
        <span className={s.right}>{t('PRICE')}</span>
        <span className={s.right}>{t('/ CYCLE')}</span>
      </div>
      {rows.map((r) => (
        <button key={r.good} type="button" className={s.tableRow} onClick={() => go.good(r.good)}>
          <span className={s.cell}>
            <GameIcon src={goodIcon(r.good)} size={20} color={out ? 'var(--c-accent)' : undefined} />
            <span style={{ fontWeight: out ? 600 : 400 }}>{gt.good(r.good)}</span>
          </span>
          <span className={s.right} style={{ color: out ? 'var(--c-green)' : 'var(--c-accent)' }}>
            ¢{fmt(goodById.get(r.good)?.price ?? 0)}
          </span>
          <span className={s.right}>{fmt(r.amount * mult)}</span>
        </button>
      ))}
      {rows.length === 0 && <div className={s.tableEmpty}>{t('No ingredients: it extracts its goods.')}</div>}
    </div>
  );

  return (
    <>
      <section className={s.main}>
        <div className={s.crumb}>
          {t('Database')} / {t('Stations')} / <span>{gt.factory(p.factory, main)}</span>
        </div>
        <div className={s.hero}>
          <div className={s.heroIconSm}>
            <GameIcon src={stationIcon(station)} size={56} color="var(--c-accent)" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className={s.title}>{gt.factory(p.factory, main, size)}</h1>
          </div>
          <div className={s.pickers}>
            {station.variants.length > 1 && (
              <div className={s.variants}>
                {station.variants.map((v, i) => (
                  <button key={v.index} type="button" className={s.variant} aria-pressed={i === variant} onClick={() => setVariant(i)}>
                    #{i + 1}
                  </button>
                ))}
              </div>
            )}
            <Segmented
              className={s.sizes}
              segmentClassName={s.size}
              value={size}
              onChange={setSize}
              options={db.sizes.map((l, i) => ({ value: i + 1, label: l }))}
            />
          </div>
        </div>
        <div className={s.stats4}>
          <Stat small label={t('Founding cost')} value={`¢${fmt(p.cost)}`} />
          <Stat small label={t('Profit / cycle')} value={`¢${fmt(profit)}`} tone="green" />
          <Stat small label={t('Payback')} value={profit > 0 ? `${fmt(p.cost / profit)} ${t('cycles')}` : '-'} />
          <Stat small label={t('Required cargo')} value={`${fmt2(cargo)} m³`} />
        </div>
        <div className={s.flow}>
          {table(t('INGREDIENTS'), p.ingredients, false)}
          <div className={s.flowArrow}>→</div>
          {table(t('RESULTS'), [...p.results, ...p.garbages], true)}
        </div>
        <div className={s.block} style={{ gap: 8 }}>
          <div className="label">{t('UPGRADE COST')}</div>
          <div className={s.upgrades}>
            {db.sizes.map((l, i) => (
              <div key={l} className={s.upgrade} data-active={i + 1 === size}>
                <span className={s.upgradeLabel}>{l}</span>
                <span className="mono">¢{fmt(p.upgradeCosts[i] ?? 0)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.source}>
          {t('Costs and amounts come from the game scripts; a cycle produces once per parallel production (size + 1).')}
        </div>
      </section>
      <aside className={s.panel}>
        <PlanCallout good={main} t={t} gt={gt} />
        <div className={s.side}>
          <div className={s.sideTitle}>{t('Suppliers')}</div>
          {p.ingredients.map((i) => {
            const st = producersOf.get(i.good)?.[0];
            return (
              <div key={i.good} className={s.supplier}>
                <span>{gt.good(i.good)}</span>
                <button type="button" className={st ? s.chipAccent : s.chip} onClick={() => (st ? go.station(st.id) : go.good(i.good))}>
                  {st ? gt.station(st) : gt.good(i.good)}
                </button>
              </div>
            );
          })}
          {p.ingredients.length === 0 && <div className={s.muted}>{t('No ingredients: it extracts its goods.')}</div>}
        </div>
        <div className={s.side}>
          <div className={s.sideTitle}>{t('Consumers')}</div>
          {consumersOfMain.map((st) => (
            <button key={st.id} type="button" className={s.consumer} onClick={() => go.station(st.id)}>
              <GameIcon src={stationIcon(st)} size={20} />
              <span>{gt.station(st)}</span>
              <span className={s.kind}>{t('STATION')}</span>
            </button>
          ))}
          {buyersOfMain.map((c) => (
            <button key={c.id} type="button" className={s.consumer} onClick={() => go.consumer(c.id)}>
              <GameIcon src={goodIcon(c.goods[0] ?? '')} size={20} />
              <span>{gt.text(c.name)}</span>
              <span className={s.kind}>{t('STATION')}</span>
            </button>
          ))}
          {turretsOfMain.map((tt) => (
            <div key={tt.id} className={s.consumer}>
              <GameIcon src={iconUrl(tt.icon)} size={20} />
              <span>{gt.turret(tt.id)}</span>
              <span className={s.kind}>{t('TURRET')}</span>
            </div>
          ))}
          {consumersOfMain.length + buyersOfMain.length + turretsOfMain.length === 0 && (
            <div className={s.muted}>{t('Nothing in the game buys it.')}</div>
          )}
        </div>
        <NearbyProducers good={main} />
      </aside>
    </>
  );
}

// ---------------------------------------------------------------- consumer station

function ConsumerDetail({ consumer }: { consumer: ConsumerStation }) {
  const t = useT();
  const gt = useGameText();
  const go = useGo();
  const galaxy = useGalaxy();
  const plan = usePlan();
  const field = CONSUMER_FIELD[consumer.id];
  const nearest = useMemo(() => {
    if (galaxy.state !== 'ready' || !field) return [];
    return galaxy.data.stations
      .filter((st) => (st.counts[field] ?? 0) > 0)
      .map((st) => ({ st, x: sectorX(st.i), y: sectorY(st.i) }))
      .map((o) => ({ ...o, d: Math.hypot(o.x - plan.position.x, o.y - plan.position.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 5);
  }, [galaxy, field, plan.position]);
  return (
    <>
      <section className={s.main}>
        <div className={s.crumb}>
          {t('Database')} / {t('Stations')} / <span>{gt.text(consumer.name)}</span>
        </div>
        <div className={s.hero}>
          <div className={s.heroIconSm}>
            <GameIcon src={goodIcon(consumer.goods[0] ?? '')} size={56} color="var(--c-accent)" />
          </div>
          <h1 className={s.title} style={{ flex: 1 }}>
            {gt.text(consumer.name)}
          </h1>
        </div>
        <div className={s.block}>
          <h2 className={s.h2}>{t('Buys goods')}</h2>
          <div className={s.usedGrid}>
            {consumer.goods.map((g) => (
              <button key={g} type="button" className={s.used} onClick={() => go.good(g)}>
                <GameIcon src={goodIcon(g)} size={22} />
                <span>{gt.good(g)}</span>
                <span className={s.kindPrice}>¢{fmt(goodById.get(g)?.price ?? 0)}</span>
              </button>
            ))}
          </div>
        </div>
        <Source />
      </section>
      <aside className={s.panel}>
        <div className={s.side}>
          <div className={s.sideTitle}>{t('Nearest in your galaxy')}</div>
          {galaxy.state !== 'ready' && <div className={s.muted}>{t('Generate a galaxy to see producers near you.')}</div>}
          {nearest.map((n) => (
            <button key={n.st.i} type="button" className={s.nearRow} onClick={() => go.map(n.x, n.y)}>
              <span className={s.nearXY}>
                {n.x}:{n.y}
              </span>
              <span className={s.nearName}>{n.st.name}</span>
              <span className={s.nearDist}>{fmt(n.d)}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
