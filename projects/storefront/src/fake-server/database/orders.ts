import { OrderDef } from '../interfaces/order-def';
import { Order, OrderTotal } from '../../app/interfaces/order';
import { products } from './products';
import { addresses } from './addresses';

let lastId = 0;

export function getNextOrderId(): number {
    return ++lastId;
}

export function getOrderToken(orderId: number): string {
    const token = 'b84486c31644eac99f6909a6e8c19109';

    return (
        token.slice(0, token.length - orderId.toString().length) +
        orderId.toString()
    );
}

export function getNextOrderNumber(): string {
    return (
        orders.reduce(
            (prev, curr) => Math.max(prev, parseFloat(curr.number)),
            0
        ) + 1
    ).toString();
}

// function makeOrders(defs: OrderDef[]): Order[] {
//     return defs.map((def) => {
//         const id = getNextOrderId();
//         const items = def.items.map((orderItemDef) => {
//             const product = products.find(
//                 (x) => x.slug === orderItemDef.product
//             );

//             return {
//                 product: JSON.parse(JSON.stringify(product)),
//                 options: orderItemDef.options,
//                 price: product.price,
//                 quantity: orderItemDef.quantity,
//                 total: product.price * orderItemDef.quantity,
//             };
//         });

//         const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
//         const subtotal = items.reduce((acc, item) => acc + item.total, 0);

//         const totals: OrderTotal[] = [
//             { title: 'SHIPPING', price: 25 },
//             { title: 'TAX', price: Math.round(subtotal * 0.2) },
//         ];

//         const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);

//         return {
//             id,
//             token: getOrderToken(id),
//             number: def.number,
//             createdAt: def.createdAt,
//             payment: def.payment,
//             status: def.status,
//             items,
//             quantity,
//             subtotal,
//             totals,
//             total,
//             shippingAddress: JSON.parse(JSON.stringify(addresses[0])),
//             billingAddress: JSON.parse(JSON.stringify(addresses[0])),
//         };
//     });
// }

export const ordersDef: OrderDef[] = [];
export const orders: Order[] = [];
// export const orders: Order[] = makeOrders(ordersDef);
