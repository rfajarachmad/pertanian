import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Equipment } from '@modules/equipment/models';
import { ReportService } from '@modules/report/services';

@Component({
    selector: 'sb-distribution',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './distribution.component.html',
    styleUrls: ['distribution.component.scss'],
    providers: [ReportService],
})
export class DistributionComponent implements OnInit {
    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
    @ViewChild('htmlContainer') htmlContainer!: ElementRef;

    zoom = 12;
    width = '100%';
    height = '500px';
    center!: google.maps.LatLngLiteral;

    markers: any[] = [];

    infoContent = '';

    constructor(private reportService: ReportService) {}
    ngOnInit() {
        this.center = {
            lat: -6.8168237,
            lng: 107.1425442,
        };

        const data = this.reportService.getData();
        data.forEach((item: Equipment) => {
            // this.markers.push({
            //     position: {
            //         lat: item.location.lat,
            //         lng: item.location.lng,
            //     },
            //     info:
            //         item.type +
            //         `</br> luas:` +
            //         item.land_area +
            //         `</br>` +
            //         item.location.district +
            //         ' ' +
            //         item.location.sub_district +
            //         `</br> rt/rw: ` +
            //         item.address_detail +
            //         `</br> kondisi: ` +
            //         item.condition,
            // });
        });
    }

    openInfo(marker: MapMarker, content: any) {
        this.htmlContainer.nativeElement.innerHTML = content;
        this.info.open(marker);
    }
}

// -6.816852, 107.143211
