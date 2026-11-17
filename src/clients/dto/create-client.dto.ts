import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @Length(3, 80)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(/^\d{10}$/, { message: 'phone must have exactly 10 digits' })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  address?: string;
}
