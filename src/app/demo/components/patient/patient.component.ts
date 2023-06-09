import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { PatientService } from 'src/app/demo/service/patient.service';
import { Patient } from 'src/app/demo/api/patient';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
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
    hospitalId = '';
    @ViewChild('filter') filter!: ElementRef;
    constructor(private patientService: PatientService, public layoutService: LayoutService,
        private router: Router) {
        if (localStorage.getItem('userId') && localStorage.getItem('role') === 'admin' && localStorage.getItem('hospitalId')) {
            this.hospitalId = localStorage.getItem('hospitalId') || '';
        } else if (localStorage.getItem('userId') && localStorage.getItem('role') === 'superadmin') {
            this.hospitalId = '';
        } else {
            localStorage.setItem('userId', '');
            localStorage.setItem('password', '');
            localStorage.setItem('role', '');
            localStorage.setItem('name', '');
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.patientService.getPatients(this.hospitalId).then(patientData => {
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
