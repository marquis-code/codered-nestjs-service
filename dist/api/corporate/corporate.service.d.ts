import { Logger } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { Corporate, CorporateDocument } from "./model/corporate.model";
import { AuthService } from "../auth/auth.service";
export declare class CorporateService {
    private corporateModel;
    private AuthService;
    logger: Logger;
    constructor(corporateModel: Model<CorporateDocument>, AuthService: AuthService);
    findOne(query: any): Promise<any>;
    find(usersFilterQuery: FilterQuery<Corporate>): Promise<Corporate[]>;
    create(corporate: any): Promise<any>;
    login(username: string, password: string): Promise<any>;
    findOneAndUpdate(query: any, payload: any): Promise<Corporate>;
    findOneAndRemove(query: any): Promise<any>;
    private generateUsername;
}
