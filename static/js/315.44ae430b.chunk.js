(self.webpackChunkecommerce=self.webpackChunkecommerce||[]).push([[315],{9572:function(e,r,t){"use strict";var n=t(2791),c=t(2808),s=t.n(c),i=t(9859),o=t(8660),a=t(3267);r.Z=function(){var e=(0,o.z)();n.useEffect((function(){if(window.location.search){var r=s().parse(window.location.search.substring(1));e((0,i.rr)(r)),r.search&&e((0,a.qb)(r.search))}}),[])}},8887:function(e,r,t){"use strict";t.d(r,{Z:function(){return w}});var n=t(8489),c=t(2791),s=t(5570),i=t(8175),o=t(1889),a=t(184),u=function(){return(0,a.jsx)(o.ZP,{item:!0,xs:2,sm:3,md:3,children:(0,a.jsxs)(i.ZP,{speed:2,width:370,height:575,viewBox:"0 0 370 575",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:[(0,a.jsx)("rect",{x:"0",y:"0",rx:"0",ry:"0",width:"370",height:"525"}),(0,a.jsx)("rect",{x:"2",y:"532",rx:"0",ry:"0",width:"370",height:"15"}),(0,a.jsx)("rect",{x:"3",y:"552",rx:"0",ry:"0",width:"50",height:"21"})]})})},d=t(8935),f=t(8660),h=t(8457),l=t(6871),x=t(2808),m=t.n(x),g=t(9859),Z=t(1192),j=t(3267),p=function(e,r,t){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=(0,f.i)(h.Z),i=s.sizes,o=s.color,a=s.sort,u=s.currentPage,d=s.itemsLimit,x=(0,f.i)(Z.M),p=(0,f.z)(),y=(0,l.s0)();c.useEffect((function(){n&&p((0,j.qb)(null));var c=m().stringify({sizes:i,color:o,p:u,l:d,sortBy:a.property,order:a.order,search:x},{skipNulls:!0,arrayFormat:"comma"});t.current&&y("?".concat(c)),p((0,g.QT)("".concat(e,"/").concat(r,"?").concat(c))),t.current=!0}),[i,o,a,r,e,u,d,x])},y=t(649),v=t(8151),w=function(e){var r=e.categoryId,t=e.categoryName,i=e.clearSearchRequest,l=void 0!==i&&i,x=(0,f.i)(h.Z).requestQuery,m=(0,c.useRef)(!1);p(r,t,m,l);var g=(0,d.YP)(x),Z=g.data,j=g.isLoading,w=g.isError,b=g.isFetching;return(0,a.jsxs)(o.ZP,{container:!0,spacing:{xs:2,md:3},columns:{xs:4,sm:8,md:12},children:[!b&&!w&&Z&&Z.map((function(e){return(0,a.jsx)(o.ZP,{item:!0,xs:2,sm:3,md:3,children:(0,a.jsx)(s.Z,(0,n.Z)({},e))},e.id)})),(0,a.jsx)(y.Z,{isLoading:j,isFetching:b,itemsToShow:8,children:(0,a.jsx)(u,{})}),w&&(0,a.jsx)(v.Z,{})]})}},6231:function(e,r,t){"use strict";var n=t(3430),c=t(2791),s=t(7246),i=t(9859),o=t(8660),a=t(8935),u=t(8457),d=t(184);r.Z=function(){var e=(0,o.i)(u.Z),r=e.currentPage,t=e.requestQuery,f=e.itemsLimit,h=(0,a.YP)(t.replace("p=".concat(r,"&l=").concat(f),"p=1&l=999")).data,l=(0,o.z)(),x=c.useState(1),m=(0,n.Z)(x,2),g=m[0],Z=m[1];c.useEffect((function(){var e=h?h.length:1,r=Math.ceil(e/f);r>1&&Z(r),l((0,i.jw)(e))}),[h,f]);return g<2?(0,d.jsx)("span",{}):(0,d.jsx)(s.Z,{count:+g,defaultPage:+r,page:+r,sx:{mb:6,mt:3},onChange:function(e,r){l((0,i.D4)(r))}})}},8719:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return l}});t(2791);var n=t(1614),c=t(6231),s=t(8887),i=t(6871),o=t(9572),a=t(890),u=t(7702),d=t(8660),f=t(184),h=function(){var e=(0,d.i)((function(e){return e.searchSlice.searchRequest})),r=(0,d.i)((function(e){return e.filterSlice.itemsCount}));return(0,f.jsxs)(n.Z,{maxWidth:"md",sx:{py:6},children:[(0,f.jsxs)(a.Z,{sx:{pb:4},children:["".concat(r," "),'results for "',e,'"']}),(0,f.jsx)(u.Z,{})]})},l=function(){var e=(0,i.UO)(),r=e.categoryId,t=e.categoryName;return(0,o.Z)(),(0,f.jsxs)(n.Z,{maxWidth:"xl",className:"product-category__wrapper",children:[(0,f.jsx)(h,{}),(0,f.jsx)(s.Z,{categoryId:r,categoryName:t}),(0,f.jsx)(c.Z,{})]})}},4654:function(){}}]);
//# sourceMappingURL=315.44ae430b.chunk.js.map