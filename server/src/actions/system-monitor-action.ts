
import { BaseRegisterableAction, ActionData } from "./base";

interface CPUStats {
    load: number[];
    cores: number;
    temp: number;
}

interface MemStats {
    max: number;
    used: number;
    swap: MemStats;
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