import columns from "./columns.json" with { type: "json" };
import initialData from "./data.json" with { type: "json" };
import { render, hookEvents } from "../../../docs/dist/v52/min.js";

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
// Generates table structure (Header with search, Body with data, Footer with inputs)
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
// STEP 2: HOOK DOMAIN EVENTS (The 3 Essential Intent Actions)
// 1. onSearch: Header-level input -> filters data -> localized repaint of ONLY <tbody>
// 2. onRowClick: Body-level row click -> highlights row -> returns clicked record
// 3. onSave: Footer-level save click -> extracts inputs -> clears -> adds row
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
        showFeedback(`Row Click: [${rowIndex + 1}] "${record.itemName}" (Rate: ₹${record.Rate})`);
    },
    onSave: (newRecord) => {
        showFeedback(`Saved to Footer: "${newRecord.itemName}" (Rate: ₹${newRecord.Rate}, Pcs: ${newRecord.pcs})`, true);
    }
});
