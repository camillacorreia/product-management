import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public fornecedores!: Fornecedor[];
  errorMessage!: string;
  public paginaAtual = 1;

  constructor(
    private fornecedorService: FornecedorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.fornecedorService.obterTodos()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores,
        error => this.errorMessage);

    setTimeout(() => this.spinner.hide(), 600);
  }
}
