import prisma from '@/libs/prismadb';

export default async function getUsers(){
    try{
        const users = await prisma.user.findMany();
        return users;
    }catch(error){
        throw new Error('Failed to fetch users');
    }
}