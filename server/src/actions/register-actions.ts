
import { IRegisterableAction, ActionData } from "./base";
import { ActionRegistry } from "./registry";

export type SendDataHandler = (actionData: ActionData) => void;

export const registerActions = (actionRegistry: ActionRegistry, sendDataHandler: SendDataHandler) => {

    const register = (Cls: any, name: string) => {
        const action = new Cls(name) as IRegisterableAction;
        action.onAfterProcessData(sendDataHandler);
        actionRegistry.add(action);
    }

}