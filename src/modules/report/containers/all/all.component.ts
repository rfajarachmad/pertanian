import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@modules/auth/services';
import { ModalFormComponent } from '@modules/equipment/components';
import { Equipment } from '@modules/equipment/models';
import { EquipmentService } from '@modules/equipment/services';
import {
    masterCities,
    masterDistricts,
    masterProvinces,
    masterSubDisttricts,
} from '@modules/master/data/master-location-data';
import { Alsintan, City, District, Funding, Province, SubDistrict } from '@modules/master/models';
import { MasterService } from '@modules/master/services';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-all',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './all.component.html',
    styleUrls: ['all.component.scss'],
    providers: [EquipmentService, AuthService],
})
export class AllComponent implements OnInit {
    myForm: FormGroup;
    items!: Equipment[];
    provinces: Province[] = [];
    cities: City[] = [];
    districts: District[] = [];
    sub_districts: SubDistrict[] = [];
    types: Alsintan[] = [];
    fundings: Funding[] = [];
    years: number[] = [];
    role = null;

    constructor(
        public equipmentService: EquipmentService,
        private formBuilder: FormBuilder,
        private masterService: MasterService,
        private modalService: NgbModal,
        private config: NgbModalConfig,
        private authService: AuthService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'lg';
        this.myForm = this.formBuilder.group({
            province_id: '',
            city_id: '',
            district_id: '',
            sub_district_id: '',
            type_id: '',
            year: '',
            funding_id: '',
            condition: '',
        });
    }
    ngOnInit() {
        this.masterService.getActiveAlsintan().subscribe((result: Alsintan[]) => {
            this.types = result;
        });
        this.masterService.getActiveFundings().subscribe((result: Funding[]) => {
            this.fundings = result;
        });
        this._populateYear();
        this._showLoading();
        this.masterService.getProvinces().subscribe(result => {
            this.provinces = result;
            swal.close();
        });
        this.role = this.authService.getLoginUser().role;
    }

    detail(item: Equipment) {
        const modalRef = this.modalService.open(ModalFormComponent, { centered: true });
        (modalRef.componentInstance as ModalFormComponent).data = item;
        (modalRef.componentInstance as ModalFormComponent).source = 'read-only';
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
                    this.submitForm();
                });
            }
        });
    }

    submitForm() {
        this._showLoading();
        this.equipmentService.getVerifiedData(this.myForm.value).subscribe(result => {
            this.items = result;
            swal.close();
        });
    }

    resetForm() {
        this.myForm.reset();
    }

    _populateYear() {
        const d = new Date();
        const n = d.getFullYear();
        this.years = [];
        this.years.push(n);
        this.years.push(n - 1);
        this.years.push(n - 2);
        this.years.push(n - 3);
        this.years.push(n - 4);
        this.years.push(n - 5);
    }

    changeProvince(e: any) {
        console.log(e.target.value);
        this._populateCity(e.target.value);
    }

    changeCity(e: any) {
        console.log(e.target.value);
        this._populateDistrict(e.target.value);
    }

    changeDistrict(e: any) {
        console.log(e.target.value);
        this._populateSubDistrict(e.target.value);
    }

    _populateCity(provId: string) {
        this._showLoading();
        this.masterService.getCities(provId).subscribe((result: City[]) => {
            this.cities = result;
            swal.close();
        });
    }

    _populateDistrict(cityId: string) {
        this._showLoading();
        this.masterService.getDistricts(cityId).subscribe((result: District[]) => {
            this.districts = result;
            swal.close();
        });
    }

    _populateSubDistrict(districtId: string) {
        this._showLoading();
        this.masterService.getSubDistricts(districtId).subscribe((result: SubDistrict[]) => {
            this.sub_districts = result;
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
