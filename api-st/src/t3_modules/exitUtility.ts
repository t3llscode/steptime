// \\\\\\\\\\ Import / Export ////////// \\

import * as utility from "./utilityFunctions"

// config
const debugErrors: boolean = true
const debugSuccess: boolean = true

// utility
class ExitError extends Error {
    error: boolean;
    code: number;
    usermessage: string;

    constructor(error: boolean, code: number, message: string, usermessage: string, object: object) {
        super(message);
        this.error = error;
        this.code = code;
        this.usermessage = usermessage;
        Object.assign(this, object);
    }
}

export function returnOrExit(rsp: any, object: object, internalCode: number, httpCode: number, usermessage: string, selector: any[] = []) {
    if (xor(rsp.error, httpCode == 200)) {
        let msg: string = rsp.msg || usermessage || "No Message"

        throw new ExitError(rsp.error, httpCode, msg, usermessage, object);

    } else if (selector.length > 0) {
        return extractObject(rsp, object, internalCode, httpCode, usermessage, selector);
    }
}

function xor(a: boolean, b: boolean): boolean {
    return (a || b) && !(a && b);
}

function extractObject(rsp: { error: boolean, msg: string, [key: string]: any }, object: object, internalCode: number, httpCode: number, usermessage: string, selector: any[]) {
    try {
        let selectedValue: any = rsp;       // TODO: create build plan for selectedValue (not any)
        for (const step of selector) {
            if (selectedValue.hasOwnProperty(step)) {
                selectedValue = selectedValue[step];
            } else {
                throw new Error(step);
            }
        }
        return selectedValue;
    } catch (err: any) {                    // TODO: check if any is correct type
        returnOrExit({error: true, msg: `${rsp.msg} | Selector: [${selector}] | Step/Error: ${err.message}`}, object, internalCode, httpCode, usermessage, [])
    }
}

export function catchExit(
    res: any,               // TODO: precise build plan, no any
    path: string, 
    err: any,               // TODO: precise build plan, no any
    object: object = {}
) {
    let finalError: any = err;  // TODO: precise build plan, no any
    
    if (err.error === undefined) {
        try {
            returnOrExit({error: true, msg: JSON.stringify({ err: err, name: err.name, stack: err.stack })}, object, 99, 500, "Unknown Error", []);
        } catch (error) {
            finalError = error;
        }
    }
    
    let code: number = finalError.code;
    
    if (debugErrors || debugSuccess) {
        let test: string = `${finalError.message} | Path: ${path}`;
        if ((code !== 200 && debugErrors) || (code === 200 && debugSuccess)) {
            console.log(`Path: ${path} | Msg: ${finalError.message} | Usermsg: ${finalError.usermessage}`);
        }
    }

    if (!finalError.error) { // error boolean is not included in the response if false
        delete finalError.error;
    }
    delete finalError.code;
    delete finalError.msg;

    return res.status(code).json({ ...finalError });
}

export function checkForUndefinedOrExit(
    body: { [key: string]: any }, 
    parameters: string[], 
    internalCode: number
) {
    const missingParameters = utility.forceArr(parameters).filter(param => body[param] === undefined);
    if (missingParameters.length > 0) {
        const missingParamsString = missingParameters.join(", ");
        returnOrExit({error: true, msg: `Missing required parameter(s): ${missingParamsString}`}, {}, internalCode, 400, `${missingParamsString} undefined`, []);
    }
}