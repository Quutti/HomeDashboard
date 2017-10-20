
interface KeyPair { [key: string]: any };

const ALLOWED_TYPES = ["string", "boolean", "number", "any"];

export interface SchemaValidationResult {
    valid: boolean;
    errors: string[];
}

export class SchemaValidator {

    private _obj: KeyPair;
    private _schema: KeyPair;
    private _errors: string[];

    constructor(obj: KeyPair, schema: KeyPair) {
        this._obj = obj;
        this._schema = schema;
        this._errors = [];
    }

    public validate(): SchemaValidationResult {
        this._validateSchema(this._obj, this._schema, "");
        return {
            valid: this._errors.length === 0,
            errors: this._errors
        }
    }

    private _validateSchema(obj: KeyPair, schema: KeyPair, parentChain: string) {
        if (typeof schema !== "object") {
            throw new Error("Schema should always be an object");
        }

        for (let sKey of Object.keys(schema)) {
            // Key represents an array
            const isArray = (sKey.substr(sKey.length - 2) === "[]");
            const isOptional = sKey.indexOf("!optional") > -1;
            const sData = schema[sKey];

            let realKey = sKey;
            if (isOptional) {
                realKey = realKey.split("!")[0];
            }

            if (isArray) {
                realKey = realKey.split('[]')[0];
            }

            const fullPropName = (parentChain) ? `${parentChain}.${realKey}` : realKey;
            const objData = obj[realKey];

            if (!isOptional && (objData === null || objData === undefined)) {
                this._errors.push(`"${fullPropName}" is a required property`);
                continue;
            }

            if (typeof sData === "string") {
                this._checkStringType(fullPropName, sData, objData);
                continue;
            } else {
                if (isArray) {
                    if (!Array.isArray(objData)) {
                        this._errors.push(`Expected "${fullPropName}" to be an array`);
                        continue;
                    }

                    objData.forEach(od => this._validateSchema(od, sData, fullPropName));
                } else {
                    if (typeof objData !== 'object') {
                        this._errors.push(`Expected "${fullPropName}" to be an object`);
                        continue;
                    }

                    this._validateSchema(objData, sData, fullPropName)
                }
            }
        }
    }

    private _checkStringType(key: string, type: string, value: any): boolean {
        if (ALLOWED_TYPES.indexOf(type) === -1) {
            throw new Error(`Incompatible type "${type}". Allowed types are [${ALLOWED_TYPES.join(", ")}]`);
        }

        const valueType = typeof value;
        if (type !== "any" && type !== valueType) {
            this._errors.push(`Property "${key}" should be type "${type}" (was "${valueType}")`);
            return false;
        }

        return true;
    }
}