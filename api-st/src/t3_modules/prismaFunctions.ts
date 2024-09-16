// \\\\\\\\\\ Import / Export ////////// \\

import { PrismaClient} from '@prisma/client'
import type { City, Company, Entry, Member, Team } from '@prisma/client'

import PrismaUtility from './prismaUtility'

export const client = new PrismaClient()

// \\\\\\\\\\ Database Connections ////////// \\

export class PrismaFunctions {

    // returns the id of an existing entry, otherwise -1
    static async entryExists(table: any, data: object): Promise<number> {
        const entry = await table.findFirst({
            where: data
        });
        return entry ? entry.id : -1;
    }

    static async getCreateID(table: any, data: object, required?: string[], optional?: string[]): Promise<number> {
        let id = await this.entryExists(table, data);
        if (id !== -1) {
            return id;
        } else {
            table.create({
                data
            })
            return await this.entryExists(table, data);
        }
    }
}