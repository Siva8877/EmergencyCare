import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital,OrganAvailability } from 'src/app/demo/api/hospital';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    templateUrl: './organ.availability.component.html',
})
export class OrganAvailabilityComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    organList: any[] = [];
    selectedOrgan = 'ALL';
    hospitalDataList: Hospital[] = [];
    organAvailabilityList: any[] = [];
    allOrganAvailabilityList: any[] = [];
    activityValues: number[] = [0, 100];
    liverSizeRange: number[] = [1, 20];
    liverWeightRange: number[] = [500, 2500];
    heartWeightRange: number[] = [200, 400];
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService, public layoutService: LayoutService) {
        this.organList = [
            { name: 'All', code: 'ALL' },
            { name: 'Liver', code: 'Liver' },
            { name: 'Heart', code: 'Heart' }
        ];

    }

    ngOnInit() {
        this.hospitalService.getOrganAvailabilityList().then(hospitalOrganData => {
            this.hospitalDataList = hospitalOrganData;
            this.organAvailabilityList = [];
            this.allOrganAvailabilityList = [];
            this.loading = false;
            if (this.hospitalDataList && Array.isArray(this.hospitalDataList)
                && this.hospitalDataList.length) {
                this.hospitalDataList.forEach(hospitalData => {
                    if (hospitalData.facilities && hospitalData.facilities.organAvailability && Array.isArray(hospitalData.facilities.organAvailability)
                        && hospitalData.facilities.organAvailability.length) {
                        const hospitalMapData = hospitalData.facilities.organAvailability.map(organData => {
                            organData['hospitalName'] = hospitalData.name;
                            return organData
                        })
                        if (hospitalMapData) {
                            this.allOrganAvailabilityList = this.allOrganAvailabilityList.concat(hospitalMapData);
                        }
                    }
                });
            }
            this.organAvailabilityList = this.allOrganAvailabilityList;
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

    onOrganChange(event: any) {
        this.selectedOrgan = event.value;
        if (this.selectedOrgan === 'Liver') {
            this.organAvailabilityList = this.allOrganAvailabilityList.filter(obj => {
                return (obj.liverSize !== undefined && obj.liverSize !== '');
            })
        } else if (this.selectedOrgan === 'Heart') {
            this.organAvailabilityList = this.allOrganAvailabilityList.filter(obj => {
                return (obj.heartWeight !== undefined && obj.heartWeight !== '');
            })
        } else {
            this.organAvailabilityList = this.allOrganAvailabilityList;
        }

    }
   
}
