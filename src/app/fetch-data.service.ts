import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ingredient } from './Ingredient';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private httpClient: HttpClient) {}

  url: string =
    'https://backend-challenge-production.up.railway.app/ingredients';

  public fetchIngredients(): Observable<any> {
    return this.httpClient.get(this.url);
  }
}
