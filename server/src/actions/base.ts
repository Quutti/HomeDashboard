import * as customEvent from "../custom-event";

export interface IRegisterableAction {
    getName(): string;
    onAfterProcessData(listener: customEvent.CustomEventListener): void;
    processData(data: any): Promise<void>;
}

export abstract class BaseRegisterableAction implements IRegisterableAction {

    private _name: string;
    private _onAfterProcessData = new customEvent.CustomEvent();

    constructor(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public onAfterProcessData(listener: customEvent.CustomEventListener) {
        this._onAfterProcessData.add(listener);
    }

    public abstract processData(data: any): Promise<void>;
}