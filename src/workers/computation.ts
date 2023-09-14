import {expose} from 'comlink';
import {uniteComponents} from "~utils/transformations/unite-components.ts";
import {computeComponents} from "~utils/computations/price.ts";

const api = {
    uniteComponents,
    computeComponents
};

expose(api);

export type ComputationWorker = typeof api;

self.addEventListener('message', function (e) {
    if (e.data.cmd === 'uniteComponents') {
        const result = uniteComponents(e.data.turretStore, e.data.componentStore);
        self.postMessage(result);
    } else if (e.data.cmd === 'computeComponents') {
        const result = computeComponents(e.data.cargoStore, e.data.turretStore, e.data.componentStore);
        self.postMessage(result);
    }
}, false);