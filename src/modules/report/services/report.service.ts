import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from '@modules/equipment/models';
import { MasterService } from '@modules/master/services';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { dummyReportConditions } from '../data/dummy-data-report-conditions';
import { dummyReportCoverages } from '../data/dummy-data-report-coverage';
import { dummyReportFundings } from '../data/dummy-data-report-fundings';
import { FundingSearchParameter, ReportCondition, ReportCoverage, ReportFunding } from '../models';

@Injectable()
export class ReportService {
    constructor(private masterService: MasterService, private http: HttpClient) {}

    getReport$(): Observable<{}> {
        return of({});
    }

    getData(): Equipment[] {
        const arrayStr = window.sessionStorage.getItem('data');
        let obj: Equipment[] = [];
        if (arrayStr) {
            obj = JSON.parse(arrayStr);
        }
        return obj;
    }

    findFinding(parameter: any): Observable<ReportFunding[]> {
        return this.http
            .post<ReportFunding[]>(environment.api + '/reports/fundings', parameter)
            .pipe(
                map((items: ReportFunding[]) => {
                    items.forEach(item => {
                        this._getDetail(item);
                    });
                    return items;
                })
            );
    }

    findCondition(parameter: any): Observable<ReportCondition[]> {
        return this.http
            .post<ReportCondition[]>(environment.api + '/reports/conditions', parameter)
            .pipe(
                map((items: ReportCondition[]) => {
                    items.forEach(item => {
                        this._getDetail(item);
                    });
                    return items;
                })
            );
    }

    findCoverage(parameter: any): Observable<ReportCoverage[]> {
        return this.http
            .post<ReportCoverage[]>(environment.api + '/reports/coverages', parameter)
            .pipe(
                map((items: ReportCoverage[]) => {
                    items.forEach(item => {
                        this._getDetail(item);
                    });
                    return items;
                })
            );
    }

    _getDetail(item: any): any {
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
