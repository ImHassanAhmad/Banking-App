export interface ICompanyStructureProps {
  next: (data: ICompanyStructureForm) => void;
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
  next: (data: ILegalRepresentativeForm) => void;
  back: (data: ILegalRepresentativeForm) => void;
}

export interface IKycProps {
  submit: (data: IKycForm) => void;
  back: (data: IKycForm) => void;
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
  state: File | null;
  setter: (name: string, file: File) => void;
}

export interface IUploadedFiles {
  passport: File | null;
  national_id: File | null;
  residence_proof: File | null;
  profile_picture: File | null;
}

export interface IUploadedFilesEntity {
  passport: string;
  national_id: string;
  residence_proof: string;
  profile_picture: string;
}

export type DataType = ICompanyStructureForm | ILegalRepresentativeForm | IKycForm;
