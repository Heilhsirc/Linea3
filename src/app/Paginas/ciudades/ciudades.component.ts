import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ciudades } from 'src/app/_Modelos/Ciudades';
import {CiudadesService} from '../../_servicios/ciudades.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/_servicios/loader.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['idDepartamento', 'nDepartamento', 'idCiudad', 'nCiudad'];
  dataSource = new MatTableDataSource<ciudades>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
 }

 constructor(private ciu_service:CiudadesService,private rutaActiva: ActivatedRoute, private loader:LoaderService) {}

    ngOnInit(): void {
      this.loader.progresBarReactive.next(false);
    this.ciu_service.listar_ciudades(this.rutaActiva.snapshot.params.id).subscribe(respuestaLista=>{(this.dataSource.data=respuestaLista);
       this.loader.progresBarReactive.next(true);});
      
  }

}





 

   

