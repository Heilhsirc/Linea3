import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Departamentos } from 'src/app/_Modelos/Departamentos';
import {DepartamentosService} from '../../_servicios/departamentos.service';
import {LoaderService} from '../../_servicios/loader.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})

export class DepartamentosComponent implements OnInit,AfterViewInit {
 
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['idDepartamento', 'nombre', 'botones'];
  dataSource = new MatTableDataSource<Departamentos>();

 

  constructor( private dep_service:DepartamentosService, public loader: LoaderService ) { 
  
  
  }

  ngOnInit(): void {
    this.loader.progresBarReactive.next(false);
    this.dep_service.listar_departamentos().subscribe(respuestaLista=>{
      (this.dataSource.data=respuestaLista);
      this.loader.progresBarReactive.next(true);
    });
  }

  x(id:number){
  console.log(id);
  
}
}
