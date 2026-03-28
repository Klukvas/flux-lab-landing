import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const applicationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Please enter a valid email address"),
  position: z.string().min(1, "Please select a position").max(200),
  message: z
    .string()
    .min(10, "Cover letter must be at least 10 characters")
    .max(3000),
  resume: z.url("Please enter a valid URL").max(2000),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export const supportFormSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000),
});

export type SupportFormData = z.infer<typeof supportFormSchema>;
