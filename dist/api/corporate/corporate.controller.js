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
var CorporateController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateController = void 0;
const common_1 = require("@nestjs/common");
const corporate_service_1 = require("./corporate.service");
let CorporateController = CorporateController_1 = class CorporateController {
    constructor(corporateService) {
        this.corporateService = corporateService;
        this.logger = new common_1.Logger(CorporateController_1.name);
    }
    async createCorporate(corporate) {
        return await this.corporateService.create(corporate);
    }
    async loginCorporate(body) {
        return await this.corporateService.login(body.username, body.password);
    }
    async seedData() {
        return this.corporateService.seedData();
    }
    async getBedSpaceUtilization() {
        return this.corporateService.getBedSpaceUtilization();
    }
    async getAdmissionTrends() {
        return this.corporateService.getAdmissionTrends();
    }
    async getOccupancyRates() {
        return this.corporateService.getOccupancyRates();
    }
    async getTurnoverRates() {
        return this.corporateService.getTurnoverRates();
    }
    async getCorporateProfile(id) {
        return this.corporateService.getCorporateProfile(id);
    }
    async editCorporateProfile(id, updateData) {
        return this.corporateService.editCorporateProfile(id, updateData);
    }
};
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "createCorporate", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "loginCorporate", null);
__decorate([
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "seedData", null);
__decorate([
    (0, common_1.Get)('bed-space-utilization'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "getBedSpaceUtilization", null);
__decorate([
    (0, common_1.Get)('admission-trends'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "getAdmissionTrends", null);
__decorate([
    (0, common_1.Get)('occupancy-rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "getOccupancyRates", null);
__decorate([
    (0, common_1.Get)('turnover-rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "getTurnoverRates", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "getCorporateProfile", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "editCorporateProfile", null);
CorporateController = CorporateController_1 = __decorate([
    (0, common_1.Controller)("corporate"),
    __metadata("design:paramtypes", [corporate_service_1.CorporateService])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map