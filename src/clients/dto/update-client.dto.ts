import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { CreateClientDto } from './create-client.dto.js';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
