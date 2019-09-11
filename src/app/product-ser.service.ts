import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductSerService {

  private url = 'http://localhost:3000/products'
  constructor(
    private _httpClient : HttpClient
  ) { }

  getAllProducts(){
    return this._httpClient.get(this.url)
  }
}
