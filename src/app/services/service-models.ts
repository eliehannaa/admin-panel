export interface AuthResponse {
  user: string;
  type: string;
  token: string;
}
export interface AuthRequest {
  email: string;
  password: string;
}
export interface Product {
  asin: string;
  title: string;
  _id: string;
  url: string;
  price: string;
  dimensions: string;
  weight: string;
  height: string;
  width: string;
  quantity_ordered: string;
}
export interface ProductResponse {
  prod: Product;
}
export interface Order {
  _id: string;
  client: string;
  traveler?: string;
  item: Product;
  quantity: number;
  status: number;
  waiting_resp: boolean;
  client_confirmed: boolean;
  __v: number;
}
export interface PendingOrdersResponse {
  pendingOrders: Order[];
}
export interface ActiveOrdersResponse {
  activeOrders: Order[];
}
export interface WaitingOrdersResponse {
  waitingOrders: Order[];
}
export interface Client {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  nationality: string;
  phone_number: string;
  failed_login_attempts: number;
  locked_until: number;
  city: string;
  gender: string;
  valid_e: boolean;
  type: string;
  completed_orders: Order[];
  active_orders: Order[];
  pending_orders: Order[];
}
export interface getClientsResponse {
  clients: Client[];
}
export interface Traveler {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  gender: string;
  phone_number: string;
  nationality: string;
  reviewed: boolean;
  active: boolean;
  approved: boolean;
  failed_login_attempts: number;
  locked_until: number;
  type: string;
  new_orders: Order[];
  assigned_orders: Order[];
  completed_orders: Order[];
  canceled_orders: Order[];
  provided_pickup: string;
  revoked: boolean;
}
export interface getTravelersResponse {
  travelers: Traveler[];
}

export interface Review {
  _id: string;
  order: string;
  message: string;
  rating: number;
  arrived_on_time: boolean;
  as_described: boolean;
  good_service: boolean;
}

export interface testimonials {
  testimonials: Review[];
}
