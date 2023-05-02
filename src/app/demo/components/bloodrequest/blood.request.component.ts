import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital } from 'src/app/demo/api/hospital';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
@Component({
    templateUrl: './blood.request.component.html',
})
export class BloodRequestComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    showBloodRequestDialog: boolean = false;
    selectedHospitalName = '';
    enteredUnits = 0;
    
    filteredHospitalList: any[] = [];
    selectedHospital  = '';
    selectedBloodGroup = '';
    selectedBloodAvailability = 0;
    hospitalBloodDataList: any[] = [];
    bloodRequestData: any[] = [];
    bloodRequestList : any[] = [];
    bloodRequestFilterList : any[] = [];
    activityValues: number[] = [0, 100];
    tempratureValue: number[] = [90, 110];
    heartBeatValue: number[] = [30, 150];
    respRateValue: number[] = [5, 30];
    oxygenRateValue: number[] = [50, 150];
    hospitalId = '';
    @ViewChild('filter') filter!: ElementRef;
    menuItems: MenuItem[];

    activeItem: MenuItem;
    constructor(private hospitalService: HospitalService, public layoutService: LayoutService,
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

        this.menuItems = [
            { label: 'Request Sent',id : '0'},
            { label: 'Request Received',id : '1' }
        ];
        this.activeItem = this.menuItems[0];
    }

    ngOnInit() {

        this.hospitalService.getBloodRequestList(this.hospitalId).then(bloodReqData => {
            this.bloodRequestData = bloodReqData;
            this.bloodRequestList = this.bloodRequestData;
            this.bloodRequestFilterList = [];
            if (this.hospitalId) {
                this.bloodRequestFilterList = this.bloodRequestList.filter(obj => obj.requestedByHosId === this.hospitalId);
            } else {
                this.bloodRequestFilterList = this.bloodRequestList;
            }
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

    onActiveItemChange(event: any) {
        this.activeItem = event;
        if (event.id === "0") {
            this.bloodRequestFilterList = this.bloodRequestList.filter(obj => obj.requestedByHosId === this.hospitalId);
        } else if (event.id === "1") {
            this.bloodRequestFilterList = this.bloodRequestList.filter(obj => obj.requestedToHosId === this.hospitalId);
        }
    }
   
}
