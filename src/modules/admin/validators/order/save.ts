import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', maxLength: 50 })
  public value: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', maxLength: 50 })
  public quantity: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', maxLength: 150 })
  public description: string;
}
