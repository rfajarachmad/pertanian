import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@modules/users/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-user-modal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-modal.component.html',
    styleUrls: ['user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
    myForm: FormGroup;
    data?: User;

    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
        this.myForm = this.formBuilder.group({
            id: '',
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            role: '',
            status: '',
        });
    }
    ngOnInit() {
        if (this.data) {
            this.myForm.controls.id.setValue(this.data.id);
            this.myForm.controls.name.setValue(this.data.name);
            this.myForm.controls.email.setValue(this.data.email);
            this.myForm.controls.password.setValue(this.data.password);
            this.myForm.controls.confirm_password.setValue(this.data.confirm_password);
            this.myForm.controls.role.setValue(this.data.role);
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
