import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConductorService } from 'src/app/_servicios/conductor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/_Modelos/Conductor';
import { VehiculoService } from 'src/app/_servicios/vehiculo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehiculo } from 'src/app/_Modelos/Vehiculo';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.css']
})
export class AsociarComponent implements OnInit {
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }  
  @ViewChild("VehiculoPaginator") paginator: MatPaginator;

  constructor(private conductorSvc: ConductorService, private vehiculoSvc: VehiculoService,
              public dialogRef: MatDialogRef<AsociarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Vehiculo,
              private snackBar: MatSnackBar) { }
  displayedColumns: string[] = ['nombre', 'apellido'];
  dataSource = new MatTableDataSource<Conductor>();  
  clickedRows : Conductor;
  pageSize: number = 5;
  pageIndex: number = 0;
  cantidad: number = 0;
  clickedRows2 = new Set<Conductor>();

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.conductorSvc.listar(this.pageIndex, this.pageSize).subscribe(data =>{
    this.dataSource = data.content;
    this.cantidad = data.totalElements;
  });
  }

  public cambioPagina(ev: any){
    this.pageSize = ev.pageSize;
    this.pageIndex = ev.pageIndex;
    this.listar();
}

  Asociar(x1,x2){
    console.log(this.clickedRows);
    this.vehiculoSvc.asociarVehiculo(x1,x2).subscribe(data => {
      this.openSnackBar("Asociado correctamente");
    });
    this.dialogRef.close();
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
