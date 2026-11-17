import columns from "./columns.json" with { type: "json" };
import initialData from "./data.json" with { type: "json" };

const containerId = "dom-render-container";
const dataset = [...initialData];

// ============================================================================
// STEP 1: PURE RENDERING
// ============================================================================
window.ks.jsonRenderers.build.table.render({
    data: dataset,
    columns,
    targetHtmlId: containerId,
    appendPosition: "replace",
    type: "simple",
    options: {
        showSerial: true,
        showOptions: true
    },
    classToApply: "",
    showLog: false
});