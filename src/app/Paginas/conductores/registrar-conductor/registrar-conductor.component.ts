import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Conductor } from 'src/app/_Modelos/Conductor';
import { ConductorService } from 'src/app/_servicios/conductor.service';
import { LoaderService } from 'src/app/_servicios/loader.service';
import { Router, RouterLink } from '@angular/router';
import { DepartamentosService } from 'src/app/_servicios/departamentos.service';
import { CiudadesService } from 'src/app/_servicios/ciudades.service';
import { Departamentos } from 'src/app/_Modelos/Departamentos';
import { tipoDocumento } from 'src/app/_Modelos/TipoDocumento';
import { ciudades } from 'src/app/_Modelos/Ciudades';
import { Rol } from 'src/app/_Modelos/Rol';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-conductor',
  templateUrl: './registrar-conductor.component.html',
  styleUrls: ['./registrar-conductor.component.css']
})
export class RegistrarConductorComponent implements OnInit {

  public registrarForm:FormGroup;
  public seleccionado;
  public seleccionadoCiudad;
  public seleccionadoRol;
  public ciudades: Array<any>;
  public dept:Array<Departamentos>;

  constructor(private formBuilder: FormBuilder, private vehiculoService: ConductorService, 
    private loader:LoaderService, private route: Router, private interceptorSvc: InterceptorService,
    private departamentosService: DepartamentosService, private ciudadService: CiudadesService,
    private snackBar: MatSnackBar ) {
    this.registrarForm = formBuilder.group({
      nombre : ['',[
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]],
      apellido : ['',[
        Validators.minLength(4),
        Validators.maxLength(15)
      ]],
      nick : ['',[
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]],
      tipoDocumento : ['',[
        
      ]],
      ndocumento : ['',[
        Validators.minLength(5),
        Validators.maxLength(12),
        Validators.required
      ]],
      contrasena :['',[
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.required
      ]],
      estado : ['',[
        
      ]],
      cambioContrasena : ['',[

      ]],
      correo : ['',[
        Validators.pattern('/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/')
      ]],
      celular : ['',[
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.required
      ]],
      nombreEmpresa : ['',[

      ]],
      cargo : ['',[

      ]],
      rol : ['', [

      ]],
      direccion : ['',[

      ]],
      departamento : ['',[

      ]],
      ciudad : ['',[

      ]],
      telefono : ['',[

      ]]
    });
   }

  ngOnInit(): void {
    this.listar();

    this.interceptorSvc.recargar.subscribe(data =>{
      this.listar();
    });
  }

  send(){
    let nuevoConductor : Conductor = new Conductor();
    let dep : Departamentos = new Departamentos();
    let tdocumento : tipoDocumento = new tipoDocumento();
    let ciudad : ciudades = new ciudades();
    let rol : Rol = new Rol();
    rol.idRol = Number(((document.getElementById("rol") as HTMLInputElement).value));;
    rol.nombre = this.seleccionadoRol;
    rol.descripcion = "..." 
    ciudad.idCiudad = Number(((document.getElementById("ciudad") as HTMLInputElement).value));
    ciudad.nombre = this.seleccionadoCiudad;
    tdocumento.idTipoDocumento = 1;
    tdocumento.nombre = "Cedula de ciudadania";
    dep.idDepartamento = Number(((document.getElementById("departamento") as HTMLInputElement).value));
    dep.nombre = this.seleccionado;
    nuevoConductor.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    nuevoConductor.apellido = ((document.getElementById("apellido") as HTMLInputElement).value);
    nuevoConductor.nick = ((document.getElementById("nick") as HTMLInputElement).value);
    nuevoConductor.tipoDocumento = tdocumento;
    nuevoConductor.documento = ((document.getElementById("ndocumento") as HTMLInputElement).value);
    nuevoConductor.clave = ((document.getElementById("contrasena") as HTMLInputElement).value);
    if(((document.getElementById("cambioContrasena") as HTMLInputElement).value)=='true'){
      nuevoConductor.cambioContrasena = true;
    }else{
      nuevoConductor.cambioContrasena = false;
    }
    if(((document.getElementById("estado") as HTMLInputElement).value)=='1'){
      nuevoConductor.estado = true;
    }else{
      nuevoConductor.estado = false;
    }
    nuevoConductor.correo = ((document.getElementById("correo") as HTMLInputElement).value);
    nuevoConductor.celular = ((document.getElementById("celular") as HTMLInputElement).value);
    nuevoConductor.telefono = ((document.getElementById("telefono") as HTMLInputElement).value);
    nuevoConductor.nombreEmpresa = ((document.getElementById("nombreEmpresa") as HTMLInputElement).value);
    nuevoConductor.cargo = ((document.getElementById("cargo") as HTMLInputElement).value);
    nuevoConductor.rol = rol;
    nuevoConductor.direccion = ((document.getElementById("direccion") as HTMLInputElement).value);
    nuevoConductor.departamento = dep;
    nuevoConductor.ciudad = ciudad;
    this.loader.progresBarReactive.next(false);
    this.vehiculoService.guardar(nuevoConductor).subscribe(data=>{
      this.route.navigate(['/Conductores']);
      this.loader.progresBarReactive.next(true);
      this.openSnackBar("Registrado correctamente");
    });
  }

  cargarCiudades(id:number){
      this.ciudadService.listar_ciudades(id).subscribe(data => {
      this.ciudades = data;
      var e = (document.getElementById("departamento")) as HTMLSelectElement;
      var sel = e.selectedIndex;
      var opt = e.options[sel];
      this.seleccionado = (e.options[sel]).text;
      console.log(this.seleccionado);
    });
  }

  selecCiudad(id:number){
    var e = (document.getElementById("ciudad")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    this.seleccionadoCiudad = (e.options[sel]).text;
    console.log(this.seleccionadoCiudad);
  }

  selecRol(){
    var e = (document.getElementById("rol")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    this.seleccionadoRol = (e.options[sel]).text;
    console.log(this.seleccionadoRol);
  }

  listar(){
    this.departamentosService.listar_departamentos().subscribe(data =>{
      this.dept = data;
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