 // \\\\\\\\\\ Import / Export ////////// \\
import * as ExitUtility from './exitUtility';

 /** Check for undefined parameters and exit if any are found
 * @param {object} body - The body object which contains the parameters to be checked.
 * @param {string[]} parameters - The parameters to be checked for undefined values.
 * @param {number} internalCode - An internal code representing the operation status, used for logging and error reporting.
 * Note: The function relies on external functions and variables such as `returnOrExit`, which should be defined in the same or imported scope.
 */
export function checkForUndefinedOrExit(body: any, parameters: string[], internalCode: number) {
    const missingParameters = forceArr(parameters).filter((param: string) => !body[param] && body[param] !== 0);
    if (missingParameters.length > 0) {
        const missingParamsString = missingParameters.join(", ");
        ExitUtility.returnOrExit(body.path, { error: true, usermessage: `Missing required parameter(s): ${missingParamsString}` }, {}, internalCode, 400, `${missingParamsString} undefined`, []);
    }
}

function forceArr(value: any): any[] {
    if (!Array.isArray(value)) {
        return [value];
    }
    return value;
}

// - - - - - - -

export function returnOrExit(rsp, object, internalCode, httpCode, usermessage, selector = []) {
    if (xor(rsp.error, httpCode == 200)) {
        let msg = rsp.msg || usermessage || "No Message"

        throw new ExitError(rsp.error, httpCode, msg, usermessage, object)

    } else if (selector.length > 0) { // If no errors occurred and a selector is provided, extract the object and return it
        return extractObject(rsp, object, internalCode, httpCode, usermessage, selector)
    }
}

export function catchExit(res, path, err, object = {}) {
    let finalError = err
    
    if (err.error == undefined) {
        try {
            returnOrExit({error: true, msg: JSON.stringify({err: err, name: err.name, stack: err.stack})}, object, 99, 500, "Unknown Error", [])
        } catch(error) {
            finalError = error
        }
    }
    let code = finalError.code
    
    if (debugErrors || debugSuccess) {
        let test = `${finalError.message} | Path: ${path}`
        if ((code != 200 && debugErrors) || (code == 200 && debugSuccess)) { // using the 4th character of the message to determine if it's an error or success message
            console.log(`${test} Msg: ${finalError.message} | Usermsg: ${finalError.usermessage}`)
        }
    }

    finalError.error ? null : delete finalError.error
    delete finalError.code
    delete finalError.msg

    return res.status(code).json({...finalError})
}

function extractObject(rsp, object, internalCode, httpCode, usermessage, selector) {
    try {
        let selectedValue = rsp;
        for (const step of selector) {
            if (selectedValue.hasOwnProperty(step)) {
                selectedValue = selectedValue[step];
            } else {
                throw new Error(step)
            }
        }
        return selectedValue;
    } catch (err) {
        returnOrExit({error: true, msg: `${rsp.msg} | Selector: [${selector}] | Step/Error: ${err.message}`}, object, internalCode, httpCode, usermessage, [])
    }
}

// - - - - - - -