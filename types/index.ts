import { User } from "@prisma/client";

export type SaferUser = Omit<User,"createdAt"|"updatedAt"|"emailVerified">&{
    createdAt:string;
    updatedAt:string;
    emailVerified:string|null;
}