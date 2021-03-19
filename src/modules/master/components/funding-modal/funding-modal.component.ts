import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alsintan } from '@modules/master/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-funding-modal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './funding-modal.component.html',
    styleUrls: ['funding-modal.component.scss'],
})
export class FundingModalComponent implements OnInit {
    myForm: FormGroup;
    data?: Alsintan;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
        this.myForm = this.formBuilder.group({
            id: '',
            code: '',
            name: '',
            description: '',
            status: '',
        });
    }
    ngOnInit() {
        if (this.data) {
            this.myForm.controls.id.setValue(this.data.id);
            this.myForm.controls.code.setValue(this.data.code);
            this.myForm.controls.name.setValue(this.data.name);
            this.myForm.controls.description.setValue(this.data.description);
            this.myForm.controls.status.setValue(this.data.status);
        }
    }
    submitForm() {
        this.activeModal.close(this.myForm.value);
    }

    close() {
        this.activeModal.dismiss();
    }
}
