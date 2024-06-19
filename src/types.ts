import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/** Custom interface extending Express's Request interface to include user information */
export interface RequestWithUser extends Request {
  user?: JwtPayload; // Define the user property as optional
}

export interface Order {
  orderId: string;
  userId: string;
  shopId: number;
  title: string;
  totalPriceFloat: number;
  status?: number;
  paymentId?: string;
}
export interface UpdateOrder {
  status?: number;
  payment_id?: string;
}

export interface OrderDetail {
  orderId: string;
  fileDetails: string;
  pageSize: string;
  printColor: string;
  printType: string;
  totalPages: number;
  pricePerPage: number;
  spiralBinding: boolean;
}

export interface OrderDbWhereObj {
  user_id?: string;
  status?: number;
  NOT?: object;
  shop_id: number;
}
export interface OrderDbOrderByObj {
  status?: "asc" | "desc";
  updatedAt?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}

export type OrderStatus =
  | "ORDER_PAYMENT_PENDING"
  | "ORDER_PREPARED"
  | "ORDER_PICKED"
  | "ORDER_PENDING"
  | null;
