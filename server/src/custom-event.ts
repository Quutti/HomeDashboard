
export type CustomEventListener<T> = (data: T) => void;

export class CustomEvent<T> {

    private _listeners = new Map<number, CustomEventListener<T>>();
    private _lastHandle = 0;

    public add(listener: CustomEventListener<T>): number {
        const handle = this._lastHandle++;
        this._listeners.set(handle, listener);
        return handle;
    }

    public remove(handle: number) {
        this._listeners.delete(handle);
    }

    public fire(data?: T) {
        this._listeners.forEach((listener) => listener(data));
    }

}