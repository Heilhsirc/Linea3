import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/_Modelos/Vehiculo';
import { VehiculoService } from 'src/app/_servicios/vehiculo.service';
import { LoaderService } from 'src/app/_servicios/loader.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  public editarForm:FormGroup;
  public nuevoVehiculo: Vehiculo = new Vehiculo();

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService, 
    private rutaActiva: ActivatedRoute, private router: Router, private window : Location,
    private loader:LoaderService,private interceptorSvc: InterceptorService,
    private snackBar: MatSnackBar) {
      this.editarForm = new FormGroup({
        placa: new FormControl(),
        modelo: new FormControl(),
        marca: new FormControl(),
        tipoVehiculo: new FormControl(),
        capacidad: new FormControl()
      });
    this.editarForm = formBuilder.group({
      placa : ['',[  
      ]],
      modelo : ['',[
      ]],
      marca : ['',[
      ]],
      tipoVehiculo : ['',[
        Validators.required
      ]],
      capacidad : ['',[
        Validators.required
      ]]
    });
   }

  ngOnInit(): void {
    this.loader.progresBarReactive.next(false);
    this.vehiculoService.listarId(this.rutaActiva.snapshot.params.id).subscribe(response =>{
      this.nuevoVehiculo.placa = response.placa;
      this.nuevoVehiculo.marca = response.marca;
      this.nuevoVehiculo.modelo = response.modelo;
      this.nuevoVehiculo.tipoVehiuclo = response.tipoVehiuclo;
      this.nuevoVehiculo.capacidad = response.capacidad;
      this.loader.progresBarReactive.next(true);
    });
  }

  send(){
    let nuevoVehiculo: Vehiculo = new Vehiculo();
   nuevoVehiculo.idVehiculo = this.rutaActiva.snapshot.params.id;
    nuevoVehiculo.placa = ((document.getElementById("placa") as HTMLInputElement).value);
    nuevoVehiculo.modelo = ((document.getElementById("modelo") as HTMLInputElement).value);
    nuevoVehiculo.marca = ((document.getElementById("marca") as HTMLInputElement).value);
    nuevoVehiculo.tipoVehiuclo = ((document.getElementById("tipoVehiculo") as HTMLInputElement).value);
    nuevoVehiculo.capacidad = ((document.getElementById("capacidad") as HTMLInputElement).value);
    //console.log(nuevoVehiculo);
  /*this.vehiculoService.refresh$
    .subscribe(()=>{
      this.edit(nuevoVehiculo);
    });
    this.edit(nuevoVehiculo);*/
    this.vehiculoService.editar(nuevoVehiculo).subscribe(data =>{
      this.openSnackBar("Editado Correctamente");
      this.vehiculoService.refresh.next(true);
      this.router.navigate(['/Vehiculos']);
      this.interceptorSvc.recargar.next(true);
    });
  }

  private edit(nuevoVehiculo: Vehiculo){
    this.vehiculoService.editarObservable(nuevoVehiculo)
    .subscribe(
      (response) =>  {console.log("Vehiculo Actualizado");
      this.editarForm.reset({ placa: '', modelo: '', marca: '', tipoVehiculo: '', capacidad: '' });
      this.router.navigate(['/Vehiculos']);
    },
    error => {alert(error);}
    );
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

