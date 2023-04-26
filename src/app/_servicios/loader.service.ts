import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  progresBarReactive = new Subject<Boolean>();

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }
}
