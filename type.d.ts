import { AdapterUser } from "next-auth/adapters";

// Étend le type AdapterUser pour inclure les champs personnalisés
export interface ExtendedUser extends AdapterUser {
  id: string;
  linkedin?: string;
  isPremium: boolean;
  github?: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;
}
