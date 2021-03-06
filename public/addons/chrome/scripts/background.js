function navigate(a) {
    a = "http://localhost:3000" + a,
    chrome.tabs.query({
            active: !0,
            currentWindow: !0
        },
        function(b) {
            chrome.tabs.update(b[0].id, {
                url: a
            })
        })
}

function breakSearchTokens(a) {
    return a.match(/#?"[^"]*?"|[#@\S]+/g)
}

function getUrl(a) {
    return tokens = _.filter(breakSearchTokens(a), function(a) {
        return a
    }), username = _.find(tokens, function(a) {
        return "@" == a.charAt(0)
    }), tags = _.filter(tokens, function(a) {
        return "#" == a.charAt(0)
    }), tagbundle = _.find(tokens, function(a) {
        return /^\[.*\]$/.test(a)
    }), search = _.reject(tokens, function(a) {
        return a == username || tags.indexOf(a) >= 0 || a == tagbundle
    }), username && (username = username.substring(1)), username && "me" != username || (user = localStorage.getItem("user"), user && (user = JSON.parse(user), user && (username = user.username))), _.isEmpty(tags) || (tags = _.map(tags, function(a) {
        return encodeURIComponent(a.substring(1).replace(/"/g, ""))
    })), _.isEmpty(tagbundle) || (tagbundle = tagbundle.substring(1, tagbundle.length - 1)), _.isEmpty(search) || (search = _.map(search, function(a) {
        return encodeURIComponent(a)
    })), path = "", username && (path = path + "/" + username), _.isEmpty(tags) ? !_.isEmpty(tagbundle) && username && (path = path + "/tag_bundle/" + tagbundle) : path = username ? path + "/" + tags.join(",") : path + "/tag/" + tags[0], _.isEmpty(search) || (username || _.isEmpty(tags)) && (path = path + "/search/" + search.join(",")), path
}(function() {
    function a(a, b, c) {
        for (var d = (c || 0) - 1, e = a ? a.length : 0; ++d < e;)
            if (a[d] === b) return d;
        return -1
    }

    function b(b, c) {
        var d = typeof c;
        if (b = b.cache, "boolean" == d || null == c) return b[c] ? 0 : -1;
        "number" != d && "string" != d && (d = "object");
        var e = "number" == d ? c : s + c;
        return b = (b = b[d]) && b[e], "object" == d ? b && a(b, c) > -1 ? 0 : -1 : b ? 0 : -1
    }

    function c(a) {
        var b = this.cache,
            c = typeof a;
        if ("boolean" == c || null == a) b[a] = !0;
        else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a : s + a,
                e = b[c] || (b[c] = {});
            "object" == c ? (e[d] || (e[d] = [])).push(a) : e[d] = !0
        }
    }

    function d(a) {
        return a.charCodeAt(0)
    }

    function e(a, b) {
        var c = a.criteria,
            d = b.criteria;
        if (c !== d) {
            if (c > d || "undefined" == typeof c) return 1;
            if (d > c || "undefined" == typeof d) return -1
        }
        return a.index - b.index
    }

    function f(a) {
        var b = -1,
            d = a.length,
            e = a[0],
            f = a[0 | d / 2],
            g = a[d - 1];
        if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g) return !1;
        var h = i();
        h["false"] = h["null"] = h["true"] = h.undefined = !1;
        var j = i();
        for (j.array = a, j.cache = h, j.push = c; ++b < d;) j.push(a[b]);
        return j
    }

    function g(a) {
        return "\\" + W[a]
    }

    function h() {
        return p.pop() || []
    }

    function i() {
        return q.pop() || {
            array: null,
            cache: null,
            criteria: null,
            "false": !1,
            index: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            value: null
        }
    }

    function j() {}

    function k(a) {
        a.length = 0, p.length < u && p.push(a)
    }

    function l(a) {
        var b = a.cache;
        b && l(b), a.array = a.cache = a.criteria = a.object = a.number = a.string = a.value = null, q.length < u && q.push(a)
    }

    function m(a, b, c) {
        b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
        for (var d = -1, e = c - b || 0, f = Array(0 > e ? 0 : e); ++d < e;) f[d] = a[b + d];
        return f
    }

    function n(c) {
        function p(a) {
            return a && "object" == typeof a && !Xd(a) && yd.call(a, "__wrapped__") ? a : new q(a)
        }

        function q(a, b) {
            this.__chain__ = !! b, this.__wrapped__ = a
        }

        function u(a, b, c, d, e) {
            if (c) {
                var f = c(a);
                if ("undefined" != typeof f) return f
            }
            var g = Ab(a);
            if (!g) return a;
            var i = Ed.call(a);
            if (!S[i]) return a;
            var j = Ud[i];
            switch (i) {
                case L:
                case M:
                    return new j(+a);
                case O:
                case R:
                    return new j(a);
                case Q:
                    return f = j(a.source, A.exec(a)), f.lastIndex = a.lastIndex, f
            }
            var l = Xd(a);
            if (b) {
                var n = !d;
                d || (d = h()), e || (e = h());
                for (var o = d.length; o--;)
                    if (d[o] == a) return e[o];
                f = l ? j(a.length) : {}
            } else f = l ? m(a) : ce({}, a);
            return l && (yd.call(a, "index") && (f.index = a.index), yd.call(a, "input") && (f.input = a.input)), b ? (d.push(a), e.push(f), (l ? Tb : fe)(a, function(a, g) {
                f[g] = u(a, b, c, d, e)
            }), n && (k(d), k(e)), f) : f
        }

        function W(a, b, c) {
            if ("function" != typeof a) return Tc;
            if ("undefined" == typeof b) return a;
            var d = a.__bindData__ || Vd.funcNames && !a.name;
            if ("undefined" == typeof d) {
                var e = F && wd.call(a);
                Vd.funcNames || !e || B.test(e) || (d = !0), (Vd.funcNames || !d) && (d = !Vd.funcDecomp || F.test(e), Wd(a, d))
            }
            if (d !== !0 && d && 1 & d[1]) return a;
            switch (c) {
                case 1:
                    return function(c) {
                        return a.call(b, c)
                    };
                case 2:
                    return function(c, d) {
                        return a.call(b, c, d)
                    };
                case 3:
                    return function(c, d, e) {
                        return a.call(b, c, d, e)
                    };
                case 4:
                    return function(c, d, e, f) {
                        return a.call(b, c, d, e, f)
                    }
            }
            return Dc(a, b)
        }

        function Y(a, b, c, d) {
            for (var e = (d || 0) - 1, f = a ? a.length : 0, g = []; ++e < f;) {
                var h = a[e];
                if (h && "object" == typeof h && "number" == typeof h.length && (Xd(h) || jb(h))) {
                    b || (h = Y(h, b, c));
                    var i = -1,
                        j = h.length,
                        k = g.length;
                    for (g.length += j; ++i < j;) g[k++] = h[i]
                } else c || g.push(h)
            }
            return g
        }

        function Z(a, b, c, d, e, f) {
            if (c) {
                var g = c(a, b);
                if ("undefined" != typeof g) return !!g
            }
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            var i = typeof a,
                j = typeof b;
            if (!(a !== a || a && V[i] || b && V[j])) return !1;
            if (null == a || null == b) return a === b;
            var l = Ed.call(a),
                m = Ed.call(b);
            if (l == J && (l = P), m == J && (m = P), l != m) return !1;
            switch (l) {
                case L:
                case M:
                    return +a == +b;
                case O:
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case Q:
                case R:
                    return a == nd(b)
            }
            var n = l == K;
            if (!n) {
                if (yd.call(a, "__wrapped__ ") || yd.call(b, "__wrapped__")) return Z(a.__wrapped__ || a, b.__wrapped__ || b, c, d, e, f);
                if (l != P) return !1;
                var o = a.constructor,
                    p = b.constructor;
                if (o != p && !(zb(o) && o instanceof o && zb(p) && p instanceof p)) return !1
            }
            var q = !e;
            e || (e = h()), f || (f = h());
            for (var r = e.length; r--;)
                if (e[r] == a) return f[r] == b;
            var s = 0;
            if (g = !0, e.push(a), f.push(b), n) {
                if (r = a.length, s = b.length, g = s == a.length, !g && !d) return g;
                for (; s--;) {
                    var t = r,
                        u = b[s];
                    if (d)
                        for (; t-- && !(g = Z(a[t], u, c, d, e, f)););
                    else if (!(g = Z(a[s], u, c, d, e, f))) break
                }
                return g
            }
            return ee(b, function(b, h, i) {
                return yd.call(i, h) ? (s++, g = yd.call(a, h) && Z(a[h], b, c, d, e, f)) : void 0
            }), g && !d && ee(a, function(a, b, c) {
                return yd.call(c, b) ? g = --s > -1 : void 0
            }), q && (k(e), k(f)), g
        }

        function _(a, b, c, d, e) {
            (Xd(b) ? Tb : fe)(b, function(b, f) {
                var g, h, i = b,
                    j = a[f];
                if (b && ((h = Xd(b)) || ge(b))) {
                    for (var k = d.length; k--;)
                        if (g = d[k] == b) {
                            j = e[k];
                            break
                        }
                    if (!g) {
                        var l;
                        c && (i = c(j, b), (l = "undefined" != typeof i) && (j = i)), l || (j = h ? Xd(j) ? j : [] : ge(j) ? j : {}), d.push(b), e.push(j), l || _(j, b, c, d, e)
                    }
                } else c && (i = c(j, b), "undefined" == typeof i && (i = b)), "undefined" != typeof i && (j = i);
                a[f] = j
            })
        }

        function bb(c, d, e) {
            var g = -1,
                i = gb(),
                j = c ? c.length : 0,
                m = [],
                n = !d && j >= t && i === a,
                o = e || n ? h() : m;
            if (n) {
                var p = f(o);
                p ? (i = b, o = p) : (n = !1, o = e ? o : (k(o), m))
            }
            for (; ++g < j;) {
                var q = c[g],
                    r = e ? e(q, g, c) : q;
                (d ? !g || o[o.length - 1] !== r : i(o, r) < 0) && ((e || n) && o.push(r), m.push(q))
            }
            return n ? (k(o.array), l(o)) : e && k(o), m
        }

        function cb(a) {
            return function(b, c, d) {
                var e = {};
                c = p.createCallback(c, d, 3);
                var f = -1,
                    g = b ? b.length : 0;
                if ("number" == typeof g)
                    for (; ++f < g;) {
                        var h = b[f];
                        a(e, h, c(h, f, b), b)
                    } else fe(b, function(b, d, f) {
                        a(e, b, c(b, d, f), f)
                    });
                return e
            }
        }

        function db(a, b, c, d, e, f) {
            var g = 1 & b,
                h = 2 & b,
                i = 4 & b,
                j = 8 & b,
                k = 16 & b,
                l = 32 & b,
                m = a;
            if (!h && !zb(a)) throw new od;
            k && !c.length && (b &= -17, k = c = !1), l && !d.length && (b &= -33, l = d = !1);
            var n = a && a.__bindData__;
            if (n) return !g || 1 & n[1] || (n[4] = e), !g && 1 & n[1] && (b |= 8), !i || 4 & n[1] || (n[5] = f), k && Ad.apply(n[2] || (n[2] = []), c), l && Ad.apply(n[3] || (n[3] = []), d), n[1] |= b, db.apply(null, n);
            if (!g || h || i || l || !(Vd.fastBind || Hd && k)) p = function() {
                var n = arguments,
                    o = g ? e : this;
                if ((i || k || l) && (n = Rd.call(n), k && Fd.apply(n, c), l && Ad.apply(n, d), i && n.length < f)) return b |= 16, db(a, j ? b : -4 & b, n, null, e, f);
                if (h && (a = o[m]), this instanceof p) {
                    o = eb(a.prototype);
                    var q = a.apply(o, n);
                    return Ab(q) ? q : o
                }
                return a.apply(o, n)
            };
            else {
                if (k) {
                    var o = [e];
                    Ad.apply(o, c)
                }
                var p = k ? Hd.apply(a, o) : Hd.call(a, e)
            }
            return Wd(p, Rd.call(arguments)), p
        }

        function eb(a) {
            return Ab(a) ? Id(a) : {}
        }

        function fb(a) {
            return $d[a]
        }

        function gb() {
            var b = (b = p.indexOf) === nc ? a : b;
            return b
        }

        function hb(a) {
            var b, c;
            return a && Ed.call(a) == P && (b = a.constructor, !zb(b) || b instanceof b) ? (ee(a, function(a, b) {
                c = b
            }), "undefined" == typeof c || yd.call(a, c)) : !1
        }

        function ib(a) {
            return _d[a]
        }

        function jb(a) {
            return a && "object" == typeof a && "number" == typeof a.length && Ed.call(a) == J || !1
        }

        function kb(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = b, b = !1), u(a, b, "function" == typeof c && W(c, d, 1))
        }

        function lb(a, b, c) {
            return u(a, !0, "function" == typeof b && W(b, c, 1))
        }

        function mb(a, b, c) {
            var d;
            return b = p.createCallback(b, c, 3), fe(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }), d
        }

        function nb(a, b, c) {
            var d;
            return b = p.createCallback(b, c, 3), pb(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }), d
        }

        function ob(a, b, c) {
            var d = [];
            ee(a, function(a, b) {
                d.push(b, a)
            });
            var e = d.length;
            for (b = W(b, c, 3); e-- && b(d[e--], d[e], a) !== !1;);
            return a
        }

        function pb(a, b, c) {
            var d = Zd(a),
                e = d.length;
            for (b = W(b, c, 3); e--;) {
                var f = d[e];
                if (b(a[f], f, a) === !1) break
            }
            return a
        }

        function qb(a) {
            var b = [];
            return ee(a, function(a, c) {
                zb(a) && b.push(c)
            }), b.sort()
        }

        function rb(a, b) {
            return a ? yd.call(a, b) : !1
        }

        function sb(a) {
            for (var b = -1, c = Zd(a), d = c.length, e = {}; ++b < d;) {
                var f = c[b];
                e[a[f]] = f
            }
            return e
        }

        function tb(a) {
            return a === !0 || a === !1 || Ed.call(a) == L
        }

        function ub(a) {
            return a ? "object" == typeof a && Ed.call(a) == M : !1
        }

        function vb(a) {
            return a ? 1 === a.nodeType : !1
        }

        function wb(a) {
            var b = !0;
            if (!a) return b;
            var c = Ed.call(a),
                d = a.length;
            return c == K || c == R || c == J || c == P && "number" == typeof d && zb(a.splice) ? !d : (fe(a, function() {
                return b = !1
            }), b)
        }

        function xb(a, b, c, d) {
            return Z(a, b, "function" == typeof c && W(c, d, 2))
        }

        function yb(a) {
            return Kd(a) && !Ld(parseFloat(a))
        }

        function zb(a) {
            return "function" == typeof a
        }

        function Ab(a) {
            return !(!a || !V[typeof a])
        }

        function Bb(a) {
            return Db(a) && a != +a
        }

        function Cb(a) {
            return null === a
        }

        function Db(a) {
            return "number" == typeof a || Ed.call(a) == O
        }

        function Eb(a) {
            return a ? "object" == typeof a && Ed.call(a) == Q : !1
        }

        function Fb(a) {
            return "string" == typeof a || Ed.call(a) == R
        }

        function Gb(a) {
            return "undefined" == typeof a
        }

        function Hb(a) {
            var b = arguments,
                c = 2;
            if (!Ab(a)) return a;
            if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2]) var d = W(b[--c - 1], b[c--], 2);
            else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
            for (var e = Rd.call(arguments, 1, c), f = -1, g = h(), i = h(); ++f < c;) _(a, e[f], d, g, i);
            return k(g), k(i), a
        }

        function Ib(a, b, c) {
            var d = gb(),
                e = "function" == typeof b,
                f = {};
            if (e) b = p.createCallback(b, c, 3);
            else var g = Y(arguments, !0, !1, 1);
            return ee(a, function(a, c, h) {
                (e ? !b(a, c, h) : d(g, c) < 0) && (f[c] = a)
            }), f
        }

        function Jb(a) {
            for (var b = -1, c = Zd(a), d = c.length, e = fd(d); ++b < d;) {
                var f = c[b];
                e[b] = [f, a[f]]
            }
            return e
        }

        function Kb(a, b, c) {
            var d = {};
            if ("function" != typeof b)
                for (var e = -1, f = Y(arguments, !0, !1, 1), g = Ab(a) ? f.length : 0; ++e < g;) {
                    var h = f[e];
                    h in a && (d[h] = a[h])
                } else b = p.createCallback(b, c, 3), ee(a, function(a, c, e) {
                    b(a, c, e) && (d[c] = a)
                });
            return d
        }

        function Lb(a, b, c, d) {
            var e = Xd(a);
            if (b = W(b, d, 4), null == c)
                if (e) c = [];
                else {
                    var f = a && a.constructor,
                        g = f && f.prototype;
                    c = eb(g)
                }
            return (e ? Tb : fe)(a, function(a, d, e) {
                return b(c, a, d, e)
            }), c
        }

        function Mb(a) {
            for (var b = -1, c = Zd(a), d = c.length, e = fd(d); ++b < d;) e[b] = a[c[b]];
            return e
        }

        function Nb(a) {
            for (var b = arguments, c = -1, d = Y(b, !0, !1, 1), e = b[2] && b[2][b[1]] === a ? 1 : d.length, f = fd(e); ++c < e;) f[c] = a[d[c]];
            return f
        }

        function Ob(a, b, c) {
            var d = -1,
                e = gb(),
                f = a ? a.length : 0,
                g = !1;
            return c = (0 > c ? Nd(0, f + c) : c) || 0, Xd(a) ? g = e(a, b, c) > -1 : "number" == typeof f ? g = (Fb(a) ? a.indexOf(b, c) : e(a, b, c)) > -1 : fe(a, function(a) {
                return ++d >= c ? !(g = a === b) : void 0
            }), g
        }

        function Pb(a, b, c) {
            var d = !0;
            b = p.createCallback(b, c, 3);
            var e = -1,
                f = a ? a.length : 0;
            if ("number" == typeof f)
                for (; ++e < f && (d = !! b(a[e], e, a)););
            else fe(a, function(a, c, e) {
                return d = !! b(a, c, e)
            });
            return d
        }

        function Qb(a, b, c) {
            var d = [];
            b = p.createCallback(b, c, 3);
            var e = -1,
                f = a ? a.length : 0;
            if ("number" == typeof f)
                for (; ++e < f;) {
                    var g = a[e];
                    b(g, e, a) && d.push(g)
                } else fe(a, function(a, c, e) {
                    b(a, c, e) && d.push(a)
                });
            return d
        }

        function Rb(a, b, c) {
            b = p.createCallback(b, c, 3);
            var d = -1,
                e = a ? a.length : 0;
            if ("number" != typeof e) {
                var f;
                return fe(a, function(a, c, d) {
                    return b(a, c, d) ? (f = a, !1) : void 0
                }), f
            }
            for (; ++d < e;) {
                var g = a[d];
                if (b(g, d, a)) return g
            }
        }

        function Sb(a, b, c) {
            var d;
            return b = p.createCallback(b, c, 3), Ub(a, function(a, c, e) {
                return b(a, c, e) ? (d = a, !1) : void 0
            }), d
        }

        function Tb(a, b, c) {
            var d = -1,
                e = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : W(b, c, 3), "number" == typeof e)
                for (; ++d < e && b(a[d], d, a) !== !1;);
            else fe(a, b);
            return a
        }

        function Ub(a, b, c) {
            var d = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : W(b, c, 3), "number" == typeof d)
                for (; d-- && b(a[d], d, a) !== !1;);
            else {
                var e = Zd(a);
                d = e.length, fe(a, function(a, c, f) {
                    return c = e ? e[--d] : --d, b(f[c], c, f)
                })
            }
            return a
        }

        function Vb(a, b) {
            var c = Rd.call(arguments, 2),
                d = -1,
                e = "function" == typeof b,
                f = a ? a.length : 0,
                g = fd("number" == typeof f ? f : 0);
            return Tb(a, function(a) {
                g[++d] = (e ? b : a[b]).apply(a, c)
            }), g
        }

        function Wb(a, b, c) {
            var d = -1,
                e = a ? a.length : 0;
            if (b = p.createCallback(b, c, 3), "number" == typeof e)
                for (var f = fd(e); ++d < e;) f[d] = b(a[d], d, a);
            else f = [], fe(a, function(a, c, e) {
                f[++d] = b(a, c, e)
            });
            return f
        }

        function Xb(a, b, c) {
            var e = -1 / 0,
                f = e;
            if (!b && Xd(a))
                for (var g = -1, h = a.length; ++g < h;) {
                    var i = a[g];
                    i > f && (f = i)
                } else b = !b && Fb(a) ? d : p.createCallback(b, c, 3), Tb(a, function(a, c, d) {
                    var g = b(a, c, d);
                    g > e && (e = g, f = a)
                });
            return f
        }

        function Yb(a, b, c) {
            var e = 1 / 0,
                f = e;
            if (!b && Xd(a))
                for (var g = -1, h = a.length; ++g < h;) {
                    var i = a[g];
                    f > i && (f = i)
                } else b = !b && Fb(a) ? d : p.createCallback(b, c, 3), Tb(a, function(a, c, d) {
                    var g = b(a, c, d);
                    e > g && (e = g, f = a)
                });
            return f
        }

        function Zb(a, b) {
            var c = -1,
                d = a ? a.length : 0;
            if ("number" == typeof d)
                for (var e = fd(d); ++c < d;) e[c] = a[c][b];
            return e || Wb(a, b)
        }

        function $b(a, b, c, d) {
            if (!a) return c;
            var e = arguments.length < 3;
            b = W(b, d, 4);
            var f = -1,
                g = a.length;
            if ("number" == typeof g)
                for (e && (c = a[++f]); ++f < g;) c = b(c, a[f], f, a);
            else fe(a, function(a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            });
            return c
        }

        function _b(a, b, c, d) {
            var e = arguments.length < 3;
            return b = W(b, d, 4), Ub(a, function(a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            }), c
        }

        function ac(a, b, c) {
            return b = p.createCallback(b, c, 3), Qb(a, function(a, c, d) {
                return !b(a, c, d)
            })
        }

        function bc(a, b, c) {
            var d = a ? a.length : 0;
            if ("number" != typeof d && (a = Mb(a)), null == b || c) return a ? a[Wc(d - 1)] : o;
            var e = cc(a);
            return e.length = Od(Nd(0, b), e.length), e
        }

        function cc(a) {
            var b = -1,
                c = a ? a.length : 0,
                d = fd("number" == typeof c ? c : 0);
            return Tb(a, function(a) {
                var c = Wc(++b);
                d[b] = d[c], d[c] = a
            }), d
        }

        function dc(a) {
            var b = a ? a.length : 0;
            return "number" == typeof b ? b : Zd(a).length
        }

        function ec(a, b, c) {
            var d;
            b = p.createCallback(b, c, 3);
            var e = -1,
                f = a ? a.length : 0;
            if ("number" == typeof f)
                for (; ++e < f && !(d = b(a[e], e, a)););
            else fe(a, function(a, c, e) {
                return !(d = b(a, c, e))
            });
            return !!d
        }

        function fc(a, b, c) {
            var d = -1,
                f = a ? a.length : 0,
                g = fd("number" == typeof f ? f : 0);
            for (b = p.createCallback(b, c, 3), Tb(a, function(a, c, e) {
                var f = g[++d] = i();
                f.criteria = b(a, c, e), f.index = d, f.value = a
            }), f = g.length, g.sort(e); f--;) {
                var h = g[f];
                g[f] = h.value, l(h)
            }
            return g
        }

        function gc(a) {
            return a && "number" == typeof a.length ? m(a) : Mb(a)
        }

        function hc(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        }

        function ic(c) {
            var d = -1,
                e = gb(),
                g = c ? c.length : 0,
                h = Y(arguments, !0, !0, 1),
                i = [],
                j = g >= t && e === a;
            if (j) {
                var k = f(h);
                k ? (e = b, h = k) : j = !1
            }
            for (; ++d < g;) {
                var m = c[d];
                e(h, m) < 0 && i.push(m)
            }
            return j && l(h), i
        }

        function jc(a, b, c) {
            var d = -1,
                e = a ? a.length : 0;
            for (b = p.createCallback(b, c, 3); ++d < e;)
                if (b(a[d], d, a)) return d;
            return -1
        }

        function kc(a, b, c) {
            var d = a ? a.length : 0;
            for (b = p.createCallback(b, c, 3); d--;)
                if (b(a[d], d, a)) return d;
            return -1
        }

        function lc(a, b, c) {
            var d = 0,
                e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = -1;
                for (b = p.createCallback(b, c, 3); ++f < e && b(a[f], f, a);) d++
            } else if (d = b, null == d || c) return a ? a[0] : o;
            return m(a, 0, Od(Nd(0, d), e))
        }

        function mc(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = d && d[b] === a ? null : b, b = !1), null != c && (a = Wb(a, c, d)), Y(a, b)
        }

        function nc(b, c, d) {
            if ("number" == typeof d) {
                var e = b ? b.length : 0;
                d = 0 > d ? Nd(0, e + d) : d || 0
            } else if (d) {
                var f = wc(b, c);
                return b[f] === c ? f : -1
            }
            return a(b, c, d)
        }

        function oc(a, b, c) {
            var d = 0,
                e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = p.createCallback(b, c, 3); f-- && b(a[f], f, a);) d++
            } else d = null == b || c ? 1 : b || d;
            return m(a, 0, Od(Nd(0, e - d), e))
        }

        function pc(c) {
            for (var d = arguments, e = d.length, g = -1, i = h(), j = -1, m = gb(), n = c ? c.length : 0, o = [], p = h(); ++g < e;) {
                var q = d[g];
                i[g] = m === a && (q ? q.length : 0) >= t && f(g ? d[g] : p)
            }
            a: for (; ++j < n;) {
                var r = i[0];
                if (q = c[j], (r ? b(r, q) : m(p, q)) < 0) {
                    for (g = e, (r || p).push(q); --g;)
                        if (r = i[g], (r ? b(r, q) : m(d[g], q)) < 0) continue a;
                    o.push(q)
                }
            }
            for (; e--;) r = i[e], r && l(r);
            return k(i), k(p), o
        }

        function qc(a, b, c) {
            var d = 0,
                e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = p.createCallback(b, c, 3); f-- && b(a[f], f, a);) d++
            } else if (d = b, null == d || c) return a ? a[e - 1] : o;
            return m(a, Nd(0, e - d))
        }

        function rc(a, b, c) {
            var d = a ? a.length : 0;
            for ("number" == typeof c && (d = (0 > c ? Nd(0, d + c) : Od(c, d - 1)) + 1); d--;)
                if (a[d] === b) return d;
            return -1
        }

        function sc(a) {
            for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d;)
                for (var f = -1, g = b[c]; ++f < e;) a[f] === g && (Dd.call(a, f--, 1), e--);
            return a
        }

        function tc(a, b, c) {
            a = +a || 0, c = "number" == typeof c ? c : +c || 1, null == b && (b = a, a = 0);
            for (var d = -1, e = Nd(0, td((b - a) / (c || 1))), f = fd(e); ++d < e;) f[d] = a, a += c;
            return f
        }

        function uc(a, b, c) {
            var d = -1,
                e = a ? a.length : 0,
                f = [];
            for (b = p.createCallback(b, c, 3); ++d < e;) {
                var g = a[d];
                b(g, d, a) && (f.push(g), Dd.call(a, d--, 1), e--)
            }
            return f
        }

        function vc(a, b, c) {
            if ("number" != typeof b && null != b) {
                var d = 0,
                    e = -1,
                    f = a ? a.length : 0;
                for (b = p.createCallback(b, c, 3); ++e < f && b(a[e], e, a);) d++
            } else d = null == b || c ? 1 : Nd(0, b);
            return m(a, d)
        }

        function wc(a, b, c, d) {
            var e = 0,
                f = a ? a.length : e;
            for (c = c ? p.createCallback(c, d, 1) : Tc, b = c(b); f > e;) {
                var g = e + f >>> 1;
                c(a[g]) < b ? e = g + 1 : f = g
            }
            return e
        }

        function xc() {
            return bb(Y(arguments, !0, !0))
        }

        function yc(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = d && d[b] === a ? null : b, b = !1), null != c && (c = p.createCallback(c, d, 3)), bb(a, b, c)
        }

        function zc(a) {
            return ic(a, Rd.call(arguments, 1))
        }

        function Ac() {
            for (var a = arguments.length > 1 ? arguments : arguments[0], b = -1, c = a ? Xb(Zb(a, "length")) : 0, d = fd(0 > c ? 0 : c); ++b < c;) d[b] = Zb(a, b);
            return d
        }

        function Bc(a, b) {
            for (var c = -1, d = a ? a.length : 0, e = {}; ++c < d;) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1])
            }
            return e
        }

        function Cc(a, b) {
            if (!zb(b)) throw new od;
            return function() {
                return --a < 1 ? b.apply(this, arguments) : void 0
            }
        }

        function Dc(a, b) {
            return arguments.length > 2 ? db(a, 17, Rd.call(arguments, 2), null, b) : db(a, 1, null, null, b)
        }

        function Ec(a) {
            for (var b = arguments.length > 1 ? Y(arguments, !0, !1, 1) : qb(a), c = -1, d = b.length; ++c < d;) {
                var e = b[c];
                a[e] = db(a[e], 1, null, null, a)
            }
            return a
        }

        function Fc(a, b) {
            return arguments.length > 2 ? db(b, 19, Rd.call(arguments, 2), null, a) : db(b, 3, null, null, a)
        }

        function Gc() {
            for (var a = arguments, b = a.length; b--;)
                if (!zb(a[b])) throw new od;
            return function() {
                for (var b = arguments, c = a.length; c--;) b = [a[c].apply(this, b)];
                return b[0]
            }
        }

        function Hc(a, b, c) {
            var d = typeof a;
            if (null == a || "function" == d) return W(a, b, c);
            if ("object" != d) return function(b) {
                return b[a]
            };
            var e = Zd(a),
                f = e[0],
                g = a[f];
            return 1 != e.length || g !== g || Ab(g) ? function(b) {
                for (var c = e.length, d = !1; c-- && (d = Z(b[e[c]], a[e[c]], null, !0)););
                return d
            } : function(a) {
                var b = a[f];
                return g === b && (0 !== g || 1 / g == 1 / b)
            }
        }

        function Ic(a, b) {
            return b = "number" == typeof b ? b : +b || a.length, db(a, 4, null, null, null, b)
        }

        function Jc(a, b, c) {
            var d, e, f, g, h, i, j, k = 0,
                l = !1,
                m = !0;
            if (!zb(a)) throw new od;
            if (b = Nd(0, b) || 0, c === !0) {
                var n = !0;
                m = !1
            } else Ab(c) && (n = c.leading, l = "maxWait" in c && (Nd(b, c.maxWait) || 0), m = "trailing" in c ? c.trailing : m);
            var p = function() {
                var c = b - (zd() - g);
                if (0 >= c) {
                    e && ud(e);
                    var l = j;
                    e = i = j = o, l && (k = zd(), f = a.apply(h, d))
                } else i = Cd(p, c)
            }, q = function() {
                    i && ud(i), e = i = j = o, (m || l !== b) && (k = zd(), f = a.apply(h, d))
                };
            return function() {
                if (d = arguments, g = zd(), h = this, j = m && (i || !n), l === !1) var c = n && !i;
                else {
                    e || n || (k = g);
                    var o = l - (g - k);
                    0 >= o ? (e && (e = ud(e)), k = g, f = a.apply(h, d)) : e || (e = Cd(q, o))
                }
                return i || b === l || (i = Cd(p, b)), c && (f = a.apply(h, d)), f
            }
        }

        function Kc(a) {
            if (!zb(a)) throw new od;
            var b = Rd.call(arguments, 1);
            return Cd(function() {
                a.apply(o, b)
            }, 1)
        }

        function Lc(a, b) {
            if (!zb(a)) throw new od;
            var c = Rd.call(arguments, 2);
            return Cd(function() {
                a.apply(o, c)
            }, b)
        }

        function Mc(a, b) {
            if (!zb(a)) throw new od;
            var c = function() {
                var d = c.cache,
                    e = b ? b.apply(this, arguments) : s + arguments[0];
                return yd.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
            };
            return c.cache = {}, c
        }

        function Nc(a) {
            var b, c;
            if (!zb(a)) throw new od;
            return function() {
                return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c)
            }
        }

        function Oc(a) {
            return db(a, 16, Rd.call(arguments, 1))
        }

        function Pc(a) {
            return db(a, 32, null, Rd.call(arguments, 1))
        }

        function Qc(a, b, c) {
            var d = !0,
                e = !0;
            if (!zb(a)) throw new od;
            c === !1 ? d = !1 : Ab(c) && (d = "leading" in c ? c.leading : d, e = "trailing" in c ? c.trailing : e), T.leading = d, T.maxWait = b, T.trailing = e;
            var f = Jc(a, b, T);
            return f
        }

        function Rc(a, b) {
            if (!zb(b)) throw new od;
            return function() {
                var c = [a];
                return Ad.apply(c, arguments), b.apply(this, c)
            }
        }

        function Sc(a) {
            return null == a ? "" : nd(a).replace(be, fb)
        }

        function Tc(a) {
            return a
        }

        function Uc(a, b) {
            var c = a,
                d = !b || zb(c);
            b || (c = q, b = a, a = p), Tb(qb(b), function(e) {
                var f = a[e] = b[e];
                d && (c.prototype[e] = function() {
                    var b = this.__wrapped__,
                        d = [b];
                    Ad.apply(d, arguments);
                    var e = f.apply(a, d);
                    return b && "object" == typeof b && b === e ? this : (e = new c(e), e.__chain__ = this.__chain__, e)
                })
            })
        }

        function Vc() {
            return c._ = rd, this
        }

        function Wc(a, b, c) {
            var d = null == a,
                e = null == b;
            null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0;
            var f = Qd();
            return c || a % 1 || b % 1 ? Od(a + f * (b - a + parseFloat("1e-" + ((f + "").length - 1))), b) : a + vd(f * (b - a + 1))
        }

        function Xc(a, b) {
            if (a) {
                var c = a[b];
                return zb(c) ? a[b]() : c
            }
        }

        function Yc(a, b, c) {
            var d = p.templateSettings;
            a || (a = ""), c = de({}, c, d);
            var e, f = de({}, c.imports, d.imports),
                h = Zd(f),
                i = Mb(f),
                j = 0,
                k = c.interpolate || E,
                l = "__p += '",
                m = md((c.escape || E).source + "|" + k.source + "|" + (k === C ? z : E).source + "|" + (c.evaluate || E).source + "|$", "g");
            a.replace(m, function(b, c, d, f, h, i) {
                return d || (d = f), l += a.slice(j, i).replace(G, g), c && (l += "' +\n__e(" + c + ") +\n'"), h && (e = !0, l += "';\n" + h + ";\n__p += '"), d && (l += "' +\n((__t = (" + d + ")) == null ? '' : __t) +\n'"), j = i + b.length, b
            }), l += "';\n";
            var n = c.variable,
                q = n;
            q || (n = "obj", l = "with (" + n + ") {\n" + l + "\n}\n"), l = (e ? l.replace(w, "") : l).replace(x, "$1").replace(y, "$1;"), l = "function(" + n + ") {\n" + (q ? "" : n + " || (" + n + " = {});\n") + "var __t, __p = '', __e = _.escape" + (e ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + l + "return __p\n}";
            var r = "\n/*\n//# sourceURL=" + (c.sourceURL || "/lodash/template/source[" + I+++"]") + "\n*/";
            try {
                var s = id(h, "return " + l + r).apply(o, i)
            } catch (t) {
                throw t.source = l, t
            }
            return b ? s(b) : (s.source = l, s)
        }

        function Zc(a, b, c) {
            a = (a = +a) > -1 ? a : 0;
            var d = -1,
                e = fd(a);
            for (b = W(b, c, 1); ++d < a;) e[d] = b(d);
            return e
        }

        function $c(a) {
            return null == a ? "" : nd(a).replace(ae, ib)
        }

        function _c(a) {
            var b = ++r;
            return nd(null == a ? "" : a) + b
        }

        function ad(a) {
            return a = new q(a), a.__chain__ = !0, a
        }

        function bd(a, b) {
            return b(a), a
        }

        function cd() {
            return this.__chain__ = !0, this
        }

        function dd() {
            return nd(this.__wrapped__)
        }

        function ed() {
            return this.__wrapped__
        }
        c = c ? ab.defaults(X.Object(), c, ab.pick(X, H)) : X;
        var fd = c.Array,
            gd = c.Boolean,
            hd = c.Date,
            id = c.Function,
            jd = c.Math,
            kd = c.Number,
            ld = c.Object,
            md = c.RegExp,
            nd = c.String,
            od = c.TypeError,
            pd = [],
            qd = ld.prototype,
            rd = c._,
            sd = md("^" + nd(qd.valueOf).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
            td = jd.ceil,
            ud = c.clearTimeout,
            vd = jd.floor,
            wd = id.prototype.toString,
            xd = sd.test(xd = ld.getPrototypeOf) && xd,
            yd = qd.hasOwnProperty,
            zd = sd.test(zd = hd.now) && zd || function() {
                return +new hd
            }, Ad = pd.push,
            Bd = c.setImmediate,
            Cd = c.setTimeout,
            Dd = pd.splice,
            Ed = qd.toString,
            Fd = pd.unshift,
            Gd = function() {
                try {
                    var a = {}, b = sd.test(b = ld.defineProperty) && b,
                        c = b(a, a, a) && b
                } catch (d) {}
                return c
            }(),
            Hd = sd.test(Hd = Ed.bind) && Hd,
            Id = sd.test(Id = ld.create) && Id,
            Jd = sd.test(Jd = fd.isArray) && Jd,
            Kd = c.isFinite,
            Ld = c.isNaN,
            Md = sd.test(Md = ld.keys) && Md,
            Nd = jd.max,
            Od = jd.min,
            Pd = c.parseInt,
            Qd = jd.random,
            Rd = pd.slice,
            Sd = sd.test(c.attachEvent),
            Td = Hd && !/\n|true/.test(Hd + Sd),
            Ud = {};
        Ud[K] = fd, Ud[L] = gd, Ud[M] = hd, Ud[N] = id, Ud[P] = ld, Ud[O] = kd, Ud[Q] = md, Ud[R] = nd, q.prototype = p.prototype;
        var Vd = p.support = {};
        Vd.fastBind = Hd && !Td, Vd.funcDecomp = !sd.test(c.WinRTError) && F.test(n), Vd.funcNames = "string" == typeof id.name, p.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: C,
            variable: "",
            imports: {
                _: p
            }
        }, Id || (eb = function(a) {
            if (Ab(a)) {
                j.prototype = a;
                var b = new j;
                j.prototype = null
            }
            return b || {}
        });
        var Wd = Gd ? function(a, b) {
                U.value = b, Gd(a, "__bindData__", U)
            } : j,
            Xd = Jd || function(a) {
                return a && "object" == typeof a && "number" == typeof a.length && Ed.call(a) == K || !1
            }, Yd = function(a) {
                var b, c = a,
                    d = [];
                if (!c) return d;
                if (!V[typeof a]) return d;
                for (b in c) yd.call(c, b) && d.push(b);
                return d
            }, Zd = Md ? function(a) {
                return Ab(a) ? Md(a) : []
            } : Yd,
            $d = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }, _d = sb($d),
            ae = md("(" + Zd(_d).join("|") + ")", "g"),
            be = md("[" + Zd($d).join("") + "]", "g"),
            ce = function(a, b, c) {
                var d, e = a,
                    f = e;
                if (!e) return f;
                var g = arguments,
                    h = 0,
                    i = "number" == typeof c ? 2 : g.length;
                if (i > 3 && "function" == typeof g[i - 2]) var j = W(g[--i - 1], g[i--], 2);
                else i > 2 && "function" == typeof g[i - 1] && (j = g[--i]);
                for (; ++h < i;)
                    if (e = g[h], e && V[typeof e])
                        for (var k = -1, l = V[typeof e] && Zd(e), m = l ? l.length : 0; ++k < m;) d = l[k], f[d] = j ? j(f[d], e[d]) : e[d];
                return f
            }, de = function(a, b, c) {
                var d, e = a,
                    f = e;
                if (!e) return f;
                for (var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length; ++h < i;)
                    if (e = g[h], e && V[typeof e])
                        for (var j = -1, k = V[typeof e] && Zd(e), l = k ? k.length : 0; ++j < l;) d = k[j], "undefined" == typeof f[d] && (f[d] = e[d]);
                return f
            }, ee = function(a, b, c) {
                var d, e = a,
                    f = e;
                if (!e) return f;
                if (!V[typeof e]) return f;
                b = b && "undefined" == typeof c ? b : W(b, c, 3);
                for (d in e)
                    if (b(e[d], d, a) === !1) return f;
                return f
            }, fe = function(a, b, c) {
                var d, e = a,
                    f = e;
                if (!e) return f;
                if (!V[typeof e]) return f;
                b = b && "undefined" == typeof c ? b : W(b, c, 3);
                for (var g = -1, h = V[typeof e] && Zd(e), i = h ? h.length : 0; ++g < i;)
                    if (d = h[g], b(e[d], d, a) === !1) return f;
                return f
            }, ge = function(a) {
                if (!a || Ed.call(a) != P) return !1;
                var b = a.valueOf,
                    c = "function" == typeof b && (c = xd(b)) && xd(c);
                return c ? a == c || xd(a) == c : hb(a)
            }, he = cb(function(a, b, c) {
                yd.call(a, c) ? a[c]++ : a[c] = 1
            }),
            ie = cb(function(a, b, c) {
                (yd.call(a, c) ? a[c] : a[c] = []).push(b)
            }),
            je = cb(function(a, b, c) {
                a[c] = b
            }),
            ke = Qb;
        Td && $ && "function" == typeof Bd && (Kc = function(a) {
            if (!zb(a)) throw new od;
            return Bd.apply(c, arguments)
        });
        var le = 8 == Pd(v + "08") ? Pd : function(a, b) {
                return Pd(Fb(a) ? a.replace(D, "") : a, b || 0)
            };
        return p.after = Cc, p.assign = ce, p.at = Nb, p.bind = Dc, p.bindAll = Ec, p.bindKey = Fc, p.chain = ad, p.compact = hc, p.compose = Gc, p.countBy = he, p.createCallback = Hc, p.curry = Ic, p.debounce = Jc, p.defaults = de, p.defer = Kc, p.delay = Lc, p.difference = ic, p.filter = Qb, p.flatten = mc, p.forEach = Tb, p.forEachRight = Ub, p.forIn = ee, p.forInRight = ob, p.forOwn = fe, p.forOwnRight = pb, p.functions = qb, p.groupBy = ie, p.indexBy = je, p.initial = oc, p.intersection = pc, p.invert = sb, p.invoke = Vb, p.keys = Zd, p.map = Wb, p.max = Xb, p.memoize = Mc, p.merge = Hb, p.min = Yb, p.omit = Ib, p.once = Nc, p.pairs = Jb, p.partial = Oc, p.partialRight = Pc, p.pick = Kb, p.pluck = Zb, p.pull = sc, p.range = tc, p.reject = ac, p.remove = uc, p.rest = vc, p.shuffle = cc, p.sortBy = fc, p.tap = bd, p.throttle = Qc, p.times = Zc, p.toArray = gc, p.transform = Lb, p.union = xc, p.uniq = yc, p.values = Mb, p.where = ke, p.without = zc, p.wrap = Rc, p.zip = Ac, p.zipObject = Bc, p.collect = Wb, p.drop = vc, p.each = Tb, p.eachRight = Ub, p.extend = ce, p.methods = qb, p.object = Bc, p.select = Qb, p.tail = vc, p.unique = yc, p.unzip = Ac, Uc(p), p.clone = kb, p.cloneDeep = lb, p.contains = Ob, p.escape = Sc, p.every = Pb, p.find = Rb, p.findIndex = jc, p.findKey = mb, p.findLast = Sb, p.findLastIndex = kc, p.findLastKey = nb, p.has = rb, p.identity = Tc, p.indexOf = nc, p.isArguments = jb, p.isArray = Xd, p.isBoolean = tb, p.isDate = ub, p.isElement = vb, p.isEmpty = wb, p.isEqual = xb, p.isFinite = yb, p.isFunction = zb, p.isNaN = Bb, p.isNull = Cb, p.isNumber = Db, p.isObject = Ab, p.isPlainObject = ge, p.isRegExp = Eb, p.isString = Fb, p.isUndefined = Gb, p.lastIndexOf = rc, p.mixin = Uc, p.noConflict = Vc, p.parseInt = le, p.random = Wc, p.reduce = $b, p.reduceRight = _b, p.result = Xc, p.runInContext = n, p.size = dc, p.some = ec, p.sortedIndex = wc, p.template = Yc, p.unescape = $c, p.uniqueId = _c, p.all = Pb, p.any = ec, p.detect = Rb, p.findWhere = Rb, p.foldl = $b, p.foldr = _b, p.include = Ob, p.inject = $b, fe(p, function(a, b) {
            p.prototype[b] || (p.prototype[b] = function() {
                var b = [this.__wrapped__],
                    c = this.__chain__;
                Ad.apply(b, arguments);
                var d = a.apply(p, b);
                return c ? new q(d, c) : d
            })
        }), p.first = lc, p.last = qc, p.sample = bc, p.take = lc, p.head = lc, fe(p, function(a, b) {
            var c = "sample" !== b;
            p.prototype[b] || (p.prototype[b] = function(b, d) {
                var e = this.__chain__,
                    f = a(this.__wrapped__, b, d);
                return e || null != b && (!d || c && "function" == typeof b) ? new q(f, e) : f
            })
        }), p.VERSION = "2.2.1", p.prototype.chain = cd, p.prototype.toString = dd, p.prototype.value = ed, p.prototype.valueOf = ed, Tb(["join", "pop", "shift"], function(a) {
            var b = pd[a];
            p.prototype[a] = function() {
                var a = this.__chain__,
                    c = b.apply(this.__wrapped__, arguments);
                return a ? new q(c, a) : c
            }
        }), Tb(["push", "reverse", "sort", "unshift"], function(a) {
            var b = pd[a];
            p.prototype[a] = function() {
                return b.apply(this.__wrapped__, arguments), this
            }
        }), Tb(["concat", "slice", "splice"], function(a) {
            var b = pd[a];
            p.prototype[a] = function() {
                return new q(b.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }), p
    }
    var o, p = [],
        q = [],
        r = 0,
        s = +new Date + "",
        t = 75,
        u = 40,
        v = " 	\f ﻿\n\r\u2028\u2029 ᠎             　",
        w = /\b__p \+= '';/g,
        x = /\b(__p \+=) '' \+/g,
        y = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
        z = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
        A = /\w*$/,
        B = /^function[ \n\r\t]+\w/,
        C = /<%=([\s\S]+?)%>/g,
        D = RegExp("^[" + v + "]*0+(?=.$)"),
        E = /($^)/,
        F = /\bthis\b/,
        G = /['\n\r\t\u2028\u2029\\]/g,
        H = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setImmediate", "setTimeout"],
        I = 0,
        J = "[object Arguments]",
        K = "[object Array]",
        L = "[object Boolean]",
        M = "[object Date]",
        N = "[object Function]",
        O = "[object Number]",
        P = "[object Object]",
        Q = "[object RegExp]",
        R = "[object String]",
        S = {};
    S[N] = !1, S[J] = S[K] = S[L] = S[M] = S[O] = S[P] = S[Q] = S[R] = !0;
    var T = {
        leading: !1,
        maxWait: 0,
        trailing: !1
    }, U = {
            configurable: !1,
            enumerable: !1,
            value: null,
            writable: !1
        }, V = {
            "boolean": !1,
            "function": !0,
            object: !0,
            number: !1,
            string: !1,
            undefined: !1
        }, W = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, X = V[typeof window] && window || this,
        Y = V[typeof exports] && exports && !exports.nodeType && exports,
        Z = V[typeof module] && module && !module.nodeType && module,
        $ = Z && Z.exports === Y && Y,
        _ = V[typeof global] && global;
    !_ || _.global !== _ && _.window !== _ || (X = _);
    var ab = n();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (X._ = ab, define(function() {
        return ab
    })) : Y && Z ? $ ? (Z.exports = ab)._ = ab : Y._ = ab : X._ = ab
}).call(this), chrome.omnibox.onInputEntered.addListener(function(a) {
    navigate(getUrl(a))
});