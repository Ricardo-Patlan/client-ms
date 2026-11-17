import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern({ cmd: 'create_customer' })
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @MessagePattern({ cmd: 'find_all_customers' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.clientsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_customer' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_customer' })
  update(@Payload() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(updateClientDto.id, updateClientDto);
  }

  @MessagePattern({ cmd: 'remove_customer' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
