import { EventEmitter } from 'eventemitter3';
import { ISmEventEmitter, SmListeners } from '../../type';

export default class SmEventEmitter implements ISmEventEmitter {
  private eventEmitter: EventEmitter = new EventEmitter();
  on<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void {
    this.eventEmitter.on(event, listener, context);
  }
  once<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void {
    this.eventEmitter.once(event, listener, context);
  }
  removeAllListeners<E extends keyof SmListeners>(event?: E): void {
    this.eventEmitter.removeAllListeners(event);
  }
  off<E extends keyof SmListeners, Context = undefined>(
    event: E,
    listener?: SmListeners[E],
    context?: Context,
    once?: boolean,
  ): void {
    this.eventEmitter.off(event, listener, context, once);
  }
  listeners<E extends keyof SmListeners>(event: E): SmListeners[E][] {
    return this.eventEmitter.listeners(event);
  }
  emit<E extends keyof SmListeners>(event: E, name: E, eventObject: Parameters<SmListeners[E]>[1]): boolean {
    return this.eventEmitter.emit(event, name, eventObject);
  }
  trigger<E extends keyof SmListeners>(event: E, eventObject: Parameters<SmListeners[E]>[1]): boolean {
    return this.emit(event, event, eventObject);
  }
  listenerCount<E extends keyof SmListeners>(event: E): number {
    return this.eventEmitter.listenerCount(event);
  }
}
