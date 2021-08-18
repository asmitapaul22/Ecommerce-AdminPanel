import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addNewProduct(productDetails):Observable<any> {
    
    return this.http.post(config.server + 'addProduct', productDetails);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(config.server + 'getAllProducts');
  }

  getProductByID(productID): Observable<any> {
    return this.http.get(config.server + 'getProductByID?productID=' + productID);
  }

  updateProduct(productDetails): Observable<any> {
    return this.http.post(config.server + 'updateProduct', productDetails);
  }
}
