import { smListeners } from '../../type';
export default class SmEventEmitter {
    private eventEmitter;
    emit<E extends keyof smListeners>(eventName: E, data: smListeners[E]['data']): boolean;
    on<E extends keyof smListeners>(event: E, callback: (data: smListeners[E]['data']) => void): void;
    once<E extends keyof smListeners>(event: E, callback: (data: smListeners[E]['data']) => void): void;
    off<E extends keyof smListeners>(event: E, callback?: (data: smListeners[E]['data']) => void): void;
    removeAllListeners<E extends keyof smListeners>(event?: E): void;
    listeners<E extends keyof smListeners>(event: E): Array<(data: smListeners[E]['data']) => void>;
    listenerCount<E extends keyof smListeners>(event: E): number;
}
//# sourceMappingURL=SmEventEmitter.d.ts.map