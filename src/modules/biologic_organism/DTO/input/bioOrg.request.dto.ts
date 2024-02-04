import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    Min,
  } from "class-validator";
 export enum method_exc {
  'HEAVY' = 'heavy',
  'FASTER' = 'faster'
 }
  export class SequenceDTO {
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1)
    @ApiProperty({
      type: Number,
      example: 4,
      nullable: false,
      required: true,
      description: 'Cantidad de muestra de organismos para revisar crecimiento'
    })
    count_muestra!: number;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
      example: method_exc['HEAVY'],
      nullable: false,
      required: true,
      description: 'Proceso a escoger para ejecutar la secuencia fibonacci'
    })
    method!: method_exc

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1)
    @ApiProperty({
      type: Number,
      example: 1,
      nullable: false,
      required: true,
      description: 'Proceso a escoger para ejecutar la secuencia fibonacci'
    })
    count_process!: number
  }
