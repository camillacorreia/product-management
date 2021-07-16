import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { environment } from 'src/environments/environment';
import { ProdutoBaseComponent } from '../produto.base.component';
import { ProdutoService } from '../services/produto.service';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoBaseComponent implements OnInit {

    imagens: string = environment.imagensUrl;

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

    imageBase64: any;
    imagePreview: any;
    imageName!: string;
    originalImageSrc!: string;

    constructor(private fb: FormBuilder, private produtoService: ProdutoService,
        private router: Router, private route: ActivatedRoute, private toastr: ToastrService)
    {
        super();
        this.produto = this.route.snapshot.data['produto'];
    }

    ngOnInit(): void {

        this.produtoService.obterFornecedores()
            .subscribe(fornecedores => this.fornecedores = fornecedores);

        this.produtoForm = this.fb.group({
            fornecedorId: ['', [Validators.required]],
            nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
            descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
            imagem: [''],
            valor: ['', [Validators.required]],
            ativo: [0]
        });

        this.produtoForm.patchValue({
            fornecedorId: this.produto.fornecedorId,
            id: this.produto.id,
            nome: this.produto.nome,
            descricao: this.produto.descricao,
            ativo: this.produto.ativo,
            valor: CurrencyUtils.DecimalToString(this.produto.valor)
        });

        //para que quando submeter o formulário, o Angular possa gerenciar o estado dessa imagem, usando [src] no html
        this.originalImageSrc = this.imagens + this.produto.imagem;
    }

    ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
    }

    editarProduto() {
        if (this.produtoForm.dirty && this.produtoForm.valid) {
            this.produto = Object.assign({}, this.produto, this.produtoForm.value);

            if(this.imageBase64) {
                this.produto.imagemUpload = this.imageBase64;
                this.produto.imagem = this.imageName;
            }
            this.produto.valor = CurrencyUtils.StringToDecimal(this.produto.valor); //convertendo de string para numero formatado

            this.produtoService.atualizarProduto(this.produto)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso) },
                    falha => { this.processarFalha(falha) }
                );

            this.mudancasNaoSalvas = false;
        }
    }

    processarSucesso(response: any) {
        this.produtoForm.reset();
        this.errors = [];

        let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/produtos/listar-todos']);
            });
        }
    }

    processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    upload(file: any) {
        this.imageName = file[0].name;

        var reader = new FileReader();
        reader.onload = this.manipularReader.bind(this);
        reader.readAsBinaryString(file[0]);
    }

    manipularReader(readerEvent: any) {
        var binaryString = readerEvent.target.result;
        this.imageBase64 = btoa(binaryString);
        this.imagePreview = "data:image/jpeg;base64," + this.imageBase64;
    }
}
