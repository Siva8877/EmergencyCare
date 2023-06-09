import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital,OrganAvailability } from 'src/app/demo/api/hospital';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
    templateUrl: './organ.availability.component.html',
    providers: [MessageService]
})
export class OrganAvailabilityComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    showOrganRequestDialog: boolean = false;
    
    organList: any[] = [];
    selectedOrgan = 'ALL';
    selectedHospitalName = '';
    
    hospitalDataList: any[] = [];
    filteredHospitalList: any[] = [];
    selectedHospital  = '';
    selectedTab  = 0;
    organAvailabilityList: any[] = [];
    allOrganAvailabilityList: any[] = [];
    activityValues: number[] = [0, 100];
    liverSizeRange: number[] = [1, 20];
    liverWeightRange: number[] = [500, 2500];
    heartWeightRange: number[] = [200, 400];
    hospitalId = '';
    menuItems: MenuItem[];

    activeItem: MenuItem;
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService, public layoutService: LayoutService, private service: MessageService, private router: Router) {
        this.organList = [
            { name: 'All', code: 'ALL' },
            { name: 'Liver', code: 'Liver' },
            { name: 'Heart', code: 'Heart' }
        ];

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
                        const hospitalMapData = hospitalData.facilities.organAvailability.map((organData: any) => {
                            organData['hospitalName'] = hospitalData.name;
                            organData['hospitalId'] = hospitalData.hospitalId;
                            return organData
                        })
                        if (hospitalMapData) {
                            this.allOrganAvailabilityList = this.allOrganAvailabilityList.concat(hospitalMapData);
                        }
                    }
                });
            }
            
            if(this.hospitalId){
                
                this.activeItem = this.menuItems[0];
                this.selectedTab = 0;
                this.organAvailabilityList = this.allOrganAvailabilityList.filter(obj=> obj.hospitalId === this.hospitalId);
            }else{
                this.organAvailabilityList = this.allOrganAvailabilityList;
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
        if(this.hospitalId){
            if(this.selectedTab === 0){
                this.organAvailabilityList = this.organAvailabilityList.filter(obj=> obj.hospitalId === this.hospitalId);

            }else if(this.selectedTab === 1){
                this.organAvailabilityList = this.organAvailabilityList.filter(obj=> obj.hospitalId !== this.hospitalId);

            }
        }

    }

    onRequestClick(donorAvailability : any){
        this.selectedHospital  = '';
        this.showOrganRequestDialog = true;
        this.selectedHospitalName = donorAvailability.hospitalName;
        this.filteredHospitalList =  this.hospitalDataList.filter((hosObj) => {
            return hosObj.hospitalId !== donorAvailability.hospitalId;
        });
    }

    onSendRequestClick(){
        this.showOrganRequestDialog = false;
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Successfully Requested for Organ.' });
    }


    onActiveItemChange(event: any) {
        this.selectedOrgan = 'ALL';
        this.activeItem = event;
        if (event.id === '0') {
            this.selectedTab = 0;
            this.organAvailabilityList = this.allOrganAvailabilityList.filter(obj=> obj.hospitalId === this.hospitalId);
        } else if (event.id === '1') {
            this.selectedTab = 1;
            this.organAvailabilityList = this.allOrganAvailabilityList.filter(obj=> obj.hospitalId !== this.hospitalId);
        }
    }
}
