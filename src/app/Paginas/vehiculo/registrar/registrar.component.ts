import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Vehiculo } from 'src/app/_Modelos/Vehiculo';
import { VehiculoService } from 'src/app/_servicios/vehiculo.service';
import { LoaderService } from 'src/app/_servicios/loader.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public registrarForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService, 
    private loader:LoaderService, private route: Router,
    private snackBar: MatSnackBar) {
    this.registrarForm = formBuilder.group({
      placa : ['',[
        Validators.required,
        Validators.pattern('[a-z-A-Z-]{4}[0-9]{3}|[a-z-A-Z-]{4}[0-9]{2}[a-zA-Z]'),
      ]],
      modelo : ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
      ]],
      marca : ['',[
        Validators.required
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
    
  }

  send(){
    let nuevoVehiculo: Vehiculo = new Vehiculo();
    nuevoVehiculo.placa = ((document.getElementById("placa") as HTMLInputElement).value);
    nuevoVehiculo.modelo = ((document.getElementById("modelo") as HTMLInputElement).value);
    nuevoVehiculo.marca = ((document.getElementById("marca") as HTMLInputElement).value);
    nuevoVehiculo.tipoVehiuclo = ((document.getElementById("tipoVehiculo") as HTMLInputElement).value);
    nuevoVehiculo.capacidad = ((document.getElementById("capacidad") as HTMLInputElement).value);
    console.log(nuevoVehiculo);
    this.loader.progresBarReactive.next(false);
    this.vehiculoService.guardar(nuevoVehiculo).subscribe(data =>{
      this.openSnackBar("Registrado Correctamente");
      this.route.navigate(['/Vehiculos']);
      this.loader.progresBarReactive.next(true);
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
