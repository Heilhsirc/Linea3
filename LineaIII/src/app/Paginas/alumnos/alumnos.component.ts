 import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { Alumno } from 'src/app/Modelos/alumno';
import { AlumnoService } from 'src/app/_servicios/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  displayedColumns: string[] = ['NIF', 'nombre', 'Apellido1', 'Apellido2', 'Ver'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(public route: ActivatedRoute, private svcAlumno: AlumnoService){

  }

  ngOnInit(): void {
    this.svcAlumno.listar().subscribe(respuestaLista=>{
      (this.dataSource.data=respuestaLista);
      console.log(this.dataSource)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
