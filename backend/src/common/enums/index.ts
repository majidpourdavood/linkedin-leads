export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown',
}

export enum CompanySize {
  SOLO = '1',
  SMALL = '2-10',
  MEDIUM = '11-50',
  LARGE = '51-200',
  X_LARGE = '201-500',
  XX_LARGE = '501-1000',
  ENTERPRISE = '1000+',
  UNKNOWN = 'unknown',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ProfileSortField {
  FULL_NAME = 'full_name',
  JOB_TITLE = 'job_title',
  JOB_COMPANY_NAME = 'job_company_name',
  LOCATION_NAME = 'location_name',
  JOB_LAST_UPDATED = 'job_last_updated',
  CREATED_AT = 'createdAt',
}
