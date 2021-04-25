import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as data from '../data/trips.json';
import * as airports from '../data/airports.json';
import { Airport, SearchCriteria } from '../home/home.component';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
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
export interface BookingDetails{
  searchCriteria: SearchCriteria;
  trip: Trips;
  class: String;
  ticketPrice: String;
  adultsTotal: String;
  childrenTotal: String;
  infantsTotal: String;
  totalPrice: String;

}
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  [x: string]: any;
  flight_head: string;
  flight_date: string;
  trips: Trips[] = data.data;
  airports: Airport[] = airports.data;
  view_trips: Trips[];
  searchCriteria: SearchCriteria;
  bookingDetails: BookingDetails;
  constructor( private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data => { this.searchCriteria = data });
    console.log("Search Criteria", this.searchCriteria);
    
    var from_airport = this.airports.find(element => element.id === this.searchCriteria.from_airport);
    var to_airport = this.airports.find(element => element.id === this.searchCriteria.to_airport);
    this.flight_head = from_airport.name + ' to ' + to_airport.name; // from home component parameter search
    this.flight_date = this.searchCriteria.date.toDateString(); // from home component parameter search
    this.view_trips = this.trips.filter(element => (element.from_id === from_airport.id && element.to_id === to_airport.id)); // we have to filter trips based on the home component search  
  }
  goToCheckout(tripId:any, classFlag:any):void{
    this.bookingDetails = <BookingDetails>{};
    this.bookingDetails.searchCriteria = this.searchCriteria;
    this.bookingDetails.trip = this.trips.find(element => element.id === tripId);
    this.bookingDetails.class = classFlag;
    switch(classFlag){
      case "Economy": this.bookingDetails.ticketPrice = this.bookingDetails.trip.economy_price; break;
      case "Business": this.bookingDetails.ticketPrice = this.bookingDetails.trip.business_price; break;
      case "First": this.bookingDetails.ticketPrice = this.bookingDetails.trip.first_price; break;
    }
    this.bookingDetails.adultsTotal = (parseFloat(this.bookingDetails.searchCriteria.adults.toString()) * Number.parseFloat(this.bookingDetails.ticketPrice.toString())) + "";
    this.bookingDetails.childrenTotal = (parseFloat(this.bookingDetails.searchCriteria.children.toString()) * Number.parseFloat(this.bookingDetails.ticketPrice.toString()) * 0.7) + "";
    this.bookingDetails.infantsTotal = (parseFloat(this.bookingDetails.searchCriteria.infants.toString()) * Number.parseFloat(this.bookingDetails.ticketPrice.toString()) * 0.5) + "";
    this.bookingDetails.totalPrice = (parseFloat(this.bookingDetails.adultsTotal.toString()) + parseFloat(this.bookingDetails.childrenTotal.toString()) + parseFloat(this.bookingDetails.infantsTotal.toString())) + "";
    this.router.navigateByUrl('/checkout-component', { state: this.bookingDetails});
  }
}
