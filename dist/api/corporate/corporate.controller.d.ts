import { Logger } from "@nestjs/common";
import { CorporateService } from "./corporate.service";
export declare class CorporateController {
    private readonly corporateService;
    logger: Logger;
    constructor(corporateService: CorporateService);
    createCorporate(corporate: any): Promise<any>;
    loginCorporate(body: {
        username: string;
        password: string;
    }): Promise<any>;
    seedData(): Promise<{
        message: string;
    }>;
    getBedSpaceUtilization(): Promise<any>;
    getAdmissionTrends(): Promise<any>;
    getOccupancyRates(): Promise<any>;
    getTurnoverRates(): Promise<any>;
    getCorporateProfile(id: string): Promise<any>;
    editCorporateProfile(id: string, updateData: any): Promise<any>;
}
