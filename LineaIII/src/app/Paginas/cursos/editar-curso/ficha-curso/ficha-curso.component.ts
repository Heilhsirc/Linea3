import { Component } from '@angular/core';
import { CursosService } from 'src/app/_servicios/cursos.service';

@Component({
  selector: 'app-ficha-curso',
  templateUrl: './ficha-curso.component.html',
  styleUrls: ['./ficha-curso.component.css']
})
export class FichaCursoComponent {

  constructor(private cursosSvc: CursosService){

  }

  ngOnInit(): void {

  }

}
