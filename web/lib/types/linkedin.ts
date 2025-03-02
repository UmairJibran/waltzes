export interface LinkedInDate {
  day: number;
  month: number;
  year: number;
}

export interface LinkedInExperience {
  starts_at: LinkedInDate;
  ends_at: LinkedInDate | null;
  company: string;
  company_linkedin_profile_url: string | null;
  company_facebook_profile_url: string | null;
  title: string;
  description: string | null;
  location: string;
  logo_url: string | null;
}

export interface LinkedInEducation {
  starts_at: LinkedInDate;
  ends_at: LinkedInDate | null;
  field_of_study: string;
  degree_name: string;
  school: string;
  school_linkedin_profile_url: string | null;
  school_facebook_profile_url: string | null;
  description: string | null;
  logo_url: string | null;
  grade: string | null;
  activities_and_societies: string | null;
  location: string | null
}

export interface LinkedInLanguage {
  name: string;
  proficiency: 'ELEMENTARY' | 'FULL_PROFESSIONAL' | 'NATIVE_OR_BILINGUAL';
}

export interface LinkedInHonorAward {
  title: string;
  issuer: string;
  issued_on: LinkedInDate | null;
  description: string | null;
}

export interface LinkedInProject {
  starts_at: LinkedInDate;
  ends_at: LinkedInDate | null;
  title: string;
  description: string | null;
  url: string | null;
}

export interface LinkedInVolunteerWork {
  starts_at: LinkedInDate;
  ends_at: LinkedInDate | null;
  title: string;
  cause: string;
  company: string;
  company_linkedin_profile_url: string | null;
  description: string | null;
  logo_url: string | null;
}

export interface LinkedInCertification {
  starts_at: LinkedInDate | null;
  ends_at: LinkedInDate | null;
  name: string;
  license_number: string | null;
  display_source: string;
  authority: string;
  url: string | null;
}

export interface LinkedInData {
  first_name: string;
  last_name: string;
  full_name: string;
  occupation: string;
  headline: string;
  location: string;
  about: string;
  country: string;
  country_full_name: string;
  city: string;
  state: string;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  languages_and_proficiencies: LinkedInLanguage[];
  accomplishment_honors_awards: LinkedInHonorAward[];
  accomplishment_projects: LinkedInProject[];
  volunteer_work: LinkedInVolunteerWork[];
  certifications: LinkedInCertification[];
} 