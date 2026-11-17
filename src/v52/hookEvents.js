import { render } from "./index.js";
import { table as traversalTable } from "dom-traversal-functions";

/**
 * Traverses upwards or downwards to find elements.
 * Uses exact closest -> querySelector patterns.
 */
export const hookEvents = ({
    container,
    dataset = [],
    columns = [],
    options = {},
    onSearch = null,
    onRowClick = null,
    onRowAction = null,
    onSave = null,
    showLog = false
} = {}) => {
    const rootElement = typeof container === "string" ? document.getElementById(container) : container;

    if (!rootElement) {
        if (showLog) console.warn("[hookEvents] Container not found:", container);
        return null;
    }

    const state = {
        dataset: [...dataset],
        filteredData: [...dataset],
        selectedIndex: -1
    };

    /**
     * Resolves the dedicated table container (#table-content-container) or closest table parent.
     * Re-renders with type: "withFooter" into #table-content-container.
     * Crucially: Leaves the search bar outside completely untouched so focus is NEVER lost!
     */
    const repaintTable = (filteredRecords) => {
        const tableContentContainer = rootElement.querySelector("#table-content-container") ||
            rootElement.querySelector("table")?.parentElement;

        if (!tableContentContainer) {
            if (showLog) console.warn("[hookEvents] #table-content-container not found.");
            return;
        }

        const targetId = tableContentContainer.id || "table-content-container";
        if (!tableContentContainer.id) {
            tableContentContainer.id = targetId;
        }

        render({
            data: filteredRecords,
            columns,
            targetHtmlId: targetId,
            appendPosition: "replace",
            type: "withFooter",
            options: {
                showSerial: options.showSerial ?? true,
                showOptions: options.showOptions ?? true
            },
            classToApply: "",
            showLog: false
        });
    };

    // ------------------------------------------------------------------------
    // 1. SEARCH: Header input event
    // Traverses from matchElement -> filters data -> repaints table-content-container
    // ------------------------------------------------------------------------
    rootElement.addEventListener("input", (event) => {
        const searchInput = event.target;
        if (!searchInput.matches("input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input")) {
            return;
        }

        const query = (searchInput.value || "").trim().toLowerCase();

        const filtered = query
            ? state.dataset.filter(item =>
                Object.values(item).some(val =>
                    String(val ?? "").toLowerCase().includes(query)
                )
            )
            : state.dataset;

        state.filteredData = filtered;

        // Repaint the table inside table-content-container (Search input stays untouched & focused!)
        repaintTable(filtered);

        // Update search feedback if element exists
        const searchFeedback = rootElement.querySelector("#search-feedback");
        if (searchFeedback) {
            searchFeedback.textContent = query
                ? `Showing ${filtered.length} of ${state.dataset.length} records matching "${searchInput.value.trim()}".`
                : `Showing all ${state.dataset.length} records.`;
        }

        if (typeof onSearch === "function") {
            onSearch(query, filtered);
        }
    });

    // ------------------------------------------------------------------------
    // 2. CLICKS: Delegated on rootElement
    // ------------------------------------------------------------------------
    rootElement.addEventListener("click", (event) => {
        // A. Button Clicks (Options "show" or Footer "save")
        const button = event.target.closest("button");
        if (button && rootElement.contains(button)) {
            const footerRow = button.closest("tfoot tr");

            // Is this a Footer Save action?
            if (footerRow) {
                const footerData = traversalTable?.footer?.getFooterData
                    ? traversalTable.footer.getFooterData(footerRow, columns)
                    : {};

                // Fallback extraction if traversal returned empty
                if (!footerData || Object.keys(footerData).length === 0) {
                    footerRow.querySelectorAll("input, select").forEach(input => {
                        const colKey = input.id || input.name;
                        if (colKey) footerData[colKey] = input.value;
                    });
                }

                if (traversalTable?.footer?.clearRowInputs) {
                    traversalTable.footer.clearRowInputs(footerRow);
                } else {
                    footerRow.querySelectorAll("input").forEach(i => i.value = "");
                }

                state.dataset.push(footerData);
                state.filteredData.push(footerData);

                repaintTable(state.filteredData);

                if (typeof onSave === "function") {
                    onSave(footerData, state.dataset);
                }
                return;
            }

            // Is this an options row action (e.g. "show" button)?
            const bodyRow = button.closest("tbody tr");
            if (bodyRow) {
                event.stopPropagation();
                if (traversalTable?.body?.highlightRow) {
                    traversalTable.body.highlightRow(bodyRow, "table-primary");
                }

                const rowIndex = traversalTable?.body?.getRowIndex
                    ? traversalTable.body.getRowIndex(bodyRow)
                    : Array.from(bodyRow.parentElement.children).indexOf(bodyRow);

                const record = state.filteredData[rowIndex] || state.dataset[rowIndex];
                state.selectedIndex = rowIndex;

                const action = button.dataset.action || button.textContent.trim().toLowerCase() || "show";
                if (typeof onRowAction === "function" && record) {
                    onRowAction(action, record, rowIndex);
                }
                return;
            }
        }

        // B. Body Row Selection
        const bodyRow = event.target.closest("tbody tr");
        if (bodyRow && rootElement.contains(bodyRow)) {
            // Highlight visually using bootstrap table-primary
            bodyRow.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach(r => {
                r.classList.remove("table-primary", "table-active");
            });
            bodyRow.classList.add("table-primary");

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
        repaint: (records) => repaintTable(records || state.filteredData)
    };
};

export default hookEvents;
