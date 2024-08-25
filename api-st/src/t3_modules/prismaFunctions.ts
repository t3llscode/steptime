// \\\\\\\\\\ Import / Export ////////// \\

import { PrismaClient} from '@prisma/client'
import type { City, Company, Entry, Member, Team } from '@prisma/client'

import PrismaUtility from './prismaUtility'

const prisma = new PrismaClient()

// \\\\\\\\\\ Database Connections ////////// \\

export class PrismaFunctions {

    // Get all cities
    static async getAllCityEntriesList(): Promise<string[]> {
        const entries = await prisma.city.findMany();
        return PrismaUtility.unpackValues(entries, 'name');
    }

}