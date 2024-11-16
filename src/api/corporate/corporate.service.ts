import {
  Injectable,
  forwardRef,
  Inject,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Corporate, CorporateDocument } from "./model/corporate.model";
import * as crypto from "crypto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class CorporateService {
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
}
