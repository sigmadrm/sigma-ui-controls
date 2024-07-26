import { EventEmitter } from 'eventemitter3';
import { smEventEmitter, smListeners } from '../../type';

export default class SmEventEmitter {
  private eventEmitter: EventEmitter = new EventEmitter();

  public emit<E extends keyof smListeners>(eventName: E, data: smListeners[E]['data']): boolean {
    return this.eventEmitter.emit(eventName, data);
  }

  public on<E extends keyof smListeners>(event: E, callback: (data: smListeners[E]['data']) => void): void {
    this.eventEmitter.on(event, callback);
  }

  public once<E extends keyof smListeners>(event: E, callback: (data: smListeners[E]['data']) => void): void {
    this.eventEmitter.once(event, callback);
  }

  public off<E extends keyof smListeners>(event: E, callback?: (data: smListeners[E]['data']) => void): void {
    this.eventEmitter.off(event, callback);
  }

  public removeAllListeners<E extends keyof smListeners>(event?: E): void {
    this.eventEmitter.removeAllListeners(event);
  }

  public listeners<E extends keyof smListeners>(event: E): Array<(data: smListeners[E]['data']) => void> {
    return this.eventEmitter.listeners(event);
  }

  public listenerCount<E extends keyof smListeners>(event: E): number {
    return this.eventEmitter.listenerCount(event);
  }
}
