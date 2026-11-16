import runInstructions from "json-renderers-run-instructions";
import runOptions from "json-renderers-run-options";
import {
    definitions as fallbackDefinitions,
    spec as fallbackSpec,
    instructions as fallbackInstructions
} from "spec-repo";

export const buildTableSpec = ({
    definitions = fallbackDefinitions,
    spec = fallbackSpec,
    instructions = fallbackInstructions,
    type = "simple",
    data = [],
    columns = [],
    options = {},
    showLog = false
} = {}) => {
    let variant = type;
    if (variant && variant.includes(".")) {
        const parts = variant.split(".");
        variant = parts[1] || parts[0];
    }
    if (!variant || variant === "table") {
        variant = "simple";
    }

    const tableDefs = definitions?.table || {};
    const config = tableDefs[variant] || tableDefs.simple;

    if (!config) {
        throw new Error(`Unknown table variant: "${variant}". Available table variants: ${Object.keys(tableDefs).join(", ")}`);
    }

    // Resolve base template: prefer baseFromSpec if present; otherwise config.base
    const rawBase = config.baseFromSpec ? spec[config.baseFromSpec] : config.base;
    if (!rawBase) {
        throw new Error(`Base template not found for table variant "${variant}".`);
    }

    // Resolve instructions from instructions dictionary or inline definition
    let single = [...(config.single || [])];
    let double = [...(config.double || [])];
    let rowOnColumn = [...(config.rowOnColumn || [])];
    let columnOnRow = [...(config.columnOnRow || [])];

    const instructionKeys = config.instructions || config.instructionsFromTable;
    if (Array.isArray(instructionKeys) && instructions) {
        instructionKeys.forEach(key => {
            const op = instructions[key];
            if (!op) return;
            if (op.type === "columnOnRow") {
                columnOnRow.push(op);
            } else if (op.type === "rowOnColumn") {
                rowOnColumn.push(op);
            } else if (op.type === "double") {
                double.push(op);
            } else if (op.type === "single" || (!op.type && (op.sourcePath || op.templateKey))) {
                single.push(op);
            }
        });
    }

    // 1. Build Virtual DOM via json-renderers-run-instructions
    const instructionResult = runInstructions({
        single,
        double,
        rowOnColumn,
        columnOnRow,
        base: structuredClone(rawBase),
        data: { columns, data },
        showLog
    });

    const base = instructionResult?.base ?? instructionResult;

    // 2. Apply table options (serial, options, search, etc.) via json-renderers-run-options
    const rawOptionDefs = config.options || tableDefs.options || {};
    const optionDefs = {};
    for (const [optKey, optVal] of Object.entries(rawOptionDefs)) {
        if (typeof optVal === "string" && instructions?.[optVal]) {
            optionDefs[optKey] = instructions[optVal];
        } else {
            optionDefs[optKey] = optVal;
        }
    }

    runOptions({
        base,
        options,
        optionDefs,
        showLog
    });

    return base;
};

export default buildTableSpec;
