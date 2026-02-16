import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { IProduct } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  private apiUrl = environment.apiUrl + environment.apiEndpoints.catalog;

  constructor(private http: HttpClient) {}

  /**
   * Get all products from catalog
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/GetAllProducts`);
  }

  /**
   * Get product by ID
   */
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/GetProductById/${id}`);
  }

  /**
   * Search products by keyword
   */
  searchProducts(keyword: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.apiUrl}/GetProductsByName/${keyword}`,
    );
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.apiUrl}/GetProductsByCategory/${category}`,
    );
  }
}
