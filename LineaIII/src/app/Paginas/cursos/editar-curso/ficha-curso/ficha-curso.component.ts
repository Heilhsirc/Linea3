import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/Modelos/curso';
import { CursosService } from 'src/app/_servicios/cursos.service';

@Component({
  selector: 'app-ficha-curso',
  templateUrl: './ficha-curso.component.html',
  styleUrls: ['./ficha-curso.component.css']
})
export class FichaCursoComponent {

  public cursoInformation : Curso = new Curso;
  constructor(private cursosSvc: CursosService,
              public route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.cursosSvc.buscar(this.route.snapshot.params.id).subscribe(data =>{
      (this.cursoInformation = data)
    });
  }

}
