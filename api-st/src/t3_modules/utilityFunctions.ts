 

 /**
 * Check for undefined parameters and exit if any are found
 * @param {object} body - The body object which contains the parameters to be checked.
 * @param {string[]} parameters - The parameters to be checked for undefined values.
 * @param {number} internalCode - An internal code representing the operation status, used for logging and error reporting.
 * Note: The function relies on external functions and variables such as `returnOrExit`, which should be defined in the same or imported scope.
 */
export function checkForUndefinedOrExit(body: object, parameters: string[], internalCode: number) {
    const missingParameters = forceArr(parameters).filter((param: string) => !body[param] && body[param] !== 0);
    if (missingParameters.length > 0) {
        const missingParamsString = missingParameters.join(", ");
        returnOrExit({ error: true, usermessage: `Missing required parameter(s): ${missingParamsString}` }, {}, internalCode, 400, `${missingParamsString} undefined`, []);
    }
}