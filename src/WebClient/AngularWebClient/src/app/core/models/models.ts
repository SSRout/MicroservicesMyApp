/**
 * Product Model
 */
export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageFile: string;
  price: number;
  category?: string;
}

/**
 * Cart Item Model
 */
export interface ICartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageFile: string;
}

/**
 * Shopping Basket Model
 */
export interface IBasket {
  username: string;
  items: ICartItem[];
  totalPrice?: number;
}

/**
 * Basket Checkout Model
 */
export interface IBasketCheckout {
  userName: string;
  totalPrice: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  shippingAddress: string;
  country: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
  paymentMethod: number;
}

/**
 * Order Model
 */
export interface IOrder {
  id: string;
  userName: string;
  totalPrice: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  shippingAddress: string;
  date?: Date;
  status?: string;
}

/**
 * Order Response Model
 */
export interface IOrderResponse {
  success: boolean;
  message: string;
}
