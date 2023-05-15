import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/Modelos/alumno';
import { Curso } from 'src/app/Modelos/curso';
import { CursosService } from 'src/app/_servicios/cursos.service';

@Component({
  selector: 'app-ficha-usuario',
  templateUrl: './ficha-usuario.component.html',
  styleUrls: ['./ficha-usuario.component.css']
})
export class FichaUsuarioComponent {

  displayedColumns: string[] = ['Nombre', 'Codigo', 'Ver'];
  dataSource = new MatTableDataSource<Curso>();
  public list:Array<Curso> | undefined;

  constructor(public route: ActivatedRoute, private svcCurso: CursosService,
    public router: Router){

  }

  ngOnInit(): void {
    this.svcCurso.listaCursos(this.route.snapshot.params.id).subscribe(respuestaLista=>{
      (this.dataSource.data=respuestaLista);
      console.log(this.dataSource)
    });

    console.log(this.route.children.length);
  }

}
