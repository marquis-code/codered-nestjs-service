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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateSchema = exports.Corporate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Corporate = class Corporate {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ select: false }),
    __metadata("design:type", String)
], Corporate.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "hospitalName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "contactInformation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Corporate.prototype, "operatingHours", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "facilityType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Corporate.prototype, "availableSpecialties", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "emergencyServices", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Corporate.prototype, "emergencyEquipment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "emergencyContactNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "emergencyDepartment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Corporate.prototype, "doctorOnDutyContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Corporate.prototype, "acceptedInsuranceProviders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Corporate.prototype, "emergencyPaymentPolicies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "expectedResponseTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "dedicatedPointOfContact", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "communicationProtocols", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "airAmbulance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "telemedicineServices", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "availableBeds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "occupiedBeds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "admissions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Corporate.prototype, "staffOnGround", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true, default: [] }),
    __metadata("design:type", Array)
], Corporate.prototype, "dailyBedUsage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true, default: [] }),
    __metadata("design:type", Array)
], Corporate.prototype, "monthlyAdmissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true, default: [] }),
    __metadata("design:type", Array)
], Corporate.prototype, "dailyOccupancyRates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true, default: [] }),
    __metadata("design:type", Array)
], Corporate.prototype, "dailyTurnoverRates", void 0);
Corporate = __decorate([
    (0, mongoose_1.Schema)()
], Corporate);
exports.Corporate = Corporate;
exports.CorporateSchema = mongoose_1.SchemaFactory.createForClass(Corporate);
//# sourceMappingURL=corporate.model.js.map