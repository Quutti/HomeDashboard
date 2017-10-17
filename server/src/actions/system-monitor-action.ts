
import { BaseRegisterableAction, ActionData } from "./base";
import { System } from "@shared/types";

export class SystemMonitorAction extends BaseRegisterableAction {

    protected _doProcessData(data: System): Promise<ActionData> {
        return Promise.resolve({ action: "system-monitor", data: [data] });
    }

}