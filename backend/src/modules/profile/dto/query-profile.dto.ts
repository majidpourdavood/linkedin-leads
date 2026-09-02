import { IsOptional, IsString, IsEnum, IsInt, Min, Max, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortDirection, ProfileSortField } from '../../../common/enums';

export class QueryProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  industry?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  job_title?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  location?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  company_size?: string[];

  @ApiPropertyOptional({ enum: SortDirection })
  @IsOptional()
  @IsString()
  @IsEnum(SortDirection)
  order?: SortDirection = SortDirection.DESC;

  @ApiPropertyOptional({ enum: ProfileSortField })
  @IsOptional()
  @IsString()
  @IsEnum(ProfileSortField)
  sort?: ProfileSortField = ProfileSortField.CREATED_AT;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
