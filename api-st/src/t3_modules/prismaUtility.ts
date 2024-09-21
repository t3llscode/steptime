// \\\\\\\\\\ Import / Export ////////// \\

import { Prisma, PrismaClient} from '@prisma/client'
import { filterObject } from './utilityFunctions';
import type { City, Company, Entry, Member, Team } from '@prisma/client'

export const client = new PrismaClient()

// \\\\\\\\\\ Utility ////////// \\
// these are generic functions that can be used in any project

export class PrismaUtility {

    private static Entry: { [key: string]: any };   // Entry is an object with keys of type string and values of type any

    
    /** Takes the entries of a prisma selection (list of objects) and shrinks it down
     *  by removing all values that are not mentioned in the columns array
     * @param entries
     * @param columns 
     * @returns 
     */
    static unpackValues<T extends string>(      // T is a string, the <> denotes a generic type
        entries: { [K in T]: any }[],           // entries is an array of objects with keys of type T and values of type any
        column: T                               // column is a key of type T
    ): any[] {
        return entries.map(entry => entry[column]);
    } // TODO: Review this function

    /** Returns the id of an existing entry, otherwise -1
     * @param table - prisma client.table to search in
     * @param data - data to match
     * @returns promise that resolves to the entry ID if found, otherwise -1
     */
    static async entryExists(table: any, data: object): Promise<number> {
        const entry = await table.findFirst({
            where: data
        });
        return entry ? entry.id : -1;
    }

    static async uniqueCheck(table: any, data: object, unique: string[]): Promise<boolean> {
        filterObject(data, unique);
        const entry = await table.findFirst({
            where: data
        });
        console.log(entry)
        return entry ? true : false;
    }

    /** Returns the id of an existing entry or creates a new entry
     * @param table - prisma client.table to search in
     * @param data - data to match
     * @param required - required fields
     * @param optional - optional fields
     * @returns promise that resolves to the (newly created) entry ID
     */
    static async getCreateID(table: any, data: object, unique: string[] = []): Promise<[number, string]> {
        const id = await PrismaUtility.entryExists(table, data);
        if (unique.length > 0 && await PrismaUtility.uniqueCheck(table, data, unique)) {
            return [-1, "unique constraint"];
        }
        if (id !== -1) {
            return [id, "already exists"];
        } else {
            const entry = await table.create({
                data
            })
            return [entry ? entry.id : -1, "was created"];
        }
    }
}

// \\\\\\\\\\ Import / Export ////////// \\

import * as erxuit from "./exitUtility"

// \\\\\\\\\\ Erxuit Utility ////////// \\
// these functions integrate in projects using erxuit error handling

export class PrismaErxuitUtility {

    static async universalCreate(body: any, tableName: keyof PrismaClient, required: string[], internalCode: number = 1, unique: string[] = [], optional: string[] = []) {
        erxuit.checkForUndefinedOrExit(body, required, internalCode)
        body = filterObject(body, [...required, ...optional]);
        const [id, msg] = await PrismaUtility.getCreateID(client[tableName], body, unique);
        if (id !== -1) {
            erxuit.returnOrExit({error: false}, {id}, 0, 200, `${String(tableName)} ${msg}`, [])
        }
        erxuit.returnOrExit({error: true}, {id}, 99, 404, `${String(tableName)} ${msg}`, [])
    }

}