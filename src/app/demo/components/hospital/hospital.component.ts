import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { FacilityMaster } from 'src/app/demo/api/facilityMaster';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { MasterService } from 'src/app/demo/service/master.service';
import { HospitalService } from 'src/app/demo/service/hospital.service';
import { Product } from 'src/app/demo/api/product';
import { Hospital,BloodAvailability } from 'src/app/demo/api/hospital';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './hospital.component.html',
})
export class HospitalComponent implements OnInit, OnDestroy {

    customers1: Customer[] = [];
    selectedCustomers1: Customer[] = [];
    loading: boolean = true;
    newHospitalDialog : boolean = false;
    representatives: Representative[] = [];
    facilityMaster: FacilityMaster[] = [];
    hospitalDataList: Hospital[] = [];
    hospitalDataListData: any = {};
    statuses: any[] = [];
    hospitalData : Hospital = {};
    submitted: boolean = false;
    activityValues: number[] = [0, 100];
    routeItems : any[] = [];
    @ViewChild('filter') filter!: ElementRef;
    constructor(private hospitalService: HospitalService, private masterService : MasterService,private customerService: CustomerService,public layoutService: LayoutService) {
    
    }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });

        this.masterService.getFacilityMaster().then(facilityData => {
            this.facilityMaster = facilityData;
            this.loading = false;
        });

        this.hospitalService.getHospitalsV1().then(hospitalData => {
            // this.hospitalDataListData = hospitalData;
            this.hospitalDataList = hospitalData;
            this.loading = false;
        });
        

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
        this.routeItems = [
            { label: 'Blood Availability', value: 'blood' },
            { label: 'Organ Availability', value: 'organ' }
        ];
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
    openNew(){
        this.newHospitalDialog = true;
        this.hospitalData = {};
        this.submitted = false;
    }

    hideDialog() {
        this.newHospitalDialog = false;
        this.submitted = false;
    }

    saveHospital() {
        this.submitted = true;
        this.hospitalData.id = this.createId();
        this.hospitalDataList.push(this.hospitalData);
        this.hospitalDataListData.data = this.hospitalDataList;
        this.newHospitalDialog = false;
        
        
        this.hospitalData = {};
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
