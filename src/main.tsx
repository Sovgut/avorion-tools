import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import '@/styles/global.css';
import { router } from '@/app/router';
import { loadLanguage } from '@/i18n';
import { store } from '@/store';

// the saved language is loaded before the first render, so the page does not open in English
loadLanguage(store.getState().settings.lang)
  .catch(() => {
    // a catalog that fails to load leaves the app in English
  })
  .finally(() =>
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StrictMode>,
    ),
  );
