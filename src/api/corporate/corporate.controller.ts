import {
  Controller,
  Post,
  Get,
  Logger,
  Body,
  Put,
  Param
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

  @Post('seed')
  async seedData() {
    return this.corporateService.seedData();
  }

  @Get('bed-space-utilization')
  async getBedSpaceUtilization() {
    return this.corporateService.getBedSpaceUtilization();
  }

  @Get('admission-trends')
  async getAdmissionTrends() {
    return this.corporateService.getAdmissionTrends();
  }

  @Get('occupancy-rates')
  async getOccupancyRates() {
    return this.corporateService.getOccupancyRates();
  }

  @Get('turnover-rates')
  async getTurnoverRates() {
    return this.corporateService.getTurnoverRates();
  }

    /**
   * Fetch a corporate profile by ID
   * @param id - Corporate ID
   */
    @Get(':id')
    async getCorporateProfile(@Param('id') id: string) {
      return this.corporateService.getCorporateProfile(id);
    }
  
    /**
     * Edit a corporate profile
     * @param id - Corporate ID
     * @param updateData - Data to update
     */
    @Put(':id')
    async editCorporateProfile(
      @Param('id') id: string,
      @Body() updateData: any,
    ) {
      return this.corporateService.editCorporateProfile(id, updateData);
    }
  
}
