import guardFunc from "json-renderers-guard";
import jsonToDom from "@keshavsoft/json-to-dom";
import registerGlobal from "./registerGlobal/index.js";
import buildTableSpec from "./buildTableSpec.js";

const render = (config = {}) => {
    guardFunc(config);
    const showLog = config?.showLog;
    const localOptions = config?.options || {};

    if (showLog) {
        console.log("[v49 build-table] input config:", {
            type: config.type,
            options: localOptions,
            columns: config.columns,
            data: config.data,
            appendPosition: config.appendPosition
        });
    }

    const spec = buildTableSpec({
        type: config.type,
        data: config.data,
        columns: config.columns,
        options: localOptions,
        showLog
    });

    if (showLog) console.log("[v49 build-table] generated spec:", spec);

    const dom = jsonToDom({
        jsonSpec: spec,
        targetHtmlId: config.targetHtmlId,
        appendPosition: config.appendPosition,
        classToApply: config.classToApply ?? "",
        showLog
    });

    if (showLog) console.log("[v49 build-table] mounted DOM element:", dom);

    return dom;
};

registerGlobal(render);

export { render, buildTableSpec };
export default render;
