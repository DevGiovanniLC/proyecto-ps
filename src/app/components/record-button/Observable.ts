import { Observer } from './Observer';

export interface Observable {
	notifyObservers(): void;
	addObserver(Observer: Observer): void;
}
