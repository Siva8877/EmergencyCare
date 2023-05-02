import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { BloodAvailability,Hospital,OrganAvailability,Facilities } from 'src/app/demo/api/hospital';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FacilityMaster } from 'src/app/demo/api/facilityMaster';
import { MasterService } from 'src/app/demo/service/master.service';
@Component({
    templateUrl: './hospital.detail.component.html',
    providers: [MessageService]
})
export class HospitalDetailComponent implements OnInit {

    loading: boolean = true;
    showOrganRequestDialog: boolean = false;
    
    organList: any[] = [];
    selectedOrgan = 'ALL';
    selectedHospitalName = '';
    submitted: boolean = false;
    hospitalDataList: any[] = [];
    hospitalData :Hospital = {};
    filteredHospitalList: any[] = [];
    selectedHospital  = '';
    selectedTab  = 0;
    facilitiesDetails: any;
    facilityMaster: FacilityMaster[] = [];
    organAvailabilityList: any[] = [];
    allOrganAvailabilityList: any[] = [];
    activityValues: number[] = [0, 100];
    liverSizeRange: number[] = [1, 20];
    liverWeightRange: number[] = [500, 2500];
    heartWeightRange: number[] = [200, 400];
    hospitalId = '';
    @ViewChild('filter') filter!: ElementRef;
    constructor(private masterService: MasterService,private hospitalService: HospitalService, public layoutService: LayoutService, private service: MessageService, private router: Router) {
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
    }

    ngOnInit() {
        this.hospitalService.getMyHospitalDetail(this.hospitalId).then(hospitalData => {
            // this.hospitalDataListData = hospitalData;
            this.hospitalData = hospitalData;
            this.facilitiesDetails = this.hospitalData.facilities || {};
            this.loading = false;
        });

        this.masterService.getFacilityMaster().then(facilityData => {
            this.facilityMaster = facilityData;
            this.loading = false;
        });
    }

}
