import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/Modelos/curso';
import { CursosService } from 'src/app/_servicios/cursos.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { environment } from 'src/app/environments/environment';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Creditos', 'Editar', 'Eliminar', 'Ver'];
  dataSource = new MatTableDataSource<Curso>();
  public list:Array<Curso> | undefined;
  public rol : string |undefined;
  constructor(public route: ActivatedRoute, private svcCurso: CursosService,
    private snackBar: MatSnackBar, private interceptorSvc: InterceptorService){

  }

  ngOnInit(): void {
    this.rol = CryptoJS.AES.decrypt(sessionStorage.getItem('Roli')!,environment.CLAVE).toString(CryptoJS.enc.Utf8);
    this.listar();
    this.interceptorSvc.recargar.subscribe(data =>{
      this.listar();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id:number){
    this.svcCurso.eliminar(id).subscribe(data => {
      this.openSnackBar("Eliminado Correctamente");
      this.listar();
    });
  }

  listar(){
    this.svcCurso.listar().subscribe(data =>{
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
