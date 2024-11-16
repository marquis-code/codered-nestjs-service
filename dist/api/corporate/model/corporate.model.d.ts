import { Document } from 'mongoose';
export declare class Corporate {
    username: string;
    password: string;
    hospitalName: string;
    contactInformation: string;
    address: string;
    website: string;
    operatingHours: string;
    facilityType: string;
    availableSpecialties: string;
    emergencyServices: string;
    capacity: string;
    emergencyEquipment: string;
    emergencyContactNumber: string;
    emergencyDepartment: string;
    doctorOnDutyContact: string;
    acceptedInsuranceProviders: string;
    emergencyPaymentPolicies: string;
    expectedResponseTime: string;
    dedicatedPointOfContact: string;
    communicationProtocols: string;
    airAmbulance: string;
    telemedicineServices: string;
}
export type CorporateDocument = Corporate & Document;
export declare const CorporateSchema: import("mongoose").Schema<Document<Corporate, any, any>, import("mongoose").Model<Document<Corporate, any, any>, any, any>, undefined, {}>;
