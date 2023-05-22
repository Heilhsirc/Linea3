import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/Modelos/alumno';
import { Curso } from 'src/app/Modelos/curso';
import { AlumnoService } from 'src/app/_servicios/alumno.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';

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
    public route: Router){

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

    nuevoAlumno.nif = ((document.getElementById("nif") as HTMLInputElement).value);
    nuevoAlumno.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    nuevoAlumno.apellido1 = ((document.getElementById("apellido1") as HTMLInputElement).value);
    nuevoAlumno.apellido2 = ((document.getElementById("apellido2") as HTMLInputElement).value);

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
