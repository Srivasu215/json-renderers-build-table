# json-renderers-build-table

> **Declarative HTML Table Specification Builder Driven by Structured JSON Data & Columns.**

`json-renderers-build-table` is a pure, single-responsibility library that stamps out semantic HTML tables into the DOM from declarative configuration. Zero imperative loops. Zero hardcoded markup.

---

## 1. What You Supply & What You Get

### What You Supply
Describe your columns and data in pure JSON:
```javascript
const columns = [
  { columnName: "itemName", label: "Item Name" },
  { columnName: "category", label: "Category" },
  { columnName: "baseUnit", label: "Unit" }
];

const data = [
  { itemName: "0.09/30mm High Tensile Bolt", category: "Fasteners", baseUnit: "kgs" },
  { itemName: "0.11-25 Galvanized Wire Coil", category: "Raw Materials", baseUnit: "kgs" }
];
```

### What You Get
A single call mounts the complete semantic HTML table structure:
```javascript
import { render } from "json-renderers-build-table";

render({
  data,
  columns,
  targetHtmlId: "dom-render-container",
  type: "withSearchAndFooter",
  options: {
    showSerial: true,
    showOptions: true
  }
});
```

---

## 2. The Decoupled Ecosystem

Rather than building a bloated monolithic library, each table concern is completely isolated into its own focused repository:

| Repository | Responsibility | What It Owns |
| :--- | :--- | :--- |
| [**json-renderers-build-table**](https://github.com/keshavsoft/json-renderers-build-table) | **Pure Rendering** | Stamping HTML tables into the DOM from data & columns. Zero event coupling. |
| [**json-renderers-build-table-events**](https://github.com/keshavsoft/json-renderers-build-table-events) | **Interactivity & Events** | Container-level event delegation (Search, Row Click, Options, Footer Save) driven by `bindings.json`. |
| [**dom-traversal-functions**](https://github.com/keshavsoft/dom-traversal-functions) | **DOM Traversal** | Standardized Table Header, Body, and Footer traversals driven by declarative `instructions.json`. |
| [**dom-primitive-engine**](https://github.com/keshavsoft/dom-primitive-engine) | **Instruction Engine** | The execution engine running JSON traversal recipes. |

---

## 3. How They Connect: The Two-Step Contract

To achieve full interactivity without polluting the rendering pipeline or destroying input focus during search:

```javascript
import { render, hookEvents } from "json-renderers-build-table";

// STEP 1: Pure Rendering
render({
  data: dataset,
  columns,
  targetHtmlId: "dom-render-container",
  type: "withSearchAndFooter",
  options: { showSerial: true, showOptions: true }
});

// STEP 2: Hook Domain Events (powered by json-renderers-build-table-events)
hookEvents({
  container: "dom-render-container",
  dataset,
  columns,
  onSearch: (query, filtered) => console.log("Filtering:", query),
  onRowClick: (record) => console.log("Selected row:", record),
  onRowAction: (action, record) => console.log("Action:", action, record),
  onSave: (newRecord) => console.log("Saved footer row:", newRecord)
});
```

---

## 4. Documentation & Deep Dives

- **[GitHub Pages Documentation](https://keshavsoft.github.io/json-renderers-build-table/)**: Interactive story and contract walkthrough.
- **[Dependencies & Modular Packages](https://keshavsoft.github.io/json-renderers-build-table/npm.html)**: Details on all dependencies used (`@keshavsoft/json-to-dom`, `json-renderers-build-table-events`, `json-renderers-guard`, `json-renderers-run-instructions`, `json-renderers-run-options`, `spec-repo`).
- **[V55 Architecture](https://keshavsoft.github.io/json-renderers-build-table/v55/)**: Detailed breakdown of the latest V55 pipeline, imports, and registration.

---

## Live Samples

Explore real working samples in the repo:
- **[V55 withFooter Sample](./samples/v55/withFooter/)**: Full decoupled architecture with search, row actions, and footer inputs.
- **[V54 withFooter Sample](./samples/v54/withFooter/)**: Feature-folder action structure.
- **[V50 withFooter Sample](./samples/v50/withFooter/)**: Foundation search and footer layout.

---

## License

MIT &copy; [KeshavSoft](https://github.com/keshavsoft)
