import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalComponent } from './hospital.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HospitalComponent }
    ])],
    exports: [RouterModule]
})
export class HospitalRoutingModule { }
