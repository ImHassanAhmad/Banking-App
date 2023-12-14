import { ModalNames } from '@app/constants/modals';
import { RouteNames } from '@app/constants/routes';

export interface Language {
  displayName: string;
  key: string;
  icon: string;
  countryCode: number;
}

const AllContent = { ...RouteNames, ...ModalNames };

type AllContentKeyType = typeof AllContent;

export type LanguageResource = {
  [key in AllContentKeyType[keyof AllContentKeyType]]: Record<string, string>;
};
