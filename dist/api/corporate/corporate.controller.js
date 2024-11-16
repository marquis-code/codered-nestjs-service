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
CorporateController = CorporateController_1 = __decorate([
    (0, common_1.Controller)("corporate"),
    __metadata("design:paramtypes", [corporate_service_1.CorporateService])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map