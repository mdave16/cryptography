(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n(33)},27:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(19),i=n.n(c),l=(n(27),n(8)),p=n(9),s=n(11),o=n(10),u=n(12),h=n(13),m=n(5),y=function(){return r.a.createElement("h2",null,"Home")},d=function(e){for(var t={},n=[],a=0;a<e.length;a++)e[a]in t||(n.push(e[a]),t[e[a]]=!0);return n.join("")},g="abcdefghijklmnopqrstuvwxyz",f=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(o.a)(t).call(this,e))).encrypt=function(e,t){var a=n.normalise(e+g),r=g+g.toUpperCase(),c=a+a.toUpperCase();return t.split("").map(function(e){return r.indexOf(e)>-1?c[r.indexOf(e)]:e}).join("")},n.decrypt=function(e,t){var a=n.normalise(e+g),r=g+g.toUpperCase(),c=a+a.toUpperCase();return t.split("").map(function(e){return c.indexOf(e)>-1?r[c.indexOf(e)]:e}).join("")},n.crack=function(e,t){var a=n.normalise(e),r=n.normalise(t);return g.split("").map(function(e){return a.indexOf(e)>-1?r[a.indexOf(e)]:"_"}).join("")},n.normalise=function(e){d(e.toLowerCase().replace(/[^a-z]/g,""))},n.plainTextChange=function(e){"encrypt"===n.state.encrypt&&n.setState({plain:e.target.value,cipher:n.encrypt(n.state.secret,e.target.value)}),"crack"===n.state.encrypt&&n.setState({plain:e.target.value,secret:n.crack(e.target.value,n.state.cipher)})},n.cipherTextChange=function(e){"decrypt"===n.state.encrypt&&n.setState({plain:n.decrypt(n.state.secret,e.target.value),cipher:e.target.value}),"crack"===n.state.encrypt&&n.setState({secret:n.crack(n.state.plain,e.target.value),cipher:e.target.value})},n.secretTextChange=function(e){"encrypt"===n.state.encrypt&&n.setState({secret:e.target.value,cipher:n.encrypt(e.target.value,n.state.plain)}),"decrypt"===n.state.encrypt&&n.setState({secret:e.target.value,plain:n.decrypt(e.target.value,n.state.cipher)})},n.handleOptionChange=function(e){n.setState({encrypt:e.target.value})},n.state={plain:"",cipher:"",secret:"",encrypt:"encrypt"},n}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("form",null,r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"encrypt",value:"encrypt",checked:"encrypt"===this.state.encrypt,onChange:this.handleOptionChange}),"Encrypt"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"encrypt",value:"decrypt",checked:"decrypt"===this.state.encrypt,onChange:this.handleOptionChange}),"Decrypt"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"encrypt",value:"crack",checked:"crack"===this.state.encrypt,onChange:this.handleOptionChange}),"Crack"),r.a.createElement("p",null,"Secret key: "),r.a.createElement("input",{type:"text",disabled:"crack"===this.state.encrypt,onChange:this.secretTextChange,value:this.state.secret}),r.a.createElement("p",null,"Decrypted message: "),r.a.createElement("input",{type:"text",disabled:"decrypt"===this.state.encrypt,onChange:this.plainTextChange,value:this.state.plain}),r.a.createElement("p",null,"Encrypted message: "),r.a.createElement("input",{type:"text",disabled:"encrypt"===this.state.encrypt,onChange:this.cipherTextChange,value:this.state.cipher}))}}]),t}(a.Component),v=function(){return r.a.createElement("h2",null,"Stop messing around trying to find secret pages...")},E=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,{basename:"/cryptography"},r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(h.b,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(h.b,{to:"/substitution/"},"Substitution ciphers"))))),r.a.createElement(m.c,null,r.a.createElement(m.a,{path:"/",exact:!0,component:y}),r.a.createElement(m.a,{path:"/substitution",component:f}),r.a.createElement(m.a,{component:v})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.4d16d42c.chunk.js.map