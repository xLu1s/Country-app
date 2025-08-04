import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/top-menu/search-input/search-input.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent { }
