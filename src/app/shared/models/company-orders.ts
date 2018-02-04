import { Company } from "./company.model";
import { OrderItem } from "./order-item";

export interface CompanyOrders {
    Company: Company,
    Orders: Array<{
        id: String,
        Items: Array<OrderItem>
    }>
}
