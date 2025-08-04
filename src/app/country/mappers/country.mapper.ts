import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

function countryCodeToFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export class CountryMapper {

    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        return {
            cca2: restCountry.cca2,
            flag: countryCodeToFlagEmoji(restCountry.cca2),
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common || restCountry.name.common,
            capital: restCountry.capital.join(","),
            population: restCountry.population,
            region: restCountry.region,
            subregion: restCountry.subregion
        };
    }

    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }

}