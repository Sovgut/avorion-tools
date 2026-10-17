import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/store';
import { uiActions } from '@/store/ui';

export const goodPath = (id: string) => `/database/commodities/${encodeURIComponent(id)}`;
export const stationPath = (id: string) => `/database/stations/${encodeURIComponent(id)}`;
export const consumerPath = (id: string) => `/database/consumers/${encodeURIComponent(id)}`;

/** Navigation shortcuts that also close the search overlay. */
export function useGo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMemo(() => {
    const go = (path: string) => {
      dispatch(uiActions.setSearchOpen(false));
      navigate(path);
    };
    return {
      good: (id: string) => go(goodPath(id)),
      station: (id: string) => go(stationPath(id)),
      consumer: (id: string) => go(consumerPath(id)),
      to: go,
    };
  }, [navigate, dispatch]);
}
