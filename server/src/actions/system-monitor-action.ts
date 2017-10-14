
import { BaseRegisterableAction, ActionData } from "./base";

interface CPUStats {
    load: number;
    temp: number;
}

interface Mem {
    total: number;
    used: number;
}

interface MemStats extends Mem {
    swap: Mem;
}

export interface SystemMonitorData {
    cpu: CPUStats;
    memory: MemStats;
}


export class SystemMonitorAction extends BaseRegisterableAction {

    protected _doProcessData(data: SystemMonitorData): Promise<ActionData> {
        return Promise.resolve({ action: "system-monitor", data });
    }

}