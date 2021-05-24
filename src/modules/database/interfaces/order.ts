export interface IOrder {
  id?: number;
  value: number;
  quantity: string;
  description: string;
  createdDate?: Date;
  updatedDate?: Date;
}
