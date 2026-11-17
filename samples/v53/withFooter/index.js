import columns from "./columns.json" with { type: "json" };
import initialData from "./data.json" with { type: "json" };
import { render, hookEvents } from "../../../docs/dist/v53/min.js";

const containerId = "dom-render-container";
const dataset = [...initialData];

const feedbackEl = document.getElementById("feedback");
const showFeedback = (msg, isSuccess = false) => {
    if (!feedbackEl) return;
    feedbackEl.className = `alert ${isSuccess ? "alert-success" : "alert-info"} py-2 px-3 small`;
    feedbackEl.textContent = msg;
};

// ============================================================================
// STEP 1: PURE RENDERING
// ============================================================================
render({
    data: dataset,
    columns,
    targetHtmlId: containerId,
    appendPosition: "replace",
    type: "withSearchAndFooter",
    options: {
        showSerial: true,
        showOptions: true
    },
    classToApply: "",
    showLog: false
});

// ============================================================================
// STEP 2: MODULAR INSTRUCTION-DRIVEN HOOK EVENTS (V53)
// Driven by bindings.json and dom-traversal-functions v3
// ============================================================================
hookEvents({
    container: containerId,
    dataset,
    columns,
    options: {
        showSerial: true,
        showOptions: true
    },
    onSearch: (query, filteredData) => {
        showFeedback(`Search: "${query}" -> ${filteredData.length} records matching.`);
    },
    onRowClick: (record, rowIndex) => {
        showFeedback(`Row Selected: #${rowIndex + 1} "${record.itemName}" (${record.category})`);
    },
    onRowAction: (action, record, rowIndex) => {
        showFeedback(`Row Action [${action.toUpperCase()}]: #${rowIndex + 1} "${record.itemName}" [Unit: ${record.baseUnit}]`);
    },
    onSave: (newRecord) => {
        showFeedback(`Footer Saved: "${newRecord.itemName}" (${newRecord.category}, ${newRecord.baseUnit})`, true);
    }
});
