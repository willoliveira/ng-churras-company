import { OrderItem } from "./order-item";

export interface Order {
    id: String,
    Items: Array<OrderItem>,
}
