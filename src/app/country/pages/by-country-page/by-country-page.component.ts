import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/top-menu/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { 
  countryService = inject(CountryService);
  query = signal('');

  countryResources = rxResource(
  {
    params: () => ( {query: this.query()} ),
    stream: ({params}) => {
      if(!params.query) return of([]);
      return  this.countryService.searchByCountry(params.query)
    }
  })
}
