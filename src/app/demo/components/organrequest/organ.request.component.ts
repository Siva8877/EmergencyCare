import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital } from 'src/app/demo/api/hospital';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './organ.request.component.html',
})
export class OrganRequestComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    showBloodRequestDialog: boolean = false;
    selectedHospitalName = '';
    enteredUnits = 0;
    
    filteredHospitalList: any[] = [];
    selectedHospital  = '';
    selectedBloodGroup = '';
    selectedBloodAvailability = 0;
    hospitalBloodDataList: any[] = [];
    organRequestData: any[] = [];
    organAvailabilityList : any[] = [];
    activityValues: number[] = [0, 100];
    tempratureValue: number[] = [90, 110];
    heartBeatValue: number[] = [30, 150];
    respRateValue: number[] = [5, 30];
    oxygenRateValue: number[] = [50, 150];
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService,public layoutService: LayoutService) {
    
    }

    ngOnInit() {

        this.hospitalService.getOrganRequestList().then(organReqData => {
            this.organRequestData = organReqData;
            this.organAvailabilityList = [];
            this.loading = false;
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
