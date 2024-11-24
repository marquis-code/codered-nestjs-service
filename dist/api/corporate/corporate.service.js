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
        this.seedData()
            .then(() => this.logger.log("In-memory data seeded during service initialization."))
            .catch((err) => this.logger.error("Error seeding data:", err));
    }
    async seedData() {
        if (CorporateService_1.seededData) {
            this.logger.log("Data already seeded. Skipping.");
            return { message: "Data already seeded." };
        }
        this.logger.log("Seeding in-memory corporate data.");
        const dummyData = {
            hospitalName: "General Hospital",
            dailyBedUsage: [
                { day: "Monday", availableBeds: 30, occupiedBeds: 20 },
                { day: "Tuesday", availableBeds: 25, occupiedBeds: 25 },
                { day: "Wednesday", availableBeds: 20, occupiedBeds: 30 },
                { day: "Thursday", availableBeds: 15, occupiedBeds: 35 },
                { day: "Friday", availableBeds: 10, occupiedBeds: 40 },
                { day: "Saturday", availableBeds: 8, occupiedBeds: 42 },
                { day: "Sunday", availableBeds: 5, occupiedBeds: 45 },
            ],
            monthlyAdmissions: [
                { month: "January", admissions: 120 },
                { month: "February", admissions: 150 },
                { month: "March", admissions: 200 },
                { month: "April", admissions: 250 },
                { month: "May", admissions: 180 },
                { month: "June", admissions: 220 },
                { month: "July", admissions: 240 },
                { month: "August", admissions: 210 },
                { month: "September", admissions: 190 },
                { month: "October", admissions: 230 },
                { month: "November", admissions: 260 },
                { month: "December", admissions: 300 },
            ],
            dailyOccupancyRates: [
                { day: "Monday", occupancyRate: 66.7 },
                { day: "Tuesday", occupancyRate: 83.3 },
                { day: "Wednesday", occupancyRate: 88.0 },
                { day: "Thursday", occupancyRate: 93.3 },
                { day: "Friday", occupancyRate: 96.7 },
                { day: "Saturday", occupancyRate: 98.0 },
                { day: "Sunday", occupancyRate: 100.0 },
            ],
            dailyTurnoverRates: [
                { day: "Monday", turnoverRate: 5 },
                { day: "Tuesday", turnoverRate: 8 },
                { day: "Wednesday", turnoverRate: 6 },
                { day: "Thursday", turnoverRate: 7 },
                { day: "Friday", turnoverRate: 9 },
                { day: "Saturday", turnoverRate: 4 },
                { day: "Sunday", turnoverRate: 3 },
            ],
            averageStayDurations: [
                { department: "ICU", averageDays: 5 },
                { department: "ER", averageDays: 1 },
                { department: "General Ward", averageDays: 3 },
                { department: "Pediatrics", averageDays: 4 },
                { department: "Surgery", averageDays: 6 },
            ],
            mostCommonAdmissions: [
                { condition: "Flu", count: 300 },
                { condition: "Fractures", count: 200 },
                { condition: "Heart Attacks", count: 150 },
                { condition: "Asthma", count: 180 },
                { condition: "COVID-19", count: 120 },
            ],
        };
        CorporateService_1.seededData = dummyData;
        this.logger.log("In-memory data seeded successfully.");
        return { message: "Data seeded in memory successfully." };
    }
    async getBedSpaceUtilization() {
        if (!CorporateService_1.seededData) {
            this.logger.warn("Data not seeded. Seeding now.");
            await this.seedData();
        }
        return CorporateService_1.seededData.dailyBedUsage;
    }
    async getAdmissionTrends() {
        if (!CorporateService_1.seededData) {
            this.logger.warn("Data not seeded. Seeding now.");
            await this.seedData();
        }
        return CorporateService_1.seededData.monthlyAdmissions;
    }
    async getOccupancyRates() {
        if (!CorporateService_1.seededData) {
            this.logger.warn("Data not seeded. Seeding now.");
            await this.seedData();
        }
        return CorporateService_1.seededData.dailyOccupancyRates;
    }
    async getTurnoverRates() {
        if (!CorporateService_1.seededData) {
            this.logger.warn("Data not seeded. Seeding now.");
            await this.seedData();
        }
        return CorporateService_1.seededData.dailyTurnoverRates;
    }
    async getAverageStayDurations() {
        if (!CorporateService_1.seededData) {
            this.logger.warn("Data not seeded. Seeding now.");
            await this.seedData();
        }
        return CorporateService_1.seededData.averageStayDurations;
    }
    async getMostCommonAdmissions() {
        if (!CorporateService_1.seededData) {
            this.logger.warn("Data not seeded. Seeding now.");
            await this.seedData();
        }
        return CorporateService_1.seededData.mostCommonAdmissions;
    }
    async getCorporateProfile(id) {
        const corporate = await this.corporateModel.findById(id);
        if (!corporate) {
            throw new common_1.NotFoundException('Corporate profile not found');
        }
        return corporate;
    }
    async editCorporateProfile(id, updateData) {
        const updatedCorporate = await this.corporateModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCorporate) {
            throw new common_1.NotFoundException('Corporate profile not found');
        }
        return {
            message: 'Corporate profile updated successfully',
            corporate: updatedCorporate,
        };
    }
    generateUsername(hospitalName, address) {
        const cleanHospitalName = hospitalName
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();
        const cleanAddress = address.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const randomSuffix = crypto.randomInt(1000, 9999).toString();
        return `${cleanHospitalName}_${cleanAddress}_${randomSuffix}`;
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
};
CorporateService.seededData = null;
CorporateService = CorporateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(corporate_model_1.Corporate.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], CorporateService);
exports.CorporateService = CorporateService;
//# sourceMappingURL=corporate.service.js.map