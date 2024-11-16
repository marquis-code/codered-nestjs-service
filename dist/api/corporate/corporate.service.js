"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var CorporateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const corporate_model_1 = require("./model/corporate.model");
const crypto = require("crypto");
const auth_service_1 = require("../auth/auth.service");
let CorporateService = CorporateService_1 = class CorporateService {
    constructor(corporateModel, AuthService) {
        this.corporateModel = corporateModel;
        this.AuthService = AuthService;
        this.logger = new common_1.Logger(CorporateService_1.name);
    }
    async findOne(query) {
        return await this.corporateModel.findOne(query).select("+password");
    }
    async find(usersFilterQuery) {
        return this.corporateModel.find({ usersFilterQuery });
    }
    async create(corporate) {
        this.logger.log("Creating corporate user.");
        if (corporate.facebookId || corporate.googleId) {
            return this.corporateModel.create(corporate);
        }
        const hashedPassword = await this.AuthService.getHashedPassword(corporate.password);
        corporate.password = hashedPassword;
        let derivedUsername = this.generateUsername(corporate.hospitalName, corporate.address);
        while (await this.corporateModel.exists({ username: derivedUsername })) {
            derivedUsername = this.generateUsername(corporate.hospitalName, corporate.address);
        }
        corporate.username = derivedUsername;
        const newCorporate = new this.corporateModel(corporate);
        await newCorporate.save();
        return {
            message: "Corporate user created successfully.",
            username: derivedUsername,
        };
    }
    async login(username, password) {
        this.logger.log(`Logging in corporate user: ${username}`);
        const corporate = await this.corporateModel
            .findOne({ username })
            .select("+password");
        if (!corporate) {
            throw new common_1.UnauthorizedException("Invalid username or password.");
        }
        const isPasswordValid = await this.AuthService.comparePasswords(password, corporate.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid username or password.");
        }
        const token = await this.AuthService.generateJwtToken({
            email: corporate.contactInformation,
        });
        const _a = corporate.toObject(), { password: _ } = _a, corporateDetails = __rest(_a, ["password"]);
        return {
            message: "Login successful.",
            token,
            corporate: corporateDetails,
        };
    }
    async findOneAndUpdate(query, payload) {
        this.logger.log("Updating User.");
        return this.corporateModel.findOneAndUpdate(query, payload, {
            new: true,
            upsert: true,
        });
    }
    async findOneAndRemove(query) {
        return this.corporateModel.findOneAndRemove(query);
    }
    generateUsername(hospitalName, address) {
        const cleanHospitalName = hospitalName
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();
        const cleanAddress = address.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const randomSuffix = crypto.randomInt(1000, 9999).toString();
        return `${cleanHospitalName}_${cleanAddress}_${randomSuffix}`;
    }
};
CorporateService = CorporateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(corporate_model_1.Corporate.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], CorporateService);
exports.CorporateService = CorporateService;
//# sourceMappingURL=corporate.service.js.map