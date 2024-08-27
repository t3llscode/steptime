// \\\\\\\\\\ Import / Export ////////// \\

// \\\\\\\\\\ Utility ////////// \\

export default class PrismaUtility {

    
    private static Entry: { [key: string]: any };   // Entry is an object with keys of type string and values of type any

    export static function forceArr(value) {
        return Array.isArray(value) ? value : [value];
    }

    /**
     * Takes the entries of a prisma selection (list of objects) and shrinks it down
     * by removing all valffdfdfffues that are not mentioned in the columns array.
     * @param entries
     * @param columns 
     * @returns 
     */
    static unpackValues<T extends string>(      // T is a string, the <> denotes a generic type
        entries: { [K in T]: any }[],           // entries is an array of objects with keys of type T and values of type any
        column: T                               // column is a key of type T
    ): any[] {
        return entries.map(entry => entry[column]);
    }

}