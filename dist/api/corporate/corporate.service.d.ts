import { Logger } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { Corporate, CorporateDocument } from "./model/corporate.model";
import { AuthService } from "../auth/auth.service";
export declare class CorporateService {
    private corporateModel;
    private AuthService;
    private static seededData;
    logger: Logger;
    constructor(corporateModel: Model<CorporateDocument>, AuthService: AuthService);
    seedData(): Promise<{
        message: string;
    }>;
    getBedSpaceUtilization(): Promise<any>;
    getAdmissionTrends(): Promise<any>;
    getOccupancyRates(): Promise<any>;
    getTurnoverRates(): Promise<any>;
    getAverageStayDurations(): Promise<any>;
    getMostCommonAdmissions(): Promise<any>;
    getCorporateProfile(id: string): Promise<any>;
    editCorporateProfile(id: string, updateData: any): Promise<any>;
    private generateUsername;
    findOneAndUpdate(query: any, payload: any): Promise<Corporate>;
    findOneAndRemove(query: any): Promise<any>;
    login(username: string, password: string): Promise<any>;
    findOne(query: any): Promise<any>;
    find(usersFilterQuery: FilterQuery<Corporate>): Promise<Corporate[]>;
    create(corporate: any): Promise<any>;
}
