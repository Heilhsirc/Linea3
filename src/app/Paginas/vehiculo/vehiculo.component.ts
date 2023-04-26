import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculoService } from '../../_servicios/vehiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/_Modelos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VehiculosPaginados } from 'src/app/_Modelos/VehiculosPaginado';
import { LoaderService } from 'src/app/_servicios/loader.service';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AsociarComponent } from '../asociar/asociar.component';
import { AsociadosComponent } from '../asociados/asociados.component';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { NoAsociadosComponent } from '../no-asociados/no-asociados.component';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  flag:boolean=false;
  pageSize: number = 5;
  pageIndex: number = 0;
  cantidad: number = 0;
  pageSizeOptions:string[] = ['5','10','20','50'];
  change:boolean=true;
  public placa: string;
  public resultadoDialogo: string;
  refresh;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
@ViewChild("VehiculoPaginator") paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns: string[] = ['Placa','Modelo','Marca','tipoVehiuclo','Capacidad','Editar', 'Asociar','Asociados','NoAsociados'];
dataSource = new MatTableDataSource<Vehiculo>();

  constructor(private vehiculoService : VehiculoService, public route: ActivatedRoute,
              private location: Location, private loader: LoaderService,
              public dialog: MatDialog, private interceptorSvc: InterceptorService) { }

  ngOnInit(): void {
    this.listar();

    this.interceptorSvc.recargar.subscribe(data => {
      this.refresh = data;
      this.listar();
    });
  }

  public cambioPagina(ev: any){
    this.pageSize = ev.pageSize;
    this.pageIndex = ev.pageIndex;
    this.listar();
}

private listar(){
    this.vehiculoService.listarPage(this.pageIndex, this.pageSize).subscribe(data =>{
    this.dataSource = new MatTableDataSource(data.content);
    this.cantidad = data.totalElements;
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id:number): void {
    let vehiculo = new Vehiculo();
    vehiculo.idVehiculo = id;
    //vehiculo.idVehiculo = this.id;
    const dialogRef = this.dialog.open(AsociarComponent, {
      width: '300px',
      data: vehiculo,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultadoDialogo = result;
    });
  }

  openDialog2(id:number): void {
    let vehiculo = new Vehiculo();
    vehiculo.idVehiculo = id;
    const dialogRef = this.dialog.open(AsociadosComponent, {
      width: '300px',
      data: vehiculo,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultadoDialogo = result;
    });
  }

  openDialog3(id:number): void {
    let vehiculo = new Vehiculo();
    vehiculo.idVehiculo = id;
    const dialogRef = this.dialog.open(NoAsociadosComponent, {
      width: '300px',
      data: vehiculo,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultadoDialogo = result;
    });
  }
}