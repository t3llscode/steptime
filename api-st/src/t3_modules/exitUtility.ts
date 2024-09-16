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

export function returnOrExit(
    path: string, 
    rsp: any,               // TODO: precise build plan, no any
    object: object, 
    internalCode: number, 
    httpCode: number, 
    usermessage: string, 
    selector: any[] = []
) {
    if (xor(rsp.error, httpCode == 200)) {
        let msgWord: string;
        let debug: boolean;

        if (!rsp.error) {
            msgWord = "SUCCESS";
            debug = debugSuccess;
        } else {
            msgWord = "ERROR";
            debug = debugErrors;
        }

        let message = `LOG ${msgWord} | Code: ${internalCode} | Path: ${path}`;
        let tmpUsermessage = usermessage || message;

        if (debug) {
            console.log(`${message} Msg: ${rsp.msg} | Usermsg: ${usermessage}`);
        }

        throw new ExitError(rsp.error, httpCode, message, tmpUsermessage, object);

    } else if (selector.length > 0) {
        return extractObject(path, rsp, object, internalCode, httpCode, usermessage, selector);
    }
}

function xor(a: boolean, b: boolean): boolean {
    return (a || b) && !(a && b);
}

function extractObject(
    path: string, 
    rsp: { error: boolean, msg: string, [key: string]: any },
    object: object, 
    internalCode: number, 
    httpCode: number, 
    usermessage: string, 
    selector: any[]
) {
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            returnOrExit(path, { error: true, msg: `${rsp.msg} | Selector: [${selector}] | Step/Error: ${err.message}` }, object, internalCode, httpCode, usermessage, []);
        } else {
            returnOrExit(path, { error: true, msg: `${rsp.msg} | Selector: [${selector}] | Step/Error: Unknown error` }, object, internalCode, httpCode, usermessage, []);
        }
    }
}