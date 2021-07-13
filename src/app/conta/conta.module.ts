import { ContaService } from './services/conta.service';
import { ContaAppComponent } from './conta.app.component';
import { ContaRoutingModule } from './conta.route';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgValidatorsModule } from '@ng-validators/ng-validators';

@NgModule({
  declarations: [
    CadastroComponent,
    LoginComponent,
    ContaAppComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgValidatorsModule
  ],
  providers: [
    ContaService
  ]
})
export class ContaModule { }
