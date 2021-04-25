import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as data from '../data/airports.json';
export interface Airport {
  id: number;
  name: string;
  svg: string;
}
export interface SearchCriteria{
  from_airport: number;
  to_airport: number;
  class: String;
  date: Date;
  adults: number;
  children: number;
  infants: number;
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
  searchForm: FormGroup;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      from_airport: new FormControl('', [Validators.required]),
      to_airport: new FormControl('', [Validators.required]),
      class: new FormControl('1', []),
      date: new FormControl('', [Validators.required]),
      adults: new FormControl('', [Validators.required]),
      children: new FormControl('', [Validators.required]),
      infants: new FormControl('', [Validators.required])
    });
    this.view_from_airports = this.airports;
    this.view_to_airports = this.airports;
  }
  selectFromAirport(value) {
    console.log(value);
  }
  selectToAirport(value) {
    console.log(value);
  }
  search(value: any) {
    if (this.searchForm.valid) {
      console.log(value);
      this.router.navigateByUrl('/flights-component', { state: value});
    }
    else{
      console.log("INVALID",this.searchForm);
    }
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.searchForm.controls[controlName].hasError(errorName);
  }
}
