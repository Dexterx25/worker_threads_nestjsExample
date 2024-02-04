import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BiologicOrganism } from './biologic_org.controller';
import { BiologicOrganismService } from './biologic_org.service';
import { FibonnaciHandler } from 'src/utils/mathematics';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [BiologicOrganism],
  providers: [
    BiologicOrganismService, 
    FibonnaciHandler,
    ],
  exports: [BiologicOrganismService, FibonnaciHandler],
})

export class BiologicOrganismModule {}