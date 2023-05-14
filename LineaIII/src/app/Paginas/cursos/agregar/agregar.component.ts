import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelos/curso';
import { CursosService } from 'src/app/_servicios/cursos.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  public registrarForm:FormGroup;
  public list:Array<Curso> | undefined;
  
  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private interceptorSvc: InterceptorService,
    private cursosSvc: CursosService,
    public route: Router){

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
    let nuevoConductor : Curso = new Curso();

    nuevoConductor.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    nuevoConductor.codigo = ((document.getElementById("apellido") as HTMLInputElement).value);
    nuevoConductor.creditos = ((document.getElementById("nick") as HTMLInputElement).value);

    this.cursosSvc.guardar(nuevoConductor).subscribe(data=>{
      this.route.navigate(['/Cursos']);
      this.openSnackBar("Registrado correctamente");
    });
  }

  listar(){
    this.cursosSvc.listar().subscribe(data =>{
      this.list = data;
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
