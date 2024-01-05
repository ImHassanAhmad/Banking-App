export interface ICompanyStructureProps {
  nextStep: (data: ICompanyStructureForm) => void;
}

export interface IUbo {
  type: string;
  name: string;
  email: string;
}

export interface ICompanyStructureForm {
  ubos: IUbo[];
}

export interface ILegalRepresentative {
  name: string;
  email: string;
  phone: string;
}

export interface ILegalRepresentatives {
  nextStep: (data: ILegalRepresentativeForm) => void;
  previousStep: (data: ILegalRepresentativeForm) => void;
}

export interface IKycProps {
  previousStep: (data: IKycForm) => void;
  uploadedFiles: IUploadedFiles;
  setter: (name: string, file: File) => void;
}

export interface ILegalRepresentativeForm {
  legalRepresentative: ILegalRepresentative[];
}

export interface IKycForm {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface IUploadFileProps {
  name: string;
  state?: File;
  setter: (name: string, file: File) => void;
  error: boolean;
}

export interface IUploadedFiles {
  passport?: File;
  national_id?: File;
  residence_proof?: File;
  profile_picture?: File;
}

export interface IUploadedFilesEntity {
  passport: string;
  national_id: string;
  residence_proof: string;
  profile_picture: string;
}

export enum PostOnboardingFlowSteps {
  CompanyStructure = 0,
  LegalRespresentative = 1,
  Kyc = 2
}

export type ObjectType = Record<string, any>;

export type DataType = ICompanyStructureForm | ILegalRepresentativeForm | IKycForm;
