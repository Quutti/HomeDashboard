
export type CustomEventListener = () => void;

export class CustomEvent {

    private _listeners = new Map<number, CustomEventListener>();
    private _lastHandle = 0;

    public add(listener: CustomEventListener): number {
        const handle = this._lastHandle++;
        this._listeners.set(handle, listener);
        return handle;
    }

    public remove(handle: number) {
        this._listeners.delete(handle);
    }

    public fire() {
        this._listeners.forEach((listener) => listener());
    }

}