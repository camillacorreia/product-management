import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-detalhes',
    templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  enderecoMap: any;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {

    this.fornecedor = this.route.snapshot.data['fornecedor'];

    //url google maps satitized
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?q=${this.EnderecoCompleto()}&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE`);
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => this.spinner.hide(), 600);
  }

  public EnderecoCompleto(): string {
    return `${this.fornecedor.endereco.logradouro}, ${this.fornecedor.endereco.numero} - ${this.fornecedor.endereco.bairro}, ${this.fornecedor.endereco.cidade} - ${this.fornecedor.endereco.estado}`;

  }
}
