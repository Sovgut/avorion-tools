import * as Comlink from "comlink";
import {ComputationWorker} from "./computation.ts";

export const computationInstanceWorker = new Worker(new URL('./computation.ts', import.meta.url), {type: 'module'});

export const computationWorker = Comlink.wrap<ComputationWorker>(computationInstanceWorker);