import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { FlightsComponent } from './flights/flights.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'flights-component', component: FlightsComponent },
  { path: 'checkout-component', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
