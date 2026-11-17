// Zero import statements needed!
// ks.domTraversal.table is automatically available from the script tag.

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
    // 1. Header Traversal
    onSearchInput: (event, matchElement) => {
        const { header } = ks.domTraversal.table;
        const query = header.getSearchQuery(matchElement);

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

    // 2. Body Traversal
    onRowSelect: (event, matchElement) => {
        const { body } = ks.domTraversal.table;
        const rowIndex = body.getRowIndex(matchElement);
        if (rowIndex < 0 || rowIndex >= state.dataset.length) return;

        body.highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        setFeedback(`Selected Row #${rowIndex + 1}: ${record.itemName || ""} [${record.category || ""}]`);
    },

    // 3. Body Action
    onRowShow: (event, matchElement) => {
        event.stopPropagation();
        const { body } = ks.domTraversal.table;
        const rowIndex = body.getRowIndex(matchElement);
        if (rowIndex < 0 || rowIndex >= state.dataset.length) return;

        body.highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        setFeedback(`Action [Show] on Row #${rowIndex + 1}: ${record.itemName} (${record.baseUnit})`);
    },

    // 4. Footer Traversal
    onFooterSave: (event, matchElement) => {
        const { footer } = ks.domTraversal.table;
        const newRecord = footer.getFooterData(matchElement, state.columns);

        if (Object.values(newRecord).some(v => v.length > 0)) {
            footer.clearRowInputs(matchElement);
            state.dataset.push(newRecord);
            renderTable(state.dataset);
            setFeedback(`Added new record: "${newRecord.itemName || ""}"! Total records: ${state.dataset.length}.`);
        } else {
            setFeedback("Please enter values into footer row inputs before saving.");
        }
    }
};

export default actions;
