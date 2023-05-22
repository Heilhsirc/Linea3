 import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { Alumno } from 'src/app/Modelos/alumno';
import { AlumnoService } from 'src/app/_servicios/alumno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  displayedColumns: string[] = ['NIF', 'nombre', 'Apellido1', 'Apellido2', 'Ver','Editar', 'Eliminar'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(public route: ActivatedRoute, private svcAlumno: AlumnoService,
    private snackBar: MatSnackBar, private interceptorSvc: InterceptorService){

  }

  ngOnInit(): void {
    this.svcAlumno.listar().subscribe(respuestaLista=>{
      (this.dataSource.data=respuestaLista);
      this.interceptorSvc.recargar.subscribe(data =>{
        this.listar();
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id:number){
    this.svcAlumno.eliminar(id).subscribe(data => {
      this.openSnackBar("Eliminado Correctamente");
      this.listar();
    });
  }

  listar(){
    this.svcAlumno.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
