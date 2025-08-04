import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/top-menu/search-input/search-input.component';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { first, firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  capitalResource = rxResource(
  {
    params: () => ( {query: this.query()} ),
    stream: ({params}) => {
      if(!params.query) return of([]);
      return  this.countryService.searchByCapital(params.query)
    }
  })
}
