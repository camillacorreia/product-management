import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fromEvent, merge, Observable, of, scheduled } from 'rxjs';

import { ContaService } from '../services/conta.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';
import { rangeLength } from '@ng-validators/ng-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] | undefined;

  errors: any[] = [];

  loginForm: FormGroup = this.fb.group({});
  usuario: Usuario = this.loginForm.value;

  validationMessages: ValidationMessages = {};
  geneticValidator: GenericValidator = new GenericValidator(this.validationMessages);
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router, private toastr: ToastrService) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    }

    this.geneticValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, rangeLength([6, 15])]]
    })

  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = (this.formInputElements as any)
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.geneticValidator.processarMensagens(this.loginForm);
    });

  }

  login() {

    if (this.loginForm.dirty && this.loginForm.valid){

      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario)
      .subscribe(
        sucesso => this.processarSucesso(sucesso),
        falha => this.processarFalha(falha)
      );

    }

  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!')

    if(toast){
      toast.onHidden
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(')
  }

}
