// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.type;
	if (n === void 0) throw Error("Missing compulsory key: \"type\"");
	if (typeof n != "string") throw TypeError("type must be a string");
	return !0;
}, r = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.data;
	if (n === void 0) throw Error("Missing compulsory key: \"data\"");
	if (!Array.isArray(n)) throw TypeError("data must be an Array");
	return !0;
}, i = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.columns;
	if (n === void 0) throw Error("Missing compulsory key: \"columns\"");
	if (!Array.isArray(n)) throw TypeError("columns must be an Array");
	return !0;
}, a = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.showLog;
	if (n !== void 0 && typeof n != "boolean") throw TypeError("showLog must be a boolean");
	return !0;
}, o = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return n(t), r(t), i(t), a(t), !0;
}, s = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.targetHtmlId;
	if (n === void 0) throw Error("Missing compulsory key: \"targetHtmlId\"");
	if (typeof n != "string") throw TypeError("targetHtmlId must be a string");
	if (n.trim().length === 0) throw Error("targetHtmlId must be a non-empty string");
	return !0;
}, c = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.appendPosition;
	if (n === void 0) throw Error("Missing compulsory key: \"appendPosition\"");
	if (typeof n != "string") throw TypeError("appendPosition must be a string");
	return !0;
}, l = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.classToApply;
	if (n === void 0) throw Error("Missing compulsory key: \"classToApply\"");
	if (typeof n != "string") throw TypeError("classToApply must be a string");
	return !0;
}, u = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return s(t), c(t), l(t), !0;
}, d = {
	type: "table",
	targetHtmlId: "",
	data: [],
	columns: [],
	classToApply: "",
	appendPosition: "replace",
	showLog: !1
}, f = (e) => {
	let t = typeof e == "object" && e ? e.inKey ?? e.key : e;
	return t && t in d ? d[t] : { ...d };
};
Object.assign(f, d);
// node_modules/json-renderers-guard/src/v5/index.js
var p = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return o(t), u(t), !0;
};
p.getSpec = f, p.configSpec = d, p.guardSpec = o, p.guardMount = u;
// node_modules/@keshavsoft/json-to-dom/src/v42/register/meta.js
var m = {
	version: "42.1.4",
	name: "json-to-dom"
}, h = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: m,
		appendToDom: e
	});
}, g = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, _ = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: g,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, v = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => b({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, y = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = v({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, b = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? v({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? y({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, x = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, S = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, ee = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, te = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, ne = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, re = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, ie = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	x({
		inNode: r,
		inErrors: a
	}) && (S({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ee({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), te({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ne({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), re({
		inNode: r,
		inErrors: a
	}));
}, ae = {
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
}, oe = {
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
}, se = {
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
}, ce = {
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
}, C = {
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
} }, ue = {
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
}, de = { buildDataListWithOptions: {
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
} }, fe = {
	name: "spec-repo",
	version: "1.14.0"
}, pe = ({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: fe,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
}, me = {
	...C,
	...le,
	...ue,
	...de
}, he = ae;
pe({
	spec: ae,
	tags: oe,
	tagsSchema: se,
	definitions: ce,
	table: C,
	form: le,
	select: ue,
	dataList: de,
	instructions: me
});
// node_modules/json-to-tag-validate/src/v4/index.js
function ge({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? oe, a = [];
	return b({
		inSpec: r,
		inFunc: (e) => {
			ie({
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
var _e = "http://www.w3.org/2000/svg", ve = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), ye = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return ve.has(t) ? document.createElementNS(_e, t) : document.createElement(t);
}, be = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), xe = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), Se = "http://www.w3.org/1999/xlink", Ce = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(Se, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, we = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, Te = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = ye({ inTagName: e.tagName });
	return t ? (be({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), xe({
		inElement: t,
		inProperties: e.properties
	}), Ce({
		inElement: t,
		inAttributes: e.attributes
	}), we({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, Ee = (e = {}) => b({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: Te
});
_({
	buildSpecElement: Ee,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = ge({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), b({
			inSpec: t,
			inFunc: Te
		});
	}
});
// node_modules/spec-to-dom/src/v2/register/meta.js
var De = {
	version: "2.1.1",
	name: "spec-to-dom"
}, Oe = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: De,
		appendToDom: e
	});
}, ke = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
Oe(ke);
// node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var Ae = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => ke({
	buildSpec: Ee(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
h(Ae);
// src/v52/registerGlobal/meta.js
var je = {
	name: "json-renderers-build-table",
	version: "v52"
}, Me = ({ render: e, hookEvents: t }) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.table = {
		meta: je,
		render: e,
		hookEvents: t
	});
}, Ne = (e) => Array.isArray(e) ? e : [e], Pe = (e, t, n) => {
	e[t] = n;
}, Fe = {
	set: Pe,
	push: (e, t, n) => {
		e[t].push(...Ne(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...Ne(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(Ne(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(Ne(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Ie = Object.defineProperty, Le = Object.getOwnPropertySymbols, Re = Object.prototype.hasOwnProperty, ze = Object.prototype.propertyIsEnumerable, Be = Math.pow, Ve = (e, t, n) => t in e ? Ie(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, He = (e, t) => {
	for (var n in t ||= {}) Re.call(t, n) && Ve(e, n, t[n]);
	if (Le) for (var n of Le(t)) ze.call(t, n) && Ve(e, n, t[n]);
	return e;
}, Ue = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, w = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, T = () => void 0, We = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = O(e);
		return r === O(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = D(e), a = D(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, Ge = (e, t, n = T) => {
	let r = [];
	if (!We(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!We(Ke(e.x, t), Ke(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !E(o, i) || !E(a, i)) return !1;
			let s = a[i];
			if (!E(o, i) || !We(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, E = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Ke = (e, t) => E(e, t) ? e[t] : void 0, qe = 16383, Je = 1e3, D = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > Je) throw new w(`Member name too long (maximum ${Je} characters)`);
	return t;
}, O = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, Ye = (e) => e instanceof RangeError && /call stack/i.test(e.message), k = (e) => Array.isArray(e), Xe = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), A = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, j = (e) => typeof e == "number", M = (e) => typeof e == "string", Ze = (e) => e === void 0, N = (e) => e !== void 0;
function Qe(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function $e(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function et(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var tt = class extends SyntaxError {
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
function nt(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: zr }, a = zr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", h = "size", g = "empty", _ = "true", v = "false", y = "null", b = /^[,\]]/, x = /^[+\-]/, S = /^[*\/]/, ee = /^[a-zA-Z_]/, te = /^[\x80-\uFFFF_]/, ne = /^[a-zA-Z0-9_]/, re = /^[0-9@$\-]/, ie = /^[^\/\\]/, ae = /^[gimsuy]/, oe = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, se = /^[\uD800-\uDBFF]/, ce = /^[\uDC00-\uDFFF]/, C = /^[0-9]/, le = /^[1-9]/, ue = /^[eE]/, de = /^["\\]/, fe = /^['\\]/, pe = /^[ -\uD7FF\uE000-\uFFFF]/, me = /^[dD]/, he = /^[89abAB]/, ge = /^[c-fC-F]/, _e = /^[0-9a-fA-F]/, ve = /^[ \t\n\r]/, ye = K([",", "]"], !1, !1, !1), be = G("length", !1), xe = G("count", !1), Se = G("match", !1), Ce = G("search", !1), we = G("value", !1), Te = K(["+", "-"], !1, !1, !1), Ee = K(["*", "/"], !1, !1, !1), De = Pr("string"), Oe = K([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), ke = K([["", "￿"], "_"], !1, !1, !1), Ae = K([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), je = G("-", !1), Me = K([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ne = G("$", !1), Pe = G("@", !1), Fe = G("..", !1), Ie = G(".", !1), Le = G("*", !1), Re = G("&&", !1), ze = G("||", !1), Be = G("!", !1), Ve = G("==", !1), He = G("!=", !1), Ue = G(">=", !1), w = G(">", !1), T = G("<=", !1), We = G("<", !1), Ge = G("=~", !1), E = G("in", !1), Ke = G("nin", !1), qe = G("subsetof", !1), Je = G("anyof", !1), D = G("noneof", !1), O = G("sizeof", !1), Ye = G("size", !1), k = G("empty", !1), Xe = G("true", !1), A = G("false", !1), j = G("null", !1), M = G("{", !1), Ze = G("}", !1), N = G("[", !1), nt = G("]", !1), rt = G(":", !1), it = G(",", !1), P = G("(", !1), at = G(")", !1), ot = G("?", !1), st = Pr("regex"), ct = G("/", !1), lt = K(["/", "\\"], !0, !1, !1), F = G("\\", !1), ut = q(), dt = K([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), ft = K([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), pt = K([["\ud800", "\udbff"]], !1, !1, !1), mt = K([["\udc00", "\udfff"]], !1, !1, !1), I = K([["0", "9"]], !1, !1, !1), ht = Pr("number"), gt = G("0", !1), _t = K([["1", "9"]], !1, !1, !1), vt = Pr("integer"), yt = K(["e", "E"], !1, !1, !1), bt = G("\"", !1), xt = G("'", !1), St = K(["\"", "\\"], !1, !1, !1), Ct = K(["'", "\\"], !1, !1, !1), L = K([[" ", "퟿"], ["", "￿"]], !1, !1, !1), wt = G("b", !1), Tt = G("f", !1), Et = G("n", !1), Dt = G("r", !1), Ot = G("t", !1), kt = G("u", !1), At = K(["d", "D"], !1, !1, !1), jt = K([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Mt = G("\\u", !1), Nt = K([["c", "f"], ["C", "F"]], !1, !1, !1), Pt = K([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Ft = K([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function It(e) {
		return {
			type: "root",
			next: Qe(e)
		};
	}
	function Lt(e) {
		return e.map((e) => e[1]);
	}
	function Rt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function zt(e) {
		return e;
	}
	function Bt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Vt() {
		return { type: "wildcard" };
	}
	function Ht(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Ut() {
		return { type: "wildcard" };
	}
	function Wt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Gt(e) {
		return e;
	}
	function Kt(e) {
		return e;
	}
	function qt(e, t) {
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
	function Jt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Yt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Xt(e, t) {
		return et(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function Zt(e, t) {
		return et(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function Qt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function $t(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function en(e, t) {
		return t !== null || $e(e);
	}
	function tn(e, t) {
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
	function nn(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function rn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function an() {
		return { operator: "empty" };
	}
	function on() {
		return "eq";
	}
	function sn() {
		return "ne";
	}
	function cn() {
		return "le";
	}
	function ln() {
		return "lt";
	}
	function un() {
		return "ge";
	}
	function dn() {
		return "gt";
	}
	function fn() {
		return "in";
	}
	function pn() {
		return "nin";
	}
	function mn() {
		return "subsetof";
	}
	function hn() {
		return "anyof";
	}
	function gn() {
		return "noneof";
	}
	function _n() {
		return "sizeof";
	}
	function vn() {
		return "size";
	}
	function yn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function bn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function xn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Sn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Cn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function R() {
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
		return t.length === 0 ? e : et(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function An(e, t) {
		return t.length === 0 ? e : et(e, t, (e, t) => ({
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
			next: Qe(e)
		};
	}
	function Nn(e) {
		return {
			type: "current",
			next: Qe(e)
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
	function Rn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function zn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Bn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Vn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Hn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Un() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Wn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Gn(e) {
		return e;
	}
	function z(e) {
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
	function or(e) {
		return e.join("");
	}
	function sr(e, t) {
		let n = parseFloat(Ar());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function cr() {
		let e = parseInt(Ar(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e) {
		return e.join("");
	}
	function dr(e) {
		return e;
	}
	function fr() {
		return "\"";
	}
	function pr(e) {
		return e;
	}
	function mr(e) {
		return e;
	}
	function hr() {
		return "'";
	}
	function gr(e) {
		return e;
	}
	function _r() {
		return "\\";
	}
	function vr() {
		return "/";
	}
	function yr() {
		return "\b";
	}
	function br() {
		return "\f";
	}
	function xr() {
		return "\n";
	}
	function Sr() {
		return "\r";
	}
	function Cr() {
		return "	";
	}
	function wr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Tr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Er(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let B = t.peg$currPos | 0, V = B, H = [{
		line: 1,
		column: 1
	}], U = B, Dr = t.peg$maxFailExpected || [], W = t.peg$silentFails | 0, Or = /* @__PURE__ */ new Map(), kr;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Ar() {
		return e.substring(V, B);
	}
	function jr(e, t) {
		throw t = t === void 0 ? Ir(V, B) : t, Lr(e, t);
	}
	function Mr(t = B) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function G(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function K(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function q() {
		return { type: "any" };
	}
	function Nr() {
		return { type: "end" };
	}
	function Pr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Fr(t) {
		let n = H[t], r;
		if (n) return n;
		if (t >= H.length) r = H.length - 1;
		else for (r = t; !H[--r];);
		for (n = H[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return H[t] = n, n;
	}
	function Ir(e, t, n) {
		let i = Fr(e), a = Fr(t), o = {
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
	function J(e) {
		B < U || (B > U && (U = B, Dr = []), Dr.push(e));
	}
	function Lr(e, t) {
		return new tt(e, null, null, t);
	}
	function Rr(e, t, n) {
		return new tt(tt.buildMessage(e, t), e, t, n);
	}
	function zr() {
		let e, t, r, i;
		return e = B, t = Si(), t === n ? (B = e, e = n) : (r = Y(), i = ga(), i === n ? (B = e, e = n) : (V = e, e = It(r))), e;
	}
	function Y() {
		let e, t, r, i, a;
		for (e = B, t = [], r = B, i = $(), a = Br(), a === n ? (B = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = B, i = $(), a = Br(), a === n ? (B = r, r = n) : (i = [i, a], r = i);
		return V = e, t = Lt(t), e = t, e;
	}
	function Br() {
		let e;
		return e = Hr(), e === n && (e = Vr()), e;
	}
	function Vr() {
		let e, t, r;
		return e = B, t = Ti(), t === n ? (B = e, e = n) : (r = Ur(), r === n ? (B = e, e = n) : (V = e, e = Rt(r))), e === n && (e = B, t = Gr(), t !== n && (V = e, t = zt(t)), e = t), e;
	}
	function Hr() {
		let e, t, r;
		return e = B, t = wi(), t === n ? (B = e, e = n) : (r = Wr(), r === n ? (B = e, e = n) : (V = e, e = Bt(r))), e;
	}
	function Ur() {
		let e, t;
		return e = B, t = Ei(), t !== n && (V = e, t = Vt()), e = t, e === n && (e = B, t = xi(), t !== n && (V = e, t = Ht(t)), e = t), e;
	}
	function Wr() {
		let e, t;
		return e = B, t = Ei(), t !== n && (V = e, t = Ut()), e = t, e === n && (e = B, t = xi(), t !== n && (V = e, t = Wt(t)), e = t, e === n && (e = B, t = Gr(), t !== n && (V = e, t = Gt(t)), e = t)), e;
	}
	function Gr() {
		let e, t, r, i;
		return e = B, t = Xi(), t === n ? (B = e, e = n) : ($(), r = Kr(), r === n ? (B = e, e = n) : ($(), i = Zi(), i === n ? (B = e, e = n) : (V = e, e = Kt(r)))), e;
	}
	function Kr() {
		let e, t, r, i, a, o, s, c;
		if (e = B, t = ui(), t !== n) {
			for (r = [], i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = ui(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = ui(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			V = e, e = qt(t, r);
		} else B = e, e = n;
		return e;
	}
	function qr() {
		let t, r, i, a, o, s, c, l, u;
		return t = B, r = ta(), r === n ? (B = t, t = n) : ($(), i = $i(), i === n ? (B = t, t = n) : ($(), a = Jr(), a === n ? (B = t, t = n) : ($(), o = ea(), o === n ? (B = t, t = n) : (s = B, W++, c = B, l = $(), u = e.charAt(B), b.test(u) ? B++ : (u = n, W === 0 && J(ye)), u === n ? (B = c, c = n) : (l = [l, u], c = l), W--, c === n ? s = n : (B = s, s = void 0), s === n ? (B = t, t = n) : (V = t, t = Jt(a)))))), t === n && (t = B, r = ta(), r === n ? (B = t, t = n) : ($(), i = Jr(), i === n ? (B = t, t = n) : (V = t, t = Yt(i)))), t;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c, l = B * 91 + 10, u = Or.get(l);
		if (u) return B = u.nextPos, u.result;
		if (e = B, t = Yr(), t !== n) {
			for (r = [], i = B, a = $(), o = Oi(), o === n ? (B = i, i = n) : (s = $(), c = Yr(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = B, a = $(), o = Oi(), o === n ? (B = i, i = n) : (s = $(), c = Yr(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			V = e, e = Xt(t, r);
		} else B = e, e = n;
		return Or.set(l, {
			nextPos: B,
			result: e
		}), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = B, t = Xr(), t !== n) {
			for (r = [], i = B, a = $(), o = Di(), o === n ? (B = i, i = n) : (s = $(), c = Xr(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = B, a = $(), o = Di(), o === n ? (B = i, i = n) : (s = $(), c = Xr(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			V = e, e = Zt(t, r);
		} else B = e, e = n;
		return e;
	}
	function Xr() {
		let e, t, r, i, a;
		return e = B, t = ki(), t === n ? (B = e, e = n) : ($(), r = $i(), r === n ? (B = e, e = n) : ($(), i = Jr(), i === n ? (B = e, e = n) : ($(), a = ea(), a === n ? (B = e, e = n) : (V = e, e = Qt(i))))), e === n && (e = B, t = ki(), t === n ? (B = e, e = n) : ($(), r = ei(), r === n ? (B = e, e = n) : (V = e, e = $t(r))), e === n && (e = Zr())), e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = B, t = ai(), t === n ? (B = e, e = n) : (r = B, i = $(), a = Qr(), a === n ? (B = r, r = n) : (i = [i, a], r = i), r === n && (r = null), V = B, i = en(t, r), i = i ? void 0 : n, i === n ? (B = e, e = n) : (V = e, e = tn(t, r))), e === n && (e = ei()), e;
	}
	function Qr() {
		let e, t, r;
		return e = B, t = $r(), t === n ? (B = e, e = n) : ($(), r = ai(), r === n ? (B = e, e = n) : (V = e, e = nn(t, r))), e === n && (e = B, t = Ii(), t === n ? (B = e, e = n) : ($(), r = di(), r === n ? (B = e, e = n) : (V = e, e = rn(r))), e === n && (e = B, t = Wi(), t !== n && (V = e, t = an()), e = t)), e;
	}
	function $r() {
		let e, t;
		return e = B, t = Ai(), t !== n && (V = e, t = on()), e = t, e === n && (e = B, t = ji(), t !== n && (V = e, t = sn()), e = t, e === n && (e = B, t = Pi(), t !== n && (V = e, t = cn()), e = t, e === n && (e = B, t = Fi(), t !== n && (V = e, t = ln()), e = t, e === n && (e = B, t = Mi(), t !== n && (V = e, t = un()), e = t, e === n && (e = B, t = Ni(), t !== n && (V = e, t = dn()), e = t, e === n && (e = B, t = Li(), t !== n && (V = e, t = fn()), e = t, e === n && (e = B, t = Ri(), t !== n && (V = e, t = pn()), e = t, e === n && (e = B, t = zi(), t !== n && (V = e, t = mn()), e = t, e === n && (e = B, t = Bi(), t !== n && (V = e, t = hn()), e = t, e === n && (e = B, t = Vi(), t !== n && (V = e, t = gn()), e = t, e === n && (e = B, t = Hi(), t !== n && (V = e, t = _n()), e = t, e === n && (e = B, t = Ui(), t !== n && (V = e, t = vn()), e = t)))))))))))), e;
	}
	function ei() {
		let e, t, r, i;
		return e = B, t = $i(), t === n ? (B = e, e = n) : ($(), r = Jr(), r === n ? (B = e, e = n) : ($(), i = ea(), i === n ? (B = e, e = n) : (V = e, e = yn(r)))), e === n && (e = ti(), e === n && (e = ci(), e === n && (e = B, t = Gi(), t !== n && (V = e, t = bn()), e = t, e === n && (e = B, t = Ki(), t !== n && (V = e, t = xn()), e = t, e === n && (e = B, t = qi(), t !== n && (V = e, t = Sn()), e = t))))), e;
	}
	function ti() {
		let e, t, r, i, a;
		return e = B, t = ni(), t === n ? (B = e, e = n) : (r = $i(), r === n ? (B = e, e = n) : ($(), i = ri(), i === n && (i = null), $(), a = ea(), a === n ? (B = e, e = n) : (V = e, e = Cn(t, i)))), e;
	}
	function ni() {
		let t, r;
		return t = B, e.substr(B, 6) === o ? (r = o, B += 6) : (r = n, W === 0 && J(be)), r !== n && (V = t, r = R()), t = r, t === n && (t = B, e.substr(B, 5) === s ? (r = s, B += 5) : (r = n, W === 0 && J(xe)), r !== n && (V = t, r = wn()), t = r, t === n && (t = B, e.substr(B, 5) === c ? (r = c, B += 5) : (r = n, W === 0 && J(Se)), r !== n && (V = t, r = Tn()), t = r, t === n && (t = B, e.substr(B, 6) === l ? (r = l, B += 6) : (r = n, W === 0 && J(Ce)), r !== n && (V = t, r = En()), t = r, t === n && (t = B, e.substr(B, 5) === u ? (r = u, B += 5) : (r = n, W === 0 && J(we)), r !== n && (V = t, r = Dn()), t = r)))), t;
	}
	function ri() {
		let e, t, r, i, a, o, s, c;
		if (e = B, t = ii(), t !== n) {
			for (r = [], i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = ii(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = ii(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			V = e, e = On(t, r);
		} else B = e, e = n;
		return e;
	}
	function ii() {
		let e;
		return e = ai(), e === n && (e = pi()), e;
	}
	function ai() {
		let t, r, i, a, o, s, c, l, u = B * 91 + 21, d = Or.get(u);
		if (d) return B = d.nextPos, d.result;
		if (t = B, r = oi(), r !== n) {
			for (i = [], a = B, o = $(), s = e.charAt(B), x.test(s) ? B++ : (s = n, W === 0 && J(Te)), s === n ? (B = a, a = n) : (c = $(), l = oi(), l === n ? (B = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = B, o = $(), s = e.charAt(B), x.test(s) ? B++ : (s = n, W === 0 && J(Te)), s === n ? (B = a, a = n) : (c = $(), l = oi(), l === n ? (B = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			V = t, t = kn(r, i);
		} else B = t, t = n;
		return Or.set(u, {
			nextPos: B,
			result: t
		}), t;
	}
	function oi() {
		let t, r, i, a, o, s, c, l;
		if (t = B, r = si(), r !== n) {
			for (i = [], a = B, o = $(), s = e.charAt(B), S.test(s) ? B++ : (s = n, W === 0 && J(Ee)), s === n ? (B = a, a = n) : (c = $(), l = si(), l === n ? (B = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = B, o = $(), s = e.charAt(B), S.test(s) ? B++ : (s = n, W === 0 && J(Ee)), s === n ? (B = a, a = n) : (c = $(), l = si(), l === n ? (B = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			V = t, t = An(r, i);
		} else B = t, t = n;
		return t;
	}
	function si() {
		let e, t, r, i;
		return e = B, t = $i(), t === n ? (B = e, e = n) : ($(), r = ai(), r === n ? (B = e, e = n) : ($(), i = ea(), i === n ? (B = e, e = n) : (V = e, e = jn(r)))), e === n && (e = ti(), e === n && (e = fi(), e === n && (e = ci()))), e;
	}
	function ci() {
		let e, t, r;
		return e = B, t = Si(), t === n ? (B = e, e = n) : (r = Y(), r === n ? (B = e, e = n) : (V = e, e = Mn(r))), e === n && (e = B, t = Ci(), t === n ? (B = e, e = n) : (r = Y(), r === n ? (B = e, e = n) : (V = e, e = Nn(r)))), e;
	}
	function li() {
		let e, t, r, i, a, o, s, c, l;
		return e = B, t = B, r = la(), r === n ? (B = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (B = e, e = n) : (i = $(), a = B, o = la(), o === n ? (B = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = B, s = Qi(), s === n ? (B = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), V = e, e = Pn(t, a, o)), e;
	}
	function ui() {
		let e, t;
		return e = qr(), e === n && (e = li(), e === n && (e = B, t = Ei(), t !== n && (V = e, t = Fn()), e = t, e === n && (e = B, t = la(), t !== n && (V = e, t = In(t)), e = t, e === n && (e = B, t = da(), t !== n && (V = e, t = Ln(t)), e = t, e === n && (e = B, t = yi(), t !== n && (V = e, t = Rn(t)), e = t))))), e;
	}
	function di() {
		let e, t, r;
		return e = B, t = na(), t === n ? (B = e, e = n) : (r = ra(), V = e, e = zn(t, r)), e;
	}
	function fi() {
		let e, t;
		return e = B, t = pi(), t !== n && (V = e, t = Bn(t)), e = t, e === n && (e = B, t = sa(), t !== n && (V = e, t = Vn(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = B, t = Gi(), t !== n && (V = e, t = Hn()), e = t, e === n && (e = B, t = Ki(), t !== n && (V = e, t = Un()), e = t, e === n && (e = B, t = qi(), t !== n && (V = e, t = Wn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return W++, e = B, t = da(), t !== n && (V = e, t = Gn(t)), e = t, W--, e === n && (t = n, W === 0 && J(De)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = B, t = Ji(), t === n ? (B = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (B = e, e = n) : (V = e, e = z(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = B, t = gi(), t !== n) {
			for (r = [], i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = gi(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = gi(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			V = e, e = Kn(t, r);
		} else B = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = B, t = da(), t === n ? (B = e, e = n) : ($(), r = Qi(), r === n ? (B = e, e = n) : ($(), i = fi(), i === n ? (B = e, e = n) : (V = e, e = qn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = B, t = Xi(), t === n ? (B = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (B = e, e = n) : (V = e, e = Jn(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = B, t = fi(), t !== n) {
			for (r = [], i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = fi(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = B, a = $(), o = X(), o === n ? (B = i, i = n) : (s = $(), c = fi(), c === n ? (B = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			V = e, e = Yn(t, r);
		} else B = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = B, r = B, i = B, a = e.charAt(B), ee.test(a) ? B++ : (a = n, W === 0 && J(Oe)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else B = i, i = n;
		if (r = i === n ? i : e.substring(r, B), r !== n && (V = t, r = Xn(r)), t = r, t === n) {
			if (t = B, r = B, i = [], a = e.charAt(B), te.test(a) ? B++ : (a = n, W === 0 && J(ke)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(B), te.test(a) ? B++ : (a = n, W === 0 && J(ke));
			else i = n;
			r = i === n ? i : e.substring(r, B), r !== n && (V = t, r = Zn(r)), t = r, t === n && (t = B, r = Gi(), r !== n && (V = t, r = Qn()), t = r, t === n && (t = B, r = Ki(), r !== n && (V = t, r = $n()), t = r, t === n && (t = B, r = qi(), r !== n && (V = t, r = er()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(B), ne.test(t) ? B++ : (t = n, W === 0 && J(Ae)), t === n && (t = B, e.charCodeAt(B) === 45 ? (r = "-", B++) : (r = n, W === 0 && J(je)), r === n ? (B = t, t = n) : (i = B, W++, a = e.charAt(B), re.test(a) ? B++ : (a = n, W === 0 && J(Me)), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = B, t = ia(), t !== n && (V = e, t = tr(t)), e = t, e === n && (e = B, t = Gi(), t !== n && (V = e, t = nr()), e = t, e === n && (e = B, t = Ki(), t !== n && (V = e, t = rr()), e = t, e === n && (e = B, t = qi(), t !== n && (V = e, t = ir()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(B) === 36 ? (t = "$", B++) : (t = n, W === 0 && J(Ne)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(B) === 64 ? (t = "@", B++) : (t = n, W === 0 && J(Pe)), t;
	}
	function wi() {
		let t;
		return e.substr(B, 2) === ".." ? (t = "..", B += 2) : (t = n, W === 0 && J(Fe)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(B) === 46 ? (t = ".", B++) : (t = n, W === 0 && J(Ie)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(B) === 42 ? (t = "*", B++) : (t = n, W === 0 && J(Le)), t;
	}
	function Di() {
		let t;
		return e.substr(B, 2) === "&&" ? (t = "&&", B += 2) : (t = n, W === 0 && J(Re)), t;
	}
	function Oi() {
		let t;
		return e.substr(B, 2) === "||" ? (t = "||", B += 2) : (t = n, W === 0 && J(ze)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(B) === 33 ? (t = "!", B++) : (t = n, W === 0 && J(Be)), t;
	}
	function Ai() {
		let t;
		return e.substr(B, 2) === "==" ? (t = "==", B += 2) : (t = n, W === 0 && J(Ve)), t;
	}
	function ji() {
		let t;
		return e.substr(B, 2) === "!=" ? (t = "!=", B += 2) : (t = n, W === 0 && J(He)), t;
	}
	function Mi() {
		let t;
		return e.substr(B, 2) === ">=" ? (t = ">=", B += 2) : (t = n, W === 0 && J(Ue)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(B) === 62 ? (t = ">", B++) : (t = n, W === 0 && J(w)), t;
	}
	function Pi() {
		let t;
		return e.substr(B, 2) === "<=" ? (t = "<=", B += 2) : (t = n, W === 0 && J(T)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(B) === 60 ? (t = "<", B++) : (t = n, W === 0 && J(We)), t;
	}
	function Ii() {
		let t;
		return e.substr(B, 2) === "=~" ? (t = "=~", B += 2) : (t = n, W === 0 && J(Ge)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = B, e.substr(B, 2) === "in" ? (r = "in", B += 2) : (r = n, W === 0 && J(E)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = B, e.substr(B, 3) === "nin" ? (r = "nin", B += 3) : (r = n, W === 0 && J(Ke)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = B, e.substr(B, 8) === d ? (r = d, B += 8) : (r = n, W === 0 && J(qe)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = B, e.substr(B, 5) === f ? (r = f, B += 5) : (r = n, W === 0 && J(Je)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = B, e.substr(B, 6) === p ? (r = p, B += 6) : (r = n, W === 0 && J(D)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = B, e.substr(B, 6) === m ? (r = m, B += 6) : (r = n, W === 0 && J(O)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = B, e.substr(B, 4) === h ? (r = h, B += 4) : (r = n, W === 0 && J(Ye)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = B, e.substr(B, 5) === g ? (r = g, B += 5) : (r = n, W === 0 && J(k)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = B, e.substr(B, 4) === _ ? (r = _, B += 4) : (r = n, W === 0 && J(Xe)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = B, e.substr(B, 5) === v ? (r = v, B += 5) : (r = n, W === 0 && J(A)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = B, e.substr(B, 4) === y ? (r = y, B += 4) : (r = n, W === 0 && J(j)), r === n ? (B = t, t = n) : (i = B, W++, a = Q(), W--, a === n ? i = void 0 : (B = i, i = n), i === n ? (B = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(B) === 123 ? (t = "{", B++) : (t = n, W === 0 && J(M)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(B) === 125 ? (t = "}", B++) : (t = n, W === 0 && J(Ze)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(B) === 91 ? (t = "[", B++) : (t = n, W === 0 && J(N)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(B) === 93 ? (t = "]", B++) : (t = n, W === 0 && J(nt)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(B) === 58 ? (t = ":", B++) : (t = n, W === 0 && J(rt)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(B) === 44 ? (t = ",", B++) : (t = n, W === 0 && J(it)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(B) === 40 ? (t = "(", B++) : (t = n, W === 0 && J(P)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(B) === 41 ? (t = ")", B++) : (t = n, W === 0 && J(at)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(B) === 63 ? (t = "?", B++) : (t = n, W === 0 && J(ot)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (W++, t = B, e.charCodeAt(B) === 47 ? (r = "/", B++) : (r = n, W === 0 && J(ct)), r !== n) {
			for (i = [], a = e.charAt(B), ie.test(a) ? B++ : (a = n, W === 0 && J(lt)), a === n && (a = B, e.charCodeAt(B) === 92 ? (o = "\\", B++) : (o = n, W === 0 && J(F)), o === n ? (B = a, a = n) : (e.length > B ? (s = e.charAt(B), B++) : (s = n, W === 0 && J(ut)), s === n ? (B = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(B), ie.test(a) ? B++ : (a = n, W === 0 && J(lt)), a === n && (a = B, e.charCodeAt(B) === 92 ? (o = "\\", B++) : (o = n, W === 0 && J(F)), o === n ? (B = a, a = n) : (e.length > B ? (s = e.charAt(B), B++) : (s = n, W === 0 && J(ut)), s === n ? (B = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(B) === 47 ? (a = "/", B++) : (a = n, W === 0 && J(ct)), a === n ? (B = t, t = n) : (V = t, t = ar(i));
		} else B = t, t = n;
		return W--, t === n && (r = n, W === 0 && J(st)), t;
	}
	function ra() {
		let t, r, i;
		for (t = B, r = [], i = e.charAt(B), ae.test(i) ? B++ : (i = n, W === 0 && J(dt)); i !== n;) r.push(i), i = e.charAt(B), ae.test(i) ? B++ : (i = n, W === 0 && J(dt));
		return V = t, r = or(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = B, r = B, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else B = r, r = n;
		return t = r === n ? r : e.substring(t, B), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(B), oe.test(t) ? B++ : (t = n, W === 0 && J(ft)), t === n && (t = B, r = e.charAt(B), se.test(r) ? B++ : (r = n, W === 0 && J(pt)), r === n ? (B = t, t = n) : (i = e.charAt(B), ce.test(i) ? B++ : (i = n, W === 0 && J(mt)), i === n ? (B = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(B), C.test(t) ? B++ : (t = n, W === 0 && J(I))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (W++, t = B, e.charCodeAt(B) === 45 ? (r = "-", B++) : (r = n, W === 0 && J(je)), r === n && (r = null), i = ca(), i !== n) {
			if (a = B, e.charCodeAt(B) === 46 ? (o = ".", B++) : (o = n, W === 0 && J(Ie)), o !== n) {
				if (s = [], c = e.charAt(B), C.test(c) ? B++ : (c = n, W === 0 && J(I)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(B), C.test(c) ? B++ : (c = n, W === 0 && J(I));
				else s = n;
				s === n ? (B = a, a = n) : (o = [o, s], a = o);
			} else B = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), V = t, t = sr(a, o);
		} else B = t, t = n;
		return W--, t === n && (r = n, W === 0 && J(ht)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(B) === 48 ? (t = "0", B++) : (t = n, W === 0 && J(gt)), t === n) {
			if (t = B, r = e.charAt(B), le.test(r) ? B++ : (r = n, W === 0 && J(_t)), r !== n) {
				for (i = [], a = e.charAt(B), C.test(a) ? B++ : (a = n, W === 0 && J(I)); a !== n;) i.push(a), a = e.charAt(B), C.test(a) ? B++ : (a = n, W === 0 && J(I));
				r = [r, i], t = r;
			} else B = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (W++, t = B, e.charCodeAt(B) === 48 ? (r = "0", B++) : (r = n, W === 0 && J(gt)), r === n) {
			if (r = B, e.charCodeAt(B) === 45 ? (i = "-", B++) : (i = n, W === 0 && J(je)), i === n && (i = null), a = e.charAt(B), le.test(a) ? B++ : (a = n, W === 0 && J(_t)), a !== n) {
				for (o = [], s = e.charAt(B), C.test(s) ? B++ : (s = n, W === 0 && J(I)); s !== n;) o.push(s), s = e.charAt(B), C.test(s) ? B++ : (s = n, W === 0 && J(I));
				i = [
					i,
					a,
					o
				], r = i;
			} else B = r, r = n;
		}
		return r !== n && (V = t, r = cr()), t = r, W--, t === n && (r = n, W === 0 && J(vt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = B, r = e.charAt(B), ue.test(r) ? B++ : (r = n, W === 0 && J(yt)), r !== n) {
			if (i = e.charAt(B), x.test(i) ? B++ : (i = n, W === 0 && J(Te)), i === n && (i = null), a = [], o = e.charAt(B), C.test(o) ? B++ : (o = n, W === 0 && J(I)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(B), C.test(o) ? B++ : (o = n, W === 0 && J(I));
			else a = n;
			a === n ? (B = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else B = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (W++, t = B, e.charCodeAt(B) === 34 ? (r = "\"", B++) : (r = n, W === 0 && J(bt)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(B) === 34 ? (a = "\"", B++) : (a = n, W === 0 && J(bt)), a === n ? (B = t, t = n) : (V = t, t = lr(i));
		} else B = t, t = n;
		if (t === n) {
			if (t = B, e.charCodeAt(B) === 39 ? (r = "'", B++) : (r = n, W === 0 && J(xt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(B) === 39 ? (a = "'", B++) : (a = n, W === 0 && J(xt)), a === n ? (B = t, t = n) : (V = t, t = ur(i));
			} else B = t, t = n;
		}
		return W--, t === n && (r = n, W === 0 && J(De)), t;
	}
	function fa() {
		let t, r, i;
		return t = B, r = B, W++, i = e.charAt(B), de.test(i) ? B++ : (i = n, W === 0 && J(St)), W--, i === n ? r = void 0 : (B = r, r = n), r === n ? (B = t, t = n) : (i = ma(), i === n ? (B = t, t = n) : (V = t, t = dr(i))), t === n && (t = B, e.charCodeAt(B) === 92 ? (r = "\\", B++) : (r = n, W === 0 && J(F)), r === n ? (B = t, t = n) : (e.charCodeAt(B) === 34 ? (i = "\"", B++) : (i = n, W === 0 && J(bt)), i === n ? (B = t, t = n) : (V = t, t = fr())), t === n && (t = B, e.charCodeAt(B) === 92 ? (r = "\\", B++) : (r = n, W === 0 && J(F)), r === n ? (B = t, t = n) : (i = ha(), i === n ? (B = t, t = n) : (V = t, t = pr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = B, r = B, W++, i = e.charAt(B), fe.test(i) ? B++ : (i = n, W === 0 && J(Ct)), W--, i === n ? r = void 0 : (B = r, r = n), r === n ? (B = t, t = n) : (i = ma(), i === n ? (B = t, t = n) : (V = t, t = mr(i))), t === n && (t = B, e.charCodeAt(B) === 92 ? (r = "\\", B++) : (r = n, W === 0 && J(F)), r === n ? (B = t, t = n) : (e.charCodeAt(B) === 39 ? (i = "'", B++) : (i = n, W === 0 && J(xt)), i === n ? (B = t, t = n) : (V = t, t = hr())), t === n && (t = B, e.charCodeAt(B) === 92 ? (r = "\\", B++) : (r = n, W === 0 && J(F)), r === n ? (B = t, t = n) : (i = ha(), i === n ? (B = t, t = n) : (V = t, t = gr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(B), pe.test(t) ? B++ : (t = n, W === 0 && J(L)), t === n && (t = B, r = B, i = e.charAt(B), se.test(i) ? B++ : (i = n, W === 0 && J(pt)), i === n ? (B = r, r = n) : (a = e.charAt(B), ce.test(a) ? B++ : (a = n, W === 0 && J(mt)), a === n ? (B = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, B)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = B, e.charCodeAt(B) === 92 ? (r = "\\", B++) : (r = n, W === 0 && J(F)), r !== n && (V = t, r = _r()), t = r, t === n && (t = B, e.charCodeAt(B) === 47 ? (r = "/", B++) : (r = n, W === 0 && J(ct)), r !== n && (V = t, r = vr()), t = r, t === n && (t = B, e.charCodeAt(B) === 98 ? (r = "b", B++) : (r = n, W === 0 && J(wt)), r !== n && (V = t, r = yr()), t = r, t === n && (t = B, e.charCodeAt(B) === 102 ? (r = "f", B++) : (r = n, W === 0 && J(Tt)), r !== n && (V = t, r = br()), t = r, t === n && (t = B, e.charCodeAt(B) === 110 ? (r = "n", B++) : (r = n, W === 0 && J(Et)), r !== n && (V = t, r = xr()), t = r, t === n && (t = B, e.charCodeAt(B) === 114 ? (r = "r", B++) : (r = n, W === 0 && J(Dt)), r !== n && (V = t, r = Sr()), t = r, t === n && (t = B, e.charCodeAt(B) === 116 ? (r = "t", B++) : (r = n, W === 0 && J(Ot)), r !== n && (V = t, r = Cr()), t = r, t === n && (t = B, e.charCodeAt(B) === 117 ? (r = "u", B++) : (r = n, W === 0 && J(kt)), r === n ? (B = t, t = n) : (i = B, a = B, o = e.charAt(B), me.test(o) ? B++ : (o = n, W === 0 && J(At)), o === n ? (B = a, a = n) : (s = e.charAt(B), he.test(s) ? B++ : (s = n, W === 0 && J(jt)), s === n ? (B = a, a = n) : (c = Z(), c === n ? (B = a, a = n) : (l = Z(), l === n ? (B = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, B), i === n ? (B = t, t = n) : (e.substr(B, 2) === "\\u" ? (a = "\\u", B += 2) : (a = n, W === 0 && J(Mt)), a === n ? (B = t, t = n) : (o = B, s = B, c = e.charAt(B), me.test(c) ? B++ : (c = n, W === 0 && J(At)), c === n ? (B = s, s = n) : (l = e.charAt(B), ge.test(l) ? B++ : (l = n, W === 0 && J(Nt)), l === n ? (B = s, s = n) : (u = Z(), u === n ? (B = s, s = n) : (d = Z(), d === n ? (B = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, B), o === n ? (B = t, t = n) : (V = t, t = wr(i, o))))), t === n && (t = B, e.charCodeAt(B) === 117 ? (r = "u", B++) : (r = n, W === 0 && J(kt)), r === n ? (B = t, t = n) : (i = B, a = B, o = Z(), o === n ? (B = a, a = n) : (s = Z(), s === n ? (B = a, a = n) : (c = Z(), c === n ? (B = a, a = n) : (l = Z(), l === n ? (B = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, B), i === n ? (B = t, t = n) : (V = B, a = Tr(i), a = a ? n : void 0, a === n ? (B = t, t = n) : (V = t, t = Er(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(B), _e.test(t) ? B++ : (t = n, W === 0 && J(Pt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(B), ne.test(t) ? B++ : (t = n, W === 0 && J(Ae)), t;
	}
	function $() {
		let t, r;
		for (W++, t = [], r = e.charAt(B), ve.test(r) ? B++ : (r = n, W === 0 && J(Ft)); r !== n;) t.push(r), r = e.charAt(B), ve.test(r) ? B++ : (r = n, W === 0 && J(Ft));
		return W--, t;
	}
	function ga() {
		let t, r;
		return t = B, W++, e.length > B ? (r = e.charAt(B), B++) : (r = n, W === 0 && J(ut)), W--, r === n ? t = void 0 : (B = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && jr("Member name too long (maximum 1000 characters)"), e;
	}
	kr = a();
	let va = kr !== n && B === e.length;
	function ya() {
		throw kr !== n && B < e.length && J(Nr()), Rr(Dr, U < e.length ? Mr(U) : null, U < e.length ? Ir(U, U + 1) : Ir(U, U));
	}
	if (t.peg$library) return {
		peg$result: kr,
		peg$currPos: B,
		peg$FAILED: n,
		peg$maxFailExpected: Dr,
		peg$maxFailPos: U,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return kr;
	ya();
}
var rt = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), it = {
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
}, P = (e) => {
	throw new Ue(1, 1, e);
}, at = (e) => e.type === "root" || e.type === "current", ot = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function st(e) {
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
		if (at(i)) r === "value" && !ot(i) && P("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && P(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = rt.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = it[e], a = i.args;
				a.length !== n.args.length && P(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && P(`The result of ${e}() must be compared`), r === "value" && n.logical && P(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && P("A literal must be compared");
		}
	}
}
function ct(e) {
	let t;
	try {
		t = nt(e);
	} catch (e) {
		if (Ye(e)) throw new Ue(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new Ue(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new Ue(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return st(t), t;
}
var lt = /* @__PURE__ */ new Set([
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
]), F = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), ut = (e) => e >= 55296 && e <= 56319, dt = (e) => e >= 56320 && e <= 57343, ft = (e) => e !== void 0 && e >= "0" && e <= "9", pt = (e, t) => {
	let n = e.charCodeAt(t);
	return ut(n) && dt(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : ut(n) || dt(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, mt = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !lt.has(n) ? null : n === "n" ? {
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
}, I = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return F.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, ht = (e, t) => {
	let n = e[t];
	return n === "\\" ? mt(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : pt(e, t);
}, gt = (e, t) => {
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
			let t = I(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = ht(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = ht(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, _t = (e, t) => {
	let n = t + 1, r = n;
	for (; ft(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; ft(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, vt = (e) => {
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
				let e = i ? _t(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = gt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = I(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = mt(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = pt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, yt = 1e3, bt = 1e3, xt = 16, St = /^[dgimsuy]*$/, Ct = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, L = class extends Error {}, wt = 0, Tt = 1, Et = 2, Dt = 3, Ot = 4, kt = 5, At = Be(2, 31) - 1, jt = (e, t) => {
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
	return e.scratch = void 0, (r.gen > At - t - 2 || r.step > At - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Mt = /* @__PURE__ */ new Set([
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
]), Nt = /^\{(\d+)(?:,(\d*))?\}/, Pt = /^[0-9a-fA-F]{4}/, Ft = /^\(\?([ims]*)(?:-([ims]*))?:/, It = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Lt = class {
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
		if (this.i < this.src.length) throw new L("unexpected character");
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
				let r = Ft.exec(e.slice(t, t + 12));
				if (!r) throw new L("lookaround or named group");
				let i = He({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new L("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new L("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new L("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Mt.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new L("trailing backslash");
		if (r === "b" || r === "B") throw new L("word boundary");
		if (r >= "1" && r <= "9") throw new L("backreference");
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
			if (n === -1) throw new L("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Pt.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Pt.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = Nt.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > yt || i !== Infinity && i > yt) throw new L("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Rt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= yt) throw new L("pattern too large");
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
		this.emit(kt);
	}
	compile(e) {
		if (++this.work > 4 * yt) throw new L("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(wt, this.atomId(e));
				return;
			case "bol":
				this.emit(Dt, +!!e.multiline);
				return;
			case "eol":
				this.emit(Ot, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Tt);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Et)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Tt);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Et, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Tt);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, zt = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Lt(e, r, t, n).parse(), a = new Rt(r);
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
}, Bt = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: h, stack: g, atomGen: _, atomHit: v } = r, y = r.gen, b = r.step;
	r.gen = y + t.length + 2, r.step = b + t.length + 2;
	let x = 0, S = !1, ee = (e, n, r) => {
		let s = 0;
		g[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = g[--s];
			if (h[r] !== y) switch (h[r] = y, ++c === 64 && (u(c), c = 0), i[r]) {
				case wt:
					e[n++] = r;
					break;
				case kt: return u(c), S = !0, n;
				case Et:
					g[s++] = a[r];
					break;
				case Tt:
					g[s++] = o[r], g[s++] = a[r];
					break;
				case Dt:
					(x === 0 || a[r] === 1 && It(t.charCodeAt(x - 1))) && (g[s++] = r + 1);
					break;
				case Ot: (x === t.length || a[r] === 1 && It(t.charCodeAt(x))) && (g[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (y++, p = ee(d, 0, 0), S) return !0;
	for (; x < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(x) : t.charCodeAt(x)) > 65535 ? 2 : 1, n = t.slice(x, x + e), r = b + x + 1;
		y++, m = 0, x += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (_[i] !== r) {
				_[i] = r;
				let e = s[i];
				v[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (v[i] === 1 && (m = ee(f, m, t + 1), S)) return !0;
		}
		if (!l && (m = ee(f, m, 0), S)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Vt = (e, t, n) => {
	let r = jt(e, t.length);
	try {
		return Bt(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Ht = 256, Ut = /* @__PURE__ */ new Map(), Wt = 0, Gt = (e, t, n, r, i = !1) => {
	if (e.length > bt || t.length > 7 || !St.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Ut.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Ct(s) > xt ? null : zt(n ? `^(?:${s})$` : s, t, i);
	Wt >= Ht && (Ut.clear(), Wt = 0);
	let l = Ut.get(s);
	return l === void 0 && Ut.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Wt++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Kt = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Vt(e, t, n);
}, qt = class {
	constructor(e) {
		this.nodes = e;
	}
}, Jt = (e) => {
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
}, Yt = (e) => {
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
	return !Jt(e);
}, Xt = 256, Zt = /* @__PURE__ */ new Map(), Qt = (e, t) => {
	let n = Zt.get(e);
	return n === void 0 && (n = Yt(e), Zt.size >= Xt && Zt.clear(), Zt.set(Array.from(e).join(""), n)), t(e.length), n;
}, $t = /* @__PURE__ */ new Map(), en = (e, t) => {
	let n = $t.get(e);
	return n === void 0 && (n = vt(e), n !== null && (n = Array.from(n).join("")), $t.size >= Xt && $t.clear(), $t.set(Array.from(e).join(""), n)), t(e.length), n;
}, tn = 256, nn = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > bt) c = null;
		else if (o) {
			let n = en(e, i);
			c = n === null ? null : Gt(n, t, r, i, !0);
		} else c = Qt(e, i) ? Gt(e, t, r, i) : null;
		s !== void 0 && (s.size >= tn && s.clear(), s.set(a, c));
	}
	return c !== null && Kt(c, n, i);
}, rn = {
	length: (e, t) => {
		let n = e[0];
		if (M(n)) {
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
		if (k(n)) return O(n);
		if (A(n)) {
			let e = D(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !M(r) || !M(i) ? !1 : nn(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !M(r) || !M(i) ? !1 : nn(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, an = (e, t, n = T) => e === void 0 && t === void 0 || Ge(e, t, n), on = (e, t, n = T) => !Ge(e, t, n), sn = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, cn = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return sn(n) - sn(i);
	}
	return e.length - t.length;
}, ln = (e, t, n = T) => j(e) && j(t) ? e < t : M(e) && M(t) ? (n(Math.min(e.length, t.length)), cn(e, t) < 0) : !1, un = (e, t, n = T) => ln(e, t, n) || an(e, t, n), dn = (e, t, n = T) => j(e) && j(t) ? e > t : M(e) && M(t) ? (n(Math.min(e.length, t.length)), cn(e, t) > 0) : !1, fn = (e, t, n = T) => dn(e, t, n) || an(e, t, n), pn = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, mn = (e, t, n) => {
	let r = O(e);
	for (let i = 0; i < r; i++) {
		let r = Ke(e, i);
		if (n(1 + pn(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, hn = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, gn = (e) => typeof e == "string" && e.length + 1 > qe, _n = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = O(e);
	for (let n = 0; n < a; n++) {
		let r = Ke(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), gn(r) ? i.long.push(r) : i.set.add(hn(r));
	}
	return n?.set(e, i), i;
}, vn = ({ set: e, long: t }, n, r) => {
	if (gn(n)) {
		for (let e of t) if (r(1 + pn(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(hn(n)));
}, yn = (e, t, n) => {
	let r = O(e);
	for (let i = 0; i < r; i++) if (n(), E(e, i) && t(e[i])) return !0;
	return !1;
}, bn = {
	eq: an,
	ne: on,
	lt: ln,
	le: un,
	gt: dn,
	ge: fn,
	in: (e, t, n = T) => k(t) ? mn(t, e, n) !== -1 : !1,
	nin: (e, t, n = T) => k(t) ? mn(t, e, n) === -1 : !1,
	subsetof: (e, t, n = T, r) => {
		if (!k(e) || !k(t)) return !1;
		let i = _n(t, n, r);
		return !yn(e, (e) => !vn(i, e, n), n);
	},
	anyof: (e, t, n = T, r) => {
		if (!k(e) || !k(t)) return !1;
		let i = _n(t, n, r);
		return yn(e, (e) => vn(i, e, n), n);
	},
	noneof: (e, t, n = T, r) => {
		if (!k(e) || !k(t)) return !1;
		let i = _n(t, n, r);
		return !yn(e, (e) => vn(i, e, n), n);
	},
	sizeof: (e, t) => !k(e) && !M(e) || !k(t) && !M(t) ? !1 : (k(e) ? O(e) : e.length) === (k(t) ? O(t) : t.length),
	size: (e, t) => !k(e) && !M(e) || !j(t) ? !1 : (k(e) ? O(e) : e.length) === t
}, xn = (e) => !k(e) && !M(e) ? !1 : (k(e) ? O(e) : e.length) === 0, Sn = (e, t, n, r = T, i) => !M(e) || !M(t) ? !1 : nn(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Cn = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), R = (e, t) => e.concat(`[${t}]`), wn = (e, t) => e < 0 ? t + e : e, Tn = (e, t) => {
	let n = O(e), r = wn(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: E(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, En = (e, t) => {
	for (let n of t) e.push(n);
}, Dn = 1e6, On = 100, kn = 1e6, An = 20, jn = 1e4, Mn = 1e4, Nn = class {
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
					E(n, r) && this.visit(n[r]);
				} else if (E(n, t)) this.visit(n[t]);
				else if (++e.holes > Mn) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!E(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), k(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: O(e),
				i: 0,
				holes: 0
			});
			else if (A(e)) {
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
}, Pn = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Cn(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Cn(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = O(e);
			for (let r = 0; r < n; r++) this.tick(), E(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Nn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(jn, Math.ceil((this.retained - this.retainedLimit) / An))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new w(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Dn, On * e.weight) + t, this.retainedLimit = Math.max(kn, An * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Nn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(jn, Math.ceil((this.steps - this.stepLimit) / On))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new w(`Query exceeded ${this.stepLimit} evaluation steps`);
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
			if (!A(e)) return;
			let r = this.canonicalName(n, n.value);
			if (E(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (k(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: R(t, r)
					});
				}), n;
			}
			if (A(e)) {
				let n = D(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) E(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!k(e)) return;
			let r = Tn(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: R(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (k(e)) {
				let r = Tn(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: R(t, r.index)
				} : void 0;
			}
			if (A(e)) {
				let r = String(n.value);
				return E(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!k(e)) return [];
			let r = O(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : wn(n.start, r), o = n.end === null ? r : wn(n.end, r)) : (a = n.start === null ? r - 1 : wn(n.start, r), o = n.end === null ? -r - 1 : wn(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: E(e, u) ? e[u] : void 0,
				paths: R(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (A(e.value)) {
						let t = this.handleIdentifier(e, r);
						N(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (A(e.value)) {
						let t = this.handleStringLiteral(e, r);
						N(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (k(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						N(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					En(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": En(n, this.handleBracketExpressionContent(e, r));
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
						N(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						En(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						En(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						N(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (A(e)) {
					let t = D(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else k(e) && i.push({
					parent: a,
					keys: null,
					length: O(e),
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
						if (!E(n, t)) continue;
						a = {
							value: n[t],
							paths: R(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!E(n, r)) continue;
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
						if (!j(i) || !j(r)) i = void 0;
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
					return j(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return xn(n);
			if (t.operator === "reg") return Sn(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = bn[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new qt(r.value) : new qt(N(r?.value) ? [r?.value] : []);
			}), i = rn[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : N(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : N(n);
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
					if (k(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: R(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (A(n)) {
						let i = D(n);
						this.tick(i.length);
						for (let a of i) {
							if (!E(n, a)) continue;
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
					if (!N(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) En(n, a);
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
				throw Ye(e) ? new w("Query is nested too deeply") : Xe(e) ? new w("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Dn, this.retainedLimit = this.adaptiveLimit ? kn : Infinity;
	}
}, Fn = (e, t, n) => {
	let r = ct(t), i = new Pn(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? Ze(i) ? [] : [i.value] : i?.value;
}, In = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Fn(e, i, n);
		N(t) && r.push(t);
	}
	return r;
}, Ln = (e, t, n = {}) => {
	try {
		return k(t) ? In(e, t, n) : Fn(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Rn = (e) => typeof e == "object" && !!e && !Array.isArray(e), zn = (e, t) => {
	if (!Rn(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = z(t, i);
	return n;
}, Bn = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => z(t, e));
}, Vn = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Hn = (e, t) => Vn(e, t), Un = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Wn = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Gn = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Wn,
		applyTemplate: e
	});
}, z = (e, t, n) => {
	let r = e, i = t;
	Un(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Vn(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Hn(a?.textContent, r)), "attributes" in a && (a.attributes = zn(a?.attributes, r)), "children" in a && (a.children = Bn(a?.children, r))), a);
};
Gn(z);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Kn = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, qn = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Jn = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: qn,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Yn = (e, t) => {
	let n = e, r = t;
	return Kn(n, r), n.map((e) => z(e, r));
};
Jn((e, t) => {
	let n = e;
	return Kn(n, t), n.map((e) => z(e, e[t]));
}, Yn);
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var Xn = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Xn(n, t);
		if (e) return e;
	}
	return null;
}, Zn = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Ln(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Xn(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
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
}, Qn = (e, t, n, r) => {
	let { parent: i, key: a } = Zn(e, t, r);
	return (Fe[t.action] || Pe)(i, a, n), e;
}, $n = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = $n(n, t);
		if (e) return e;
	}
	return null;
}, er = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? $n(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, tr = {
	applyTemplate: z,
	fromCollection: Yn
}, nr = (e, t, n) => {
	let r = e?.sourcePath;
	if (r === null) return null;
	if (r?.jsonPath) {
		let e = t?.[r.fileName];
		if (e === void 0) throw Error(`Registry entry not found: ${r.fileName}`);
		let i = Ln(e, r.jsonPath, { returnArray: !0 });
		if (i.length !== 1) throw Error(`Source JSONPath must identify exactly one value; matched ${i.length}: ${r.jsonPath}`);
		return n && console.log("json-instruction-single v8 source:", r, i[0]), i[0];
	}
	return er(t, r);
}, rr = (e, t, n) => {
	let r = (t?.spec ?? he)[e.templateKey], i = nr(e, t, n), a = e?.func === null ? r : tr[e.func](i, r);
	return i === null ? r : a;
}, ir = (e, t, n) => {
	n && console.log("runSingleInstruction v8:", e);
	let r = rr(e, t, n);
	return n && console.log("runSingleInstruction v8 result:", r), Qn(t, e.destinationPath, r, n), r;
}, ar = (e, t, n, r) => (e.forEach((e) => ir(e, t, n, r)), t), or = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), sr = (e, t) => {
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
}, cr = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (sr(e, t), t.map((t) => {
	let i = z(t, r);
	return i.children = Yn(or(e, t), n), i;
})), lr = (e, t) => t.map((t) => ({
	...e,
	rowData: t[e.columnName]
})), ur = (e, t) => {
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
}, dr = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (ur(e, t), e.map((e) => {
	let i = z(e, n);
	return i.children = t.length > 0 ? Yn(lr(e, t), r) : [], i;
})), fr = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = he[e?.templateKey?.columnKey], a = he[e?.templateKey?.rowKey], o = cr({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:rowOnColumn]", e.narration, o), Qn({
			base: t,
			data: n
		}, e.destinationPath, o, r);
	});
}, pr = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = he[e?.templateKey?.columnKey], a = he[e?.templateKey?.rowKey], o = dr({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:columnOnRow]", e.narration, o), Qn({
			base: t,
			data: n
		}, e.destinationPath, o, r);
	});
}, mr = ({ single: e = [], rowOnColumn: t = [], columnOnRow: n = [], base: r, data: i, showLog: a = !1 } = {}) => {
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
	}), e.length && ar(e, o, a), t.length && fr({
		instructions: t,
		base: r,
		data: i,
		showLog: a
	}), n.length && pr({
		instructions: n,
		base: r,
		data: i,
		showLog: a
	}), o;
}, hr = (e = [], t) => e.filter(({ destinationPath: e }) => {
	let n = e?.jsonPath;
	return typeof n != "string" || !n.trim() ? !1 : Ln(t, n, { returnArray: !0 }).length > 0;
}), gr = ({ base: e, options: t = {}, optionDefs: n = {}, showLog: r = !1 } = {}) => {
	if (!e) return e;
	let i = { base: e };
	if (t.showSearch && n.search) {
		let t = hr(n.search, e);
		r && console.log("[runOptions:search]", t), ar(t, i, r);
	}
	if ((t.showSerial || t.serial) && n.serial) {
		let t = hr(n.serial, e);
		r && console.log("[runOptions:serial]", t), ar(t, i, r);
	}
	if ((t.showOptions || t.options) && n.options) {
		let t = hr(n.options, e);
		r && console.log("[runOptions:options]", t), ar(t, i, r);
	}
	return e;
}, _r = ({ definitions: e = ce, spec: t = ae, instructions: n = me, type: r = "simple", data: i = [], columns: a = [], options: o = {}, showLog: s = !1 } = {}) => {
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
	let g = mr({
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
	return gr({
		base: _,
		options: o,
		optionDefs: y,
		showLog: s
	}), _;
}, vr = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, yr = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: vr,
		runInstructions: e
	});
}, br = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, xr = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, Sr = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: i }) => {
	let a = br({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), o = xr(n, r), s = i[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof s != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return s(a, o, r);
}, Cr = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, wr = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, Tr = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, Er = /* @__PURE__ */ t({
	closest: () => Cr,
	querySelector: () => wr,
	querySelectorAll: () => Tr
}), B = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, V = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, H = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? V(e, {}, n) : B(e, {}, n);
		o[r] = s;
	}), o;
}, U = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = V(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, Dr = /* @__PURE__ */ t({
	mapNamedValues: () => U,
	mapValues: () => H,
	readText: () => B,
	readValue: () => V
}), W = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, Or = /* @__PURE__ */ t({ isKey: () => W }), kr = {
	...Er,
	...Dr,
	...Or
}, Ar = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = Sr({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: kr
		});
	}
	return r;
}, jr = Ar;
yr(Ar);
// node_modules/dom-traversal-functions/src/v3/table/header/instructions.json
var Mr = [{
	narration: "Find search input control if event came from within header container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "input, form, div" }
}, {
	narration: "Read search query value from input",
	sourcePath: { fileName: "previous" },
	func: "readValue"
}], G = (e) => e ? (jr(e.target || e, Mr) || "").trim().toLowerCase() : "", K = /* @__PURE__ */ t({
	default: () => G,
	getSearchQuery: () => G,
	instructions: () => Mr
}), q = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, Nr = (e, t = "") => {
	let n = q(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, Pr = (e, t = "table-primary", n = "") => {
	let r = q(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, Fr = [
	{
		narration: "Find closest body table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	},
	{
		narration: "Collect all data cells from row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "td" }
	},
	{
		narration: "Map collected cell values to columns using clientData",
		sourcePath: { fileName: "previous" },
		func: "mapValues",
		arguments: { read: "text" }
	}
], Ir = (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
	let i = q(e);
	if (!i) return null;
	let a = Nr(i, r);
	return n && Array.isArray(n) && a >= 0 && a < n.length ? n[a] : jr(i, Fr, { columns: t.map((e) => typeof e == "string" ? e : e.columnName || e.field) }) || {};
}, J = /* @__PURE__ */ t({
	getRowData: () => Ir,
	getRowElement: () => q,
	getRowIndex: () => Nr,
	highlightRow: () => Pr,
	instructions: () => Fr
}), Lr = [
	{
		narration: "Find closest footer table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tfoot tr" }
	},
	{
		narration: "Collect all input and select controls in footer row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "input, select" }
	},
	{
		narration: "Map named control values into object",
		sourcePath: { fileName: "previous" },
		func: "mapNamedValues"
	}
], Rr = (e, t = []) => {
	let n = q(e);
	if (!n) return {};
	let r = jr(n, Lr);
	if (r && typeof r == "object" && Object.keys(r).length > 0) return r;
	let i = {};
	return t && t.length > 0 && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.columnName || e.field, r = n.querySelector(`input[name="${t}"], select[name="${t}"]`) || n.querySelector(`input#${t}, select#${t}`);
		r && (i[t] = r.value.trim());
	}), i;
}, zr = (e) => {
	let t = q(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
}, Y = {
	header: K,
	body: J,
	footer: /* @__PURE__ */ t({
		clearRowInputs: () => zr,
		getFooterData: () => Rr,
		instructions: () => Lr
	})
}, Br = {
	name: "dom-traversal-functions",
	version: "v3"
};
// node_modules/dom-traversal-functions/src/v3/index.js
((e) => {
	let t = e;
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks.domTraversal ??= {}, globalThis.ks.domTraversal = {
		meta: Br,
		...t
	});
})({ table: Y });
// src/v52/hookEvents.js
var Vr = ({ container: e, dataset: t = [], columns: n = [], options: r = {}, onSearch: i = null, onRowClick: a = null, onRowAction: o = null, onSave: s = null, showLog: c = !1 } = {}) => {
	let l = typeof e == "string" ? document.getElementById(e) : e;
	if (!l) return c && console.warn("[hookEvents] Container not found:", e), null;
	let u = {
		dataset: [...t],
		filteredData: [...t],
		selectedIndex: -1
	}, d = (e) => {
		let t = l.querySelector("#table-content-container") || l.querySelector("table")?.parentElement;
		if (!t) {
			c && console.warn("[hookEvents] #table-content-container not found.");
			return;
		}
		let i = t.id || "table-content-container";
		t.id ||= i, Hr({
			data: e,
			columns: n,
			targetHtmlId: i,
			appendPosition: "replace",
			type: "withFooter",
			options: {
				showSerial: r.showSerial ?? !0,
				showOptions: r.showOptions ?? !0
			},
			classToApply: "",
			showLog: !1
		});
	};
	return l.addEventListener("input", (e) => {
		let t = e.target;
		if (!t.matches("input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input")) return;
		let n = (t.value || "").trim().toLowerCase(), r = n ? u.dataset.filter((e) => Object.values(e).some((e) => String(e ?? "").toLowerCase().includes(n))) : u.dataset;
		u.filteredData = r, d(r);
		let a = l.querySelector("#search-feedback");
		a && (a.textContent = n ? `Showing ${r.length} of ${u.dataset.length} records matching "${t.value.trim()}".` : `Showing all ${u.dataset.length} records.`), typeof i == "function" && i(n, r);
	}), l.addEventListener("click", (e) => {
		let t = e.target.closest("button");
		if (t && l.contains(t)) {
			let r = t.closest("tfoot tr");
			if (r) {
				let e = Y?.footer?.getFooterData ? Y.footer.getFooterData(r, n) : {};
				e && Object.keys(e).length !== 0 || r.querySelectorAll("input, select").forEach((t) => {
					let n = t.id || t.name;
					n && (e[n] = t.value);
				}), Y?.footer?.clearRowInputs ? Y.footer.clearRowInputs(r) : r.querySelectorAll("input").forEach((e) => e.value = ""), u.dataset.push(e), u.filteredData.push(e), d(u.filteredData), typeof s == "function" && s(e, u.dataset);
				return;
			}
			let i = t.closest("tbody tr");
			if (i) {
				e.stopPropagation(), Y?.body?.highlightRow && Y.body.highlightRow(i, "table-primary");
				let n = Y?.body?.getRowIndex ? Y.body.getRowIndex(i) : Array.from(i.parentElement.children).indexOf(i), r = u.filteredData[n] || u.dataset[n];
				u.selectedIndex = n;
				let a = t.dataset.action || t.textContent.trim().toLowerCase() || "show";
				typeof o == "function" && r && o(a, r, n);
				return;
			}
		}
		let r = e.target.closest("tbody tr");
		if (r && l.contains(r)) {
			r.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
				e.classList.remove("table-primary", "table-active");
			}), r.classList.add("table-primary");
			let e = Y?.body?.getRowIndex ? Y.body.getRowIndex(r) : Array.from(r.parentElement.children).indexOf(r), t = u.filteredData[e] || u.dataset[e];
			u.selectedIndex = e, typeof a == "function" && t && a(t, e);
		}
	}), {
		getState: () => ({ ...u }),
		repaint: (e) => d(e || u.filteredData)
	};
}, Hr = (e = {}) => {
	p(e);
	let t = e?.showLog;
	return Ae({
		jsonSpec: _r({
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
Me({
	render: Hr,
	hookEvents: Vr
});
export { _r as buildTableSpec, Hr as default, Hr as render, Vr as hookEvents };
