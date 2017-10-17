
import { System } from "@shared/types";

export interface ROOTState {
    systems: SystemState;
}

// Systems

export const SYSTEMS_RECEIVED = "SYSTEMS_RECEIVED";

export interface SystemState {
    instances: System[];
}