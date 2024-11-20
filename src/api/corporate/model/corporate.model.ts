import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the structure of each operating hour
interface OperatingHour {
  day: string;
  startTime: string;
  endTime: string;
}

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

  @Prop({ type: Array, required: true })
  operatingHours!: OperatingHour[];

  @Prop()
  facilityType: string;

  @Prop({ type: Array, required: true})
  availableSpecialties: []

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

  @Prop({ type: Array, required: true})
  doctorOnDutyContact: [];

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

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;
}

export type CorporateDocument = Corporate & Document;

export const CorporateSchema = SchemaFactory.createForClass(Corporate);
