import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Fornecedor } from '../models/fornecedor';
import { CepConsulta, Endereco } from '../models/endereco';
import { BaseService } from 'src/app/services/base.services';

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Fornecedor[]> {
      return this.http
        .get<Fornecedor[]>(`${environment.baseUrl}/fornecedores`)
        .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Fornecedor> {
      return this.http
        .get<Fornecedor>(`${environment.baseUrl}/fornecedores/${id}`, super.ObterAuthHeaderJson() )
        .pipe(catchError(super.serviceError));
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
      return this.http
        .post(`${environment.baseUrl}/fornecedores`, fornecedor, this.ObterAuthHeaderJson())
        .pipe(
          map(super.extractData),
          catchError(super.serviceError));
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
      return this.http
        .put(`${environment.baseUrl}/fornecedores/${fornecedor.id}`, fornecedor, super.ObterAuthHeaderJson())
        .pipe(
          map(super.extractData),
          catchError(super.serviceError));
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
      return this.http
        .delete(`${environment.baseUrl}/fornecedores/${id}`, super.ObterAuthHeaderJson())
        .pipe(
          map(super.extractData),
          catchError(super.serviceError));
    }

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
      return this.http
        .put(`${environment.baseUrl}/fornecedores/${endereco.id}`, endereco, super.ObterAuthHeaderJson())
        .pipe(
          map(super.extractData),
          catchError(super.serviceError));
    }

    consultarCep(cep: string): Observable<CepConsulta> {
      return this.http
        .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(catchError(super.serviceError))
    }
}
