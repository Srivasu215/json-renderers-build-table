import jsonToDom from "@keshavsoft/json-to-dom";
import { table as traversalTable } from "dom-traversal-functions";
import buildTableSpec from "./buildTableSpec.js";

/**
 * Traverses an element tree to locate the node carrying `data-role="table-body"` or tagName `tbody`.
 */
const findTbodyNode = (node) => {
    if (!node) return null;
    if (node?.attributes?.["data-role"] === "table-body" || node?.tagName === "tbody") {
        return node;
    }
    for (const child of node?.children || []) {
        const found = findTbodyNode(child);
        if (found) return found;
    }
    return null;
};

/**
 * Hooks domain events on a table container with precise localized DOM updates.
 *
 * Exposes 3 clean domain interactions:
 * 1. onSearch: Header-level search input -> filters dataset -> repaints ONLY <tbody> (keeps focus in search input).
 * 2. onRowClick: Body-level row click -> highlights row -> emits clicked record.
 * 3. onSave: Footer-level save click -> extracts footer data -> clears inputs -> emits new record.
 *
 * @param {object} config
 * @param {string|HTMLElement} config.container - Target container ID or element.
 * @param {Array<object>} config.dataset - The backing table dataset.
 * @param {Array<object>} config.columns - Column definitions.
 * @param {object} [config.options={}] - Table display options (showSerial, showOptions).
 * @param {Function} [config.onSearch] - Callback invoked on search query with (query, filteredData).
 * @param {Function} [config.onRowClick] - Callback invoked when a body row is clicked with (record, rowIndex).
 * @param {Function} [config.onSave] - Callback invoked when footer save is clicked with (newRecord, dataset).
 * @param {boolean} [config.showLog=false] - Whether to output debug logs.
 */
export const hookEvents = ({
    container,
    dataset = [],
    columns = [],
    options = {},
    onSearch = null,
    onRowClick = null,
    onSave = null,
    showLog = false
} = {}) => {
    const rootElement = typeof container === "string" ? document.getElementById(container) : container;

    if (!rootElement) {
        if (showLog) console.warn("[json-renderers-build-table:v52:hookEvents] Container not found:", container);
        return null;
    }

    // Mutable state for the table instance
    const state = {
        dataset: [...dataset],
        filteredData: [...dataset],
        selectedIndex: -1
    };

    /**
     * Repaints ONLY the <tbody> element of the table.
     * Does NOT touch the search input, headers, or footer inputs.
     * Keeps keyboard focus perfectly intact during search typing!
     */
    const repaintTableBody = (tableElement, recordsToDisplay) => {
        const tbodyElement = tableElement?.querySelector("tbody") || rootElement.querySelector("tbody");
        if (!tbodyElement) {
            if (showLog) console.warn("[hookEvents] <tbody> not found for localized repaint.");
            return;
        }

        // Build full spec to extract the newly populated <tbody> branch
        const fullSpec = buildTableSpec({
            type: "withFooter",
            data: recordsToDisplay,
            columns,
            options: {
                showSerial: options.showSerial ?? true,
                showOptions: options.showOptions ?? true
            },
            showLog: false
        });

        const tbodySpec = findTbodyNode(fullSpec);
        if (!tbodySpec) {
            if (showLog) console.warn("[hookEvents] Could not extract <tbody> spec.");
            return;
        }

        // Render virtual DOM elements into an in-memory document fragment
        const fragment = document.createDocumentFragment();
        jsonToDom({
            jsonSpec: tbodySpec,
            targetHtmlId: fragment,
            appendPosition: "replace",
            classToApply: "",
            showLog: false
        });

        const newTbody = fragment.querySelector("tbody") || fragment.firstElementChild;
        if (newTbody) {
            tbodyElement.replaceWith(newTbody);
        }
    };

    // ------------------------------------------------------------------------
    // 1. SEARCH: Header input -> Traverse to closest table -> Repaint ONLY <tbody>
    // ------------------------------------------------------------------------
    rootElement.addEventListener("input", (event) => {
        const searchInput = event.target;
        if (!searchInput.matches("input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input")) {
            return;
        }

        // DOM Traversal: extract query cleanly using traversal function
        const query = (traversalTable?.header?.getSearchQuery ? traversalTable.header.getSearchQuery(searchInput) : searchInput.value.trim().toLowerCase());

        // Traverse to the closest table in the DOM
        const tableElement = searchInput.closest(".container, .card, div")?.querySelector("table") || rootElement.querySelector("table");

        // Filter the dataset
        const filtered = query
            ? state.dataset.filter(item =>
                Object.values(item).some(val =>
                    String(val ?? "").toLowerCase().includes(query)
                )
            )
            : state.dataset;

        state.filteredData = filtered;

        // Repaint ONLY the <tbody>
        if (tableElement) {
            repaintTableBody(tableElement, filtered);
        }

        if (typeof onSearch === "function") {
            onSearch(query, filtered);
        }
    });

    // ------------------------------------------------------------------------
    // 2. BODY ROW CLICK: Body row click -> Highlight row -> Emit record
    // ------------------------------------------------------------------------
    // 3. FOOTER SAVE: Footer button click -> Extract inputs -> Clear -> Emit record
    // ------------------------------------------------------------------------
    rootElement.addEventListener("click", (event) => {
        // Check for button click first (e.g., footer Save or row action)
        const button = event.target.closest("button");
        if (button && rootElement.contains(button)) {
            const footerRow = button.closest("tfoot tr");

            // Is this a Footer Save action?
            if (footerRow) {
                const footerData = traversalTable?.footer?.getFooterData
                    ? traversalTable.footer.getFooterData(footerRow, columns)
                    : {};

                // Clear footer inputs
                if (traversalTable?.footer?.clearRowInputs) {
                    traversalTable.footer.clearRowInputs(footerRow);
                }

                // Add to internal datasets
                state.dataset.push(footerData);
                state.filteredData.push(footerData);

                // Repaint body to include the new row
                const tableElement = button.closest("table") || rootElement.querySelector("table");
                if (tableElement) {
                    repaintTableBody(tableElement, state.filteredData);
                }

                if (typeof onSave === "function") {
                    onSave(footerData, state.dataset);
                }
                return;
            }
        }

        // Body row click
        const bodyRow = event.target.closest("tbody tr");
        if (bodyRow && rootElement.contains(bodyRow)) {
            // Highlight row visually
            if (traversalTable?.body?.highlightRow) {
                traversalTable.body.highlightRow(bodyRow);
            } else {
                bodyRow.parentElement?.querySelectorAll("tr.table-active").forEach(r => r.classList.remove("table-active"));
                bodyRow.classList.add("table-active");
            }

            // Get row index
            const rowIndex = traversalTable?.body?.getRowIndex
                ? traversalTable.body.getRowIndex(bodyRow)
                : Array.from(bodyRow.parentElement.children).indexOf(bodyRow);

            const record = state.filteredData[rowIndex] || state.dataset[rowIndex];
            state.selectedIndex = rowIndex;

            if (typeof onRowClick === "function" && record) {
                onRowClick(record, rowIndex);
            }
        }
    });

    return {
        getState: () => ({ ...state }),
        repaintBody: (records) => {
            const tableElement = rootElement.querySelector("table");
            if (tableElement) repaintTableBody(tableElement, records || state.filteredData);
        }
    };
};

export default hookEvents;
