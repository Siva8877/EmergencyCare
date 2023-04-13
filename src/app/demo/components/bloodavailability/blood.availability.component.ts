import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital } from 'src/app/demo/api/hospital';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './blood.availability.component.html',
})
export class BloodAvailabilityComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    hospitalDataList: Hospital[] = [];
    bloodAvailabilityList : any[] = [];
    activityValues: number[] = [0, 100];
    tempratureValue: number[] = [90, 110];
    heartBeatValue: number[] = [30, 150];
    respRateValue: number[] = [5, 30];
    oxygenRateValue: number[] = [50, 150];
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService,public layoutService: LayoutService) {
    
    }

    ngOnInit() {
        this.hospitalService.getHospitals().then(hospitalData => {
            this.hospitalDataList = hospitalData.data;
            this.bloodAvailabilityList = [];
            this.loading = false;
            if (this.hospitalDataList && Array.isArray(this.hospitalDataList)
                && this.hospitalDataList.length) {
                this.hospitalDataList.forEach(hospitalData => {
                    if (hospitalData.bloodAvailability && Array.isArray(hospitalData.bloodAvailability)
                        && hospitalData.bloodAvailability.length) {
                        const hospitalMapData = hospitalData.bloodAvailability.map(bloodData => {
                            bloodData['hospitalName'] = hospitalData.name;
                            return bloodData
                        })
                        if (hospitalMapData) {
                            this.bloodAvailabilityList = this.bloodAvailabilityList.concat(hospitalMapData);
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
