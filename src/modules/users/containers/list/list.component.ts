import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserModalComponent } from '@modules/users/components';
import { User } from '@modules/users/models';
import { UsersService } from '@modules/users/services';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-list',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './list.component.html',
    styleUrls: ['list.component.scss'],
    providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class ListComponent implements OnInit {
    items: User[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        public userService: UsersService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'lg';
    }
    ngOnInit() {
        this._populateItems();
    }

    open() {
        const modalRef = this.modalService.open(UserModalComponent, { centered: true });
        modalRef.result
            .then((result: User) => {
                console.log(result);
                this._showLoading();
                this.userService.save(result).subscribe(() => {
                    this._populateItems();
                    swal.close();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    detail(item: User) {
        const modalRef = this.modalService.open(UserModalComponent, { centered: true });
        (modalRef.componentInstance as UserModalComponent).data = item;
        modalRef.result
            .then((result: User) => {
                console.log(result);
                this._showLoading();
                this.userService.save(result).subscribe(() => {
                    this._populateItems();
                    swal.close();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    _populateItems() {
        this._showLoading();
        this.userService.list().subscribe(users => {
            this.items = users;
            swal.close();
        });
    }

    _showLoading() {
        swal.fire({
            text: 'Loading..',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    }
}
