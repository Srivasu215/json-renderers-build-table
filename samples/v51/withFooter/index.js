import columns from "./columns.json" with { type: "json" };
import initialData from "./data.json" with { type: "json" };
import { render, bindTableEvents } from "../../../docs/dist/v51/min.js";

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
// Only responsible for building and mounting the DOM structure. Zero event binding.
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
// STEP 2: HOOK EVENTS
// Separately attach container-delegated interactions (search, highlight, buttons, footer)
// ============================================================================
bindTableEvents({
    container: containerId,
    dataset,
    columns,
    renderTable: (updatedData) => {
        render({
            data: updatedData,
            columns,
            targetHtmlId: containerId,
            appendPosition: "replace",
            type: "withFooter",
            options: {
                showSerial: true,
                showOptions: true
            },
            classToApply: "",
            showLog: false
        });
    },
    onRowClick: (record) => {
        showFeedback(`Row Selected: "${record.itemName}" (Rate: ₹${record.Rate})`);
    },
    onRowAction: (action, record) => {
        showFeedback(`Action "${action}" on: "${record.itemName}" (Qty: ${record.pcs})`);
    },
    onFooterSave: (newRecord) => {
        showFeedback(`Added new item: "${newRecord.itemName}" (Rate: ₹${newRecord.Rate}, Pcs: ${newRecord.pcs})`, true);
    }
});
