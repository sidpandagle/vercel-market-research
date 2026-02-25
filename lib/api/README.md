# Form API Integration

This directory contains the frontend API integration for form submissions in the Healthcare Market Research application.

## Overview

The API layer provides type-safe form submission functionality for:
- **Contact Form** - General inquiries and support requests
- **Request Sample Form** - Free report sample requests

## Architecture

### Files

- `forms.types.ts` - TypeScript type definitions for API requests/responses
- `forms.ts` - API service functions for form submissions
- `index.ts` - Centralized exports

### Type Safety

All API interactions are fully typed using TypeScript interfaces:

```typescript
// Form data types
ContactFormData
RequestSampleFormData

// API request/response types
FormSubmissionRequest
FormSubmissionResponse
FormErrorResponse
```

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
```

**Important:**
- The variable must start with `NEXT_PUBLIC_` to be accessible in the browser
- For local development, use: `http://localhost:3001` (or your backend port)
- For production, use your deployed backend URL

### Backend API Endpoint

The frontend expects the following endpoint to be available:

```
POST /api/forms/submissions
```

**Request Format:**
```json
{
  "category": "contact" | "request-sample",
  "data": {
    // Form-specific fields (see types)
  },
  "metadata": {
    "submittedAt": "2026-01-11T10:30:00Z",
    "userAgent": "Mozilla/5.0...",
    "referrer": "/reports/telemedicine-market"
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "submissionId": "sub_1234567890",
  "category": "contact",
  "message": "Form submitted successfully",
  "createdAt": "2026-01-11T10:30:00Z"
}
```

**Error Response (4xx/5xx):**
```json
{
  "success": false,
  "error": "validation_error",
  "message": "Email is required"
}
```

## Usage

### In Components

```typescript
import { submitContactForm, isFormError } from '@/lib/api';

// Submit contact form
const response = await submitContactForm({
  fullName: "John Doe",
  email: "john@example.com",
  company: "HealthTech Inc",
  phone: "+1234567890",
  subject: "General Inquiry",
  message: "I need information about..."
});

// Check for errors
if (isFormError(response)) {
  console.error(response.message);
  return;
}

// Success
console.log('Submitted:', response.submissionId);
```

### Request Sample Form

```typescript
import { submitRequestSampleForm, isFormError } from '@/lib/api';

const response = await submitRequestSampleForm({
  fullName: "Jane Smith",
  email: "jane@company.com",
  company: "MedCorp",
  jobTitle: "Research Director",
  phone: "+1234567890",
  reportTitle: "Telemedicine Market Report 2025-2032",
  additionalInfo: "Need insights on North America region"
});
```

## Form Data Structures

### Contact Form

```typescript
interface ContactFormData {
  fullName: string;      // Required
  email: string;         // Required
  company: string;       // Required
  phone?: string;        // Optional
  subject: string;       // Required (dropdown selection)
  message: string;       // Required
}
```

**Subject Options:**
- General Inquiry
- Research Report Question
- Custom Research Request
- Partnership Opportunity
- Technical Support
- Other

### Request Sample Form

```typescript
interface RequestSampleFormData {
  fullName: string;      // Required
  email: string;         // Required
  company: string;       // Required
  jobTitle: string;      // Required
  phone?: string;        // Optional
  reportTitle: string;   // Required (can be pre-filled via query param)
  additionalInfo?: string; // Optional
}
```

## Error Handling

The API layer provides comprehensive error handling:

### Network Errors
```typescript
{
  success: false,
  error: "network_error",
  message: "Network error. Please check your connection and try again."
}
```

### Validation Errors
Backend should return validation errors with appropriate messages.

### Server Errors
Backend 500 errors are caught and returned as error responses.

## Metadata Collection

The API automatically collects and sends metadata with each submission:

- `submittedAt` - ISO 8601 timestamp
- `userAgent` - Browser user agent string
- `referrer` - Page URL where the form was submitted

This metadata helps with:
- Analytics and tracking
- Spam prevention
- User behavior analysis
- Debug/support issues

## Security Considerations

### Client-Side
- Form validation (required fields, email format)
- Rate limiting should be implemented on backend
- CAPTCHA integration recommended for production

### Backend Requirements
- Validate all input server-side
- Sanitize user input to prevent XSS
- Implement rate limiting (e.g., 5 submissions per IP per hour)
- Add CAPTCHA verification (reCAPTCHA v3 recommended)
- Email verification for real business emails
- SQL injection prevention (if using database)

## Testing

### Local Development

1. Set up backend API locally
2. Configure `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```
3. Test forms at:
   - Contact: `http://localhost:3000/contact`
   - Request Sample: `http://localhost:3000/request-sample`

### Production Testing

Use network tab to verify:
- Correct endpoint is called
- Request payload matches expected format
- Response codes (201 for success, 4xx/5xx for errors)
- Error messages display correctly to users

## Extending the API

To add new form types:

1. **Add type definition** in `forms.types.ts`:
   ```typescript
   export interface NewFormData {
     field1: string;
     field2: number;
   }
   ```

2. **Add category** to FormCategory type:
   ```typescript
   export type FormCategory = 'contact' | 'request-sample' | 'new-form';
   ```

3. **Create submission function** in `forms.ts`:
   ```typescript
   export async function submitNewForm(data: NewFormData) {
     return submitForm('new-form', data);
   }
   ```

4. **Update backend** to handle the new category.

## Troubleshooting

### "Network error" message
- Check if `NEXT_PUBLIC_API_BASE_URL` is set
- Verify backend is running and accessible
- Check CORS configuration on backend

### Form submits but no data received
- Verify backend endpoint is `/api/forms/submissions`
- Check request payload format matches expected structure
- Review backend logs for errors.

### Success but error shown to user
- Check response format from backend
- Ensure `success: true` is included in response
- Verify HTTP status code is 2xx

## Related Documentation

- Backend API specification: (link to your backend docs)
- Form validation rules: See individual form components
- Rate limiting: (link to backend rate limiting docs)
