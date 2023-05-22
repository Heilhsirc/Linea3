import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/Modelos/alumno';
import { Usuario } from 'src/app/Modelos/usuario';
import { AlumnoService } from 'src/app/_servicios/alumno.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { UsuarioService } from 'src/app/_servicios/usuario.service';

@Component({
  selector: 'app-agregar-alumnos',
  templateUrl: './agregar-alumnos.component.html',
  styleUrls: ['./agregar-alumnos.component.css']
})
export class AgregarAlumnosComponent {
  public registrarForm:FormGroup;
  public list:Array<Alumno> | undefined;


  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private interceptorSvc: InterceptorService,
    private AlumnoSvc: AlumnoService,
    public route: Router,
    private usuarioSvc: UsuarioService){

    this.registrarForm = formBuilder.group({
      nif : ['',[
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]],
      nombre : ['',[
        Validators.minLength(4),
        Validators.maxLength(15)
      ]],
      apellido1 : ['',[
        Validators.required
      ]],
      apellido2 : ['',[
        Validators.required
      ]],
      email : ['',[
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]],
      username : ['',[
        Validators.minLength(4),
        Validators.maxLength(15)
      ]],
      password : ['',[
        Validators.required
      ]],
      celular : ['',[
        Validators.required
      ]],
    });
  }

  ngOnInit(): void {
    this.listar();

    this.interceptorSvc.recargar.subscribe(data =>{
      this.listar();
    });
  }

  send(){
    let nuevoAlumno : Alumno = new Alumno();
    let nuevoUsuario : Usuario = new Usuario();
    nuevoAlumno.nif = ((document.getElementById("nif") as HTMLInputElement).value);
    nuevoAlumno.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    nuevoAlumno.apellido1 = ((document.getElementById("apellido1") as HTMLInputElement).value);
    nuevoAlumno.apellido2 = ((document.getElementById("apellido2") as HTMLInputElement).value);
    
    nuevoUsuario.nombre = nuevoAlumno.nombre;
    nuevoUsuario.email = ((document.getElementById("email") as HTMLInputElement).value);
    nuevoUsuario.username = ((document.getElementById("username") as HTMLInputElement).value);
    nuevoUsuario.password = ((document.getElementById("password") as HTMLInputElement).value);
    nuevoUsuario.celular = ((document.getElementById("celular") as HTMLInputElement).value);
    this.usuarioSvc.guardar(nuevoUsuario).subscribe(data => {
      this.openSnackBar(data.message);
    });
    this.AlumnoSvc.guardar(nuevoAlumno).subscribe(data=>{
      this.route.navigate(['/Alumnos']);
      this.openSnackBar(data.message);
    });
  }

  listar(){
    this.AlumnoSvc.listar().subscribe(data =>{
      this.list = data;
    });
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
