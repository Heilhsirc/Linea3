import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/_Modelos/Vehiculo';
import { ConductorService } from 'src/app/_servicios/conductor.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { VehiculoService } from 'src/app/_servicios/vehiculo.service';

@Component({
  selector: 'app-no-asociados',
  templateUrl: './no-asociados.component.html',
  styleUrls: ['./no-asociados.component.css']
})
export class NoAsociadosComponent implements OnInit {
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
@ViewChild("VehiculoPaginator") paginator: MatPaginator;
displayedColumns: string[] = ['Nombre', 'Apellido','Telefono'];
dataSource = new MatTableDataSource<any>();
pageSize: number = 5;
cantidad;
refresh;

  constructor(private conductorSvc: ConductorService,public dialogRef: MatDialogRef<NoAsociadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehiculo,
    private snackBar: MatSnackBar, private vehiculoSvc: VehiculoService, private interceptorSvc: InterceptorService) { }

  ngOnInit(): void {
    this.listar(this.data.idVehiculo);
    //console.log(this.dataSource);
    this.interceptorSvc.recargar.subscribe(data => {
      this.refresh = data;
      this.listar(this.data.idVehiculo);
    });
  }
  listar(id:number){
    this.conductorSvc.listarNoAsociados(id).subscribe(data =>{
    this.dataSource = data;
    this.cantidad = data.length;
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
