import{r as i,i as n,j as a,d as p}from"./vendor-0af94e13.js";import{c as r}from"./styled-base.browser.esm-b6f4af11.js";const f=r("form",{target:"e1krhfno0"})({name:"1vw22b9",styles:"position:relative;bottom:30px;display:flex;"}),m=r("input",{target:"e1krhfno1"})({name:"pwcpfe",styles:"width:95%;height:30px;border-radius:5px;text-align:left;"}),g=r("button",{target:"e1krhfno2"})({name:"1kova7a",styles:"cursor:pointer;height:35px;border-radius:5px;background:#25D366;"}),M=o=>{const s=i.useRef(null),l=p({placeholder:{id:"src.components.Form.placeholder",defaultMessage:"Enter Your Message"}}),u=n(({intl:e})=>{const t=e.formatMessage(l.placeholder);return a(m,{type:"text",placeholder:t,ref:s})}),d=n(({intl:e})=>{const t=e.formatMessage({id:"sendButton",defaultMessage:"Send"}),c=e.formatMessage({id:"arialabel",defaultMessage:"Send Your Message"});return a(g,{"aria-label":c},t)});return a("div",null,a(f,{onSubmit:e=>{if(e.preventDefault(),s.current){const t=s.current.value;t!==""&&o.addMessageHandler(t),s.current.value=""}}},a(u,null),a(d,null)))};export{M as default};