import { ISmEventEmitter, SmListeners } from '../../type';
export default class SmEventEmitter implements ISmEventEmitter {
    private eventEmitter;
    on<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
    once<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
    removeAllListeners<E extends keyof SmListeners>(event?: E): void;
    off<E extends keyof SmListeners, Context = undefined>(event: E, listener?: SmListeners[E], context?: Context, once?: boolean): void;
    listeners<E extends keyof SmListeners>(event: E): SmListeners[E][];
    emit<E extends keyof SmListeners>(event: E, name: E, eventObject: Parameters<SmListeners[E]>[1]): boolean;
    trigger<E extends keyof SmListeners>(event: E, eventObject: Parameters<SmListeners[E]>[1]): boolean;
    listenerCount<E extends keyof SmListeners>(event: E): number;
}
//# sourceMappingURL=SmEventEmitter.d.ts.map