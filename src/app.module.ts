import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClientsModule],
})
export class AppModule {}
