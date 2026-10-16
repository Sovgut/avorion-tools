import { isRouteErrorResponse, useRouteError } from 'react-router';
import { useT } from '@/i18n';
import { Button } from '@/ui';
import s from './ErrorScreen.module.css';

function describe(error: unknown): { message: string; details: string } {
  if (isRouteErrorResponse(error)) return { message: `${error.status} ${error.statusText}`, details: String(error.data ?? '') };
  if (error instanceof Error) return { message: error.message, details: error.stack ?? '' };
  return { message: String(error), details: '' };
}

/** Route error boundary; `standalone` fills the window when the shell itself failed. */
export function ErrorScreen({ standalone }: { standalone?: boolean }) {
  const t = useT();
  const error = useRouteError();
  const { message, details } = describe(error);
  const base = import.meta.env.BASE_URL;

  const resetData = () => {
    if (!window.confirm(t('Delete all tabs, turrets, cargo and blueprints saved in this browser?'))) return;
    try {
      for (const key of Object.keys(localStorage)) if (key.startsWith('avorion-tools')) localStorage.removeItem(key);
      indexedDB.deleteDatabase('avorion-tools');
    } catch {
      // storage unavailable: nothing to clear
    }
    window.location.href = base;
  };

  return (
    <div className={standalone ? s.page : s.inline}>
      <div className={s.card} role="alert">
        <div className={s.mark}>
          <span className={s.diamond} />
          <span className={s.code}>ERROR</span>
        </div>
        <h1 className={s.title}>{t('Something went wrong')}</h1>
        <p className={s.text}>{t('This screen crashed. Your plan is saved in the browser; reloading usually helps.')}</p>
        <div className={s.message}>{message}</div>
        <div className={s.actions}>
          <Button variant="primary" onClick={() => window.location.reload()}>
            {t('Reload')}
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = `${base}#/planner`)}>
            {t('Go to the planner')}
          </Button>
          <Button variant="ghost" onClick={resetData}>
            {t('Reset saved data')}
          </Button>
        </div>
        {details && (
          <details className={s.details}>
            <summary>{t('Technical details')}</summary>
            <pre>{details}</pre>
          </details>
        )}
        <a className={s.report} href="https://github.com/Sovgut/avorion-tools/issues" target="_blank" rel="noreferrer">
          {t('Report the problem on GitHub')} ↗
        </a>
      </div>
    </div>
  );
}
