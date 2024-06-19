import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';


const Google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
}) 

const Credentials = CredentialsProvider({
    name: "credentials",
    credentials:{
        email:{
            label: "Email",
            type: "text"
        },
        password:{
            label:"Password",
            type: "password"  
        }
    },
    async authorize(credentials){
        if(!credentials?.email||!credentials?.password){
            throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
            where:{
                email: credentials.email
            }
        });
        if(!user||!user?.hashedPassword){
            throw new Error("Invalid credentials");
        }
        const isCorrect= await bcrypt.compare(credentials.password, user.hashedPassword);
        if(!isCorrect){
            throw new Error("Invalid credentials");
        }
        return user;
    }
});

export const authOptions: AuthOptions={
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials,
  ],
  pages:{
    signIn:"/login"
  },
  debug:process.env.NODE_ENV==="development",
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
}
 
export default NextAuth(authOptions);