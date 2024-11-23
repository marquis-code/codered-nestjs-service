import {
  Injectable,
  forwardRef,
  Inject,
  Logger,
  UnauthorizedException,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Corporate, CorporateDocument } from "./model/corporate.model";
import * as crypto from "crypto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class CorporateService {
  private static seededData: any = null;
  logger: Logger;
  constructor(
    @InjectModel(Corporate.name)
    private corporateModel: Model<CorporateDocument>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService
  ) {
    this.logger = new Logger(CorporateService.name);
  }

  async findOne(query: any): Promise<any> {
    return await this.corporateModel.findOne(query).select("+password");
  }

  async find(usersFilterQuery: FilterQuery<Corporate>): Promise<Corporate[]> {
    return this.corporateModel.find({ usersFilterQuery });
  }

  async create(corporate: any): Promise<any> {
    this.logger.log("Creating corporate user.");

    // Handle social login cases
    if (corporate.facebookId || corporate.googleId) {
      return this.corporateModel.create(corporate);
    }

    // Hash the password
    const hashedPassword = await this.AuthService.getHashedPassword(
      corporate.password
    );
    corporate.password = hashedPassword;

    // Generate a unique username
    let derivedUsername = this.generateUsername(
      corporate.hospitalName,
      corporate.address
    );

    // Ensure the username is unique
    while (await this.corporateModel.exists({ username: derivedUsername })) {
      derivedUsername = this.generateUsername(
        corporate.hospitalName,
        corporate.address
      );
    }
    corporate.username = derivedUsername;

    // Save the corporate user
    const newCorporate = new this.corporateModel(corporate);
    await newCorporate.save();

    // Return success response with username
    return {
      message: "Corporate user created successfully.",
      username: derivedUsername,
    };
  }

  /**
   * Logs in a corporate user.
   * @param username - Corporate username
   * @param password - Corporate password
   * @returns Object with success message and user details
   */
async login(username: string, password: string): Promise<any> {
    this.logger.log(`Logging in corporate user: ${username}`);

    // Find the corporate user by username
    const corporate = await this.corporateModel
      .findOne({ username })
      .select("+password"); // Ensure password field is retrieved

    if (!corporate) {
      throw new UnauthorizedException("Invalid username or password.");
    }

    // Validate the password using AuthService
    const isPasswordValid = await this.AuthService.comparePasswords(
      password,
      corporate.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid username or password.");
    }

    // Generate JWT token using AuthService
    const token = await this.AuthService.generateJwtToken({
      email: corporate.contactInformation, // Assuming email is stored in contactInformation
    });

    // Omit sensitive information before returning
    const { password: _, ...corporateDetails } = corporate.toObject();

    return {
      message: "Login successful.",
      token,
      corporate: corporateDetails,
    };
  }

  async findOneAndUpdate(query: any, payload: any): Promise<Corporate> {
    this.logger.log("Updating User.");
    return this.corporateModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    });
  }

  async findOneAndRemove(query: any): Promise<any> {
    return this.corporateModel.findOneAndRemove(query);
  }

  /**
   * Generates a unique username from hospital name and address.
   * @param hospitalName - Corporate's hospital name
   * @param address - Corporate's address
   * @returns Generated username
   */
  private generateUsername(hospitalName: string, address: string): string {
    const cleanHospitalName = hospitalName
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    const cleanAddress = address.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const randomSuffix = crypto.randomInt(1000, 9999).toString(); // Random 4-digit number
    return `${cleanHospitalName}_${cleanAddress}_${randomSuffix}`;
  }


    /**
   * Seeds the data in memory
   */
    async seedData() {
      this.logger.log("Seeding in-memory corporate data.");
  
      // Seeded data
      const dummyData = {
        hospitalName: 'General Hospital',
        dailyBedUsage: [
          { day: 'Monday', availableBeds: 30, occupiedBeds: 20 },
          { day: 'Tuesday', availableBeds: 25, occupiedBeds: 25 },
          { day: 'Wednesday', availableBeds: 20, occupiedBeds: 30 },
          { day: 'Thursday', availableBeds: 15, occupiedBeds: 35 },
          { day: 'Friday', availableBeds: 10, occupiedBeds: 40 },
          { day: 'Saturday', availableBeds: 8, occupiedBeds: 42 },
          { day: 'Sunday', availableBeds: 5, occupiedBeds: 45 },
        ],
        monthlyAdmissions: [
          { month: 'January', admissions: 120 },
          { month: 'February', admissions: 150 },
          { month: 'March', admissions: 200 },
          { month: 'April', admissions: 250 },
          { month: 'May', admissions: 180 },
          { month: 'June', admissions: 220 },
          { month: 'July', admissions: 240 },
          { month: 'August', admissions: 210 },
          { month: 'September', admissions: 190 },
          { month: 'October', admissions: 230 },
          { month: 'November', admissions: 260 },
          { month: 'December', admissions: 300 },
        ],
        dailyOccupancyRates: [
          { day: 'Monday', occupancyRate: 66.7 },
          { day: 'Tuesday', occupancyRate: 83.3 },
          { day: 'Wednesday', occupancyRate: 88.0 },
          { day: 'Thursday', occupancyRate: 93.3 },
          { day: 'Friday', occupancyRate: 96.7 },
          { day: 'Saturday', occupancyRate: 98.0 },
          { day: 'Sunday', occupancyRate: 100.0 },
        ],
        dailyTurnoverRates: [
          { day: 'Monday', turnoverRate: 5 },
          { day: 'Tuesday', turnoverRate: 8 },
          { day: 'Wednesday', turnoverRate: 6 },
          { day: 'Thursday', turnoverRate: 7 },
          { day: 'Friday', turnoverRate: 9 },
          { day: 'Saturday', turnoverRate: 4 },
          { day: 'Sunday', turnoverRate: 3 },
        ],
      };
  
      // Store the data in the static variable
      CorporateService.seededData = dummyData;
  
      this.logger.log("In-memory data seeded successfully.");
      return { message: 'Data seeded in memory successfully.' };
    }
  
    /**
     * Get Bed-Space Utilization data
     */
    async getBedSpaceUtilization(): Promise<any> {
      if (!CorporateService.seededData) {
        throw new Error('Data not seeded yet.');
      }
      return CorporateService.seededData.dailyBedUsage;
    }
  
    /**
     * Get Patient Admission Trends data
     */
    async getAdmissionTrends(): Promise<any> {
      if (!CorporateService.seededData) {
        throw new Error('Data not seeded yet.');
      }
      return CorporateService.seededData.monthlyAdmissions;
    }
  
    /**
     * Get Bed Occupancy Rates data
     */
    async getOccupancyRates(): Promise<any> {
      if (!CorporateService.seededData) {
        throw new Error('Data not seeded yet.');
      }
      return CorporateService.seededData.dailyOccupancyRates;
    }
  
    /**
     * Get Bed Turnover Rates data
     */
    async getTurnoverRates(): Promise<any> {
      if (!CorporateService.seededData) {
        throw new Error('Data not seeded yet.');
      }
      return CorporateService.seededData.dailyTurnoverRates;
    }

    async getCorporateProfile(id: string): Promise<any> {
      const corporate = await this.corporateModel.findById(id);
      if (!corporate) {
        throw new NotFoundException('Corporate profile not found');
      }
      return corporate;
    }

    async editCorporateProfile(id: string, updateData: any): Promise<any> {
      const updatedCorporate = await this.corporateModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }, // Return the updated document
      );
      if (!updatedCorporate) {
        throw new NotFoundException('Corporate profile not found');
      }
      return {
        message: 'Corporate profile updated successfully',
        corporate: updatedCorporate,
      };
    }
    
  }
