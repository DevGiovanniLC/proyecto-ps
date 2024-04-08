import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    framerateValue: number = 60;
    resolutionValue: number = 1080;
    delayValue: number = 2;

  constructor() { }
}
