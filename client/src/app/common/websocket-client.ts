
export type SubscriptionHandler = (data: any) => void;

type Subscriptions = { [key: string]: SubscriptionHandler[] };

export class WebSocketClient {

    private _wsClient: WebSocket;
    private _subscriptions: Subscriptions = {};

    constructor(url: string) {
        this._wsClient = new WebSocket(url);
        this._wsClient.onmessage = this._onMessage.bind(this);
    }

    public subscribeAction(action: string, handler: SubscriptionHandler): void {
        // Init array for action name if not yet done
        if (!(action in this._subscriptions)) {
            this._subscriptions[action] = [];
        }

        this._subscriptions[action].push(handler);
    }

    private _onMessage(message: MessageEvent) {
        let parsed;

        try {
            parsed = JSON.parse(message.data);
        } catch (e) {
            /** @todo Proper error handling! */
            throw new Error(e);
        }

        const { action, data } = parsed;
        if ((action as string) in this._subscriptions) {
            this._subscriptions[action].forEach((handler) => handler(data));
        }
    }


}