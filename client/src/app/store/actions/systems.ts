
import { SYSTEMS_RECEIVED } from "../types";

export const receivedSystems = (instances) => {
    return {
        type: SYSTEMS_RECEIVED,
        instances
    }
}