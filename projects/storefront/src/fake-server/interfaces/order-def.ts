import { CheckoutItemData } from '../../app/api/base';
import { AddressData } from '../../app/interfaces/address';

export interface OrderItemOptionDef {
    name: string;
    value: string;
}

export interface OrderItemDef {
    product: string;
    options: OrderItemOptionDef[];
    quantity: number;
}

export interface OrderDef {
    payment: string;
    items: CheckoutItemData[];
    billingAddress: AddressData;
    shippingAddress: AddressData;
    comment: string;
}
