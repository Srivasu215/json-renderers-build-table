// node_modules/json-renderers-guard/src/v5/spec/type/index.js
var e = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.type;
	if (n === void 0) throw Error("Missing compulsory key: \"type\"");
	if (typeof n != "string") throw TypeError("type must be a string");
	return !0;
}, t = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.data;
	if (n === void 0) throw Error("Missing compulsory key: \"data\"");
	if (!Array.isArray(n)) throw TypeError("data must be an Array");
	return !0;
}, n = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.columns;
	if (n === void 0) throw Error("Missing compulsory key: \"columns\"");
	if (!Array.isArray(n)) throw TypeError("columns must be an Array");
	return !0;
}, r = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.showLog;
	if (n !== void 0 && typeof n != "boolean") throw TypeError("showLog must be a boolean");
	return !0;
}, i = (i) => {
	let a = i?.inConfig ?? i;
	if (!a || typeof a != "object" || Array.isArray(a)) throw TypeError("Config must be an object");
	return e(a), t(a), n(a), r(a), !0;
}, a = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.targetHtmlId;
	if (n === void 0) throw Error("Missing compulsory key: \"targetHtmlId\"");
	if (typeof n != "string") throw TypeError("targetHtmlId must be a string");
	if (n.trim().length === 0) throw Error("targetHtmlId must be a non-empty string");
	return !0;
}, o = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.appendPosition;
	if (n === void 0) throw Error("Missing compulsory key: \"appendPosition\"");
	if (typeof n != "string") throw TypeError("appendPosition must be a string");
	return !0;
}, s = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.classToApply;
	if (n === void 0) throw Error("Missing compulsory key: \"classToApply\"");
	if (typeof n != "string") throw TypeError("classToApply must be a string");
	return !0;
}, c = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return a(t), o(t), s(t), !0;
}, l = {
	type: "table",
	targetHtmlId: "",
	data: [],
	columns: [],
	classToApply: "",
	appendPosition: "replace",
	showLog: !1
}, u = (e) => {
	let t = typeof e == "object" && e ? e.inKey ?? e.key : e;
	return t && t in l ? l[t] : { ...l };
};
Object.assign(u, l);
// node_modules/json-renderers-guard/src/v5/index.js
var d = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return i(t), c(t), !0;
};
d.getSpec = u, d.configSpec = l, d.guardSpec = i, d.guardMount = c;
// node_modules/@keshavsoft/json-to-dom/src/v42/register/meta.js
var f = {
	version: "42.1.4",
	name: "json-to-dom"
}, p = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: f,
		appendToDom: e
	});
}, m = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, h = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: m,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, g = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => v({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, _ = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = g({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, v = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? g({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? _({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, y = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, ee = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, b = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, x = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, te = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, ne = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, re = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	y({
		inNode: r,
		inErrors: a
	}) && (ee({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), b({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), x({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), te({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ne({
		inNode: r,
		inErrors: a
	}));
}, ie = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "div",
			attributes: { class: "row mb-3 align-items-center" },
			children: [
				{
					tagName: "div",
					attributes: { class: "col-md-4 d-flex align-items-center" },
					children: [{
						tagName: "h6",
						attributes: {
							class: "mb-0 fw-semibold text-secondary",
							id: "table-title"
						},
						textContent: "Items"
					}]
				},
				{
					tagName: "div",
					attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
					children: [{
						tagName: "span",
						attributes: {
							id: "search-feedback",
							class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
						},
						textContent: "Showing all records"
					}]
				},
				{
					tagName: "div",
					attributes: { class: "col-md-4" },
					children: [{
						tagName: "div",
						attributes: { class: "input-group" },
						children: [{
							tagName: "span",
							attributes: { class: "input-group-text bg-white" },
							children: [{
								tagName: "i",
								attributes: { class: "bi bi-search" },
								textContent: "🔍"
							}]
						}, {
							tagName: "input",
							attributes: {
								type: "text",
								id: "tableSearch",
								class: "form-control",
								placeholder: "Search table..."
							}
						}]
					}]
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-simple-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-simple-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-simple-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-with-footer-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-with-footer-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-with-footer-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-with-footer-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-with-footer-body-id"
				},
				children: []
			},
			{
				tagName: "tfoot",
				attributes: {
					"data-role": "table-footer",
					id: "table-with-footer-footer-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-footer-row",
						id: "table-with-footer-footer-row-id"
					},
					children: []
				}]
			}
		]
	},
	tableBodyOnly: {
		tagName: "div",
		attributes: { id: "ks-id" },
		children: []
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	}
}, ae = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, oe = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, se = {
	table: {
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			options: {
				serial: "serial",
				options: "options"
			}
		},
		bodyOnly1: {
			baseFromSpec: "tableBodyOnly1",
			instructions: []
		},
		footerOnly: {
			baseFromSpec: "tableFooterOnly",
			instructions: ["buildFooter"]
		},
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		},
		headerOnly1: {
			baseFromSpec: "tableHeaderOnly1",
			instructions: ["buildColgroup", "buildHeader"]
		},
		options: {
			instructions: [],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		},
		headerAndFooter: {
			baseFromSpec: "tableHeaderAndFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		},
		withSearch: {
			baseFromSpec: "tableWithSearch",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		},
		withSearchAndFooter: {
			baseFromSpec: "tableWithSearch",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				serial: "serial",
				options: "options",
				search: "search"
			}
		}
	},
	select: {
		simple: {
			baseFromSpec: "selectBase",
			instructions: ["buildSelectWithOptions"]
		},
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"]
	},
	dataList: {
		simple: {
			baseFromSpec: "dataListSimple",
			instructions: ["buildDataListWithOptions"]
		},
		baseFromSpec: "dataListBase",
		instructions: ["buildDataListWithOptions"]
	},
	selectOptionsOnly: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"]
	},
	searchInput: {
		baseFromSpec: "searchInputBase",
		instructions: []
	},
	form: {
		simple: {
			baseFromSpec: "formSimple",
			instructions: ["buildFormField"]
		},
		baseFromSpec: "formBase",
		instructions: ["buildFormField"]
	}
}, ce = {
	buildColgroup: {
		type: "single",
		narration: "Build column widths",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		}
	},
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	options: [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}]
}, le = { buildFormField: {
	type: "single",
	narration: "Build form fields from columns",
	destinationPath: {
		fileName: "base",
		dataRole: "form-body",
		filePath: ["children"]
	},
	sourcePath: {
		fileName: "data",
		filePath: ["columns"]
	},
	templateKey: "buildFormField",
	func: "fromCollection"
} }, S = {
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		}
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			filePath: ["data"]
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: {
			fileName: "base",
			filePath: []
		},
		sourcePath: {
			fileName: "data",
			filePath: ["data"]
		},
		templateKey: "buildOption",
		func: "fromCollection"
	}
}, ue = { buildDataListWithOptions: {
	type: "columnOnRow",
	narration: "Build datalists with options",
	destinationPath: {
		fileName: "base",
		filePath: ["children"]
	},
	templateKey: {
		columnKey: "buildDataList",
		rowKey: "buildOption"
	}
} }, de = {
	name: "spec-repo",
	version: "1.14.0"
}, fe = ({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: de,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
}, pe = {
	...ce,
	...le,
	...S,
	...ue
}, me = ie;
fe({
	spec: ie,
	tags: ae,
	tagsSchema: oe,
	definitions: se,
	table: ce,
	form: le,
	select: S,
	dataList: ue,
	instructions: pe
});
// node_modules/json-to-tag-validate/src/v4/index.js
function he({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? ae, a = [];
	return v({
		inSpec: r,
		inFunc: (e) => {
			re({
				inNode: e,
				inCatalog: i,
				inErrors: a
			});
		}
	}), {
		isValid: a.length === 0,
		errors: a
	};
}
// node_modules/@keshavsoft/json-to-tag/src/v12/element/createElement.js
var ge = "http://www.w3.org/2000/svg", _e = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), ve = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return _e.has(t) ? document.createElementNS(ge, t) : document.createElement(t);
}, ye = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), be = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), xe = "http://www.w3.org/1999/xlink", Se = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(xe, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, Ce = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, we = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = ve({ inTagName: e.tagName });
	return t ? (ye({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), be({
		inElement: t,
		inProperties: e.properties
	}), Se({
		inElement: t,
		inAttributes: e.attributes
	}), Ce({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, Te = (e = {}) => v({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: we
});
h({
	buildSpecElement: Te,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = he({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), v({
			inSpec: t,
			inFunc: we
		});
	}
});
// node_modules/spec-to-dom/src/v2/register/meta.js
var Ee = {
	version: "2.1.1",
	name: "spec-to-dom"
}, De = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: Ee,
		appendToDom: e
	});
}, Oe = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
De(Oe);
// node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var ke = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => Oe({
	buildSpec: Te(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
p(ke);
// node_modules/dom-table-events/src/v1/registerGlobal/meta.js
var Ae = {
	version: "1.1.0",
	description: "Pre-cooked table event workflows, container delegation, and action dispatchers"
}, je = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.domTableEvents = {
		meta: Ae,
		bindTableEvents: e.bindTableEvents,
		actions: e.actions,
		state: e.state
	});
}, C = new class {
	constructor() {
		this.dataset = [], this.filteredData = [], this.columns = [], this.selectedIndex = -1, this.container = null, this.renderTable = null, this.onRowClick = null, this.onRowAction = null, this.onFooterSave = null, this.onSearch = null, this.setFeedback = null;
	}
	init({ container: e, dataset: t = [], columns: n = [], renderTable: r = null, onRowClick: i = null, onRowAction: a = null, onFooterSave: o = null, onSearch: s = null, setFeedback: c = null }) {
		this.container = typeof e == "string" ? document.getElementById(e) : e, this.dataset = t, this.filteredData = [...t], this.columns = n, this.selectedIndex = -1, this.renderTable = r, this.onRowClick = i, this.onRowAction = a, this.onFooterSave = o, this.onSearch = s, this.setFeedback = c;
	}
	notifyFeedback(e) {
		if (typeof this.setFeedback == "function") this.setFeedback(e);
		else {
			let t = this.container?.querySelector("#search-feedback, [data-role='feedback']");
			t && (t.textContent = e);
		}
	}
}(), Me = {
	version: "1.2.0",
	description: "Standardized, zero-dependency DOM traversal utilities organized by semantic concerns"
}, Ne = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.domTraversal ??= {}, globalThis.ks.domTraversal.table = {
		meta: Me,
		header: e.header,
		body: e.body,
		footer: e.footer
	});
}, Pe = (e) => e ? ((e.target || e).value || "").trim().toLowerCase() : "", Fe = { getSearchQuery: Pe }, w = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, T = (e, t = "") => {
	let n = w(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, Ie = (e, t = "table-primary", n = "") => {
	let r = w(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, Le = {
	getRowElement: w,
	getRowIndex: T,
	highlightRow: Ie,
	getRowData: (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
		let i = w(e);
		if (!i) return null;
		let a = T(i, r);
		if (n && Array.isArray(n) && a >= 0 && a < n.length) return n[a];
		let o = {}, s = Array.from(i.querySelectorAll(":scope > td, :scope > th"));
		if (t && t.length > 0) {
			let e = 0;
			s.forEach((n) => {
				let r = n.getAttribute("data-name") || n.getAttribute("data-column");
				if (r) o[r] = n.textContent.trim();
				else if (e < t.length) {
					let r = t[e].columnName;
					o[r] = n.textContent.trim(), e++;
				}
			});
		} else s.forEach((e, t) => {
			let n = e.getAttribute("data-name") || e.getAttribute("data-column") || `col_${t}`;
			o[n] = e.textContent.trim();
		});
		return o;
	}
}, Re = (e, t = []) => {
	let n = w(e);
	if (!n) return {};
	let r = {};
	return t && t.length > 0 ? t.forEach((e) => {
		let t = n.querySelector(`input[name="${e.columnName}"]`) || n.querySelector(`input#${e.columnName}`);
		t && (r[e.columnName] = t.value.trim());
	}) : Array.from(n.querySelectorAll("input")).forEach((e) => {
		let t = e.getAttribute("name") || e.id;
		t && (r[t] = e.value.trim());
	}), r;
}, ze = (e) => {
	let t = w(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
};
// node_modules/dom-traversal-functions/src/v2/index.js
Ne({
	header: Fe,
	body: Le,
	footer: {
		getFooterData: Re,
		clearRowInputs: ze
	}
});
// node_modules/dom-table-events/src/v1/actions/onSearch.js
var Be = (e, t) => {
	let n = Pe(t), r = n ? C.dataset.filter((e) => Object.values(e).some((e) => String(e ?? "").toLowerCase().includes(n))) : C.dataset;
	C.filteredData = r, typeof C.renderTable == "function" && C.renderTable(r);
	let i = n ? `Showing ${r.length} of ${C.dataset.length} records matching "${t?.value?.trim() || ""}".` : `Showing all ${C.dataset.length} records.`;
	C.notifyFeedback(i), typeof C.onSearch == "function" && C.onSearch(n, r);
}, Ve = (e, t) => {
	if (e.target.tagName === "BUTTON" || e.target.closest("button") || e.target.tagName === "INPUT") return;
	let n = T(t);
	if (n < 0 || n >= C.dataset.length) return;
	C.selectedIndex = n, Ie(t, "table-primary");
	let r = C.dataset[n];
	C.notifyFeedback(`Selected Row #${n + 1}: ${r.itemName || r.name || JSON.stringify(r)}`), typeof C.onRowClick == "function" && C.onRowClick(r, n, e);
}, He = (e, t) => {
	e.stopPropagation();
	let n = (t.textContent || "").trim().toLowerCase() || t.dataset.action || "click";
	switch (n) {
		case "show":
		case "view": {
			let n = T(t);
			if (n < 0 || n >= C.dataset.length) return;
			C.selectedIndex = n, Ie(t, "table-primary");
			let r = C.dataset[n];
			C.notifyFeedback(`Action [Show] on Row #${n + 1}: ${r.itemName || r.name || ""}`), typeof C.onRowAction == "function" && C.onRowAction("show", r, n, e);
			break;
		}
		case "save": {
			let n = Re(t, C.columns);
			Object.values(n).some((e) => e.length > 0) ? (ze(t), C.dataset.push(n), typeof C.renderTable == "function" && C.renderTable(C.dataset), C.notifyFeedback(`Added new record: "${n.itemName || n.name || ""}"! Total: ${C.dataset.length}.`), typeof C.onFooterSave == "function" && C.onFooterSave(n, e)) : C.notifyFeedback("Please enter values into footer row inputs before saving.");
			break;
		}
		case "delete":
		case "remove": {
			let n = T(t);
			if (n >= 0 && n < C.dataset.length) {
				let t = C.dataset.splice(n, 1)[0];
				typeof C.renderTable == "function" && C.renderTable(C.dataset), C.notifyFeedback(`Deleted record at row #${n + 1}.`), typeof C.onRowAction == "function" && C.onRowAction("delete", t, n, e);
			}
			break;
		}
		default: {
			let r = T(t), i = r >= 0 && r < C.dataset.length ? C.dataset[r] : null;
			typeof C.onRowAction == "function" && C.onRowAction(n, i, r, e);
			break;
		}
	}
}, Ue = ({ container: e, dataset: t = [], columns: n = [], renderTable: r = null, onRowClick: i = null, onRowAction: a = null, onFooterSave: o = null, onSearch: s = null, setFeedback: c = null } = {}) => {
	let l = typeof e == "string" ? document.getElementById(e) : e;
	return l ? (C.init({
		container: l,
		dataset: t,
		columns: n,
		renderTable: r,
		onRowClick: i,
		onRowAction: a,
		onFooterSave: o,
		onSearch: s,
		setFeedback: c
	}), l.addEventListener("click", (e) => {
		let t = e.target.closest("button");
		if (t && l.contains(t)) {
			He(e, t);
			return;
		}
		let n = e.target.closest("tbody tr");
		n && l.contains(n) && i(e, n);
	}), l.addEventListener("input", (e) => {
		let t = e.target;
		t.matches("input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input") && Be(e, t);
	}), C) : (console.warn("[dom-table-events] Container element not found:", e), null);
};
je({
	bindTableEvents: Ue,
	actions: {
		onSearch: Be,
		onRowClick: Ve,
		onButtonClick: He
	},
	state: C
});
// src/v51/registerGlobal/meta.js
var We = {
	name: "json-renderers-build-table",
	version: "v51"
}, Ge = ({ render: e, bindTableEvents: t }) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.table = {
		meta: We,
		render: e,
		bindTableEvents: t
	});
}, Ke = (e) => Array.isArray(e) ? e : [e], qe = (e, t, n) => {
	e[t] = n;
}, Je = {
	set: qe,
	push: (e, t, n) => {
		e[t].push(...Ke(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...Ke(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(Ke(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(Ke(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Ye = Object.defineProperty, Xe = Object.getOwnPropertySymbols, Ze = Object.prototype.hasOwnProperty, Qe = Object.prototype.propertyIsEnumerable, $e = Math.pow, et = (e, t, n) => t in e ? Ye(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, tt = (e, t) => {
	for (var n in t ||= {}) Ze.call(t, n) && et(e, n, t[n]);
	if (Xe) for (var n of Xe(t)) Qe.call(t, n) && et(e, n, t[n]);
	return e;
}, nt = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, rt = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, E = () => void 0, it = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = k(e);
		return r === k(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = O(e), a = O(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, at = (e, t, n = E) => {
	let r = [];
	if (!it(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!it(ot(e.x, t), ot(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !D(o, i) || !D(a, i)) return !1;
			let s = a[i];
			if (!D(o, i) || !it(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, D = (e, t) => Object.prototype.hasOwnProperty.call(e, t), ot = (e, t) => D(e, t) ? e[t] : void 0, st = 16383, ct = 1e3, O = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > ct) throw new rt(`Member name too long (maximum ${ct} characters)`);
	return t;
}, k = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, lt = (e) => e instanceof RangeError && /call stack/i.test(e.message), A = (e) => Array.isArray(e), j = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), M = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, N = (e) => typeof e == "number", P = (e) => typeof e == "string", ut = (e) => e === void 0, F = (e) => e !== void 0;
function dt(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function ft(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function pt(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var mt = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function I(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Rr }, a = Rr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", h = "size", g = "empty", _ = "true", v = "false", y = "null", ee = /^[,\]]/, b = /^[+\-]/, x = /^[*\/]/, te = /^[a-zA-Z_]/, ne = /^[\x80-\uFFFF_]/, re = /^[a-zA-Z0-9_]/, ie = /^[0-9@$\-]/, ae = /^[^\/\\]/, oe = /^[gimsuy]/, se = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ce = /^[\uD800-\uDBFF]/, le = /^[\uDC00-\uDFFF]/, S = /^[0-9]/, ue = /^[1-9]/, de = /^[eE]/, fe = /^["\\]/, pe = /^['\\]/, me = /^[ -\uD7FF\uE000-\uFFFF]/, he = /^[dD]/, ge = /^[89abAB]/, _e = /^[c-fC-F]/, ve = /^[0-9a-fA-F]/, ye = /^[ \t\n\r]/, be = J([",", "]"], !1, !1, !1), xe = q("length", !1), Se = q("count", !1), Ce = q("match", !1), we = q("search", !1), Te = q("value", !1), Ee = J(["+", "-"], !1, !1, !1), De = J(["*", "/"], !1, !1, !1), Oe = Nr("string"), ke = J([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Ae = J([["", "￿"], "_"], !1, !1, !1), je = J([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), C = q("-", !1), Me = J([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ne = q("$", !1), Pe = q("@", !1), Fe = q("..", !1), w = q(".", !1), T = q("*", !1), Ie = q("&&", !1), Le = q("||", !1), Re = q("!", !1), ze = q("==", !1), Be = q("!=", !1), Ve = q(">=", !1), He = q(">", !1), Ue = q("<=", !1), We = q("<", !1), Ge = q("=~", !1), Ke = q("in", !1), qe = q("nin", !1), Je = q("subsetof", !1), Ye = q("anyof", !1), Xe = q("noneof", !1), Ze = q("sizeof", !1), Qe = q("size", !1), $e = q("empty", !1), et = q("true", !1), tt = q("false", !1), nt = q("null", !1), rt = q("{", !1), E = q("}", !1), it = q("[", !1), at = q("]", !1), D = q(":", !1), ot = q(",", !1), st = q("(", !1), ct = q(")", !1), O = q("?", !1), k = Nr("regex"), lt = q("/", !1), A = J(["/", "\\"], !0, !1, !1), j = q("\\", !1), M = jr(), N = J([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), P = J([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), ut = J([["\ud800", "\udbff"]], !1, !1, !1), F = J([["\udc00", "\udfff"]], !1, !1, !1), I = J([["0", "9"]], !1, !1, !1), ht = Nr("number"), gt = q("0", !1), L = J([["1", "9"]], !1, !1, !1), _t = Nr("integer"), vt = J(["e", "E"], !1, !1, !1), yt = q("\"", !1), bt = q("'", !1), xt = J(["\"", "\\"], !1, !1, !1), St = J(["'", "\\"], !1, !1, !1), Ct = J([[" ", "퟿"], ["", "￿"]], !1, !1, !1), wt = q("b", !1), Tt = q("f", !1), Et = q("n", !1), Dt = q("r", !1), Ot = q("t", !1), kt = q("u", !1), At = J(["d", "D"], !1, !1, !1), jt = J([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Mt = q("\\u", !1), Nt = J([["c", "f"], ["C", "F"]], !1, !1, !1), Pt = J([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Ft = J([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function It(e) {
		return {
			type: "root",
			next: dt(e)
		};
	}
	function Lt(e) {
		return e.map((e) => e[1]);
	}
	function R(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Rt(e) {
		return e;
	}
	function zt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Bt() {
		return { type: "wildcard" };
	}
	function Vt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Ht() {
		return { type: "wildcard" };
	}
	function Ut(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Wt(e) {
		return e;
	}
	function Gt(e) {
		return e;
	}
	function Kt(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function qt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Jt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Yt(e, t) {
		return pt(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function Xt(e, t) {
		return pt(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function Zt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Qt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function $t(e, t) {
		return t !== null || ft(e);
	}
	function en(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function tn(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function nn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function rn() {
		return { operator: "empty" };
	}
	function an() {
		return "eq";
	}
	function on() {
		return "ne";
	}
	function sn() {
		return "le";
	}
	function cn() {
		return "lt";
	}
	function ln() {
		return "ge";
	}
	function un() {
		return "gt";
	}
	function dn() {
		return "in";
	}
	function fn() {
		return "nin";
	}
	function pn() {
		return "subsetof";
	}
	function mn() {
		return "anyof";
	}
	function hn() {
		return "noneof";
	}
	function gn() {
		return "sizeof";
	}
	function _n() {
		return "size";
	}
	function vn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function yn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function bn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function xn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Sn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function Cn() {
		return "length";
	}
	function wn() {
		return "count";
	}
	function Tn() {
		return "match";
	}
	function En() {
		return "search";
	}
	function Dn() {
		return "value";
	}
	function On(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function kn(e, t) {
		return t.length === 0 ? e : pt(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function An(e, t) {
		return t.length === 0 ? e : pt(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function jn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function Mn(e) {
		return {
			type: "root",
			next: dt(e)
		};
	}
	function Nn(e) {
		return {
			type: "current",
			next: dt(e)
		};
	}
	function Pn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Fn() {
		return { type: "wildcard" };
	}
	function In(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Ln(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function z(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Rn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function zn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Bn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Vn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Hn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Un() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Wn(e) {
		return e;
	}
	function Gn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Kn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function qn(e, t) {
		return [e, t.value];
	}
	function Jn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Yn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Xn(e) {
		return _a(e);
	}
	function Zn(e) {
		return _a(e);
	}
	function Qn() {
		return "true";
	}
	function $n() {
		return "false";
	}
	function er() {
		return "null";
	}
	function tr(e) {
		return _a(e);
	}
	function nr() {
		return "true";
	}
	function rr() {
		return "false";
	}
	function ir() {
		return "null";
	}
	function ar(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function B(e) {
		return e.join("");
	}
	function or(e, t) {
		let n = parseFloat(Or());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function sr() {
		let e = parseInt(Or(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function cr(e) {
		return e.join("");
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e) {
		return e;
	}
	function dr() {
		return "\"";
	}
	function fr(e) {
		return e;
	}
	function pr(e) {
		return e;
	}
	function mr() {
		return "'";
	}
	function hr(e) {
		return e;
	}
	function gr() {
		return "\\";
	}
	function _r() {
		return "/";
	}
	function vr() {
		return "\b";
	}
	function yr() {
		return "\f";
	}
	function br() {
		return "\n";
	}
	function xr() {
		return "\r";
	}
	function Sr() {
		return "	";
	}
	function Cr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function wr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Tr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let V = t.peg$currPos | 0, H = V, U = [{
		line: 1,
		column: 1
	}], W = V, Er = t.peg$maxFailExpected || [], G = t.peg$silentFails | 0, K = /* @__PURE__ */ new Map(), Dr;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Or() {
		return e.substring(H, V);
	}
	function kr(e, t) {
		throw t = t === void 0 ? Fr(H, V) : t, Ir(e, t);
	}
	function Ar(t = V) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function q(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function J(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function jr() {
		return { type: "any" };
	}
	function Mr() {
		return { type: "end" };
	}
	function Nr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Pr(t) {
		let n = U[t], r;
		if (n) return n;
		if (t >= U.length) r = U.length - 1;
		else for (r = t; !U[--r];);
		for (n = U[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return U[t] = n, n;
	}
	function Fr(e, t, n) {
		let i = Pr(e), a = Pr(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function Y(e) {
		V < W || (V > W && (W = V, Er = []), Er.push(e));
	}
	function Ir(e, t) {
		return new mt(e, null, null, t);
	}
	function Lr(e, t, n) {
		return new mt(mt.buildMessage(e, t), e, t, n);
	}
	function Rr() {
		let e, t, r, i;
		return e = V, t = Si(), t === n ? (V = e, e = n) : (r = zr(), i = ga(), i === n ? (V = e, e = n) : (H = e, e = It(r))), e;
	}
	function zr() {
		let e, t, r, i, a;
		for (e = V, t = [], r = V, i = $(), a = Br(), a === n ? (V = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = V, i = $(), a = Br(), a === n ? (V = r, r = n) : (i = [i, a], r = i);
		return H = e, t = Lt(t), e = t, e;
	}
	function Br() {
		let e;
		return e = Hr(), e === n && (e = Vr()), e;
	}
	function Vr() {
		let e, t, r;
		return e = V, t = Ti(), t === n ? (V = e, e = n) : (r = Ur(), r === n ? (V = e, e = n) : (H = e, e = R(r))), e === n && (e = V, t = Gr(), t !== n && (H = e, t = Rt(t)), e = t), e;
	}
	function Hr() {
		let e, t, r;
		return e = V, t = wi(), t === n ? (V = e, e = n) : (r = Wr(), r === n ? (V = e, e = n) : (H = e, e = zt(r))), e;
	}
	function Ur() {
		let e, t;
		return e = V, t = Ei(), t !== n && (H = e, t = Bt()), e = t, e === n && (e = V, t = xi(), t !== n && (H = e, t = Vt(t)), e = t), e;
	}
	function Wr() {
		let e, t;
		return e = V, t = Ei(), t !== n && (H = e, t = Ht()), e = t, e === n && (e = V, t = xi(), t !== n && (H = e, t = Ut(t)), e = t, e === n && (e = V, t = Gr(), t !== n && (H = e, t = Wt(t)), e = t)), e;
	}
	function Gr() {
		let e, t, r, i;
		return e = V, t = Xi(), t === n ? (V = e, e = n) : ($(), r = Kr(), r === n ? (V = e, e = n) : ($(), i = Zi(), i === n ? (V = e, e = n) : (H = e, e = Gt(r)))), e;
	}
	function Kr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ui(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ui(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ui(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Kt(t, r);
		} else V = e, e = n;
		return e;
	}
	function qr() {
		let t, r, i, a, o, s, c, l, u;
		return t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = $i(), i === n ? (V = t, t = n) : ($(), a = Jr(), a === n ? (V = t, t = n) : ($(), o = ea(), o === n ? (V = t, t = n) : (s = V, G++, c = V, l = $(), u = e.charAt(V), ee.test(u) ? V++ : (u = n, G === 0 && Y(be)), u === n ? (V = c, c = n) : (l = [l, u], c = l), G--, c === n ? s = n : (V = s, s = void 0), s === n ? (V = t, t = n) : (H = t, t = qt(a)))))), t === n && (t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = Jr(), i === n ? (V = t, t = n) : (H = t, t = Jt(i)))), t;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c, l = V * 91 + 10, u = K.get(l);
		if (u) return V = u.nextPos, u.result;
		if (e = V, t = Yr(), t !== n) {
			for (r = [], i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Yr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Yr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Yt(t, r);
		} else V = e, e = n;
		return K.set(l, {
			nextPos: V,
			result: e
		}), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = Xr(), t !== n) {
			for (r = [], i = V, a = $(), o = Di(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Di(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Xt(t, r);
		} else V = e, e = n;
		return e;
	}
	function Xr() {
		let e, t, r, i, a;
		return e = V, t = ki(), t === n ? (V = e, e = n) : ($(), r = $i(), r === n ? (V = e, e = n) : ($(), i = Jr(), i === n ? (V = e, e = n) : ($(), a = ea(), a === n ? (V = e, e = n) : (H = e, e = Zt(i))))), e === n && (e = V, t = ki(), t === n ? (V = e, e = n) : ($(), r = ei(), r === n ? (V = e, e = n) : (H = e, e = Qt(r))), e === n && (e = Zr())), e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = V, t = ai(), t === n ? (V = e, e = n) : (r = V, i = $(), a = Qr(), a === n ? (V = r, r = n) : (i = [i, a], r = i), r === n && (r = null), H = V, i = $t(t, r), i = i ? void 0 : n, i === n ? (V = e, e = n) : (H = e, e = en(t, r))), e === n && (e = ei()), e;
	}
	function Qr() {
		let e, t, r;
		return e = V, t = $r(), t === n ? (V = e, e = n) : ($(), r = ai(), r === n ? (V = e, e = n) : (H = e, e = tn(t, r))), e === n && (e = V, t = Ii(), t === n ? (V = e, e = n) : ($(), r = di(), r === n ? (V = e, e = n) : (H = e, e = nn(r))), e === n && (e = V, t = Wi(), t !== n && (H = e, t = rn()), e = t)), e;
	}
	function $r() {
		let e, t;
		return e = V, t = Ai(), t !== n && (H = e, t = an()), e = t, e === n && (e = V, t = ji(), t !== n && (H = e, t = on()), e = t, e === n && (e = V, t = Pi(), t !== n && (H = e, t = sn()), e = t, e === n && (e = V, t = Fi(), t !== n && (H = e, t = cn()), e = t, e === n && (e = V, t = Mi(), t !== n && (H = e, t = ln()), e = t, e === n && (e = V, t = Ni(), t !== n && (H = e, t = un()), e = t, e === n && (e = V, t = Li(), t !== n && (H = e, t = dn()), e = t, e === n && (e = V, t = Ri(), t !== n && (H = e, t = fn()), e = t, e === n && (e = V, t = zi(), t !== n && (H = e, t = pn()), e = t, e === n && (e = V, t = Bi(), t !== n && (H = e, t = mn()), e = t, e === n && (e = V, t = Vi(), t !== n && (H = e, t = hn()), e = t, e === n && (e = V, t = Hi(), t !== n && (H = e, t = gn()), e = t, e === n && (e = V, t = Ui(), t !== n && (H = e, t = _n()), e = t)))))))))))), e;
	}
	function ei() {
		let e, t, r, i;
		return e = V, t = $i(), t === n ? (V = e, e = n) : ($(), r = Jr(), r === n ? (V = e, e = n) : ($(), i = ea(), i === n ? (V = e, e = n) : (H = e, e = vn(r)))), e === n && (e = ti(), e === n && (e = ci(), e === n && (e = V, t = Gi(), t !== n && (H = e, t = yn()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = bn()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = xn()), e = t))))), e;
	}
	function ti() {
		let e, t, r, i, a;
		return e = V, t = ni(), t === n ? (V = e, e = n) : (r = $i(), r === n ? (V = e, e = n) : ($(), i = ri(), i === n && (i = null), $(), a = ea(), a === n ? (V = e, e = n) : (H = e, e = Sn(t, i)))), e;
	}
	function ni() {
		let t, r;
		return t = V, e.substr(V, 6) === o ? (r = o, V += 6) : (r = n, G === 0 && Y(xe)), r !== n && (H = t, r = Cn()), t = r, t === n && (t = V, e.substr(V, 5) === s ? (r = s, V += 5) : (r = n, G === 0 && Y(Se)), r !== n && (H = t, r = wn()), t = r, t === n && (t = V, e.substr(V, 5) === c ? (r = c, V += 5) : (r = n, G === 0 && Y(Ce)), r !== n && (H = t, r = Tn()), t = r, t === n && (t = V, e.substr(V, 6) === l ? (r = l, V += 6) : (r = n, G === 0 && Y(we)), r !== n && (H = t, r = En()), t = r, t === n && (t = V, e.substr(V, 5) === u ? (r = u, V += 5) : (r = n, G === 0 && Y(Te)), r !== n && (H = t, r = Dn()), t = r)))), t;
	}
	function ri() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ii(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ii(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ii(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = On(t, r);
		} else V = e, e = n;
		return e;
	}
	function ii() {
		let e;
		return e = ai(), e === n && (e = pi()), e;
	}
	function ai() {
		let t, r, i, a, o, s, c, l, u = V * 91 + 21, d = K.get(u);
		if (d) return V = d.nextPos, d.result;
		if (t = V, r = oi(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), b.test(s) ? V++ : (s = n, G === 0 && Y(Ee)), s === n ? (V = a, a = n) : (c = $(), l = oi(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), b.test(s) ? V++ : (s = n, G === 0 && Y(Ee)), s === n ? (V = a, a = n) : (c = $(), l = oi(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = kn(r, i);
		} else V = t, t = n;
		return K.set(u, {
			nextPos: V,
			result: t
		}), t;
	}
	function oi() {
		let t, r, i, a, o, s, c, l;
		if (t = V, r = si(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), x.test(s) ? V++ : (s = n, G === 0 && Y(De)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), x.test(s) ? V++ : (s = n, G === 0 && Y(De)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = An(r, i);
		} else V = t, t = n;
		return t;
	}
	function si() {
		let e, t, r, i;
		return e = V, t = $i(), t === n ? (V = e, e = n) : ($(), r = ai(), r === n ? (V = e, e = n) : ($(), i = ea(), i === n ? (V = e, e = n) : (H = e, e = jn(r)))), e === n && (e = ti(), e === n && (e = fi(), e === n && (e = ci()))), e;
	}
	function ci() {
		let e, t, r;
		return e = V, t = Si(), t === n ? (V = e, e = n) : (r = zr(), r === n ? (V = e, e = n) : (H = e, e = Mn(r))), e === n && (e = V, t = Ci(), t === n ? (V = e, e = n) : (r = zr(), r === n ? (V = e, e = n) : (H = e, e = Nn(r)))), e;
	}
	function li() {
		let e, t, r, i, a, o, s, c, l;
		return e = V, t = V, r = la(), r === n ? (V = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (V = e, e = n) : (i = $(), a = V, o = la(), o === n ? (V = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = V, s = Qi(), s === n ? (V = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), H = e, e = Pn(t, a, o)), e;
	}
	function ui() {
		let e, t;
		return e = qr(), e === n && (e = li(), e === n && (e = V, t = Ei(), t !== n && (H = e, t = Fn()), e = t, e === n && (e = V, t = la(), t !== n && (H = e, t = In(t)), e = t, e === n && (e = V, t = da(), t !== n && (H = e, t = Ln(t)), e = t, e === n && (e = V, t = yi(), t !== n && (H = e, t = z(t)), e = t))))), e;
	}
	function di() {
		let e, t, r;
		return e = V, t = na(), t === n ? (V = e, e = n) : (r = ra(), H = e, e = Rn(t, r)), e;
	}
	function fi() {
		let e, t;
		return e = V, t = pi(), t !== n && (H = e, t = zn(t)), e = t, e === n && (e = V, t = sa(), t !== n && (H = e, t = Bn(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = V, t = Gi(), t !== n && (H = e, t = Vn()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = Hn()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = Un()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return G++, e = V, t = da(), t !== n && (H = e, t = Wn(t)), e = t, G--, e === n && (t = n, G === 0 && Y(Oe)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = V, t = Ji(), t === n ? (V = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (V = e, e = n) : (H = e, e = Gn(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = gi(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = gi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = gi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Kn(t, r);
		} else V = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = V, t = da(), t === n ? (V = e, e = n) : ($(), r = Qi(), r === n ? (V = e, e = n) : ($(), i = fi(), i === n ? (V = e, e = n) : (H = e, e = qn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = V, t = Xi(), t === n ? (V = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (V = e, e = n) : (H = e, e = Jn(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = fi(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = fi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = fi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Yn(t, r);
		} else V = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = V, r = V, i = V, a = e.charAt(V), te.test(a) ? V++ : (a = n, G === 0 && Y(ke)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else V = i, i = n;
		if (r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Xn(r)), t = r, t === n) {
			if (t = V, r = V, i = [], a = e.charAt(V), ne.test(a) ? V++ : (a = n, G === 0 && Y(Ae)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(V), ne.test(a) ? V++ : (a = n, G === 0 && Y(Ae));
			else i = n;
			r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Zn(r)), t = r, t === n && (t = V, r = Gi(), r !== n && (H = t, r = Qn()), t = r, t === n && (t = V, r = Ki(), r !== n && (H = t, r = $n()), t = r, t === n && (t = V, r = qi(), r !== n && (H = t, r = er()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(V), re.test(t) ? V++ : (t = n, G === 0 && Y(je)), t === n && (t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && Y(C)), r === n ? (V = t, t = n) : (i = V, G++, a = e.charAt(V), ie.test(a) ? V++ : (a = n, G === 0 && Y(Me)), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = V, t = ia(), t !== n && (H = e, t = tr(t)), e = t, e === n && (e = V, t = Gi(), t !== n && (H = e, t = nr()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = rr()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = ir()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(V) === 36 ? (t = "$", V++) : (t = n, G === 0 && Y(Ne)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(V) === 64 ? (t = "@", V++) : (t = n, G === 0 && Y(Pe)), t;
	}
	function wi() {
		let t;
		return e.substr(V, 2) === ".." ? (t = "..", V += 2) : (t = n, G === 0 && Y(Fe)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(V) === 46 ? (t = ".", V++) : (t = n, G === 0 && Y(w)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(V) === 42 ? (t = "*", V++) : (t = n, G === 0 && Y(T)), t;
	}
	function Di() {
		let t;
		return e.substr(V, 2) === "&&" ? (t = "&&", V += 2) : (t = n, G === 0 && Y(Ie)), t;
	}
	function Oi() {
		let t;
		return e.substr(V, 2) === "||" ? (t = "||", V += 2) : (t = n, G === 0 && Y(Le)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(V) === 33 ? (t = "!", V++) : (t = n, G === 0 && Y(Re)), t;
	}
	function Ai() {
		let t;
		return e.substr(V, 2) === "==" ? (t = "==", V += 2) : (t = n, G === 0 && Y(ze)), t;
	}
	function ji() {
		let t;
		return e.substr(V, 2) === "!=" ? (t = "!=", V += 2) : (t = n, G === 0 && Y(Be)), t;
	}
	function Mi() {
		let t;
		return e.substr(V, 2) === ">=" ? (t = ">=", V += 2) : (t = n, G === 0 && Y(Ve)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(V) === 62 ? (t = ">", V++) : (t = n, G === 0 && Y(He)), t;
	}
	function Pi() {
		let t;
		return e.substr(V, 2) === "<=" ? (t = "<=", V += 2) : (t = n, G === 0 && Y(Ue)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(V) === 60 ? (t = "<", V++) : (t = n, G === 0 && Y(We)), t;
	}
	function Ii() {
		let t;
		return e.substr(V, 2) === "=~" ? (t = "=~", V += 2) : (t = n, G === 0 && Y(Ge)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = V, e.substr(V, 2) === "in" ? (r = "in", V += 2) : (r = n, G === 0 && Y(Ke)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = V, e.substr(V, 3) === "nin" ? (r = "nin", V += 3) : (r = n, G === 0 && Y(qe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = V, e.substr(V, 8) === d ? (r = d, V += 8) : (r = n, G === 0 && Y(Je)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === f ? (r = f, V += 5) : (r = n, G === 0 && Y(Ye)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === p ? (r = p, V += 6) : (r = n, G === 0 && Y(Xe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === m ? (r = m, V += 6) : (r = n, G === 0 && Y(Ze)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === h ? (r = h, V += 4) : (r = n, G === 0 && Y(Qe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === g ? (r = g, V += 5) : (r = n, G === 0 && Y($e)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === _ ? (r = _, V += 4) : (r = n, G === 0 && Y(et)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === v ? (r = v, V += 5) : (r = n, G === 0 && Y(tt)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === y ? (r = y, V += 4) : (r = n, G === 0 && Y(nt)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(V) === 123 ? (t = "{", V++) : (t = n, G === 0 && Y(rt)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(V) === 125 ? (t = "}", V++) : (t = n, G === 0 && Y(E)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(V) === 91 ? (t = "[", V++) : (t = n, G === 0 && Y(it)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(V) === 93 ? (t = "]", V++) : (t = n, G === 0 && Y(at)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(V) === 58 ? (t = ":", V++) : (t = n, G === 0 && Y(D)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(V) === 44 ? (t = ",", V++) : (t = n, G === 0 && Y(ot)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(V) === 40 ? (t = "(", V++) : (t = n, G === 0 && Y(st)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(V) === 41 ? (t = ")", V++) : (t = n, G === 0 && Y(ct)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(V) === 63 ? (t = "?", V++) : (t = n, G === 0 && Y(O)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && Y(lt)), r !== n) {
			for (i = [], a = e.charAt(V), ae.test(a) ? V++ : (a = n, G === 0 && Y(A)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && Y(j)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && Y(M)), s === n ? (V = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(V), ae.test(a) ? V++ : (a = n, G === 0 && Y(A)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && Y(j)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && Y(M)), s === n ? (V = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(V) === 47 ? (a = "/", V++) : (a = n, G === 0 && Y(lt)), a === n ? (V = t, t = n) : (H = t, t = ar(i));
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && Y(k)), t;
	}
	function ra() {
		let t, r, i;
		for (t = V, r = [], i = e.charAt(V), oe.test(i) ? V++ : (i = n, G === 0 && Y(N)); i !== n;) r.push(i), i = e.charAt(V), oe.test(i) ? V++ : (i = n, G === 0 && Y(N));
		return H = t, r = B(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = V, r = V, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else V = r, r = n;
		return t = r === n ? r : e.substring(t, V), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(V), se.test(t) ? V++ : (t = n, G === 0 && Y(P)), t === n && (t = V, r = e.charAt(V), ce.test(r) ? V++ : (r = n, G === 0 && Y(ut)), r === n ? (V = t, t = n) : (i = e.charAt(V), le.test(i) ? V++ : (i = n, G === 0 && Y(F)), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(V), S.test(t) ? V++ : (t = n, G === 0 && Y(I))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (G++, t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && Y(C)), r === n && (r = null), i = ca(), i !== n) {
			if (a = V, e.charCodeAt(V) === 46 ? (o = ".", V++) : (o = n, G === 0 && Y(w)), o !== n) {
				if (s = [], c = e.charAt(V), S.test(c) ? V++ : (c = n, G === 0 && Y(I)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(V), S.test(c) ? V++ : (c = n, G === 0 && Y(I));
				else s = n;
				s === n ? (V = a, a = n) : (o = [o, s], a = o);
			} else V = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), H = t, t = or(a, o);
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && Y(ht)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(V) === 48 ? (t = "0", V++) : (t = n, G === 0 && Y(gt)), t === n) {
			if (t = V, r = e.charAt(V), ue.test(r) ? V++ : (r = n, G === 0 && Y(L)), r !== n) {
				for (i = [], a = e.charAt(V), S.test(a) ? V++ : (a = n, G === 0 && Y(I)); a !== n;) i.push(a), a = e.charAt(V), S.test(a) ? V++ : (a = n, G === 0 && Y(I));
				r = [r, i], t = r;
			} else V = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 48 ? (r = "0", V++) : (r = n, G === 0 && Y(gt)), r === n) {
			if (r = V, e.charCodeAt(V) === 45 ? (i = "-", V++) : (i = n, G === 0 && Y(C)), i === n && (i = null), a = e.charAt(V), ue.test(a) ? V++ : (a = n, G === 0 && Y(L)), a !== n) {
				for (o = [], s = e.charAt(V), S.test(s) ? V++ : (s = n, G === 0 && Y(I)); s !== n;) o.push(s), s = e.charAt(V), S.test(s) ? V++ : (s = n, G === 0 && Y(I));
				i = [
					i,
					a,
					o
				], r = i;
			} else V = r, r = n;
		}
		return r !== n && (H = t, r = sr()), t = r, G--, t === n && (r = n, G === 0 && Y(_t)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = V, r = e.charAt(V), de.test(r) ? V++ : (r = n, G === 0 && Y(vt)), r !== n) {
			if (i = e.charAt(V), b.test(i) ? V++ : (i = n, G === 0 && Y(Ee)), i === n && (i = null), a = [], o = e.charAt(V), S.test(o) ? V++ : (o = n, G === 0 && Y(I)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(V), S.test(o) ? V++ : (o = n, G === 0 && Y(I));
			else a = n;
			a === n ? (V = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else V = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (G++, t = V, e.charCodeAt(V) === 34 ? (r = "\"", V++) : (r = n, G === 0 && Y(yt)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(V) === 34 ? (a = "\"", V++) : (a = n, G === 0 && Y(yt)), a === n ? (V = t, t = n) : (H = t, t = cr(i));
		} else V = t, t = n;
		if (t === n) {
			if (t = V, e.charCodeAt(V) === 39 ? (r = "'", V++) : (r = n, G === 0 && Y(bt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(V) === 39 ? (a = "'", V++) : (a = n, G === 0 && Y(bt)), a === n ? (V = t, t = n) : (H = t, t = lr(i));
			} else V = t, t = n;
		}
		return G--, t === n && (r = n, G === 0 && Y(Oe)), t;
	}
	function fa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), fe.test(i) ? V++ : (i = n, G === 0 && Y(xt)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = ur(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(j)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 34 ? (i = "\"", V++) : (i = n, G === 0 && Y(yt)), i === n ? (V = t, t = n) : (H = t, t = dr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(j)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = fr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), pe.test(i) ? V++ : (i = n, G === 0 && Y(St)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = pr(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(j)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 39 ? (i = "'", V++) : (i = n, G === 0 && Y(bt)), i === n ? (V = t, t = n) : (H = t, t = mr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(j)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = hr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(V), me.test(t) ? V++ : (t = n, G === 0 && Y(Ct)), t === n && (t = V, r = V, i = e.charAt(V), ce.test(i) ? V++ : (i = n, G === 0 && Y(ut)), i === n ? (V = r, r = n) : (a = e.charAt(V), le.test(a) ? V++ : (a = n, G === 0 && Y(F)), a === n ? (V = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, V)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(j)), r !== n && (H = t, r = gr()), t = r, t === n && (t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && Y(lt)), r !== n && (H = t, r = _r()), t = r, t === n && (t = V, e.charCodeAt(V) === 98 ? (r = "b", V++) : (r = n, G === 0 && Y(wt)), r !== n && (H = t, r = vr()), t = r, t === n && (t = V, e.charCodeAt(V) === 102 ? (r = "f", V++) : (r = n, G === 0 && Y(Tt)), r !== n && (H = t, r = yr()), t = r, t === n && (t = V, e.charCodeAt(V) === 110 ? (r = "n", V++) : (r = n, G === 0 && Y(Et)), r !== n && (H = t, r = br()), t = r, t === n && (t = V, e.charCodeAt(V) === 114 ? (r = "r", V++) : (r = n, G === 0 && Y(Dt)), r !== n && (H = t, r = xr()), t = r, t === n && (t = V, e.charCodeAt(V) === 116 ? (r = "t", V++) : (r = n, G === 0 && Y(Ot)), r !== n && (H = t, r = Sr()), t = r, t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && Y(kt)), r === n ? (V = t, t = n) : (i = V, a = V, o = e.charAt(V), he.test(o) ? V++ : (o = n, G === 0 && Y(At)), o === n ? (V = a, a = n) : (s = e.charAt(V), ge.test(s) ? V++ : (s = n, G === 0 && Y(jt)), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (e.substr(V, 2) === "\\u" ? (a = "\\u", V += 2) : (a = n, G === 0 && Y(Mt)), a === n ? (V = t, t = n) : (o = V, s = V, c = e.charAt(V), he.test(c) ? V++ : (c = n, G === 0 && Y(At)), c === n ? (V = s, s = n) : (l = e.charAt(V), _e.test(l) ? V++ : (l = n, G === 0 && Y(Nt)), l === n ? (V = s, s = n) : (u = Z(), u === n ? (V = s, s = n) : (d = Z(), d === n ? (V = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, V), o === n ? (V = t, t = n) : (H = t, t = Cr(i, o))))), t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && Y(kt)), r === n ? (V = t, t = n) : (i = V, a = V, o = Z(), o === n ? (V = a, a = n) : (s = Z(), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (H = V, a = wr(i), a = a ? n : void 0, a === n ? (V = t, t = n) : (H = t, t = Tr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(V), ve.test(t) ? V++ : (t = n, G === 0 && Y(Pt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(V), re.test(t) ? V++ : (t = n, G === 0 && Y(je)), t;
	}
	function $() {
		let t, r;
		for (G++, t = [], r = e.charAt(V), ye.test(r) ? V++ : (r = n, G === 0 && Y(Ft)); r !== n;) t.push(r), r = e.charAt(V), ye.test(r) ? V++ : (r = n, G === 0 && Y(Ft));
		return G--, t;
	}
	function ga() {
		let t, r;
		return t = V, G++, e.length > V ? (r = e.charAt(V), V++) : (r = n, G === 0 && Y(M)), G--, r === n ? t = void 0 : (V = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && kr("Member name too long (maximum 1000 characters)"), e;
	}
	Dr = a();
	let va = Dr !== n && V === e.length;
	function ya() {
		throw Dr !== n && V < e.length && Y(Mr()), Lr(Er, W < e.length ? Ar(W) : null, W < e.length ? Fr(W, W + 1) : Fr(W, W));
	}
	if (t.peg$library) return {
		peg$result: Dr,
		peg$currPos: V,
		peg$FAILED: n,
		peg$maxFailExpected: Er,
		peg$maxFailPos: W,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return Dr;
	ya();
}
var ht = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), gt = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, L = (e) => {
	throw new nt(1, 1, e);
}, _t = (e) => e.type === "root" || e.type === "current", vt = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function yt(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (_t(i)) r === "value" && !vt(i) && L("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && L(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = ht.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = gt[e], a = i.args;
				a.length !== n.args.length && L(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && L(`The result of ${e}() must be compared`), r === "value" && n.logical && L(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && L("A literal must be compared");
		}
	}
}
function bt(e) {
	let t;
	try {
		t = I(e);
	} catch (e) {
		if (lt(e)) throw new nt(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new nt(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new nt(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return yt(t), t;
}
var xt = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), St = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), Ct = (e) => e >= 55296 && e <= 56319, wt = (e) => e >= 56320 && e <= 57343, Tt = (e) => e !== void 0 && e >= "0" && e <= "9", Et = (e, t) => {
	let n = e.charCodeAt(t);
	return Ct(n) && wt(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : Ct(n) || wt(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, Dt = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !xt.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, Ot = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return St.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, kt = (e, t) => {
	let n = e[t];
	return n === "\\" ? Dt(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : Et(e, t);
}, At = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = Ot(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = kt(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = kt(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, jt = (e, t) => {
	let n = t + 1, r = n;
	for (; Tt(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; Tt(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Mt = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? jt(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = At(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = Ot(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = Dt(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = Et(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Nt = 1e3, Pt = 1e3, Ft = 16, It = /^[dgimsuy]*$/, Lt = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, R = class extends Error {}, Rt = 0, zt = 1, Bt = 2, Vt = 3, Ht = 4, Ut = 5, Wt = $e(2, 31) - 1, Gt = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > Wt - t - 2 || r.step > Wt - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Kt = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), qt = /^\{(\d+)(?:,(\d*))?\}/, Jt = /^[0-9a-fA-F]{4}/, Yt = /^\(\?([ims]*)(?:-([ims]*))?:/, Xt = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Zt = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new R("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = Yt.exec(e.slice(t, t + 12));
				if (!r) throw new R("lookaround or named group");
				let i = tt({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new R("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new R("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new R("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Kt.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new R("trailing backslash");
		if (r === "b" || r === "B") throw new R("word boundary");
		if (r >= "1" && r <= "9") throw new R("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new R("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Jt.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Jt.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = qt.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Nt || i !== Infinity && i > Nt) throw new R("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Qt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Nt) throw new R("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(Ut);
	}
	compile(e) {
		if (++this.work > 4 * Nt) throw new R("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Rt, this.atomId(e));
				return;
			case "bol":
				this.emit(Vt, +!!e.multiline);
				return;
			case "eol":
				this.emit(Ht, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(zt);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Bt)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(zt);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Bt, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(zt);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, $t = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Zt(e, r, t, n).parse(), a = new Qt(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, en = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: h, stack: g, atomGen: _, atomHit: v } = r, y = r.gen, ee = r.step;
	r.gen = y + t.length + 2, r.step = ee + t.length + 2;
	let b = 0, x = !1, te = (e, n, r) => {
		let s = 0;
		g[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = g[--s];
			if (h[r] !== y) switch (h[r] = y, ++c === 64 && (u(c), c = 0), i[r]) {
				case Rt:
					e[n++] = r;
					break;
				case Ut: return u(c), x = !0, n;
				case Bt:
					g[s++] = a[r];
					break;
				case zt:
					g[s++] = o[r], g[s++] = a[r];
					break;
				case Vt:
					(b === 0 || a[r] === 1 && Xt(t.charCodeAt(b - 1))) && (g[s++] = r + 1);
					break;
				case Ht: (b === t.length || a[r] === 1 && Xt(t.charCodeAt(b))) && (g[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (y++, p = te(d, 0, 0), x) return !0;
	for (; b < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(b) : t.charCodeAt(b)) > 65535 ? 2 : 1, n = t.slice(b, b + e), r = ee + b + 1;
		y++, m = 0, b += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (_[i] !== r) {
				_[i] = r;
				let e = s[i];
				v[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (v[i] === 1 && (m = te(f, m, t + 1), x)) return !0;
		}
		if (!l && (m = te(f, m, 0), x)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, tn = (e, t, n) => {
	let r = Gt(e, t.length);
	try {
		return en(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, nn = 256, rn = /* @__PURE__ */ new Map(), an = 0, on = (e, t, n, r, i = !1) => {
	if (e.length > Pt || t.length > 7 || !It.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = rn.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Lt(s) > Ft ? null : $t(n ? `^(?:${s})$` : s, t, i);
	an >= nn && (rn.clear(), an = 0);
	let l = rn.get(s);
	return l === void 0 && rn.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), an++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, sn = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), tn(e, t, n);
}, cn = class {
	constructor(e) {
		this.nodes = e;
	}
}, ln = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, un = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !ln(e);
}, dn = 256, fn = /* @__PURE__ */ new Map(), pn = (e, t) => {
	let n = fn.get(e);
	return n === void 0 && (n = un(e), fn.size >= dn && fn.clear(), fn.set(Array.from(e).join(""), n)), t(e.length), n;
}, mn = /* @__PURE__ */ new Map(), hn = (e, t) => {
	let n = mn.get(e);
	return n === void 0 && (n = Mt(e), n !== null && (n = Array.from(n).join("")), mn.size >= dn && mn.clear(), mn.set(Array.from(e).join(""), n)), t(e.length), n;
}, gn = 256, _n = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Pt) c = null;
		else if (o) {
			let n = hn(e, i);
			c = n === null ? null : on(n, t, r, i, !0);
		} else c = pn(e, i) ? on(e, t, r, i) : null;
		s !== void 0 && (s.size >= gn && s.clear(), s.set(a, c));
	}
	return c !== null && sn(c, n, i);
}, vn = {
	length: (e, t) => {
		let n = e[0];
		if (P(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (A(n)) return k(n);
		if (M(n)) {
			let e = O(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !P(r) || !P(i) ? !1 : _n(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !P(r) || !P(i) ? !1 : _n(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, yn = (e, t, n = E) => e === void 0 && t === void 0 || at(e, t, n), bn = (e, t, n = E) => !at(e, t, n), xn = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, Sn = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return xn(n) - xn(i);
	}
	return e.length - t.length;
}, Cn = (e, t, n = E) => N(e) && N(t) ? e < t : P(e) && P(t) ? (n(Math.min(e.length, t.length)), Sn(e, t) < 0) : !1, wn = (e, t, n = E) => Cn(e, t, n) || yn(e, t, n), Tn = (e, t, n = E) => N(e) && N(t) ? e > t : P(e) && P(t) ? (n(Math.min(e.length, t.length)), Sn(e, t) > 0) : !1, En = (e, t, n = E) => Tn(e, t, n) || yn(e, t, n), Dn = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, On = (e, t, n) => {
	let r = k(e);
	for (let i = 0; i < r; i++) {
		let r = ot(e, i);
		if (n(1 + Dn(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, kn = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, An = (e) => typeof e == "string" && e.length + 1 > st, jn = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = k(e);
	for (let n = 0; n < a; n++) {
		let r = ot(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), An(r) ? i.long.push(r) : i.set.add(kn(r));
	}
	return n?.set(e, i), i;
}, Mn = ({ set: e, long: t }, n, r) => {
	if (An(n)) {
		for (let e of t) if (r(1 + Dn(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(kn(n)));
}, Nn = (e, t, n) => {
	let r = k(e);
	for (let i = 0; i < r; i++) if (n(), D(e, i) && t(e[i])) return !0;
	return !1;
}, Pn = {
	eq: yn,
	ne: bn,
	lt: Cn,
	le: wn,
	gt: Tn,
	ge: En,
	in: (e, t, n = E) => A(t) ? On(t, e, n) !== -1 : !1,
	nin: (e, t, n = E) => A(t) ? On(t, e, n) === -1 : !1,
	subsetof: (e, t, n = E, r) => {
		if (!A(e) || !A(t)) return !1;
		let i = jn(t, n, r);
		return !Nn(e, (e) => !Mn(i, e, n), n);
	},
	anyof: (e, t, n = E, r) => {
		if (!A(e) || !A(t)) return !1;
		let i = jn(t, n, r);
		return Nn(e, (e) => Mn(i, e, n), n);
	},
	noneof: (e, t, n = E, r) => {
		if (!A(e) || !A(t)) return !1;
		let i = jn(t, n, r);
		return !Nn(e, (e) => Mn(i, e, n), n);
	},
	sizeof: (e, t) => !A(e) && !P(e) || !A(t) && !P(t) ? !1 : (A(e) ? k(e) : e.length) === (A(t) ? k(t) : t.length),
	size: (e, t) => !A(e) && !P(e) || !N(t) ? !1 : (A(e) ? k(e) : e.length) === t
}, Fn = (e) => !A(e) && !P(e) ? !1 : (A(e) ? k(e) : e.length) === 0, In = (e, t, n, r = E, i) => !P(e) || !P(t) ? !1 : _n(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Ln = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), z = (e, t) => e.concat(`[${t}]`), Rn = (e, t) => e < 0 ? t + e : e, zn = (e, t) => {
	let n = k(e), r = Rn(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: D(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, Bn = (e, t) => {
	for (let n of t) e.push(n);
}, Vn = 1e6, Hn = 100, Un = 1e6, Wn = 20, Gn = 1e4, Kn = 1e4, qn = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					D(n, r) && this.visit(n[r]);
				} else if (D(n, t)) this.visit(n[t]);
				else if (++e.holes > Kn) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!D(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), A(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: k(e),
				i: 0,
				holes: 0
			});
			else if (M(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, Jn = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Ln(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Ln(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = k(e);
			for (let r = 0; r < n; r++) this.tick(), D(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new qn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Gn, Math.ceil((this.retained - this.retainedLimit) / Wn))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new rt(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Vn, Hn * e.weight) + t, this.retainedLimit = Math.max(Un, Wn * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new qn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Gn, Math.ceil((this.steps - this.stepLimit) / Hn))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new rt(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!M(e)) return;
			let r = this.canonicalName(n, n.value);
			if (D(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (A(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: z(t, r)
					});
				}), n;
			}
			if (M(e)) {
				let n = O(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) D(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!A(e)) return;
			let r = zn(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: z(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (A(e)) {
				let r = zn(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: z(t, r.index)
				} : void 0;
			}
			if (M(e)) {
				let r = String(n.value);
				return D(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!A(e)) return [];
			let r = k(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : Rn(n.start, r), o = n.end === null ? r : Rn(n.end, r)) : (a = n.start === null ? r - 1 : Rn(n.start, r), o = n.end === null ? -r - 1 : Rn(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: D(e, u) ? e[u] : void 0,
				paths: z(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (M(e.value)) {
						let t = this.handleIdentifier(e, r);
						F(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (M(e.value)) {
						let t = this.handleStringLiteral(e, r);
						F(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (A(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						F(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					Bn(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": Bn(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						F(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						Bn(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						Bn(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						F(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (M(e)) {
					let t = O(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else A(e) && i.push({
					parent: a,
					keys: null,
					length: k(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!D(n, t)) continue;
						a = {
							value: n[t],
							paths: z(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!D(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!N(i) || !N(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return N(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Fn(n);
			if (t.operator === "reg") return In(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = Pn[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new cn(r.value) : new cn(F(r?.value) ? [r?.value] : []);
			}), i = vn[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : F(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : F(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (A(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: z(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (M(n)) {
						let i = O(n);
						this.tick(i.length);
						for (let a of i) {
							if (!D(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!F(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) Bn(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw lt(e) ? new rt("Query is nested too deeply") : j(e) ? new rt("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Vn, this.retainedLimit = this.adaptiveLimit ? Un : Infinity;
	}
}, Yn = (e, t, n) => {
	let r = bt(t), i = new Jn(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? ut(i) ? [] : [i.value] : i?.value;
}, Xn = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Yn(e, i, n);
		F(t) && r.push(t);
	}
	return r;
}, Zn = (e, t, n = {}) => {
	try {
		return A(t) ? Xn(e, t, n) : Yn(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Qn = (e) => typeof e == "object" && !!e && !Array.isArray(e), $n = (e, t) => {
	if (!Qn(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = B(t, i);
	return n;
}, er = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => B(t, e));
}, tr = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, nr = (e, t) => tr(e, t), rr = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, ir = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, ar = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: ir,
		applyTemplate: e
	});
}, B = (e, t, n) => {
	let r = e, i = t;
	rr(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? tr(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = nr(a?.textContent, r)), "attributes" in a && (a.attributes = $n(a?.attributes, r)), "children" in a && (a.children = er(a?.children, r))), a);
};
ar(B);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var or = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, sr = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, cr = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: sr,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, lr = (e, t) => {
	let n = e, r = t;
	return or(n, r), n.map((e) => B(e, r));
};
cr((e, t) => {
	let n = e;
	return or(n, t), n.map((e) => B(e, e[t]));
}, lr);
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var ur = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = ur(n, t);
		if (e) return e;
	}
	return null;
}, dr = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Zn(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = ur(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
	let a = [...t.filePath ?? []];
	if (a.length === 0) throw Error("destinationPath.filePath must contain the property to write");
	let o = a.pop(), s = a.reduce((e, t) => {
		if (e == null) throw Error(`Cannot resolve destination filePath at: ${t}`);
		return e[t];
	}, i);
	if (s == null) throw Error(`Destination parent not found for filePath: ${t.filePath.join(".")}`);
	return n && console.log("json-write-path v6 resolved:", {
		fileName: t.fileName,
		jsonPath: t.jsonPath,
		dataRole: t.dataRole,
		filePath: t.filePath,
		parent: s,
		key: o
	}), {
		parent: s,
		key: o,
		target: i
	};
}, fr = (e, t, n, r) => {
	let { parent: i, key: a } = dr(e, t, r);
	return (Je[t.action] || qe)(i, a, n), e;
}, pr = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = pr(n, t);
		if (e) return e;
	}
	return null;
}, mr = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? pr(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, hr = {
	applyTemplate: B,
	fromCollection: lr
}, gr = (e, t, n) => {
	let r = e?.sourcePath;
	if (r === null) return null;
	if (r?.jsonPath) {
		let e = t?.[r.fileName];
		if (e === void 0) throw Error(`Registry entry not found: ${r.fileName}`);
		let i = Zn(e, r.jsonPath, { returnArray: !0 });
		if (i.length !== 1) throw Error(`Source JSONPath must identify exactly one value; matched ${i.length}: ${r.jsonPath}`);
		return n && console.log("json-instruction-single v8 source:", r, i[0]), i[0];
	}
	return mr(t, r);
}, _r = (e, t, n) => {
	let r = (t?.spec ?? me)[e.templateKey], i = gr(e, t, n), a = e?.func === null ? r : hr[e.func](i, r);
	return i === null ? r : a;
}, vr = (e, t, n) => {
	n && console.log("runSingleInstruction v8:", e);
	let r = _r(e, t, n);
	return n && console.log("runSingleInstruction v8 result:", r), fr(t, e.destinationPath, r, n), r;
}, yr = (e, t, n, r) => (e.forEach((e) => vr(e, t, n, r)), t), br = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), xr = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, Sr = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (xr(e, t), t.map((t) => {
	let i = B(t, r);
	return i.children = lr(br(e, t), n), i;
})), Cr = (e, t) => t.map((t) => ({
	...e,
	rowData: t[e.columnName]
})), wr = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, Tr = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (wr(e, t), e.map((e) => {
	let i = B(e, n);
	return i.children = t.length > 0 ? lr(Cr(e, t), r) : [], i;
})), V = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = me[e?.templateKey?.columnKey], a = me[e?.templateKey?.rowKey], o = Sr({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:rowOnColumn]", e.narration, o), fr({
			base: t,
			data: n
		}, e.destinationPath, o, r);
	});
}, H = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = me[e?.templateKey?.columnKey], a = me[e?.templateKey?.rowKey], o = Tr({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:columnOnRow]", e.narration, o), fr({
			base: t,
			data: n
		}, e.destinationPath, o, r);
	});
}, U = ({ single: e = [], rowOnColumn: t = [], columnOnRow: n = [], base: r, data: i, showLog: a = !1 } = {}) => {
	if (!Array.isArray(e)) throw TypeError("single instructions must be an array");
	if (!Array.isArray(t)) throw TypeError("rowOnColumn instructions must be an array");
	if (!Array.isArray(n)) throw TypeError("columnOnRow instructions must be an array");
	let o = {
		base: r,
		data: i
	};
	return a && console.log("runInstructions input:", {
		single: e,
		rowOnColumn: t,
		columnOnRow: n,
		base: r,
		data: i
	}), e.length && yr(e, o, a), t.length && V({
		instructions: t,
		base: r,
		data: i,
		showLog: a
	}), n.length && H({
		instructions: n,
		base: r,
		data: i,
		showLog: a
	}), o;
}, W = (e = [], t) => e.filter(({ destinationPath: e }) => {
	let n = e?.jsonPath;
	return typeof n != "string" || !n.trim() ? !1 : Zn(t, n, { returnArray: !0 }).length > 0;
}), Er = ({ base: e, options: t = {}, optionDefs: n = {}, showLog: r = !1 } = {}) => {
	if (!e) return e;
	let i = { base: e };
	if (t.showSearch && n.search) {
		let t = W(n.search, e);
		r && console.log("[runOptions:search]", t), yr(t, i, r);
	}
	if ((t.showSerial || t.serial) && n.serial) {
		let t = W(n.serial, e);
		r && console.log("[runOptions:serial]", t), yr(t, i, r);
	}
	if ((t.showOptions || t.options) && n.options) {
		let t = W(n.options, e);
		r && console.log("[runOptions:options]", t), yr(t, i, r);
	}
	return e;
}, G = ({ definitions: e = se, spec: t = ie, instructions: n = pe, type: r = "simple", data: i = [], columns: a = [], options: o = {}, showLog: s = !1 } = {}) => {
	let c = r;
	c && c.includes(".") && (c = c.split(".")[1] || c.split(".")[0]), c && c !== "table" || (c = "simple");
	let l = e?.table || {}, u = l[c] || l.simple;
	if (!u) throw Error(`Unknown table variant: "${c}". Available table variants: ${Object.keys(l).join(", ")}`);
	let d = u.baseFromSpec ? t[u.baseFromSpec] : u.base;
	if (!d) throw Error(`Base template not found for table variant "${c}".`);
	let f = [...u.single || []], p = [...u.rowOnColumn || []], m = [...u.columnOnRow || []], h = u.instructions || u.instructionsFromTable;
	Array.isArray(h) && h.forEach((e) => {
		let t = n?.[e];
		t && (t.type === "rowOnColumn" ? p.push(t) : t.type === "columnOnRow" ? m.push(t) : (t.type === "single" || !t.type && (t.sourcePath || t.templateKey)) && f.push(t));
	});
	let g = U({
		single: f,
		rowOnColumn: p,
		columnOnRow: m,
		base: structuredClone(d),
		data: {
			columns: a,
			data: i
		},
		showLog: s
	}), _ = g?.base ?? g, v = u.options || l.options || {}, y = {};
	for (let [e, t] of Object.entries(v)) y[e] = typeof t == "string" && n?.[t] ? n[t] : t;
	return Er({
		base: _,
		options: o,
		optionDefs: y,
		showLog: s
	}), _;
}, K = (e = {}) => {
	d(e);
	let t = e?.showLog;
	return ke({
		jsonSpec: G({
			type: e.type,
			data: e.data,
			columns: e.columns,
			options: e.options || {},
			showLog: t
		}),
		targetHtmlId: e.targetHtmlId,
		appendPosition: e.appendPosition,
		classToApply: e.classToApply ?? "",
		showLog: t
	});
};
Ge({
	render: K,
	bindTableEvents: Ue
});
export { Ue as bindTableEvents, G as buildTableSpec, K as default, K as render };
