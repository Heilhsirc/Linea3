import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/Modelos/curso';
import { CursosService } from 'src/app/_servicios/cursos.service';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent {
  public registrarForm:FormGroup;
  public list:Array<Curso> | undefined;
  public eCurso: Curso = new Curso;
  
  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private interceptorSvc: InterceptorService,
    private cursosSvc: CursosService,
    public route: Router,
    private rutaActiva: ActivatedRoute ){

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
    this.cursosSvc.buscar(this.rutaActiva.snapshot.params.id).subscribe(data => {
      this.eCurso.codigo=data.codigo;
      this.eCurso.creditos=data.creditos;
      this.eCurso.nombre=data.nombre;
    });

    this.interceptorSvc.recargar.subscribe(data =>{
      this.listar();
    });
  }

  send(){
    let nuevoConductor : Curso = new Curso();

    nuevoConductor.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    nuevoConductor.codigo = ((document.getElementById("apellido") as HTMLInputElement).value);
    nuevoConductor.creditos = ((document.getElementById("nick") as HTMLInputElement).value);

    this.cursosSvc.editar(nuevoConductor, this.rutaActiva.snapshot.params.id).subscribe(data=>{
      this.route.navigate(['/Cursos']);
      this.interceptorSvc.recargar.next(true);
      this.openSnackBar(data.message);
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
