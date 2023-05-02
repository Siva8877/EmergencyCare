import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalDetailComponent } from './hospital.detail.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HospitalDetailComponent }
    ])],
    exports: [RouterModule]
})
export class HospitalDetailRoutingModule { }
