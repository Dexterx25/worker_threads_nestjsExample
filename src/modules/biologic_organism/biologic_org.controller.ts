import { Body, Controller, HttpCode, HttpStatus, Post, Get} from '@nestjs/common';
import {  ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { BiologicOrganismService } from './biologic_org.service';
import { BioOrgDTO, SequenceDTO } from './DTO';
import { FibonacciNotRecursiveI } from 'src/utils/mathematics';

@ApiTags("biologic_organism")
@Controller('api/v1')
export class BiologicOrganism {
    constructor(
        private readonly biologicService: BiologicOrganismService,
        ) {}

        @Post('bacterial_grow_up')
        @ApiOkResponse({
          schema: {
              $ref: getSchemaPath(BioOrgDTO),
              example: {
                  statusCode: 200,
                  message: 'Details Organism grow up Bio Organism!',
                  error: false,
                },
          }
        })
        @ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          schema: {
              $ref: getSchemaPath(BioOrgDTO),
              example: {
                  statusCode: 400,
                  message: ['validation(s) error'],
                  error: true,
                },
          }
        })
        @HttpCode(HttpStatus.OK)
        @ApiOperation({
          summary: 'Endpoint para revisar valor de creacimiento bacterial',
          description: `valor por sequencia fibonacci del crecimiento bacterial con worker_thread para mejorar performance de aplicacion ejecutandose este proceso en otros hilos diferentes al principal ocacionando que no se paralice la aplicación afectando el performance`,
        })
       async getGrowUpBiologicBacterial(@Body() data: SequenceDTO ): Promise<FibonacciNotRecursiveI> {
           const responseData: FibonacciNotRecursiveI = await this.biologicService.sequenceExpansionFibonacci(data.count_process, data.count_muestra, data.method);
           return responseData;
        };



        @Get('additional_two_numbers')
        @ApiOkResponse({
          schema: {
             $ref: getSchemaPath(BioOrgDTO),
              example: {
                  statusCode: 200,
                  message: 'suma de dos numeros!',
                  error: false,
                },
          }
        })
        @HttpCode(HttpStatus.OK)
        @ApiOperation({
          summary: 'Test process',
          description: `probar que podemos ejecutar otros endpoint mientras se ejecuta el que tiene el worker o el que no tiene worker`,
        })
        getGrowUpBiologicBacterialTest(): number {
           return 4 + 6
        };

        

        @Post('bacterial_grow_up_without_worker')
        @ApiOkResponse({
          schema: {
              $ref: getSchemaPath(BioOrgDTO),
              example: {
                  statusCode: 200,
                  message: 'Details Organism grow up Bio Organism!',
                  error: false,
                },
          }
        })
        @ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          schema: {
              $ref: getSchemaPath(BioOrgDTO),
              example: {
                  statusCode: 400,
                  message: ['validation(s) error'],
                  error: true,
                },
          }
        })
        @HttpCode(HttpStatus.OK)
        @ApiOperation({
          summary: 'Endpoint para revisar valor de creacimiento bacterial',
          description: `valor por sequencia fibonacci del crecimiento bacterial sin el worker para validar que sin el worker entra en el hilo principal ocacionando que endpoints como el GET additional_two_numbers no se pueda ejecutar, ocacionando problemas de performance`,
        })
       async getGrowUpBiologicBacterialWithoutWorker(@Body() data: SequenceDTO ): Promise<FibonacciNotRecursiveI> {
           const responseData: FibonacciNotRecursiveI = await this.biologicService.sequenceExpansionFibonacciWithoutWorker(data.count_process, data.count_muestra, data.method);
           return responseData;
        };
}