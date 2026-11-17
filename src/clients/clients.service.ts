import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkEmailIsFree(email: string, exceptId?: number) {
    const existing = await this.prisma.customer.findUnique({ where: { email } });
    if (existing && existing.id !== exceptId) {
      throw new RpcException({
        status: HttpStatus.CONFLICT, // 409
        message: `Customer with email "${email}" already exists`,
      });
    }
  }

  async create(createClientDto: CreateClientDto) {
    await this.checkEmailIsFree(createClientDto.email);
    return this.prisma.customer.create({ data: createClientDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const total = await this.prisma.customer.count();

    return {
      data: await this.prisma.customer.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND, // 404
        message: `Customer with id #${id} not found`,
      });
    }
    return customer;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const { id: _, ...data } = updateClientDto;
    await this.findOne(id);
    if (data.email) await this.checkEmailIsFree(data.email, id);
    return this.prisma.customer.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customer.delete({ where: { id } });
  }
}
