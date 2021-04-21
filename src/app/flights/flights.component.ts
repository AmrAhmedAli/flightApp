import { Component, OnInit } from '@angular/core';
import * as data from '../data/trips.json';
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
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flight_head: string;
  flight_date: string;
  trips: Trips[] = data.data;
  view_trips: Trips[];
  constructor() {}

  ngOnInit(): void {
    this.flight_head = 'Cairo to Dubai'; // from home component parameter search
    this.flight_date = 'Saturday, 24 April 2021'; // from home component parameter search
    this.view_trips = this.trips; // we have to filter trips based on the home component search
  }
}
