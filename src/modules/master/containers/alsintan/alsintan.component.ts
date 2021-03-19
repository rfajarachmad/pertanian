import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlsintanModalComponent } from '@modules/master/components/alsintan-modal/alsintan-modal.component';
import { Alsintan } from '@modules/master/models';
import { MasterService } from '@modules/master/services';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-alsintan',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './alsintan.component.html',
    styleUrls: ['alsintan.component.scss'],
    providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class AlsintanComponent implements OnInit {
    items: Alsintan[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        public masterService: MasterService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'lg';
    }
    ngOnInit() {
        this._populateItems();
    }

    open() {
        const modalRef = this.modalService.open(AlsintanModalComponent, { centered: true });
        modalRef.result
            .then((result: Alsintan) => {
                console.log(result);
                swal.fire({
                    text: 'Loading..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                this.masterService.saveAlsintan(result).subscribe(() => {
                    this._populateItems();
                    swal.close();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    detail(item: Alsintan) {
        const modalRef = this.modalService.open(AlsintanModalComponent, { centered: true });
        (modalRef.componentInstance as AlsintanModalComponent).data = item;
        modalRef.result
            .then((result: Alsintan) => {
                console.log(result);
                swal.fire({
                    text: 'Loading..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                this.masterService.saveAlsintan(result).subscribe(() => {
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
        this.masterService.getAlsintan().subscribe(alsintans => {
            this.items = alsintans;
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
