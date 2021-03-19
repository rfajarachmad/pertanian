import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { ModalFormComponent } from '@modules/equipment/components';
import { Equipment } from '@modules/equipment/models';
import { EquipmentService } from '@modules/equipment/services';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-verification',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './verification.component.html',
    styleUrls: ['verification.component.scss'],
    providers: [NgbModalConfig, NgbModal, EquipmentService],
})
export class VerificationComponent implements OnInit {
    items: Equipment[] = [];
    role: null;

    constructor(
        public activeModal: NgbActiveModal,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        private equipmentService: EquipmentService,
        public authenticationService: AuthService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'lg';
    }
    ngOnInit() {
        this._populateGrid();
        this.role = this.authenticationService.getLoginUser().role;
    }

    detail(item: Equipment) {
        const modalRef = this.modalService.open(ModalFormComponent, { centered: true });
        (modalRef.componentInstance as ModalFormComponent).data = item;
        (modalRef.componentInstance as ModalFormComponent).source = 'verification';
        modalRef.result
            .then((result: Equipment) => {
                console.log(result);
                swal.fire({
                    text: 'Loading..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                result.verified_by = this.authenticationService.getLoginUser().id;
                result.verifiedByName = this.authenticationService.getLoginUser().name;
                this.equipmentService.save(result).subscribe(() => {
                    swal.fire({
                        icon: 'success',
                        title: 'Data berhasil disimpan',
                        showConfirmButton: false,
                        timer: 5000,
                    });
                    this._populateGrid();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    delete(item: Equipment) {
        swal.fire({
            text: 'Apakah anda yakin ingin menghapus alsin ' + item.reg_no + ' ?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
        }).then(result => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.equipmentService.delete(item.id).subscribe(() => {
                    swal.fire('Data berhasil dihapus', '', 'success');
                    this._populateGrid();
                });
            }
        });
    }

    _populateGrid() {
        swal.fire({
            text: 'Loading..',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        this.equipmentService.getVerificationData().subscribe(result => {
            this.items = result;
            swal.close();
        });
    }
}
