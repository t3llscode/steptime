// \\\\\\\\\\ Import / Export ////////// \\

import { PrismaClient} from '@prisma/client'
import type { City, Company, Entry, Member, Team } from '@prisma/client'

const prisma = new PrismaClient()

// \\\\\\\\\\ Database Connections ////////// \\

export class PrismaFunctions {

    // Get all cities
    static async getAllCityEntries(): Promise<City[]> {
        const entries = await prisma.city.findMany();
        return entries;
    };

}