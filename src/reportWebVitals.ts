import {onCLS, onFCP, onFID, onLCP, onTTFB, ReportCallback} from 'web-vitals';

export const reportWebVitals = (onPerfEntry: ReportCallback) => {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
};