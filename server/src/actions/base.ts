import * as customEvent from "../custom-event";

export interface IRegisterableAction {
    getName(): string;
    onAfterProcessData(listener: customEvent.CustomEventListener<ActionData>): void;
    processData(data: any): Promise<void>;
}

export interface ActionData {
    action: string;
    data: any;
}

export abstract class BaseRegisterableAction implements IRegisterableAction {

    private _name: string;
    private _onAfterProcessData = new customEvent.CustomEvent();

    constructor(name: string) {
        this._name = name;
    }

    protected abstract _doProcessData(data: any): Promise<ActionData>;

    public getName(): string {
        return this._name;
    }

    public onAfterProcessData(listener: customEvent.CustomEventListener<ActionData>) {
        this._onAfterProcessData.add(listener);
    }

    public processData(data: any): Promise<void> {
        return this._doProcessData(data)
            .then((actionData) => this._onAfterProcessData.fire(actionData));
    }
}