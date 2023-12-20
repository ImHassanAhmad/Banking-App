import { type DocumentType, UploadDocumentTypesID } from '../types';

export const UploadDocumentsTypes: DocumentType[] = [
  { id: UploadDocumentTypesID.ID_CARD, displayName: 'ID Card', icon: '' },
  { id: UploadDocumentTypesID.PASSPORT, displayName: 'Passport', icon: '' },
  { id: UploadDocumentTypesID.DRIVING_LICENSE, displayName: 'Driving License', icon: '' },
  { id: UploadDocumentTypesID.RESIDENCE_PERMIT, displayName: 'ID Residence Permit', icon: '' }
];
