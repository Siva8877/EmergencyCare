import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital,OrganAvailability } from 'src/app/demo/api/hospital';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './organ.availability.component.html',
})
export class OrganAvailabilityComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    hospitalDataList: Hospital[] = [];
    organAvailabilityList : any[] = [];
    activityValues: number[] = [0, 100];
    liverSizeRange: number[] = [1, 20];
    liverWeightRange: number[] = [500, 2500];
    heartWeightRange: number[] = [200, 400];
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService,public layoutService: LayoutService) {
    
    }

    ngOnInit() {
        this.hospitalService.getHospitals().then(hospitalData => {
            this.hospitalDataList = hospitalData.data;
            this.organAvailabilityList = [];
            this.loading = false;
            if (this.hospitalDataList && Array.isArray(this.hospitalDataList)
                && this.hospitalDataList.length) {
                this.hospitalDataList.forEach(hospitalData => {
                    if (hospitalData.organAvailability && Array.isArray(hospitalData.organAvailability)
                        && hospitalData.organAvailability.length) {
                        const hospitalMapData = hospitalData.organAvailability.map(organData => {
                            organData['hospitalName'] = hospitalData.name;
                            return organData
                        })
                        if (hospitalMapData) {
                            this.organAvailabilityList = this.organAvailabilityList.concat(hospitalMapData);
                        }
                    }

                });

            }

        });
    }


    ngOnDestroy() {
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
   
}
