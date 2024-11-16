import {
  Controller,
  Post,
  Logger,
  Body,
} from "@nestjs/common";
import { CorporateService } from "./corporate.service";

@Controller("corporate")
export class CorporateController {
  logger: Logger;
  constructor(private readonly corporateService: CorporateService) {
    this.logger = new Logger(CorporateController.name);
  }

  @Post("create")
  async createCorporate(@Body() corporate: any) {
    return await this.corporateService.create(corporate);
  }

  @Post("login")
  async loginCorporate(@Body() body: { username: string; password: string }) {
    return await this.corporateService.login(body.username, body.password);
  }
}
