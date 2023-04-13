import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BloodAvailabilityComponent } from './blood.availability.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BloodAvailabilityComponent }
    ])],
    exports: [RouterModule]
})
export class BloodAvailabilityRoutingModule { }
