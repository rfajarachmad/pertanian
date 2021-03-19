import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { MasterService } from '@modules/master/services';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { dummyEquipments } from '../data/equipment-data';
import { Equipment } from '../models';

@Injectable()
export class EquipmentService {
    constructor(
        public authService: AuthService,
        public masterService: MasterService,
        private http: HttpClient
    ) {
        if (!window.sessionStorage.getItem('data')) {
            window.sessionStorage.setItem('data', JSON.stringify(dummyEquipments));
        }
    }

    getEquipment$(): Observable<{}> {
        return of({});
    }

    save(data: Equipment): Observable<Equipment> {
        if (!data.id) {
            // const id: number = Math.floor(Math.random() * 100) + 1;
            // data.id = id;
            data.status = 'Menunggu Verifikasi';
            data.reg_no = Math.floor(Date.now() / 1000).toString();
            data.created_by = this.authService.getLoginUser().id;
            data.createdByName = this.authService.getLoginUser().name;

            return this.http.post<Equipment>(environment.api + '/equipments', data);
        } else {
            return this.http.put<Equipment>(environment.api + '/equipments/' + data.id, {
                id: data.id,
                province_id: data.province_id,
                city_id: data.city_id,
                district_id: data.district_id,
                sub_district_id: data.sub_district_id,
                loc_addr_detail: data.loc_addr_detail,
                reg_no: data.reg_no,
                type_id: data.type_id,
                year: data.year,
                funding_id: data.funding_id,
                condition: data.condition,
                owner: data.owner,
                ownership: data.ownership,
                land_area: data.land_area,
                note: data.note,
                status: data.status,
                created_by: data.created_by,
                verified_by: data.verified_by,
                report: data.report,
                report_name: data.report_name,
            });
        }
        // const arrayStr = window.sessionStorage.getItem('data');
        // let obj: Equipment[] = [];
        // let existing = false;
        // if (arrayStr) {
        //     obj = JSON.parse(arrayStr);
        //     const index = obj.findIndex(item => item.id === data.id);
        //     if (index > -1) {
        //         obj.splice(index, 1);
        //         existing = true;
        //     }
        //     obj.push(data);
        // } else {
        //     obj.push(data);
        // }
        // window.sessionStorage.setItem('data', JSON.stringify(obj));
    }

    getMyData(): Observable<Equipment[]> {
        const login = this.authService.getLoginUser();
        return this.http
            .get<Equipment[]>(environment.api + '/equipments?created_by=' + login.id)
            .pipe(
                map((items: Equipment[]) => {
                    items.forEach(item => {
                        this._getDetail(item);
                    });
                    return items;
                })
            );
    }

    getVerificationData(): Observable<Equipment[]> {
        return this.http
            .get<Equipment[]>(environment.api + '/equipments?status=Menunggu Verifikasi')
            .pipe(
                map((items: Equipment[]) => {
                    items.forEach(item => {
                        this._getDetail(item);
                    });
                    return items;
                })
            );
    }

    getVerifiedData(param: any): Observable<Equipment[]> {
        return this.http.post<Equipment[]>(environment.api + '/reports/ownership', param).pipe(
            map((items: Equipment[]) => {
                items.forEach(item => {
                    this._getDetail(item);
                });
                return items;
            })
        );
    }

    delete(id: number): Observable<{}> {
        return this.http.delete<{}>(environment.api + '/equipments/' + id);
    }

    findByStatus(status: string): Observable<Equipment[]> {
        return this.http
            .get<Equipment[]>(environment.api + '/reports/submission?status=' + status)
            .pipe(
                map((items: Equipment[]) => {
                    items.forEach(item => {
                        this._getDetail(item);
                    });
                    return items;
                })
            );
    }

    getSubmissionStatusPct(): Observable<{}> {
        const arrayStr = window.sessionStorage.getItem('data');
        let obj: Equipment[] = [];
        let result = {};
        if (arrayStr) {
            obj = JSON.parse(arrayStr);
            const totalData = obj.length;
            let verified = 0;
            let waiting = 0;
            let rejected = 0;
            obj.forEach((item: Equipment) => {
                if (item.status === 'Menunggu Verifikasi') {
                    waiting++;
                }
                if (item.status === 'Terverifikasi') {
                    verified++;
                }
                if (item.status === 'Ditolak') {
                    rejected++;
                }
            });
            result = {
                waiting: (waiting / totalData) * 100,
                verified: (verified / totalData) * 100,
                rejected: (rejected / totalData) * 100,
            };
        }
        return of(result);
    }

    _getDetail(item: Equipment): Equipment {
        this.masterService._getProvince(item.province_id).subscribe(name => {
            item.province = name;
        });
        this.masterService._getCity(item.city_id).subscribe(name => {
            item.city = name;
        });
        this.masterService._getDistrict(item.district_id).subscribe(name => {
            item.district = name;
        });
        this.masterService._getSubDistrict(item.sub_district_id).subscribe(name => {
            item.sub_district = name;
        });
        this.masterService.getAlsintanNameByCode(item.type_id).subscribe(name => {
            item.type = name;
        });
        this.masterService.getFundingNameByCode(item.funding_id).subscribe(name => {
            item.funding = name;
        });

        return item;
    }
}
