(self.webpackChunkecommerce=self.webpackChunkecommerce||[]).push([[315],{9572:function(e,r,t){"use strict";var n=t(2791),c=t(2808),s=t.n(c),i=t(9859),a=t(8660),u=t(3267);r.Z=function(){var e=(0,a.z)();n.useEffect((function(){if(window.location.search){var r=s().parse(window.location.search.substring(1));e((0,i.rr)(r)),r.search&&e((0,u.qb)(r.search))}}),[])}},7608:function(e,r,t){"use strict";t.d(r,{Z:function(){return v}});var n=t(2791),c=t(8509),s=t(1889),i=t(7275),a=t(8660),u=t(8457),o=t(6871),f=t(2808),d=t.n(f),l=t(9859),m=t(1192),h=t(3267),x=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=(0,a.i)(u.Z),s=c.sizes,i=c.color,f=c.sort,x=c.currentPage,Z=c.itemsLimit,p=(0,a.i)(m.M),g=(0,a.z)(),j=(0,o.s0)();n.useEffect((function(){t&&g((0,h.qb)(null));var n=d().stringify({sizes:s,color:i,p:x,l:Z,sortBy:f.property,order:f.order,search:p},{skipNulls:!0,arrayFormat:"comma"});r.current&&j("?".concat(n)),g((0,l.QT)("".concat(e,"/").concat(e,"?").concat(n))),r.current=!0}),[s,i,f,e,x,Z,p])},Z=t(649),p=t(8151),g=t(3025),j=t(184),v=function(e){var r=e.categoryId,t=e.clearSearchRequest,o=void 0!==t&&t,f=(0,a.i)(u.Z).requestQuery,d=(0,n.useRef)(!1);x(r,d,o);var l=(0,i.YP)(f),m=l.data,h=l.isLoading,v=l.isError,y=l.isFetching,w=l.refetch,P=function(e,r,t,c){return n.useMemo((function(){return r||e||!t?[]:t.map((function(e){return(0,j.jsx)(s.ZP,{item:!0,xs:2,sm:3,md:3,children:(0,j.jsx)(g.Z,{product:e,queryParams:c})},e.id)}))}),[t,r,e])}(v,y,m,f);return(0,j.jsxs)(s.ZP,{container:!0,spacing:{xs:2,md:3},columns:{xs:4,sm:8,md:12},children:[P,(0,j.jsx)(Z.Z,{isLoading:h,isFetching:y,itemsToShow:8,children:(0,j.jsx)(c.Z,{})}),v&&(0,j.jsx)(p.Z,{reload:w})]})}},6231:function(e,r,t){"use strict";var n=t(3430),c=t(2791),s=t(7246),i=t(9859),a=t(8660),u=t(7275),o=t(8457),f=t(184);r.Z=function(){var e=(0,a.i)(o.Z),r=e.currentPage,t=e.requestQuery,d=e.itemsLimit,l=(0,u.YP)(t.replace("p=".concat(r,"&l=").concat(d),"p=1&l=999")).data,m=(0,a.z)(),h=c.useState(1),x=(0,n.Z)(h,2),Z=x[0],p=x[1];c.useEffect((function(){var e=l?l.length:1,r=Math.ceil(e/d);r>1&&p(r),m((0,i.jw)(e))}),[l,d]);return Z<2?(0,f.jsx)("span",{}):(0,f.jsx)(s.Z,{count:+Z,defaultPage:+r,page:+r,sx:{mb:6,mt:3},onChange:function(e,r){m((0,i.D4)(r))}})}},8719:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return x}});var n=t(3430),c=t(2791),s=t(1614),i=t(6231),a=t(7608),u=t(9572),o=t(890),f=t(626),d=t(8660),l=t(184),m=function(){var e=(0,d.i)((function(e){return e.searchSlice.searchRequestText})),r=(0,d.i)((function(e){return e.filterSlice.itemsCount}));return(0,l.jsxs)(s.Z,{maxWidth:"md",sx:{py:6},children:[(0,l.jsxs)(o.Z,{sx:{pb:4},children:["".concat(r," "),'results for "',e,'"']}),(0,l.jsx)(f.Z,{})]})},h=t(7275),x=function(){var e=(0,h.NL)("").data,r=c.useState(e?String(e[0].id):"1"),t=(0,n.Z)(r,2),o=t[0];t[1];return(0,u.Z)(),(0,l.jsxs)(s.Z,{maxWidth:"xl",className:"product-category__wrapper",children:[(0,l.jsx)(m,{}),(0,l.jsx)(a.Z,{categoryId:o}),(0,l.jsx)(i.Z,{})]})}},4654:function(){}}]);
//# sourceMappingURL=315.f453b22f.chunk.js.map