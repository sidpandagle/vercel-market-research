import type {
  ContactFormData,
  RequestSampleFormData,
  FormSubmissionResponse,
} from './forms.types';
import type { ApiResponse } from './config';

/**
 * Type guard to check if response is an error
 */
export function isFormError(
  response: ApiResponse<FormSubmissionResponse>
): response is { success: false; error: string; message: string } {
  return response.success === false;
}

/**
 * Submit contact form — static site stub (no network call)
 */
export async function submitContactForm(
  _data: ContactFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return {
    success: true,
    data: {
      success: true,
      submissionId: 'static',
      category: 'contact',
      message: 'Thank you for your inquiry. We will get back to you shortly.',
      createdAt: new Date().toISOString(),
    },
  };
}

/**
 * Submit request sample form — static site stub (no network call)
 */
export async function submitRequestSampleForm(
  _data: RequestSampleFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return {
    success: true,
    data: {
      success: true,
      submissionId: 'static',
      category: 'request-sample',
      message: 'Thank you for your request. We will send you the sample shortly.',
      createdAt: new Date().toISOString(),
    },
  };
}
