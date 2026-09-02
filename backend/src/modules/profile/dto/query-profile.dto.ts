import { IsOptional, IsString, IsEnum, IsInt, Min, Max, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortDirection, ProfileSortField } from '../../../common/enums';

function toArr(val: unknown): string[] | undefined {
  if (!val) return undefined;
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') return val.split(',').map((s) => s.trim()).filter(Boolean);
  return undefined;
}

export class QueryProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => toArr(value))
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => toArr(value))
  @IsArray()
  @IsString({ each: true })
  industry?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => toArr(value))
  @IsArray()
  @IsString({ each: true })
  job_title?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => toArr(value))
  @IsArray()
  @IsString({ each: true })
  location?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => toArr(value))
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
