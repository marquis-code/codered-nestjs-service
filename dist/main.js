"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./api/user/user.module");
const corporate_module_1 = require("./api/corporate/corporate.module");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix("api/v1").useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
        .setTitle("API")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("API")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [user_module_1.UserModule, corporate_module_1.CorporateModule],
    });
    swagger_1.SwaggerModule.setup("api", app, document);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    };
    app.enableCors(corsOptions);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map