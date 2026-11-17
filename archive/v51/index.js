import guardFunc from "json-renderers-guard";
import jsonToDom from "@keshavsoft/json-to-dom";
import { bindTableEvents } from "dom-table-events";
import registerGlobal from "./registerGlobal/index.js";
import buildTableSpec from "./buildTableSpec.js";

const render = (config = {}) => {
    guardFunc(config);
    const showLog = config?.showLog;
    const spec = buildTableSpec({
        type: config.type,
        data: config.data,
        columns: config.columns,
        options: config.options || {},
        showLog
    });
    const dom = jsonToDom({
        jsonSpec: spec,
        targetHtmlId: config.targetHtmlId,
        appendPosition: config.appendPosition,
        classToApply: config.classToApply ?? "",
        showLog
    });
    return dom;
};

registerGlobal({ render, bindTableEvents });

export { render, buildTableSpec, bindTableEvents };
export default render;
