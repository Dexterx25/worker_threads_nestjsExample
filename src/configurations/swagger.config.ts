import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as auth from "express-basic-auth";
import { ApiResponseDTO } from "src/common/DTOCommon/output";
import { BioOrgDTO } from "src/modules/biologic_organism/DTO";

export const configSwagger = async (app:any) => {

    app.enableCors({
        origin: '*',
    });
    app.use(
        "api/v1/testAppWorkers",
        auth({
          challenge: true,
          users: {
            [`${process.env.SWAGGER_USER}`]: `${process.env.SWAGGER_PASS}`,
          },
        })
      );
    const config = new DocumentBuilder()
        .setTitle('Mixing Center')
        .addBearerAuth()
        .setDescription('Documentation TestAppWorkers.')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [BioOrgDTO, ApiResponseDTO]
    });
  
    return SwaggerModule.setup('api/v1/testApp/docs', app, document, {
      swaggerOptions:{
        showRequestDuration: true,
      }
    });

}
