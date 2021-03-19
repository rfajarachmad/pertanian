import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthGuard } from '@modules/auth/guards';
import { Alsintan } from '@modules/master/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-alsintan-modal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './alsintan-modal.component.html',
    styleUrls: ['alsintan-modal.component.scss'],
})
export class AlsintanModalComponent implements OnInit {
    myForm: FormGroup;
    data?: Alsintan;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
        this.myForm = this.formBuilder.group({
            id: '',
            code: '',
            name: '',
            description: '',
            capacity: '',
            status: '',
        });
    }
    ngOnInit() {
        if (this.data) {
            this.myForm.controls.id.setValue(this.data.id);
            this.myForm.controls.code.setValue(this.data.code);
            this.myForm.controls.name.setValue(this.data.name);
            this.myForm.controls.description.setValue(this.data.description);
            this.myForm.controls.capacity.setValue(this.data.capacity);
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
