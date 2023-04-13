import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { PatientService } from 'src/app/demo/service/patient.service';
import { Patient } from 'src/app/demo/api/patient';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './patient.component.html',
})
export class PatientComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    patientDataList: Patient[] = [];
    activityValues: number[] = [0, 100];
    tempratureValue: number[] = [90, 110];
    heartBeatValue: number[] = [30, 150];
    respRateValue: number[] = [5, 30];
    oxygenRateValue: number[] = [50, 150];
    @ViewChild('filter') filter!: ElementRef;
    constructor(private patientService: PatientService,public layoutService: LayoutService) {
    
    }

    ngOnInit() {
        this.patientService.getPatients().then(patientData => {
            this.patientDataList = patientData;
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
