import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LineaIII';

  public rol : string | undefined;

  constructor(){

  }

  ngOnInit(){
    this.rol = sessionStorage.getItem('Rol') as string;
  }

  close(){

  }
}
