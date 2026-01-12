// Form submission types based on the API design

export type FormCategory = 'contact' | 'request-sample';

export type FormStatus = 'pending' | 'processed' | 'archived';

// Contact Form Data
export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  subject: string;
  message: string;
}

// Request Sample Form Data
export interface RequestSampleFormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  reportTitle: string;
  additionalInfo?: string;
}

// Metadata for form submissions
export interface FormMetadata {
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

// Base form submission request
export interface FormSubmissionRequest<T = ContactFormData | RequestSampleFormData> {
  category: FormCategory;
  data: T;
  metadata?: FormMetadata;
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean;
  submissionId: string;
  category: FormCategory;
  message: string;
  createdAt: string;
}

// Error response
export interface FormErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

// API Response wrapper
export type ApiResponse<T> = T | FormErrorResponse;
