import { Company } from "./company.model";
import { Order } from "./order";

export interface CompanyOrders {
    Company: Company,
    Orders: Array<{
        id: String,
        Items: Array<Order>
    }>
}
