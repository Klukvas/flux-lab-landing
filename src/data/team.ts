import type { TeamMember, TimelineEvent } from "@/types";

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Alex Kovalenko",
    role: "Founder & Lead Developer",
    bio: "Full-stack developer with 8+ years of experience building scalable web applications. Architected all fluxLab products from the ground up.",
    avatar: "/images/team/alex.jpg",
    social: {
      github: "https://github.com", // TODO: Replace with real profile URL
      linkedin: "https://linkedin.com", // TODO: Replace with real profile URL
    },
  },
  {
    name: "Maria Shevchenko",
    role: "Frontend Developer",
    bio: "React specialist focused on building beautiful, accessible user interfaces. Leads the design system powering all fluxLab products.",
    avatar: "/images/team/maria.jpg",
    social: {
      github: "https://github.com", // TODO: Replace with real profile URL
      linkedin: "https://linkedin.com", // TODO: Replace with real profile URL
    },
  },
  {
    name: "Dmytro Bondar",
    role: "Backend Developer",
    bio: "Backend engineer specializing in Node.js, databases, and cloud infrastructure. Built the API layer handling 890K+ monthly transactions.",
    avatar: "/images/team/dmytro.jpg",
    social: {
      github: "https://github.com", // TODO: Replace with real profile URL
      linkedin: "https://linkedin.com", // TODO: Replace with real profile URL
    },
  },
  {
    name: "Olena Lysenko",
    role: "UI/UX Designer",
    bio: "Designer crafting intuitive and visually compelling digital experiences. Responsible for the UX across all products in the portfolio.",
    avatar: "/images/team/olena.jpg",
    social: {
      linkedin: "https://linkedin.com", // TODO: Replace with real profile URL
    },
  },
] as const;

export const timelineEvents: readonly TimelineEvent[] = [
  {
    year: 2021,
    titleKey: "timeline.2021.title",
    descriptionKey: "timeline.2021.description",
  },
  {
    year: 2022,
    titleKey: "timeline.2022.title",
    descriptionKey: "timeline.2022.description",
  },
  {
    year: 2023,
    titleKey: "timeline.2023.title",
    descriptionKey: "timeline.2023.description",
  },
  {
    year: 2024,
    titleKey: "timeline.2024.title",
    descriptionKey: "timeline.2024.description",
  },
  {
    year: 2025,
    titleKey: "timeline.2025.title",
    descriptionKey: "timeline.2025.description",
  },
] as const;
