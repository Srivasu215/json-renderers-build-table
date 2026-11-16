import columns from "./columns.json" with { type: "json" };
import initialData from "./data.json" with { type: "json" };
import bindings from "./bindings.json" with { type: "json" };
import render from "../../../docs/dist/v49/min.js";
import { bindEvents } from "../../../vendor/dom-primitive-bindings.min.js";
import actions, { initState } from "./actions.js";

const containerId = "dom-render-container";
const dataset = [...initialData];

// 1. Initial render: layout with search bar, serial numbers, row actions, and footer inputs
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

// 2. Initialize state for actions
initState({
    dataset,
    columns,
    render,
    containerId,
    options: {
        showSerial: true,
        showOptions: true
    }
});

// 3. Bind declarative events to container
bindEvents(containerId, bindings, actions);
