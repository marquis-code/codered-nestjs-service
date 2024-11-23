import { Document } from 'mongoose';
interface OperatingHour {
    day: string;
    startTime: string;
    endTime: string;
}
export declare class Corporate {
    username: string;
    password: string;
    hospitalName: string;
    contactInformation: string;
    address: string;
    website: string;
    operatingHours: OperatingHour[];
    facilityType: string;
    availableSpecialties: [];
    emergencyServices: string;
    capacity: string;
    emergencyEquipment: [];
    emergencyContactNumber: string;
    emergencyDepartment: string;
    doctorOnDutyContact: [];
    acceptedInsuranceProviders: [];
    emergencyPaymentPolicies: [];
    expectedResponseTime: string;
    dedicatedPointOfContact: string;
    communicationProtocols: string;
    airAmbulance: string;
    telemedicineServices: string;
    latitude: string;
    longitude: string;
    availableBeds: string;
    occupiedBeds: string;
    admissions: string;
    staffOnGround: string;
    dailyBedUsage: {
        day: string;
        availableBeds: number;
        occupiedBeds: number;
    }[];
    monthlyAdmissions: {
        month: string;
        admissions: number;
    }[];
    dailyOccupancyRates: {
        day: string;
        occupancyRate: number;
    }[];
    dailyTurnoverRates: {
        day: string;
        turnoverRate: number;
    }[];
}
export type CorporateDocument = Corporate & Document;
export declare const CorporateSchema: import("mongoose").Schema<Document<Corporate, any, any>, import("mongoose").Model<Document<Corporate, any, any>, any, any>, undefined, {}>;
export {};
