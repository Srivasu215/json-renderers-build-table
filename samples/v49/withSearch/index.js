import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import render from "../../../docs/dist/v49/min.js";

const containerId = "dom-render-container";

render({
    data,
    columns,
    targetHtmlId: containerId,
    appendPosition: "replace",
    type: "withSearch",
    options: {
        showSerial: true,
        showOptions: false
    },
    classToApply: "",
    showLog: false
});
