import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/_Modelos/Conductor';
import { Vehiculo } from 'src/app/_Modelos/Vehiculo';
import { ConductorService } from 'src/app/_servicios/conductor.service';
import { VehiculoService } from 'src/app/_servicios/vehiculo.service';


@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.component.html',
  styleUrls: ['./asociados.component.css']
})
export class AsociadosComponent implements OnInit {
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
@ViewChild("VehiculoPaginator") paginator: MatPaginator;
displayedColumns: string[] = ['Nombre', 'Apellido','Telefono','Desasociar'];
dataSource = new MatTableDataSource<any>();
pageSize: number = 5;
cantidad;

  constructor(private conductorSvc: ConductorService,public dialogRef: MatDialogRef<AsociadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehiculo,
    private snackBar: MatSnackBar, private vehiculoSvc: VehiculoService) { }

  ngOnInit(): void {
    this.listar(this.data.idVehiculo);
  }

  listar(id:number){
    this.conductorSvc.listarAsociados(id).subscribe(data =>{
    this.dataSource = data;
    this.cantidad = data.length;
  });
  }
eliminar(id:number, idve:number){
  this.vehiculoSvc.desasociar(id,idve).subscribe(data => {
    this.openSnackBar("Desasociado correctamente");
    this.listar(this.data.idVehiculo);
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
