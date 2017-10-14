import * as express from "express";

import { Request, Response } from "../types";
import { ILogger } from "../logger";
import * as base from "./base";

export interface IRegistry<T> {
    add(action: T): void;
    get(name: string): T;
    getAll(): T[];
}

export class ActionRegistry implements IRegistry<base.IRegisterableAction> {

    private _actions: base.IRegisterableAction[] = [];

    constructor() { }

    public add(action: base.IRegisterableAction): void {
        this._actions.push(action);
    }

    public get(name: string): base.IRegisterableAction {
        for (let action of this._actions) {
            if (action.getName() === name) {
                return action;
            }
        }

        return null;
    }

    public getAll(): base.IRegisterableAction[] {
        return this._actions;
    }

}