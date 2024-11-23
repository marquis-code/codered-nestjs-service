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
    findOne(query: any): Promise<any>;
    find(usersFilterQuery: FilterQuery<Corporate>): Promise<Corporate[]>;
    create(corporate: any): Promise<any>;
    login(username: string, password: string): Promise<any>;
    findOneAndUpdate(query: any, payload: any): Promise<Corporate>;
    findOneAndRemove(query: any): Promise<any>;
    private generateUsername;
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
