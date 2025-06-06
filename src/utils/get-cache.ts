import { CACHE_PREVIOUS_VERSION, CACHE_VERSION } from "~constants/common";

type Cache = 'checkbox' | 'cargo' | 'lang' | 'theme' | 'tabs' | 'blueprints' | 'turrets' | 'components';

export function getCurrentCacheKey(cache: Cache): string {
    return `cache:${CACHE_VERSION}:${cache}`;
}

export function getPreviousCacheKey(cache: Cache): string {
    return `cache:${CACHE_PREVIOUS_VERSION}:${cache}`;
}
