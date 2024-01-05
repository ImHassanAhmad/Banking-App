export interface InitChangePasswordRequest {
  email: string;
}

export interface ResetPasswordOtpRequest extends InitChangePasswordRequest {
  otpCode: string;
}

export interface ChangePasswordRequest extends InitChangePasswordRequest {
  password: string;
  repeatPassword: string;
}
