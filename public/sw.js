if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,c,i)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const d={uri:location.origin+r.slice(1)};return Promise.all(c.map((r=>{switch(r){case"exports":return s;case"module":return d;default:return e(r)}}))).then((e=>{const r=i(...e);return s.default||(s.default=r),s}))})))}}define("./sw.js",["./workbox-b9c7f26c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/chunk-6fd8a5ec.f0222215.css",revision:"4c5999030ae47e572bc95d24a2f8f237"},{url:"css/chunk-vendors.7bc6aa7f.css",revision:"6f9acec77cf792922af4b10970d5de69"},{url:"favicon.ico",revision:"1ba2ae710d927f13d483fd5d1e548c9b"},{url:"img/logo.63a7d78d.svg",revision:"63a7d78d42c33b94fc7b957524795cac"},{url:"index.html",revision:"97e2e47c5a9cfdc1ea723c714523b40a"},{url:"js/about.71005187.js",revision:"f38888ae39fc4a343808df183e6daed5"},{url:"js/app.8e11f5e5.js",revision:"8189db2aab104072a004680dee1ee7c8"},{url:"js/chunk-2d21a3d2.18800653.js",revision:"90381680fb5b4dd32fe4ebc1605fc9d0"},{url:"js/chunk-6fd8a5ec.636673b2.js",revision:"15e42dd6a6c2a71f0fd29a87fa480b63"},{url:"js/chunk-vendors.f27a2cb9.js",revision:"bdc378b9434c7d2b2168010c476eb859"},{url:"robots.txt",revision:"50d8a018e8ae96732c8a2ba663c61d4e"},{url:"sw.js",revision:"5dcc9d3857fb3d88d0da5e2e525e2511"},{url:"workbox-b9c7f26c.js",revision:"d85d6f71da77fb8694f9a01e8607dd30"},{url:"workbox-fb9d0a02.js",revision:"ed54aca8bc20effd22cae6309a910b12"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.registerRoute(/\.(?:png|jpg|jpeg|svg|json)$/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=sw.js.map