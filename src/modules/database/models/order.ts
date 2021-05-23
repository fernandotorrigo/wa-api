import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from 'modules/database/interfaces/order';
import { Model } from 'objection';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public value: string;
  @ApiProperty({ type: 'string' })
  public quantity: string;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Order';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
