import { NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

/* eslint-disable max-len */
describe('Admin/OrderService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

  const order: IOrder = {
    value: 30,
    quantity: 'lastName',
    description: 'pizza'
  };

  beforeEach(async () => {
    orderRepository = new OrderRepository();

    service = new OrderService(orderRepository);
  });

  it('should create a order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ ...order } as any));
    const result = await service.save(order);
    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should update a user', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce({ description: 'lanche' } as any);
    jest.spyOn(orderRepository, 'update').mockImplementationOnce(order => Promise.resolve({ ...order } as any));

    const result = await service.save({ id: 1, ...order });

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...order });
  });

  it('should remove a order', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce({ id: 2 } as any);
    jest.spyOn(orderRepository, 'remove').mockResolvedValueOnce({ id: 2 } as any);

    await service.remove(2 as any);
  });

  it('should throw NotFoundException when try to remove a not found order', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(2 as any);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
