import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  progresBarReactive = new Subject<Boolean>();
  public toolBarReactiva = new Subject<boolean>();
  public logeed = new Subject<Boolean>();
  public rol = new Subject<string>();
  public recargar = new Subject<Boolean>();
  constructor() { }
}
