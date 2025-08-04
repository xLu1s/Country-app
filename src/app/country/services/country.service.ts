import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital(query: string) : Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((restCountries) => 
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      catchError((error) => {
        console.error('Error fetching countries by capital:', error);
        return throwError(() => new Error('No existen resultados para la capital proporcionada'));
      })
    );
  }

  searchByCountry(query: string) : Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((restCountries) => 
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        delay(3000), // Simulate network delay
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error('No existen resultados para el país proporcionado'));
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) => 
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      map((countries) => countries[0]), // Return the first country
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error('No existen resultados para el código del país proporcionado ' + code));
      })
    );
  }

}
