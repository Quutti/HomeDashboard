import { System } from "@shared/types";
import { SYSTEMS_RECEIVED } from "../types";

export const receivedSystems = (instances: System[]) => {
    return {
        type: SYSTEMS_RECEIVED,
        instances
    }
}