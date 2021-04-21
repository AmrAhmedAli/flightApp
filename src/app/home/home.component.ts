import { Component, OnInit } from '@angular/core';
import * as data from '../data/airports.json';
export interface Airport {
  id: number;
  name: string;
  svg: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  airports: Airport[] = data.data;
  view_from_airports: Airport[];
  view_to_airports: Airport[];
  search_from_null: boolean = false;
  search_to_null: boolean = false;
  selected: string = '1';
  tabIndex: number = 1;
  constructor() {}

  ngOnInit(): void {
    this.view_from_airports = this.airports;
    this.view_to_airports = this.airports;
  }
  onFromKey(value) {
    this.view_from_airports = this.search(value);
    if (this.view_from_airports.length == 0) this.search_from_null = true;
    else this.search_from_null = false;
  }
  onToKey(value) {
    this.view_to_airports = this.search(value);
    if (this.view_to_airports.length == 0) this.search_to_null = true;
    else this.search_to_null = false;
  }
  selectFromAirport(value) {
    console.log(value);
  }
  selectToAirport(value) {
    console.log(value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    return this.airports.filter((option) =>
      option.name.toLocaleLowerCase().includes(filter)
    );
  }
}
