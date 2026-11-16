import {
    getRowIndex,
    highlightRow,
    getFooterData,
    clearRowInputs,
    getSearchQuery
} from "../../../vendor/dom-traversal-functions.min.js";

let state = {
    dataset: [],
    columns: [],
    render: null,
    containerId: "dom-render-container",
    options: {}
};

export const initState = ({ dataset, columns, render, containerId, options = {} }) => {
    state = { dataset, columns, render, containerId, options };
};

const setFeedback = (message) => {
    const feedback = document.getElementById("search-feedback");
    if (feedback) feedback.textContent = message;
};

const renderTable = (filteredData) => {
    const tableContainer = document.getElementById("table-content-container") ||
        document.getElementById("table-simple-table-id")?.parentElement;

    const targetId = tableContainer?.id || "table-content-container";
    if (tableContainer) {
        tableContainer.innerHTML = "";
    }

    state.render({
        data: filteredData,
        columns: state.columns,
        targetHtmlId: targetId,
        appendPosition: "replace",
        type: "withFooter",
        options: state.options,
        classToApply: "",
        showLog: false
    });
};

export const actions = {
    onSearchInput: (event, matchElement) => {
        const query = getSearchQuery(matchElement);
        const filtered = query
            ? state.dataset.filter(item =>
                Object.values(item).some(val =>
                    String(val ?? "").toLowerCase().includes(query)
                )
            )
            : state.dataset;

        renderTable(filtered);
        setFeedback(
            query
                ? `Showing ${filtered.length} of ${state.dataset.length} records matching "${matchElement.value.trim()}".`
                : `Showing all ${state.dataset.length} records.`
        );
    },

    onRowSelect: (event, matchElement) => {
        const rowIndex = getRowIndex(matchElement);
        if (rowIndex < 0 || rowIndex >= state.dataset.length) return;

        highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        setFeedback(`Selected Row #${rowIndex + 1}: ${record.itemName || ""} [${record.category || ""}]`);
    },

    onRowShow: (event, matchElement) => {
        event.stopPropagation();
        const rowIndex = getRowIndex(matchElement);
        if (rowIndex < 0 || rowIndex >= state.dataset.length) return;

        highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        setFeedback(`Action [Show] on Row #${rowIndex + 1}: ${record.itemName} (${record.baseUnit})`);
    },

    onFooterSave: (event, matchElement) => {
        const newRecord = getFooterData(matchElement, state.columns);

        if (Object.values(newRecord).some(v => v.length > 0)) {
            clearRowInputs(matchElement);
            state.dataset.push(newRecord);
            renderTable(state.dataset);
            setFeedback(`Added new record: "${newRecord.itemName || ""}"! Total records: ${state.dataset.length}.`);
        } else {
            setFeedback("Please enter values into footer row inputs before saving.");
        }
    }
};

export default actions;
