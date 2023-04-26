import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/_Modelos/Conductor';
import { ConductorService } from 'src/app/_servicios/conductor.service';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from 'src/app/_servicios/loader.service';
import { ActivatedRoute } from '@angular/router';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  flag:boolean=false;
  pageSize: number = 5;
  pageIndex: number = 0;
  cantidad: number = 0;
  pageSizeOptions:string[] = ['5','10','20','50'];
  change:boolean=true;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
@ViewChild("VehiculoPaginator") paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns: string[] = ['nombre','apellido','cedula','estado','direccion','cargo','celular','Editar','Eliminar'];
dataSource = new MatTableDataSource<Conductor>();

  constructor(private conductoresSvc: ConductorService,private loader: LoaderService,public route: ActivatedRoute,
              private interceptorSvc: InterceptorService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();

    this.interceptorSvc.recargar.subscribe(data =>{
      this.listar();
    });
  }

  public cambioPagina(ev: any){
    this.pageSize = ev.pageSize;
    this.pageIndex = ev.pageIndex;
    this.listar();
}

  listar(){
    this.conductoresSvc.listar(this.pageIndex, this.pageSize).subscribe(data =>{
    this.dataSource = new MatTableDataSource(data.content);
    this.cantidad = data.totalElements;
  });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id:number){
    this.conductoresSvc.eliminarConductor(id).subscribe(data => {
      this.openSnackBar("Eliminado Correctamente");
      this.listar();
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
