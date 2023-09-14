import {Metric} from "web-vitals";

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
    const connection = navigator.connection;
    if (!connection) return String();

    const effectiveType = connection.effectiveType;
    if (!effectiveType) return String();

    return effectiveType;
}

export function reportVercelAnalytics(metric: Metric) {
    const analyticsId = import.meta.env.VITE_APP_VERCEL_ANALYTICS_ID;
    if (!analyticsId) {
        return;
    }

    const body: Record<string, string> = {
        dsn: analyticsId,
        id: metric.id,
        page: window.location.pathname,
        href: window.location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
    };

    const blob = new Blob([new URLSearchParams(body).toString()], {
        type: 'application/x-www-form-urlencoded',
    });

    if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, blob);
    } else
        fetch(vitalsUrl, {
            body: blob,
            method: 'POST',
            credentials: 'omit',
            keepalive: true,
        }).then();
}