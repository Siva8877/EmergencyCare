import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital } from 'src/app/demo/api/hospital';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
    templateUrl: './blood.availability.component.html',
    providers: [MessageService]
})
export class BloodAvailabilityComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    showBloodRequestDialog: boolean = false;
    selectedHospitalName = '';
    selectedHospitalID = '';
    enteredUnits = 0;
    
    filteredHospitalList: any[] = [];
    selectedHospital  = '';
    requestedByHospitalName  = '';
    selectedBloodGroup = '';
    selectedBloodId = '';
    
    selectedBloodAvailability = 0;
    hospitalBloodDataList: any[] = [];
    bloodAvailabilityList : any[] = [];
    bloodAvailabilMyHosList : any[] = [];
    bloodAvailabilFilterList : any[] = [];
    activityValues: number[] = [0, 100];
    tempratureValue: number[] = [90, 110];
    heartBeatValue: number[] = [30, 150];
    respRateValue: number[] = [5, 30];
    oxygenRateValue: number[] = [50, 150];
    hospitalId = '';
    menuItems: MenuItem[];

    activeItem: MenuItem;
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
        this.menuItems = [
            { label: 'My Hospital',id : '0'},
            { label: 'Other Hospital',id : '1' }
        ];
        this.activeItem = this.menuItems[0];
    }

    ngOnInit() {
        this.hospitalService.getBloodAvailabilityList().then(hosBloodData => {
            this.hospitalBloodDataList = hosBloodData;
            this.bloodAvailabilityList = [];
            this.bloodAvailabilMyHosList = [];
            this.bloodAvailabilFilterList = [];
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
            if (this.hospitalId) {
                this.bloodAvailabilFilterList = this.bloodAvailabilityList.filter(obj => obj.hospitalId === this.hospitalId);
            } else {
                this.bloodAvailabilFilterList = this.bloodAvailabilityList;
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
    onRequestClick(selectedBlood: any) {
        this.showBloodRequestDialog = true;
        this.selectedHospital = '';

        this.enteredUnits = 0;
        this.selectedBloodGroup = selectedBlood.bloodGroup;
        this.selectedBloodId = selectedBlood.bloodGroupID;
        this.selectedBloodAvailability = selectedBlood.AvailableUnit;
        this.selectedHospitalID = selectedBlood.hospitalId;
        this.selectedHospitalName = selectedBlood.hospitalName;
        this.filteredHospitalList = this.hospitalBloodDataList.filter((hosObj: any) => {
            return hosObj.hospitalId !== selectedBlood.hospitalId;
        });

        if (this.hospitalId) {
            this.requestedByHospitalName = this.hospitalBloodDataList.find((hosObj: any) => {
                return hosObj.hospitalId === this.hospitalId;
            }).name;
        }

    }

    onSendRequestClick() {
        let bloodRequest: any = {};
        if (this.selectedBloodId && this.enteredUnits && this.selectedHospitalID && (this.hospitalId || this.selectedHospital)) {
            bloodRequest.bloodGroupID = this.selectedBloodId;
            bloodRequest.requestedByHosId = this.hospitalId || this.selectedHospital;
            bloodRequest.requestedToHosId = this.selectedHospitalID;
            bloodRequest.requestedUnit = this.enteredUnits;

            this.hospitalService.sendBloodRequest(bloodRequest).then(bloodResponseData => {
                if (bloodResponseData && bloodResponseData.status === 200) {
                    this.showBloodRequestDialog = false;
                    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Successfully Requested for Blood.' });

                } else {
                    this.showBloodRequestDialog = false;
                    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Error while sending request for Blood.' });
                }
            });
        } else {
            this.service.add({ key: 'tst', severity: 'error', summary: 'Enter All Details', detail: 'Enter all details to sending request for Blood.' });
        }
    }

    onActiveItemChange(event: any){
        this.activeItem = event;
        if (event.id === '0') {
            this.bloodAvailabilFilterList = this.bloodAvailabilityList.filter(obj => obj.hospitalId === this.hospitalId);
        } else if (event.id === '1') {
            this.bloodAvailabilFilterList = this.bloodAvailabilityList.filter(obj => obj.hospitalId !== this.hospitalId);
        }
    }
   
}
