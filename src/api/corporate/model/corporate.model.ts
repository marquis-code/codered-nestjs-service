import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Corporate {
  @Prop()
  username: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  hospitalName: string;

  @Prop()
  contactInformation: string;

  @Prop()
  address: string;

  @Prop()
  website: string;

  @Prop()
  operatingHours: string;

  @Prop()
  facilityType: string;

  @Prop()
  availableSpecialties: string;

  @Prop()
  emergencyServices: string;

  @Prop()
  capacity: string;

  @Prop()
  emergencyEquipment: string;

  @Prop()
  emergencyContactNumber: string;

  @Prop()
  emergencyDepartment: string;

  @Prop()
  doctorOnDutyContact: string;

  @Prop()
  acceptedInsuranceProviders: string;

  @Prop()
  emergencyPaymentPolicies: string;

  @Prop()
  expectedResponseTime: string;

  @Prop()
  dedicatedPointOfContact: string;

  @Prop()
  communicationProtocols: string;

  @Prop()
  airAmbulance: string;

  @Prop()
  telemedicineServices: string;
}

export type CorporateDocument = Corporate & Document;

export const CorporateSchema = SchemaFactory.createForClass(Corporate);
