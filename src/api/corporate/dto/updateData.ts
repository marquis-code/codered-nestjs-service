import { IsString, IsOptional } from 'class-validator';

export class UpdateCorporateDto {
  @IsString()
  @IsOptional()
  hospitalName?: string;

  @IsString()
  @IsOptional()
  contactInformation?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  facilityType?: string;
}
