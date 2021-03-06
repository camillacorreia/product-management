import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "../utils/generic-form-validation";

export abstract class FormBaseComponent {

    validationMessages!: ValidationMessages;
    genericValidator!: GenericValidator;
    displayMessage: DisplayMessage = {};

    mudancasNaoSalvas!: boolean;

    protected configurarMensagemDeValidacao(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    protected configurarValidacaoFormularioBase(formInputElements: ElementRef[], formGroup: FormGroup) {
        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.validarFormulario(formGroup);
        });
    }

    protected validarFormulario(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processarMensagens(formGroup);
        this.mudancasNaoSalvas = true;
    }
}
