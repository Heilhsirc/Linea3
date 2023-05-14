import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/Modelos/curso';
import { CursosService } from 'src/app/_servicios/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Creditos'];
  dataSource = new MatTableDataSource<Curso>();

  constructor(public route: ActivatedRoute, private svcCurso: CursosService){

  }

  ngOnInit(): void {
    this.svcCurso.listar().subscribe(respuestaLista=>{
      (this.dataSource.data=respuestaLista);
      console.log(this.dataSource)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
