$(function () {
	// $.getJSON('/search.json', function (resp) {
	//     // console.log(resp);
	//     $("#search-input-2").fuzzyComplete(resp);
	// });

	SimpleJekyllSearch({
		searchInput: document.getElementById('search-input'),
		resultsContainer: document.getElementById('results-container'),
		json: '/search.json'
	})

});


!function () {
	"use strict";
	var n = function g(t, e) {
		    var n = e.length,
		        r = t.length;
		    if (n < r) {
			    return !1;
		    }
		    if (r === n) {
			    return t === e;
		    }
		    t:for (var i = 0, o = 0; i < r; i++) {
			    for (var u = t.charCodeAt(i); o < n;) if (e.charCodeAt(o++) === u) {
				    continue t;
			    }
			    return !1
		    }
		    return !0
	    },
	    e = new function t() {
		    this.matches = function (t, e) {
			    return n(e.toLowerCase(), t.toLowerCase())
		    }
	    };
	var r = new function O() {
		this.matches = function (e, t) {
			return !!e && (e = e.trim().toLowerCase(), (t = t.trim().toLowerCase()).split(" ").filter(function (t) {
				return 0 <= e.indexOf(t)
			}).length === t.split(" ").length)
		}
	};
	var l = {
		put: function z(t) {
			return function i(t) {
				let e = [];
				a();
				for (let n = 0, r = t.length; n < r; n++) {
					// o.push(t[n]);
					e.push(s(t[n]));
				}
				// console.log("o", o);
				// console.log("e", e);
				return e
			}(t);
		},
		clear: a,
		search: function S(t) {
			return t ? function a(t, e, n, r) {
				for (var i = [], o = 0; o < t.length && i.length < r.limit; o++) {
					let u = d(t[o], e, n, r);
					u && i.push(u)
				}
				return i
			}(o, t, u.searchStrategy, u).sort(u.sort) : []
		}, setOptions: function q(t) {
			(u = t || {}).fuzzy = t.fuzzy || !1, u.limit = t.limit || 10, u.searchStrategy = t.fuzzy ? e : r, u.sort = t.sort || i
		}
	};

	function i() {
		return 0
	}

	var o = [],
	    u = {};

	function a() {
		return o.length = 0, o
	}

	function s(t) {
		return o.push(t), o
	}

	function d(t, e, n, r) {
		for (var i in t) if (!p(t[i], r.exclude) && n.matches(t[i], e)) {
			return t
		}
	}

	function p(t, e) {
		for (var n = !1, r = 0, i = (e = e || []).length; r < i; r++) {
			var o = e[r];
			!n && new RegExp(t).test(o) && (n = !0)
		}
		return n
	}

	u.fuzzy = !1, u.limit = 10, u.searchStrategy = u.fuzzy ? e : r, u.sort = i;
	var h = {
		    compile: function j(r) {
			    return m.template.replace(m.pattern, function (t, e) {
				    var n = m.middleware(e, r[e], m.template);
				    return void 0 !== n ? n : r[e] || t
			    })
		    }, setOptions: function C(t) {
			    m.pattern = t.pattern || m.pattern, m.template = t.template || m.template, "function" == typeof t.middleware && (m.middleware = t.middleware)
		    }
	    },
	    m = {};
	m.pattern = /\{(.*?)\}/g, m.template = "", m.middleware = function () {
	};
	var options = {
		merge: function L(t, e) {
			var n = {};
			for (var r in t) n[r] = t[r], "undefined" != typeof e[r] && (n[r] = e[r]);
			return n
		}, isJSON: function M(t) {
			try {
				return !!(t instanceof Object && JSON.parse(JSON.stringify(t)))
			} catch (e) {
				return !1
			}
		}
	};
	!function (t) {
		var o = {
			    searchInput: null,
			    resultsContainer: null,
			    json: [],
			    success: Function.prototype,
			    searchResultTemplate: '<li class="list-group-item list-group-item-action list-group-item-dark"><a href="{url}">{title}</a></li>',
			    templateMiddleware: Function.prototype,
			    sortMiddleware: function () {
				    return 0
			    },
			    noResultsText: "No results found",
			    limit: 10,
			    fuzzy: !1,
			    exclude: []
		    },
		    n = ["searchInput", "resultsContainer", "json"],
		    r = function y(e) {
			    if (!function n(t) {
				    return !!t && "undefined" != typeof t.required && t.required instanceof Array
			    }(e)) {
				    throw new Error("-- OptionsValidator: required options missing");
			    }
			    if (!(this instanceof y)) {
				    return new y(e);
			    }
			    var r = e.required;
			    this.getRequiredOptions = function () {
				    return r
			    }, this.validate = function (e) {
				    var n = [];
				    return r.forEach(function (t) {
					    "undefined" == typeof e[t] && n.push(t)
				    }), n
			    }
		    }({required: n});

		function addSearchEvent(t) {
			o.success(t), l.put(t), function e() {
				o.searchInput.addEventListener("keyup", function (t) {
					(function e(t) {
						return -1 === [13, 16, 20, 37, 38, 39, 40, 91].indexOf(t)
					})(t.which) && (u(), c(t.target.value))
				})
			}()
		}

		function u() {
			o.resultsContainer.innerHTML = ""
		}

		function a(t) {
			o.resultsContainer.innerHTML += t
		}

		function c(t) {
			(function e(t) {
				return t && 0 < t.length
			})(t) && (u(), function i(t, e) {
				var n = t.length;
				if (0 === n) {
					return a(o.noResultsText);
				}
				for (var r = 0; r < n; r++) t[r].query = e, a(h.compile(t[r]))
			}(l.search(t), t))
		}

		function s(t) {
			throw new Error("SimpleJekyllSearch --- " + t)
		}

		var createHeaderJson = function (t) {
			//console.log(window.location.href);
			// format { }
		};

		t.SimpleJekyllSearch = function (t) {
			o = options.merge(o, t);
			h.setOptions({
				template: o.searchResultTemplate,
				middleware: o.templateMiddleware
			});
			l.setOptions({
				fuzzy: o.fuzzy,
				limit: o.limit,
				sort: o.sortMiddleware
			});
			$.getJSON('/search.json', function (data) {
				// console.log(data);
				createHeaderJson(data);
				addSearchEvent(data);
			});
		}
	}(window)
}();
