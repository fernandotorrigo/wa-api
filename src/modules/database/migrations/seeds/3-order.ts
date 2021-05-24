import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';

export async function seed(knex: Knex): Promise<void> {
  const firstOrder: IOrder = {
    value: 20,
    quantity: '1',
    description: 'primeiropedido',
    createdDate: new Date(),
    updatedDate: new Date()
  };

  const order = await knex
    .count()
    .from('Order')
    .where({ description: firstOrder.description })
    .first();

  if (Number(order.count) > 0) return;

  await knex.insert(firstOrder).into('Order');
}
