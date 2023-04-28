import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BloodRequestComponent } from './blood.request.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BloodRequestComponent }
    ])],
    exports: [RouterModule]
})
export class BloodRequestRoutingModule { }
