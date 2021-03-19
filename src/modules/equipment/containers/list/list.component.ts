import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalFormComponent } from '@modules/equipment/components';
import { Equipment } from '@modules/equipment/models';
import { EquipmentService } from '@modules/equipment/services';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-list',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './list.component.html',
    styleUrls: ['list.component.scss'],
    providers: [NgbModalConfig, NgbModal, EquipmentService],
})
export class ListComponent implements OnInit {
    items: Equipment[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private equipmentService: EquipmentService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'lg';
        config.container = '#modal-container';
    }
    ngOnInit() {
        this._populateGrid(null);
    }

    open() {
        const modalRef = this.modalService.open(ModalFormComponent, { centered: true });
        (modalRef.componentInstance as ModalFormComponent).source = 'entry';
        modalRef.result
            .then((result: Equipment) => {
                this._showLoading();
                this.equipmentService.save(result).subscribe(result => {
                    swal.close();
                    swal.fire({
                        icon: 'success',
                        title: 'Data berhasil disimpan',
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    this._populateGrid(result);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    detail(item: Equipment) {
        const modalRef = this.modalService.open(ModalFormComponent, { centered: true });
        (modalRef.componentInstance as ModalFormComponent).data = item;
        (modalRef.componentInstance as ModalFormComponent).source = 'entry';
        modalRef.result
            .then((result: Equipment) => {
                console.log(result);
                this.equipmentService.save(result).subscribe(result => {
                    this._populateGrid(result);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    _populateGrid(data: any) {
        this._showLoading();
        this.equipmentService.getMyData().subscribe((result: Equipment[]) => {
            this.items = result;
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
