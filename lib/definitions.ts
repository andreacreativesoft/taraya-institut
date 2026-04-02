import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

export const ServiceSchema = z.object({
  title: z.string().min(1, { message: "Titre requis" }),
  description: z.string().min(1, { message: "Description requise" }),
  image: z.string().optional(),
  imageAlt: z.string().max(125).optional(),
  order: z.coerce.number().default(0),
  active: z.coerce.boolean().default(true),
});

export const PricingCategorySchema = z.object({
  title: z.string().min(1, { message: "Titre requis" }),
  order: z.coerce.number().default(0),
  active: z.coerce.boolean().default(true),
});

export const PricingItemSchema = z.object({
  label: z.string().min(1, { message: "Libellé requis" }),
  price: z.string().min(1, { message: "Prix requis" }),
  categoryId: z.string().min(1, { message: "Catégorie requise" }),
  order: z.coerce.number().default(0),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Nom requis (min. 2 caractères)" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: "Message requis (min. 10 caractères)" }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Nom requis" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Mot de passe min. 8 caractères" }),
  role: z.enum(["ADMIN", "SUPER_ADMIN"]),
});

export type LoginState = { errors?: { email?: string[]; password?: string[]; _form?: string[] } } | undefined;
export type ServiceState = { errors?: Record<string, string[]>; success?: boolean } | undefined;
export type PricingState = { errors?: Record<string, string[]>; success?: boolean } | undefined;
export type ContactState = { errors?: Record<string, string[]>; success?: boolean } | undefined;
