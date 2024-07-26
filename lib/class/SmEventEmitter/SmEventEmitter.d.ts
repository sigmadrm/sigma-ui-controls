import { smListeners } from '../../type';
export default class SmEventEmitter {
    private eventEmitter;
    constructor();
    emit<E extends keyof smListeners>(eventName: E, data: smListeners[E]): void;
    on<E extends keyof smListeners>(event: E, callback: (data: smListeners[E]) => void): void;
}
//# sourceMappingURL=SmEventEmitter.d.ts.map