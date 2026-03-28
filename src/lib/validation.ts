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
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function validateResumeFile(
  file: File,
): { valid: true } | { valid: false; error: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File must be under 10 MB" };
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: "Only PDF, DOC, DOCX files are allowed" };
  }
  return { valid: true };
}

export const supportFormSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000),
});

export type SupportFormData = z.infer<typeof supportFormSchema>;
