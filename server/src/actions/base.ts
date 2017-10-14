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

    protected abstract _doProcessData(data: any): Promise<void>;

    public getName(): string {
        return this._name;
    }

    public onAfterProcessData(listener: customEvent.CustomEventListener) {
        this._onAfterProcessData.add(listener);
    }

    public processData(data: any): Promise<void> {
        return this._doProcessData(data)
            .then(() => this._onAfterProcessData.fire());
    }
}