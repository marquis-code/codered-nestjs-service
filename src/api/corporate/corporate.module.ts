import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Corporate, CorporateSchema } from './model/corporate.model';
import { CorporateController } from './corporate.controller';
import { CorporateService } from './corporate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Corporate.name, schema: CorporateSchema }]),
    forwardRef(() => AuthModule),
  ],

  controllers: [CorporateController],
  providers: [CorporateService],
  exports: [CorporateService],
})
export class CorporateModule { }
