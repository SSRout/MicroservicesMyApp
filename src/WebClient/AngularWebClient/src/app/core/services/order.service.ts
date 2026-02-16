import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { IBasketCheckout, IOrder, IOrderResponse } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private apiUrl = environment.apiUrl + environment.apiEndpoints.order;

  constructor(private http: HttpClient) {}

  /**
   * Create order from checkout
   */
  createOrder(basketCheckout: IBasketCheckout): Observable<IOrderResponse> {
    return this.http.post<IOrderResponse>(
      `${this.apiUrl}/CheckoutOrder`,
      basketCheckout,
    );
  }

  /**
   * Get all orders for a user
   */
  getOrdersByUsername(username: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(
      `${this.apiUrl}/GetOrdersByUsername/${username}`,
    );
  }

  /**
   * Get order by ID
   */
  getOrderById(orderId: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/GetOrderById/${orderId}`);
  }
}
