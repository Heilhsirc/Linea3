import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/Modelos/alumno';
import { AlumnoService } from 'src/app/_servicios/alumno.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent {
  public registrarForm:FormGroup;
  public list:Array<Alumno> | undefined;
  public eAlumno: Alumno = new Alumno;

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private interceptorSvc: InterceptorService,
    private AlumnoSvc: AlumnoService,
    public route: Router,
    public rutaActiva: ActivatedRoute ){

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
    this.AlumnoSvc.buscar(this.rutaActiva.snapshot.params.id).subscribe(data => {
      this.eAlumno.nif=data.nif;
      this.eAlumno.nombre=data.nombre;
      this.eAlumno.apellido1=data.apellido1;
      this.eAlumno.apellido2=data.apellido2;
    });
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
