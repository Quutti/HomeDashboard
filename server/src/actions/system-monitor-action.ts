
import { BaseRegisterableAction, ActionData } from "./base";
import { System } from "@shared/types";
import { SchemaValidator } from "@shared/type-validation";
import { SYSTEM_SCHEMA } from "@shared/type-validation-schemas/system";

export class SystemMonitorAction extends BaseRegisterableAction {

    protected _doProcessData(data: System): Promise<ActionData> {
        const sv = new SchemaValidator(data, SYSTEM_SCHEMA);
        const res = sv.validate();

        if (res.errors.length) {
            return Promise.reject({
                statusCode: 400,
                payload: { messages: res.errors }
            });
        }

        return Promise.resolve({
            action: "system-monitor",
            data: [data]
        });
    }

}