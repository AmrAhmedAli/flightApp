import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as data from '../data/trips.json';
import * as airports from '../data/airports.json';
import { Airport, SearchCriteria } from '../home/home.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingDetails } from '../flights/flights.component';
export interface Trips {
  id: number;
  from_id: number;
  from_airport: string;
  from_name: string;
  to_id: number;
  to_airport: string;
  to_name: string;
  date: string;
  from_time: string;
  to_time: string;
  duration: string;
  economy_price: string;
  business_price: string;
  first_price: string;
  plane: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  [x: string]: any;
  flight_head: string;
  flight_date: string;
  trips: Trips[] = data.data;
  airports: Airport[] = airports.data;
  view_trips: Trips[];
  searchCriteria: SearchCriteria;
  bookingDetails: BookingDetails = <BookingDetails>{};
  basicForm: FormGroup;
  
  constructor( private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.basicForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      salutation: new FormControl('', [Validators.required])
    });
    // this.bookingDetails.trip = <Trips>{};
    // this.bookingDetails.searchCriteria = <SearchCriteria>{};
    // this.bookingDetails.
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data => { this.bookingDetails = data });
    console.log("Booking Summary", this.bookingDetails);
    
    // var from_airport = this.airports.find(element => element.id === this.searchCriteria.from_airport);
    // var to_airport = this.airports.find(element => element.id === this.searchCriteria.to_airport);
    // this.flight_head = from_airport.name + ' to ' + to_airport.name; // from home component parameter search
    // this.flight_date = this.searchCriteria.date.toDateString(); // from home component parameter search
    // this.view_trips = this.trips.filter(element => (element.from_id === from_airport.id && element.to_id === to_airport.id)); // we have to filter trips based on the home component search  
  }
  checkout(value:any):void{
    if (this.basicForm.valid) {
      console.log(value);
      document.getElementById("success-message").classList.remove('display-none');
      document.getElementsByClassName("booking-summary")[0].classList.add('display-none');
      document.getElementsByClassName("basic-details")[0].classList.add('display-none');
    }
    else{
      console.log("INVALID",this.basicForm);
    }
  }

}
