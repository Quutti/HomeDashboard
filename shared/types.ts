export interface System {
    name: string;
    monitor: SystemMonitorData;
}

export interface SystemCPUStats {
    load: number;
    temp: number;
}

export interface SystemAmountEntry {
    total: number;
    used: number;
}

export interface SystemMemStats extends SystemAmountEntry {
    swap: SystemAmountEntry;
}

export interface SystemMonitorData {
    cpu: SystemCPUStats;
    memory: SystemMemStats;
    storage: SystemAmountEntry;
    uptime: number;
}