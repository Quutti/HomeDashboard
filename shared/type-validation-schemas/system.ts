const SCHEMA_AMOUNTDATA = { total: "number", used: "number" }

export const SYSTEM_SCHEMA = {
    name: "string",
    monitor: {
        cpu: {
            load: "number",
            "temp!optional": "number"
        },
        memory: {
            ...SCHEMA_AMOUNTDATA,
            swap: SCHEMA_AMOUNTDATA
        },
        storage: SCHEMA_AMOUNTDATA,
        uptime: "number"
    }
}