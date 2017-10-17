export interface System {
    name: string;
    monitor: SystemMonitorData;
}

export interface SystemCPUStats {
    load: number;
    temp: number;
}

export interface SystemMemEntry {
    total: number;
    used: number;
}

export interface SystemMemStats extends SystemMemEntry {
    swap: SystemMemEntry;
}

export interface SystemMonitorData {
    cpu: SystemCPUStats;
    memory: SystemMemStats;
}