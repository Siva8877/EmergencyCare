import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital } from 'src/app/demo/api/hospital';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
@Component({
    templateUrl: './blood.availability.component.html',
    providers: [MessageService]
})
export class BloodAvailabilityComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    showBloodRequestDialog: boolean = false;
    selectedHospitalName = '';
    enteredUnits = 0;
    
    filteredHospitalList: any[] = [];
    selectedHospital  = '';
    selectedBloodGroup = '';
    selectedBloodAvailability = 0;
    hospitalBloodDataList: any[] = [];
    bloodAvailabilityList : any[] = [];
    activityValues: number[] = [0, 100];
    tempratureValue: number[] = [90, 110];
    heartBeatValue: number[] = [30, 150];
    respRateValue: number[] = [5, 30];
    oxygenRateValue: number[] = [50, 150];
    hospitalId = '';
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService, public layoutService: LayoutService,
        private service: MessageService, private router: Router) {
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
        this.hospitalService.getBloodAvailabilityList().then(hosBloodData => {
            this.hospitalBloodDataList = hosBloodData;
            this.bloodAvailabilityList = [];
            this.loading = false;
            if (this.hospitalBloodDataList && Array.isArray(this.hospitalBloodDataList)
                && this.hospitalBloodDataList.length) {
                this.hospitalBloodDataList.forEach(hospitalData => {
                    if (hospitalData.facilities && hospitalData.facilities.bloodAvailability && Array.isArray(hospitalData.facilities.bloodAvailability)
                        && hospitalData.facilities.bloodAvailability.length) {
                        const hospitalMapData = hospitalData.facilities.bloodAvailability.map((bloodData : any) => {
                            bloodData['hospitalName'] = hospitalData.name;
                            bloodData['hospitalId'] = hospitalData.hospitalId;
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
    onRequestClick(selectedBlood : any){
        this.showBloodRequestDialog = true;
        this.selectedHospital  = '';
        
        this.enteredUnits = 0;
        this.selectedBloodGroup = selectedBlood.bloodGroup;
    this.selectedBloodAvailability = selectedBlood.AvailableUnit;

        this.selectedHospitalName = selectedBlood.hospitalName;
        this.filteredHospitalList =  this.hospitalBloodDataList.filter((hosObj : any) => {
            return hosObj.hospitalId !== selectedBlood.hospitalId;
        });

    }

    onSendRequestClick(){
        this.showBloodRequestDialog = false;
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Successfully Requested for Blood.' });
        //this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Successfully Requested for Organ.' });
    }
   
}
