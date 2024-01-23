import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoGstBillingTableComponent } from './no-gst-billing-table/no-gst-billing-table.component';
import { BillingTableComponent } from './billing-table/billing-table.component';

const routes: Routes = [
  {
    path: 'no-gst',
    component: NoGstBillingTableComponent,
  },
  {
    path: '',
    component: BillingTableComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
