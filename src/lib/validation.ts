import { z } from 'zod/v4';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const applicationFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  position: z.string().min(1, 'Please select a position'),
  message: z.string().min(10, 'Cover letter must be at least 10 characters'),
  resume: z.url('Please enter a valid URL'),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
