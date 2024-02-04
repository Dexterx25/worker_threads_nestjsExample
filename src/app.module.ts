import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { BiologicOrganismModule } from "src/modules/biologic_organism/biologic_org.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BiologicOrganismModule,
  ],
})
export class AppModule {}
 