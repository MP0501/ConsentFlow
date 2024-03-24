(()=>{var je=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var Re=je((In,Ae)=>{"use strict";function Oe(o){return(Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(o)}(function(){var o=function(){for(var e,t,s=[],r=window,n=r;n;){try{if(n.frames.__tcfapiLocator){e=n;break}}catch{}if(n===r.top)break;n=n.parent}e||(function l(){var i=r.document,a=!!r.frames.__tcfapiLocator;if(!a)if(i.body){var h=i.createElement("iframe");h.style.cssText="display:none",h.name="__tcfapiLocator",i.body.appendChild(h)}else setTimeout(l,5);return!a}(),r.__tcfapi=function(){for(var l=arguments.length,i=new Array(l),a=0;a<l;a++)i[a]=arguments[a];if(!i.length)return s;i[0]==="setGdprApplies"?i.length>3&&parseInt(i[1],10)===2&&typeof i[3]=="boolean"&&(t=i[3],typeof i[2]=="function"&&i[2]("set",!0)):i[0]==="ping"?typeof i[2]=="function"&&i[2]({gdprApplies:t,cmpLoaded:!1,cmpStatus:"stub"}):s.push(i)},r.addEventListener("message",function(l){var i=typeof l.data=="string",a={};if(i)try{a=JSON.parse(l.data)}catch{}else a=l.data;var h=Oe(a)==="object"&&a!==null?a.__tcfapiCall:null;h&&window.__tcfapi(h.command,h.version,function(m,E){var b={__tcfapiReturn:{returnValue:m,success:E,callId:h.callId}};l&&l.source&&l.source.postMessage&&l.source.postMessage(i?JSON.stringify(b):b,"*")},h.parameter)},!1))};typeof Ae<"u"?Ae.exports=o:o()})()});var x;(function(o){o.PING="ping",o.GET_TC_DATA="getTCData",o.GET_IN_APP_TC_DATA="getInAppTCData",o.GET_VENDOR_LIST="getVendorList",o.ADD_EVENT_LISTENER="addEventListener",o.REMOVE_EVENT_LISTENER="removeEventListener"})(x||(x={}));var D;(function(o){o.STUB="stub",o.LOADING="loading",o.LOADED="loaded",o.ERROR="error"})(D||(D={}));var B;(function(o){o.VISIBLE="visible",o.HIDDEN="hidden",o.DISABLED="disabled"})(B||(B={}));var J;(function(o){o.TC_LOADED="tcloaded",o.CMP_UI_SHOWN="cmpuishown",o.USER_ACTION_COMPLETE="useractioncomplete"})(J||(J={}));var U=class{listenerId;callback;next;param;success=!0;constructor(e,t,s,r){Object.assign(this,{callback:e,listenerId:s,param:t,next:r});try{this.respond()}catch{this.invokeCallback(null)}}invokeCallback(e){let t=e!==null;typeof this.next=="function"?this.callback(this.next,e,t):this.callback(e,t)}};var F=class extends U{respond(){this.throwIfParamInvalid(),this.invokeCallback(new Y(this.param,this.listenerId))}throwIfParamInvalid(){if(this.param!==void 0&&(!Array.isArray(this.param)||!this.param.every(Number.isInteger)))throw new Error("Invalid Parameter")}};var ce=class{eventQueue=new Map;queueNumber=0;add(e){return this.eventQueue.set(this.queueNumber,e),this.queueNumber++}remove(e){return this.eventQueue.delete(e)}exec(){this.eventQueue.forEach((e,t)=>{new F(e.callback,e.param,t,e.next)})}clear(){this.queueNumber=0,this.eventQueue.clear()}get size(){return this.eventQueue.size}};var d=class{static apiVersion="2";static tcfPolicyVersion;static eventQueue=new ce;static cmpStatus=D.LOADING;static disabled=!1;static displayStatus=B.HIDDEN;static cmpId;static cmpVersion;static eventStatus;static gdprApplies;static tcModel;static tcString;static reset(){delete this.cmpId,delete this.cmpVersion,delete this.eventStatus,delete this.gdprApplies,delete this.tcModel,delete this.tcString,delete this.tcfPolicyVersion,this.cmpStatus=D.LOADING,this.disabled=!1,this.displayStatus=B.HIDDEN,this.eventQueue.clear()}};var z=class{cmpId=d.cmpId;cmpVersion=d.cmpVersion;gdprApplies=d.gdprApplies;tcfPolicyVersion=d.tcfPolicyVersion};var le=class extends z{cmpStatus=D.ERROR};var Y=class extends z{tcString;listenerId;eventStatus;cmpStatus;isServiceSpecific;useNonStandardStacks;publisherCC;purposeOneTreatment;outOfBand;purpose;vendor;specialFeatureOptins;publisher;constructor(e,t){if(super(),this.eventStatus=d.eventStatus,this.cmpStatus=d.cmpStatus,this.listenerId=t,d.gdprApplies){let s=d.tcModel;this.tcString=d.tcString,this.isServiceSpecific=s.isServiceSpecific,this.useNonStandardStacks=s.useNonStandardStacks,this.purposeOneTreatment=s.purposeOneTreatment,this.publisherCC=s.publisherCountryCode,this.outOfBand={allowedVendors:this.createVectorField(s.vendorsAllowed,e),disclosedVendors:this.createVectorField(s.vendorsDisclosed,e)},this.purpose={consents:this.createVectorField(s.purposeConsents),legitimateInterests:this.createVectorField(s.purposeLegitimateInterests)},this.vendor={consents:this.createVectorField(s.vendorConsents,e),legitimateInterests:this.createVectorField(s.vendorLegitimateInterests,e)},this.specialFeatureOptins=this.createVectorField(s.specialFeatureOptins),this.publisher={consents:this.createVectorField(s.publisherConsents),legitimateInterests:this.createVectorField(s.publisherLegitimateInterests),customPurpose:{consents:this.createVectorField(s.publisherCustomConsents),legitimateInterests:this.createVectorField(s.publisherCustomLegitimateInterests)},restrictions:this.createRestrictions(s.publisherRestrictions)}}}createRestrictions(e){let t={};if(e.numRestrictions>0){let s=e.getMaxVendorId();for(let r=1;r<=s;r++){let n=r.toString();e.getRestrictions(r).forEach(l=>{let i=l.purposeId.toString();t[i]||(t[i]={}),t[i][n]=l.restrictionType})}}return t}createVectorField(e,t){return t?t.reduce((s,r)=>(s[String(r)]=e.has(Number(r)),s),{}):[...e].reduce((s,r)=>(s[r[0].toString(10)]=r[1],s),{})}};var pe=class extends Y{constructor(e){super(e),delete this.outOfBand}createVectorField(e){return[...e].reduce((t,s)=>(t+=s[1]?"1":"0",t),"")}createRestrictions(e){let t={};if(e.numRestrictions>0){let s=e.getMaxVendorId();e.getRestrictions().forEach(r=>{t[r.purposeId.toString()]="_".repeat(s)});for(let r=0;r<s;r++){let n=r+1;e.getRestrictions(n).forEach(l=>{let i=l.restrictionType.toString(),a=l.purposeId.toString(),h=t[a].substr(0,r),m=t[a].substr(r+1);t[a]=h+i+m})}}return t}};var de=class extends z{cmpLoaded=!0;cmpStatus=d.cmpStatus;displayStatus=d.displayStatus;apiVersion=String(d.apiVersion);gvlVersion;constructor(){super(),d.tcModel&&d.tcModel.vendorListVersion&&(this.gvlVersion=+d.tcModel.vendorListVersion)}};var ue=class extends U{respond(){this.invokeCallback(new de)}};var he=class extends F{respond(){this.throwIfParamInvalid(),this.invokeCallback(new pe(this.param))}};var S=class extends Error{constructor(e){super(e),this.name="DecodingError"}};var C=class extends Error{constructor(e){super(e),this.name="EncodingError"}};var j=class extends Error{constructor(e){super(e),this.name="GVLError"}};var L=class extends Error{constructor(e,t,s=""){super(`invalid value ${t} passed for ${e} ${s}`),this.name="TCModelError"}};var q=class{static DICT="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";static REVERSE_DICT=new Map([["A",0],["B",1],["C",2],["D",3],["E",4],["F",5],["G",6],["H",7],["I",8],["J",9],["K",10],["L",11],["M",12],["N",13],["O",14],["P",15],["Q",16],["R",17],["S",18],["T",19],["U",20],["V",21],["W",22],["X",23],["Y",24],["Z",25],["a",26],["b",27],["c",28],["d",29],["e",30],["f",31],["g",32],["h",33],["i",34],["j",35],["k",36],["l",37],["m",38],["n",39],["o",40],["p",41],["q",42],["r",43],["s",44],["t",45],["u",46],["v",47],["w",48],["x",49],["y",50],["z",51],["0",52],["1",53],["2",54],["3",55],["4",56],["5",57],["6",58],["7",59],["8",60],["9",61],["-",62],["_",63]]);static BASIS=6;static LCM=24;static encode(e){if(!/^[0-1]+$/.test(e))throw new C("Invalid bitField");let t=e.length%this.LCM;e+=t?"0".repeat(this.LCM-t):"";let s="";for(let r=0;r<e.length;r+=this.BASIS)s+=this.DICT[parseInt(e.substr(r,this.BASIS),2)];return s}static decode(e){if(!/^[A-Za-z0-9\-_]+$/.test(e))throw new S("Invalidly encoded Base64URL string");let t="";for(let s=0;s<e.length;s++){let r=this.REVERSE_DICT.get(e[s]).toString(2);t+="0".repeat(this.BASIS-r.length)+r}return t}};var A=class{clone(){let e=new this.constructor;return Object.keys(this).forEach(s=>{let r=this.deepClone(this[s]);r!==void 0&&(e[s]=r)}),e}deepClone(e){let t=typeof e;if(t==="number"||t==="string"||t==="boolean")return e;if(e!==null&&t==="object"){if(typeof e.clone=="function")return e.clone();if(e instanceof Date)return new Date(e.getTime());if(e[Symbol.iterator]!==void 0){let s=[];for(let r of e)s.push(this.deepClone(r));return e instanceof Array?s:new e.constructor(s)}else{let s={};for(let r in e)e.hasOwnProperty(r)&&(s[r]=this.deepClone(e[r]));return s}}}};var se=class o extends A{root=null;getRoot(){return this.root}isEmpty(){return!this.root}add(e){let t={value:e,left:null,right:null},s;if(this.isEmpty())this.root=t;else for(s=this.root;;)if(e<s.value)if(s.left===null){s.left=t;break}else s=s.left;else if(e>s.value)if(s.right===null){s.right=t;break}else s=s.right;else break}get(){let e=[],t=this.root;for(;t;)if(!t.left)e.push(t.value),t=t.right;else{let s=t.left;for(;s.right&&s.right!=t;)s=s.right;s.right==t?(s.right=null,e.push(t.value),t=t.right):(s.right=t,t=t.left)}return e}contains(e){let t=!1,s=this.root;for(;s;)if(s.value===e){t=!0;break}else e>s.value?s=s.right:e<s.value&&(s=s.left);return t}min(e=this.root){let t;for(;e;)e.left?e=e.left:(t=e.value,e=null);return t}max(e=this.root){let t;for(;e;)e.right?e=e.right:(t=e.value,e=null);return t}remove(e,t=this.root){let s=null,r="left";for(;t;)if(e<t.value)s=t,t=t.left,r="left";else if(e>t.value)s=t,t=t.right,r="right";else{if(!t.left&&!t.right)s?s[r]=null:this.root=null;else if(!t.left)s?s[r]=t.right:this.root=t.right;else if(!t.right)s?s[r]=t.left:this.root=t.left;else{let n=this.min(t.right);this.remove(n,t.right),t.value=n}t=null}}static build(e){if(!e||e.length===0)return null;if(e.length===1){let t=new o;return t.add(e[0]),t}else{let t=e.length>>1,s=new o;s.add(e[t]);let r=s.getRoot();if(r){if(t+1<e.length){let n=o.build(e.slice(t+1));r.right=n?n.getRoot():null}if(t-1>0){let n=o.build(e.slice(0,t-1));r.left=n?n.getRoot():null}}return s}}};var fe=class o{static langSet=new Set(["BG","CA","CS","DA","DE","EL","EN","ES","ET","FI","FR","HR","HU","IT","JA","LT","LV","MT","NL","NO","PL","PT","RO","RU","SK","SL","SV","TR","ZH"]);has(e){return o.langSet.has(e)}forEach(e){o.langSet.forEach(e)}get size(){return o.langSet.size}};var c=class{static cmpId="cmpId";static cmpVersion="cmpVersion";static consentLanguage="consentLanguage";static consentScreen="consentScreen";static created="created";static supportOOB="supportOOB";static isServiceSpecific="isServiceSpecific";static lastUpdated="lastUpdated";static numCustomPurposes="numCustomPurposes";static policyVersion="policyVersion";static publisherCountryCode="publisherCountryCode";static publisherCustomConsents="publisherCustomConsents";static publisherCustomLegitimateInterests="publisherCustomLegitimateInterests";static publisherLegitimateInterests="publisherLegitimateInterests";static publisherConsents="publisherConsents";static publisherRestrictions="publisherRestrictions";static purposeConsents="purposeConsents";static purposeLegitimateInterests="purposeLegitimateInterests";static purposeOneTreatment="purposeOneTreatment";static specialFeatureOptins="specialFeatureOptins";static useNonStandardStacks="useNonStandardStacks";static vendorConsents="vendorConsents";static vendorLegitimateInterests="vendorLegitimateInterests";static vendorListVersion="vendorListVersion";static vendorsAllowed="vendorsAllowed";static vendorsDisclosed="vendorsDisclosed";static version="version"};var T;(function(o){o[o.NOT_ALLOWED=0]="NOT_ALLOWED",o[o.REQUIRE_CONSENT=1]="REQUIRE_CONSENT",o[o.REQUIRE_LI=2]="REQUIRE_LI"})(T||(T={}));var M=class o extends A{static hashSeparator="-";purposeId_;restrictionType;constructor(e,t){super(),e!==void 0&&(this.purposeId=e),t!==void 0&&(this.restrictionType=t)}static unHash(e){let t=e.split(this.hashSeparator),s=new o;if(t.length!==2)throw new L("hash",e);return s.purposeId=parseInt(t[0],10),s.restrictionType=parseInt(t[1],10),s}get hash(){if(!this.isValid())throw new Error("cannot hash invalid PurposeRestriction");return`${this.purposeId}${o.hashSeparator}${this.restrictionType}`}get purposeId(){return this.purposeId_}set purposeId(e){this.purposeId_=e}isValid(){return Number.isInteger(this.purposeId)&&this.purposeId>0&&(this.restrictionType===T.NOT_ALLOWED||this.restrictionType===T.REQUIRE_CONSENT||this.restrictionType===T.REQUIRE_LI)}isSameAs(e){return this.purposeId===e.purposeId&&this.restrictionType===e.restrictionType}};var K=class extends A{bitLength=0;map=new Map;gvl_;has(e){return this.map.has(e)}isOkToHave(e,t,s){let r=!0;if(this.gvl?.vendors){let n=this.gvl.vendors[s];if(n)if(e===T.NOT_ALLOWED)r=n.legIntPurposes.includes(t)||n.purposes.includes(t);else if(n.flexiblePurposes.length)switch(e){case T.REQUIRE_CONSENT:r=n.flexiblePurposes.includes(t)&&n.legIntPurposes.includes(t);break;case T.REQUIRE_LI:r=n.flexiblePurposes.includes(t)&&n.purposes.includes(t);break}else r=!1;else r=!1}return r}add(e,t){if(this.isOkToHave(t.restrictionType,t.purposeId,e)){let s=t.hash;this.has(s)||(this.map.set(s,new se),this.bitLength=0),this.map.get(s).add(e)}}restrictPurposeToLegalBasis(e){let t=this.gvl.vendorIds,s=e.hash,r=function(){let l;for(l of t);return l}(),n=[...Array(r).keys()].map(l=>l+1);for(let l=1;l<=r;l++)this.has(s)||(this.map.set(s,se.build(n)),this.bitLength=0),this.map.get(s).add(l)}getVendors(e){let t=[];if(e){let s=e.hash;this.has(s)&&(t=this.map.get(s).get())}else{let s=new Set;this.map.forEach(r=>{r.get().forEach(n=>{s.add(n)})}),t=Array.from(s)}return t}getRestrictionType(e,t){let s;return this.getRestrictions(e).forEach(r=>{r.purposeId===t&&(s===void 0||s>r.restrictionType)&&(s=r.restrictionType)}),s}vendorHasRestriction(e,t){let s=!1,r=this.getRestrictions(e);for(let n=0;n<r.length&&!s;n++)s=t.isSameAs(r[n]);return s}getMaxVendorId(){let e=0;return this.map.forEach(t=>{e=Math.max(t.max(),e)}),e}getRestrictions(e){let t=[];return this.map.forEach((s,r)=>{e?s.contains(e)&&t.push(M.unHash(r)):t.push(M.unHash(r))}),t}getPurposes(){let e=new Set;return this.map.forEach((t,s)=>{e.add(M.unHash(s).purposeId)}),Array.from(e)}remove(e,t){let s=t.hash,r=this.map.get(s);r&&(r.remove(e),r.isEmpty()&&(this.map.delete(s),this.bitLength=0))}set gvl(e){this.gvl_||(this.gvl_=e,this.map.forEach((t,s)=>{let r=M.unHash(s);t.get().forEach(l=>{this.isOkToHave(r.restrictionType,r.purposeId,l)||t.remove(l)})}))}get gvl(){return this.gvl_}isEmpty(){return this.map.size===0}get numRestrictions(){return this.map.size}};var Ne;(function(o){o.COOKIE="cookie",o.WEB="web",o.APP="app"})(Ne||(Ne={}));var g;(function(o){o.CORE="core",o.VENDORS_DISCLOSED="vendorsDisclosed",o.VENDORS_ALLOWED="vendorsAllowed",o.PUBLISHER_TC="publisherTC"})(g||(g={}));var X=class{static ID_TO_KEY=[g.CORE,g.VENDORS_DISCLOSED,g.VENDORS_ALLOWED,g.PUBLISHER_TC];static KEY_TO_ID={[g.CORE]:0,[g.VENDORS_DISCLOSED]:1,[g.VENDORS_ALLOWED]:2,[g.PUBLISHER_TC]:3}};var y=class extends A{bitLength=0;maxId_=0;set_=new Set;*[Symbol.iterator](){for(let e=1;e<=this.maxId;e++)yield[e,this.has(e)]}values(){return this.set_.values()}get maxId(){return this.maxId_}has(e){return this.set_.has(e)}unset(e){Array.isArray(e)?e.forEach(t=>this.unset(t)):typeof e=="object"?this.unset(Object.keys(e).map(t=>Number(t))):(this.set_.delete(Number(e)),this.bitLength=0,e===this.maxId&&(this.maxId_=0,this.set_.forEach(t=>{this.maxId_=Math.max(this.maxId,t)})))}isIntMap(e){let t=typeof e=="object";return t=t&&Object.keys(e).every(s=>{let r=Number.isInteger(parseInt(s,10));return r=r&&this.isValidNumber(e[s].id),r=r&&e[s].name!==void 0,r}),t}isValidNumber(e){return parseInt(e,10)>0}isSet(e){let t=!1;return e instanceof Set&&(t=Array.from(e).every(this.isValidNumber)),t}set(e){if(Array.isArray(e))e.forEach(t=>this.set(t));else if(this.isSet(e))this.set(Array.from(e));else if(this.isIntMap(e))this.set(Object.keys(e).map(t=>Number(t)));else if(this.isValidNumber(e))this.set_.add(e),this.maxId_=Math.max(this.maxId,e),this.bitLength=0;else throw new L("set()",e,"must be positive integer array, positive integer, Set<number>, or IntMap")}empty(){this.set_=new Set}forEach(e){for(let t=1;t<=this.maxId;t++)e(this.has(t),t)}get size(){return this.set_.size}setAll(e){this.set(e)}};var p=class{static[c.cmpId]=12;static[c.cmpVersion]=12;static[c.consentLanguage]=12;static[c.consentScreen]=6;static[c.created]=36;static[c.isServiceSpecific]=1;static[c.lastUpdated]=36;static[c.policyVersion]=6;static[c.publisherCountryCode]=12;static[c.publisherLegitimateInterests]=24;static[c.publisherConsents]=24;static[c.purposeConsents]=24;static[c.purposeLegitimateInterests]=24;static[c.purposeOneTreatment]=1;static[c.specialFeatureOptins]=12;static[c.useNonStandardStacks]=1;static[c.vendorListVersion]=12;static[c.version]=6;static anyBoolean=1;static encodingType=1;static maxId=16;static numCustomPurposes=6;static numEntries=12;static numRestrictions=12;static purposeId=6;static restrictionType=2;static segmentType=3;static singleOrRange=1;static vendorId=16};var I=class{static encode(e){return String(Number(e))}static decode(e){return e==="1"}};var u=class{static encode(e,t){let s;if(typeof e=="string"&&(e=parseInt(e,10)),s=e.toString(2),s.length>t||e<0)throw new C(`${e} too large to encode into ${t}`);return s.length<t&&(s="0".repeat(t-s.length)+s),s}static decode(e,t){if(t!==e.length)throw new S("invalid bit length");return parseInt(e,2)}};var re=class{static encode(e,t){return u.encode(Math.round(e.getTime()/100),t)}static decode(e,t){if(t!==e.length)throw new S("invalid bit length");let s=new Date;return s.setTime(u.decode(e,t)*100),s}};var O=class{static encode(e,t){let s="";for(let r=1;r<=t;r++)s+=I.encode(e.has(r));return s}static decode(e,t){if(e.length!==t)throw new S("bitfield encoding length mismatch");let s=new y;for(let r=1;r<=t;r++)I.decode(e[r-1])&&s.set(r);return s.bitLength=e.length,s}};var oe=class{static encode(e,t){e=e.toUpperCase();let s=65,r=e.charCodeAt(0)-s,n=e.charCodeAt(1)-s;if(r<0||r>25||n<0||n>25)throw new C(`invalid language code: ${e}`);if(t%2===1)throw new C(`numBits must be even, ${t} is not valid`);t=t/2;let l=u.encode(r,t),i=u.encode(n,t);return l+i}static decode(e,t){let s;if(t===e.length&&!(e.length%2)){let n=e.length/2,l=u.decode(e.slice(0,n),n)+65,i=u.decode(e.slice(n),n)+65;s=String.fromCharCode(l)+String.fromCharCode(i)}else throw new S("invalid bit length for language");return s}};var me=class{static encode(e){let t=u.encode(e.numRestrictions,p.numRestrictions);return e.isEmpty()||e.getRestrictions().forEach(s=>{t+=u.encode(s.purposeId,p.purposeId),t+=u.encode(s.restrictionType,p.restrictionType);let r=e.getVendors(s),n=r.length,l=0,i=0,a="";for(let h=0;h<n;h++){let m=r[h];i===0&&(l++,i=m);let E=r[n-1],b=e.gvl.vendorIds,R=N=>{for(;++N<=E&&!b.has(N););return N};if(h===n-1||r[h+1]>R(m)){let N=m!==i;a+=I.encode(N),a+=u.encode(i,p.vendorId),N&&(a+=u.encode(m,p.vendorId)),i=0}}t+=u.encode(l,p.numEntries),t+=a}),t}static decode(e){let t=0,s=new K,r=u.decode(e.substr(t,p.numRestrictions),p.numRestrictions);t+=p.numRestrictions;for(let n=0;n<r;n++){let l=u.decode(e.substr(t,p.purposeId),p.purposeId);t+=p.purposeId;let i=u.decode(e.substr(t,p.restrictionType),p.restrictionType);t+=p.restrictionType;let a=new M(l,i),h=u.decode(e.substr(t,p.numEntries),p.numEntries);t+=p.numEntries;for(let m=0;m<h;m++){let E=I.decode(e.substr(t,p.anyBoolean));t+=p.anyBoolean;let b=u.decode(e.substr(t,p.vendorId),p.vendorId);if(t+=p.vendorId,E){let R=u.decode(e.substr(t,p.vendorId),p.vendorId);if(t+=p.vendorId,R<b)throw new S(`Invalid RangeEntry: endVendorId ${R} is less than ${b}`);for(let N=b;N<=R;N++)s.add(N,a)}else s.add(b,a)}}return s.bitLength=t,s}};var Z;(function(o){o[o.FIELD=0]="FIELD",o[o.RANGE=1]="RANGE"})(Z||(Z={}));var G=class{static encode(e){let t=[],s=[],r=u.encode(e.maxId,p.maxId),n="",l,i=p.maxId+p.encodingType,a=i+e.maxId,h=p.vendorId*2+p.singleOrRange+p.numEntries,m=i+p.numEntries;return e.forEach((E,b)=>{n+=I.encode(E),l=e.maxId>h&&m<a,l&&E&&(e.has(b+1)?s.length===0&&(s.push(b),m+=p.singleOrRange,m+=p.vendorId):(s.push(b),m+=p.vendorId,t.push(s),s=[]))}),l?(r+=String(Z.RANGE),r+=this.buildRangeEncoding(t)):(r+=String(Z.FIELD),r+=n),r}static decode(e,t){let s,r=0,n=u.decode(e.substr(r,p.maxId),p.maxId);r+=p.maxId;let l=u.decode(e.charAt(r),p.encodingType);if(r+=p.encodingType,l===Z.RANGE){if(s=new y,t===1){if(e.substr(r,1)==="1")throw new S("Unable to decode default consent=1");r++}let i=u.decode(e.substr(r,p.numEntries),p.numEntries);r+=p.numEntries;for(let a=0;a<i;a++){let h=I.decode(e.charAt(r));r+=p.singleOrRange;let m=u.decode(e.substr(r,p.vendorId),p.vendorId);if(r+=p.vendorId,h){let E=u.decode(e.substr(r,p.vendorId),p.vendorId);r+=p.vendorId;for(let b=m;b<=E;b++)s.set(b)}else s.set(m)}}else{let i=e.substr(r,n);r+=n,s=O.decode(i,n)}return s.bitLength=r,s}static buildRangeEncoding(e){let t=e.length,s=u.encode(t,p.numEntries);return e.forEach(r=>{let n=r.length===1;s+=I.encode(!n),s+=u.encode(r[0],p.vendorId),n||(s+=u.encode(r[1],p.vendorId))}),s}};function Le(){return{[c.version]:u,[c.created]:re,[c.lastUpdated]:re,[c.cmpId]:u,[c.cmpVersion]:u,[c.consentScreen]:u,[c.consentLanguage]:oe,[c.vendorListVersion]:u,[c.policyVersion]:u,[c.isServiceSpecific]:I,[c.useNonStandardStacks]:I,[c.specialFeatureOptins]:O,[c.purposeConsents]:O,[c.purposeLegitimateInterests]:O,[c.purposeOneTreatment]:I,[c.publisherCountryCode]:oe,[c.vendorConsents]:G,[c.vendorLegitimateInterests]:G,[c.publisherRestrictions]:me,segmentType:u,[c.vendorsDisclosed]:G,[c.vendorsAllowed]:G,[c.publisherConsents]:O,[c.publisherLegitimateInterests]:O,[c.numCustomPurposes]:u,[c.publisherCustomConsents]:O,[c.publisherCustomLegitimateInterests]:O}}var _e=class{1={[g.CORE]:[c.version,c.created,c.lastUpdated,c.cmpId,c.cmpVersion,c.consentScreen,c.consentLanguage,c.vendorListVersion,c.purposeConsents,c.vendorConsents]};2={[g.CORE]:[c.version,c.created,c.lastUpdated,c.cmpId,c.cmpVersion,c.consentScreen,c.consentLanguage,c.vendorListVersion,c.policyVersion,c.isServiceSpecific,c.useNonStandardStacks,c.specialFeatureOptins,c.purposeConsents,c.purposeLegitimateInterests,c.purposeOneTreatment,c.publisherCountryCode,c.vendorConsents,c.vendorLegitimateInterests,c.publisherRestrictions],[g.PUBLISHER_TC]:[c.publisherConsents,c.publisherLegitimateInterests,c.numCustomPurposes,c.publisherCustomConsents,c.publisherCustomLegitimateInterests],[g.VENDORS_ALLOWED]:[c.vendorsAllowed],[g.VENDORS_DISCLOSED]:[c.vendorsDisclosed]}};var ge=class{1=[g.CORE];2=[g.CORE];constructor(e,t){if(e.version===2)if(e.isServiceSpecific)this[2].push(g.PUBLISHER_TC);else{let s=!!(t&&t.isForVendors);(!s||e[c.supportOOB]===!0)&&this[2].push(g.VENDORS_DISCLOSED),s&&(e[c.supportOOB]&&e[c.vendorsAllowed].size>0&&this[2].push(g.VENDORS_ALLOWED),this[2].push(g.PUBLISHER_TC))}}};var ne=class{static fieldSequence=new _e;static encode(e,t){let s;try{s=this.fieldSequence[String(e.version)][t]}catch{throw new C(`Unable to encode version: ${e.version}, segment: ${t}`)}let r="";t!==g.CORE&&(r=u.encode(X.KEY_TO_ID[t],p.segmentType));let n=Le();return s.forEach(l=>{let i=e[l],a=n[l],h=p[l];h===void 0&&this.isPublisherCustom(l)&&(h=Number(e[c.numCustomPurposes]));try{r+=a.encode(i,h)}catch(m){throw new C(`Error encoding ${t}->${l}: ${m.message}`)}}),q.encode(r)}static decode(e,t,s){let r=q.decode(e),n=0;s===g.CORE&&(t.version=u.decode(r.substr(n,p[c.version]),p[c.version])),s!==g.CORE&&(n+=p.segmentType);let l=this.fieldSequence[String(t.version)][s],i=Le();return l.forEach(a=>{let h=i[a],m=p[a];if(m===void 0&&this.isPublisherCustom(a)&&(m=Number(t[c.numCustomPurposes])),m!==0){let E=r.substr(n,m);if(h===G?t[a]=h.decode(E,t.version):t[a]=h.decode(E,m),Number.isInteger(m))n+=m;else if(Number.isInteger(t[a].bitLength))n+=t[a].bitLength;else throw new S(a)}}),t}static isPublisherCustom(e){return e.indexOf("publisherCustom")===0}};var be=class{static processor=[e=>e,(e,t)=>{e.publisherRestrictions.gvl=t,e.purposeLegitimateInterests.unset(1);let s=new Map;return s.set("legIntPurposes",e.vendorLegitimateInterests),s.set("purposes",e.vendorConsents),s.forEach((r,n)=>{r.forEach((l,i)=>{if(l){let a=t.vendors[i];if(!a||a.deletedDate)r.unset(i);else if(a[n].length===0&&!(n==="legIntPurposes"&&a.purposes.length===0&&a.legIntPurposes.length===0&&a.specialPurposes.length>0))if(e.isServiceSpecific)if(a.flexiblePurposes.length===0)r.unset(i);else{let h=e.publisherRestrictions.getRestrictions(i),m=!1;for(let E=0,b=h.length;E<b&&!m;E++)m=h[E].restrictionType===T.REQUIRE_CONSENT&&n==="purposes"||h[E].restrictionType===T.REQUIRE_LI&&n==="legIntPurposes";m||r.unset(i)}else r.unset(i)}})}),e.vendorsDisclosed.set(t.vendors),e}];static process(e,t){let s=e.gvl;if(!s)throw new C("Unable to encode TCModel without a GVL");if(!s.isReady)throw new C("Unable to encode TCModel tcModel.gvl.readyPromise is not resolved");e=e.clone(),e.consentLanguage=s.language.toUpperCase(),t?.version>0&&t?.version<=this.processor.length?e.version=t.version:e.version=this.processor.length;let r=e.version-1;if(!this.processor[r])throw new C(`Invalid version: ${e.version}`);return this.processor[r](e,s)}};var ve=class{static absCall(e,t,s,r){return new Promise((n,l)=>{let i=new XMLHttpRequest,a=()=>{if(i.readyState==XMLHttpRequest.DONE)if(i.status>=200&&i.status<300){let b=i.response;if(typeof b=="string")try{b=JSON.parse(b)}catch{}n(b)}else l(new Error(`HTTP Status: ${i.status} response type: ${i.responseType}`))},h=()=>{l(new Error("error"))},m=()=>{l(new Error("aborted"))},E=()=>{l(new Error("Timeout "+r+"ms "+e))};i.withCredentials=s,i.addEventListener("load",a),i.addEventListener("error",h),i.addEventListener("abort",m),t===null?i.open("GET",e,!0):i.open("POST",e,!0),i.responseType="json",i.timeout=r,i.ontimeout=E,i.send(t)})}static post(e,t,s=!1,r=0){return this.absCall(e,JSON.stringify(t),s,r)}static fetch(e,t=!1,s=0){return this.absCall(e,null,t,s)}};var P=class o extends A{static LANGUAGE_CACHE=new Map;static CACHE=new Map;static LATEST_CACHE_KEY=0;static DEFAULT_LANGUAGE="EN";static consentLanguages=new fe;static baseUrl_;static set baseUrl(e){if(/^https?:\/\/vendorlist\.consensu\.org\//.test(e))throw new j("Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache");e.length>0&&e[e.length-1]!=="/"&&(e+="/"),this.baseUrl_=e}static get baseUrl(){return this.baseUrl_}static latestFilename="vendor-list.json";static versionedFilename="archives/vendor-list-v[VERSION].json";static languageFilename="purposes-[LANG].json";readyPromise;gvlSpecificationVersion;vendorListVersion;tcfPolicyVersion;lastUpdated;purposes;specialPurposes;features;specialFeatures;isReady_=!1;vendors_;vendorIds;fullVendorList;byPurposeVendorMap;bySpecialPurposeVendorMap;byFeatureVendorMap;bySpecialFeatureVendorMap;stacks;lang_;isLatest=!1;constructor(e){super();let t=o.baseUrl;if(this.lang_=o.DEFAULT_LANGUAGE,this.isVendorList(e))this.populate(e),this.readyPromise=Promise.resolve();else{if(!t)throw new j("must specify GVL.baseUrl before loading GVL json");if(e>0){let s=e;o.CACHE.has(s)?(this.populate(o.CACHE.get(s)),this.readyPromise=Promise.resolve()):(t+=o.versionedFilename.replace("[VERSION]",String(s)),this.readyPromise=this.fetchJson(t))}else o.CACHE.has(o.LATEST_CACHE_KEY)?(this.populate(o.CACHE.get(o.LATEST_CACHE_KEY)),this.readyPromise=Promise.resolve()):(this.isLatest=!0,this.readyPromise=this.fetchJson(t+o.latestFilename))}}static emptyLanguageCache(e){let t=!1;return e===void 0&&o.LANGUAGE_CACHE.size>0?(o.LANGUAGE_CACHE=new Map,t=!0):typeof e=="string"&&this.consentLanguages.has(e.toUpperCase())&&(o.LANGUAGE_CACHE.delete(e.toUpperCase()),t=!0),t}static emptyCache(e){let t=!1;return Number.isInteger(e)&&e>=0?(o.CACHE.delete(e),t=!0):e===void 0&&(o.CACHE=new Map,t=!0),t}cacheLanguage(){o.LANGUAGE_CACHE.has(this.lang_)||o.LANGUAGE_CACHE.set(this.lang_,{purposes:this.purposes,specialPurposes:this.specialPurposes,features:this.features,specialFeatures:this.specialFeatures,stacks:this.stacks})}async fetchJson(e){try{this.populate(await ve.fetch(e))}catch(t){throw new j(t.message)}}getJson(){return JSON.parse(JSON.stringify({gvlSpecificationVersion:this.gvlSpecificationVersion,vendorListVersion:this.vendorListVersion,tcfPolicyVersion:this.tcfPolicyVersion,lastUpdated:this.lastUpdated,purposes:this.purposes,specialPurposes:this.specialPurposes,features:this.features,specialFeatures:this.specialFeatures,stacks:this.stacks,vendors:this.fullVendorList}))}async changeLanguage(e){let t=e.toUpperCase();if(o.consentLanguages.has(t)){if(t!==this.lang_)if(this.lang_=t,o.LANGUAGE_CACHE.has(t)){let s=o.LANGUAGE_CACHE.get(t);for(let r in s)s.hasOwnProperty(r)&&(this[r]=s[r])}else{let s=o.baseUrl+o.languageFilename.replace("[LANG]",e);try{await this.fetchJson(s),this.cacheLanguage()}catch(r){throw new j("unable to load language: "+r.message)}}}else throw new j(`unsupported language ${e}`)}get language(){return this.lang_}isVendorList(e){return e!==void 0&&e.vendors!==void 0}populate(e){this.purposes=e.purposes,this.specialPurposes=e.specialPurposes,this.features=e.features,this.specialFeatures=e.specialFeatures,this.stacks=e.stacks,this.isVendorList(e)&&(this.gvlSpecificationVersion=e.gvlSpecificationVersion,this.tcfPolicyVersion=e.tcfPolicyVersion,this.vendorListVersion=e.vendorListVersion,this.lastUpdated=e.lastUpdated,typeof this.lastUpdated=="string"&&(this.lastUpdated=new Date(this.lastUpdated)),this.vendors_=e.vendors,this.fullVendorList=e.vendors,this.mapVendors(),this.isReady_=!0,this.isLatest&&o.CACHE.set(o.LATEST_CACHE_KEY,this.getJson()),o.CACHE.has(this.vendorListVersion)||o.CACHE.set(this.vendorListVersion,this.getJson())),this.cacheLanguage()}mapVendors(e){this.byPurposeVendorMap={},this.bySpecialPurposeVendorMap={},this.byFeatureVendorMap={},this.bySpecialFeatureVendorMap={},Object.keys(this.purposes).forEach(t=>{this.byPurposeVendorMap[t]={legInt:new Set,consent:new Set,flexible:new Set}}),Object.keys(this.specialPurposes).forEach(t=>{this.bySpecialPurposeVendorMap[t]=new Set}),Object.keys(this.features).forEach(t=>{this.byFeatureVendorMap[t]=new Set}),Object.keys(this.specialFeatures).forEach(t=>{this.bySpecialFeatureVendorMap[t]=new Set}),Array.isArray(e)||(e=Object.keys(this.fullVendorList).map(t=>+t)),this.vendorIds=new Set(e),this.vendors_=e.reduce((t,s)=>{let r=this.vendors_[String(s)];return r&&r.deletedDate===void 0&&(r.purposes.forEach(n=>{this.byPurposeVendorMap[String(n)].consent.add(s)}),r.specialPurposes.forEach(n=>{this.bySpecialPurposeVendorMap[String(n)].add(s)}),r.legIntPurposes.forEach(n=>{this.byPurposeVendorMap[String(n)].legInt.add(s)}),r.flexiblePurposes&&r.flexiblePurposes.forEach(n=>{this.byPurposeVendorMap[String(n)].flexible.add(s)}),r.features.forEach(n=>{this.byFeatureVendorMap[String(n)].add(s)}),r.specialFeatures.forEach(n=>{this.bySpecialFeatureVendorMap[String(n)].add(s)}),t[s]=r),t},{})}getFilteredVendors(e,t,s,r){let n=e.charAt(0).toUpperCase()+e.slice(1),l,i={};return e==="purpose"&&s?l=this["by"+n+"VendorMap"][String(t)][s]:l=this["by"+(r?"Special":"")+n+"VendorMap"][String(t)],l.forEach(a=>{i[String(a)]=this.vendors[String(a)]}),i}getVendorsWithConsentPurpose(e){return this.getFilteredVendors("purpose",e,"consent")}getVendorsWithLegIntPurpose(e){return this.getFilteredVendors("purpose",e,"legInt")}getVendorsWithFlexiblePurpose(e){return this.getFilteredVendors("purpose",e,"flexible")}getVendorsWithSpecialPurpose(e){return this.getFilteredVendors("purpose",e,void 0,!0)}getVendorsWithFeature(e){return this.getFilteredVendors("feature",e)}getVendorsWithSpecialFeature(e){return this.getFilteredVendors("feature",e,void 0,!0)}get vendors(){return this.vendors_}narrowVendorsTo(e){this.mapVendors(e)}get isReady(){return this.isReady_}clone(){let e=new o(this.getJson());return this.lang_!==o.DEFAULT_LANGUAGE&&e.changeLanguage(this.lang_),e}static isInstanceOf(e){return typeof e=="object"&&typeof e.narrowVendorsTo=="function"}};var Q=class extends A{static consentLanguages=P.consentLanguages;isServiceSpecific_=!1;supportOOB_=!0;useNonStandardStacks_=!1;purposeOneTreatment_=!1;publisherCountryCode_="AA";version_=2;consentScreen_=0;policyVersion_=2;consentLanguage_="EN";cmpId_=0;cmpVersion_=0;vendorListVersion_=0;numCustomPurposes_=0;gvl_;created;lastUpdated;specialFeatureOptins=new y;purposeConsents=new y;purposeLegitimateInterests=new y;publisherConsents=new y;publisherLegitimateInterests=new y;publisherCustomConsents=new y;publisherCustomLegitimateInterests=new y;customPurposes;vendorConsents=new y;vendorLegitimateInterests=new y;vendorsDisclosed=new y;vendorsAllowed=new y;publisherRestrictions=new K;constructor(e){super(),e&&(this.gvl=e),this.updated()}set gvl(e){P.isInstanceOf(e)||(e=new P(e)),this.gvl_=e,this.publisherRestrictions.gvl=e}get gvl(){return this.gvl_}set cmpId(e){if(e=Number(e),Number.isInteger(e)&&e>1)this.cmpId_=e;else throw new L("cmpId",e)}get cmpId(){return this.cmpId_}set cmpVersion(e){if(e=Number(e),Number.isInteger(e)&&e>-1)this.cmpVersion_=e;else throw new L("cmpVersion",e)}get cmpVersion(){return this.cmpVersion_}set consentScreen(e){if(e=Number(e),Number.isInteger(e)&&e>-1)this.consentScreen_=e;else throw new L("consentScreen",e)}get consentScreen(){return this.consentScreen_}set consentLanguage(e){this.consentLanguage_=e}get consentLanguage(){return this.consentLanguage_}set publisherCountryCode(e){if(/^([A-z]){2}$/.test(e))this.publisherCountryCode_=e.toUpperCase();else throw new L("publisherCountryCode",e)}get publisherCountryCode(){return this.publisherCountryCode_}set vendorListVersion(e){if(e=Number(e)>>0,e<0)throw new L("vendorListVersion",e);this.vendorListVersion_=e}get vendorListVersion(){return this.gvl?this.gvl.vendorListVersion:this.vendorListVersion_}set policyVersion(e){if(this.policyVersion_=parseInt(e,10),this.policyVersion_<0)throw new L("policyVersion",e)}get policyVersion(){return this.gvl?this.gvl.tcfPolicyVersion:this.policyVersion_}set version(e){this.version_=parseInt(e,10)}get version(){return this.version_}set isServiceSpecific(e){this.isServiceSpecific_=e}get isServiceSpecific(){return this.isServiceSpecific_}set useNonStandardStacks(e){this.useNonStandardStacks_=e}get useNonStandardStacks(){return this.useNonStandardStacks_}set supportOOB(e){this.supportOOB_=e}get supportOOB(){return this.supportOOB_}set purposeOneTreatment(e){this.purposeOneTreatment_=e}get purposeOneTreatment(){return this.purposeOneTreatment_}setAllVendorConsents(){this.vendorConsents.set(this.gvl.vendors)}unsetAllVendorConsents(){this.vendorConsents.empty()}setAllVendorsDisclosed(){this.vendorsDisclosed.set(this.gvl.vendors)}unsetAllVendorsDisclosed(){this.vendorsDisclosed.empty()}setAllVendorsAllowed(){this.vendorsAllowed.set(this.gvl.vendors)}unsetAllVendorsAllowed(){this.vendorsAllowed.empty()}setAllVendorLegitimateInterests(){this.vendorLegitimateInterests.set(this.gvl.vendors)}unsetAllVendorLegitimateInterests(){this.vendorLegitimateInterests.empty()}setAllPurposeConsents(){this.purposeConsents.set(this.gvl.purposes)}unsetAllPurposeConsents(){this.purposeConsents.empty()}setAllPurposeLegitimateInterests(){this.purposeLegitimateInterests.set(this.gvl.purposes)}unsetAllPurposeLegitimateInterests(){this.purposeLegitimateInterests.empty()}setAllSpecialFeatureOptins(){this.specialFeatureOptins.set(this.gvl.specialFeatures)}unsetAllSpecialFeatureOptins(){this.specialFeatureOptins.empty()}setAll(){this.setAllVendorConsents(),this.setAllPurposeLegitimateInterests(),this.setAllSpecialFeatureOptins(),this.setAllPurposeConsents(),this.setAllVendorLegitimateInterests()}unsetAll(){this.unsetAllVendorConsents(),this.unsetAllPurposeLegitimateInterests(),this.unsetAllSpecialFeatureOptins(),this.unsetAllPurposeConsents(),this.unsetAllVendorLegitimateInterests()}get numCustomPurposes(){let e=this.numCustomPurposes_;if(typeof this.customPurposes=="object"){let t=Object.keys(this.customPurposes).sort((s,r)=>Number(s)-Number(r));e=parseInt(t.pop(),10)}return e}set numCustomPurposes(e){if(this.numCustomPurposes_=parseInt(e,10),this.numCustomPurposes_<0)throw new L("numCustomPurposes",e)}updated(){let e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));this.created=t,this.lastUpdated=t}};var ee=class{static encode(e,t){let s="",r;return e=be.process(e,t),Array.isArray(t?.segments)?r=t.segments:r=new ge(e,t)[""+e.version],r.forEach((n,l)=>{let i="";l<r.length-1&&(i="."),s+=ne.encode(e,n)+i}),s}static decode(e,t){let s=e.split("."),r=s.length;t||(t=new Q);for(let n=0;n<r;n++){let l=s[n],a=q.decode(l.charAt(0)).substr(0,p.segmentType),h=X.ID_TO_KEY[u.decode(a,p.segmentType).toString()];ne.decode(l,t,h)}return t}};var Ee=class extends U{respond(){let e=d.tcModel,t=e.vendorListVersion,s;this.param===void 0&&(this.param=t),this.param===t&&e.gvl?s=e.gvl:s=new P(this.param),s.readyPromise.then(()=>{this.invokeCallback(s.getJson())})}};var xe=class extends F{respond(){this.listenerId=d.eventQueue.add({callback:this.callback,param:this.param,next:this.next}),super.respond()}};var Se=class extends U{respond(){this.invokeCallback(d.eventQueue.remove(this.param))}};var $=class{static[x.PING]=ue;static[x.GET_TC_DATA]=F;static[x.GET_IN_APP_TC_DATA]=he;static[x.GET_VENDOR_LIST]=Ee;static[x.ADD_EVENT_LISTENER]=xe;static[x.REMOVE_EVENT_LISTENER]=Se};var ye=class{static set_=new Set([0,2,void 0,null]);static has(e){return typeof e=="string"&&(e=Number(e)),this.set_.has(e)}};var Ce="__tcfapi",Ie=class{callQueue;customCommands;constructor(e){if(e){let t=x.ADD_EVENT_LISTENER;if(e?.[t])throw new Error(`Built-In Custom Commmand for ${t} not allowed: Use ${x.GET_TC_DATA} instead`);if(t=x.REMOVE_EVENT_LISTENER,e?.[t])throw new Error(`Built-In Custom Commmand for ${t} not allowed`);e?.[x.GET_TC_DATA]&&(e[x.ADD_EVENT_LISTENER]=e[x.GET_TC_DATA],e[x.REMOVE_EVENT_LISTENER]=e[x.GET_TC_DATA]),this.customCommands=e}try{this.callQueue=window[Ce]()||[]}catch{this.callQueue=[]}finally{window[Ce]=this.apiCall.bind(this),this.purgeQueuedCalls()}}apiCall(e,t,s,...r){if(typeof e!="string")s(null,!1);else if(!ye.has(t))s(null,!1);else{if(typeof s!="function")throw new Error("invalid callback function");d.disabled?s(new le,!1):!this.isCustomCommand(e)&&!this.isBuiltInCommand(e)?s(null,!1):this.isCustomCommand(e)&&!this.isBuiltInCommand(e)?this.customCommands[e](s,...r):e===x.PING?this.isCustomCommand(e)?new $[e](this.customCommands[e],r[0],null,s):new $[e](s,r[0]):d.tcModel===void 0?this.callQueue.push([e,t,s,...r]):this.isCustomCommand(e)&&this.isBuiltInCommand(e)?new $[e](this.customCommands[e],r[0],null,s):new $[e](s,r[0])}}purgeQueuedCalls(){let e=this.callQueue;this.callQueue=[],e.forEach(t=>{window[Ce](...t)})}isCustomCommand(e){return this.customCommands&&typeof this.customCommands[e]=="function"}isBuiltInCommand(e){return $[e]!==void 0}};var we=class{callResponder;isServiceSpecific;numUpdates=0;constructor(e,t,s=!1,r){this.throwIfInvalidInt(e,"cmpId",2),this.throwIfInvalidInt(t,"cmpVersion",0),d.cmpId=e,d.cmpVersion=t,d.tcfPolicyVersion=2,this.isServiceSpecific=!!s,this.callResponder=new Ie(r)}throwIfInvalidInt(e,t,s){if(!(typeof e=="number"&&Number.isInteger(e)&&e>=s))throw new Error(`Invalid ${t}: ${e}`)}update(e,t=!1){if(d.disabled)throw new Error("CmpApi Disabled");d.cmpStatus=D.LOADED,t?(d.displayStatus=B.VISIBLE,d.eventStatus=J.CMP_UI_SHOWN):d.tcModel===void 0?(d.displayStatus=B.DISABLED,d.eventStatus=J.TC_LOADED):(d.displayStatus=B.HIDDEN,d.eventStatus=J.USER_ACTION_COMPLETE),d.gdprApplies=e!==null,d.gdprApplies?(e===""?(d.tcModel=new Q,d.tcModel.cmpId=d.cmpId,d.tcModel.cmpVersion=d.cmpVersion):d.tcModel=ee.decode(e),d.tcModel.isServiceSpecific=this.isServiceSpecific,d.tcfPolicyVersion=Number(d.tcModel.policyVersion),d.tcString=e):d.tcModel=null,this.numUpdates===0?this.callResponder.purgeQueuedCalls():d.eventQueue.exec(),this.numUpdates++}disable(){d.disabled=!0,d.cmpStatus=D.ERROR}};var Qe=Re();Qe();function $e(){return new Date().getTime()}function te(o,e){let t=new Date;t.setTime(t.getTime()+30*24*60*60*1e3);let s="expires="+t.toUTCString();e.path="/",e.expires=s,e.createDate=$e(),document.cookie=o+"="+JSON.stringify(e)}function Ve(o){let e=o+"=",s=decodeURIComponent(document.cookie).split(";");for(let r=0;r<s.length;r++){let n=s[r];for(;n.charAt(0)==" ";)n=n.substring(1);if(n.indexOf(e)==0)return JSON.parse(n.substring(e.length,n.length))}return null}var We=()=>{function o(a){let h=window.location.origin;return a.startsWith("/")||a.startsWith("./")?!0:a.startsWith("http://")||a.startsWith("https://")?new URL(a).origin===h:!1}function e(a){return a!=null&&a.hasAttribute("cookie_status")?a.getAttribute("cookie_status")=="true":!1}let t=document.querySelectorAll("img");Array.from(t).forEach(a=>{!o(a.src)&&!e(a)&&a.removeAttribute("src")});let s=document.querySelectorAll("script");Array.from(s).forEach(a=>{!o(a.src)&&!e(a)&&a.removeAttribute("src")});let r=document.querySelectorAll("link");Array.from(r).forEach(a=>{!o(a.href)&&!e(a)&&a.parentNode.removeChild(a)});let n=document.querySelectorAll("iframe");Array.from(n).forEach(a=>{!o(a.src)&&!e(a)&&a.removeAttribute("src")});let l=document.querySelectorAll("embed");Array.from(l).forEach(a=>{o(a.src)&&!e(a)&&a.removeAttribute("src")});let i=document.querySelectorAll("a");Array.from(i).forEach(a=>{o(a.href)&&!e(a)&&a.removeAttribute("href")})},qe=()=>{let o=1711299050,e=null,t=[],s={},r=[];P.baseUrl="/";let n=new P,l=n.clone(),i=new Q(n);i.cmpId=99,i.cmpVersion=2,i.consentScreen=1,i.isServiceSpecific=!0,i.UseNonStandardStacks=0;let a=new we(i.cmpId,i.cmpVersion,i.isServiceSpecific);i.gvl.readyPromise.then(()=>{let f=i.gvl.getJson().vendors;s=i.gvl.getJson().purposes,Fe()?(a.update(Me(),!1),Be(),ie()):m()});function h(){if(i)return ee.encode(i)}function m(){a.update("",!0);let f=document.getElementsByTagName("body"),_=' <div class="cst_container"><div class="cst_banner"><div class="cst_main_container"><div class="cst_head"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Universität_Würzburg_Logo.svg/200px-Universität_Würzburg_Logo.svg.png" class="cst_image"><h4 class="cst_headline">Wir nutzen Cookies</h4></div><div class="cst_body"><p class="cst_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum sapien eu odio tempor, vel vehicula magna pulvinar. Suspendisse efficitur finibus tellus, pellentesque maximus mi sollicitudin et. Sed sollicitudin purus quis sapien tempus, ac aliquam eros elementum. Cras id nisi quis libero ultrices placerat. Nunc posuere ligula vitae risus dictum, vel placerat diam ornare. Praesent dignissim sagittis condimentum. Pellentesque finibus mauris dui, a ullamcorper risus varius ut. Duis vulputate mi id condimentum ultrices.</p><div class="cst_button_wrap"><a class="cst_accept">Alle Akzeptieren</a><a class="cst_reject">Ablehnen</a><a id="cst_settings" class="cst_settings">Einstellungen</a></div><div class="cst_button_wrap"><a class="cst_link">Mehr Infos</a><a class="cst_link" href="www.google.de">Impressum</a><a class="cst_link" href="%privacy%">Datenschutz</a></div></div></div><div class="cst_settings_container"><div class="cst_head"><h4 class="cst_headline">Zwecke verwalten</h4></div><div class="cst_body"><div class="cst_scroll">%purposes%<div class="cst_reason_container"><div class="cst_reason_info"><h5 class="cst_reason_h">Erforderlich</h5><p class="cst_reason_p">Die technische Speicherung oder der Zugang ist unbedingt erforderlich f\xFCr den rechtm\xE4\xDFigen Zweck, die Nutzung eines bestimmten Dienstes zu erm\xF6glichen, der vom Teilnehmer oder Nutzer ausdr\xFCcklich gew\xFCnscht wird, oder f\xFCr den alleinigen Zweck, die \xDCbertragung einer Nachricht \xFCber ein elektronisches Kommunikationsnetz durchzuf\xFChren.</p></div></div><a class="cst_link" id="cst_vendor_settings">%vendor_settings%</a></div><div class="cst_button_wrap"><a class="cst_accept">Alle Akzeptieren</a><a class="cst_reject">Ablehnen</a><a id="cst_settings" class="cst_settings cst_save_settings">Speichern</a></div><div class="cst_button_wrap"><a class="cst_link">Mehr Infos</a><a class="cst_link" href="www.google.de">Impressum</a><a class="cst_link" href="%privacy%">Datenschutz</a></div></div></div><div class="cst_vendors_container"><div class="cst_head"><h4 class="cst_headline">Anbieter verwalten</h4></div><div class="cst_body"><div class="cst_scroll">%vendors%<a class="cst_link" id="cst_reason_settings">Zwecke verwalten</a></div><div class="cst_button_wrap"><a class="cst_accept">Alle Akzeptieren</a><a class="cst_reject">Ablehnen</a><a id="cst_settings" class="cst_settings cst_save_settings">Speichern</a></div><div class="cst_button_wrap"><a class="cst_link">Mehr Infos</a><a class="cst_link" href="www.google.de">Impressum</a><a class="cst_link" href="%privacy%">Datenschutz</a></div></div></div></div><div class="cst_cookie_settings"><img src="https://brawltown.net/img/BT-Logo.webp"></div></div>',v="";for(let[k,ae]of Object.entries(s))v=v+'<div class="cst_reason_container"><div class="cst_reason_info"><h5 class="cst_reason_h">'+ae.name+'</h5><p class="cst_reason_p">'+ae.description+'</p></div><div class="cst_reason_consent_container"><label class="cst_reason_consent_switch"><input type="checkbox" class="cst_reason_consent_checkbox" value_id="'+ae.id+' purpose"><span class="cst_reason_consent_slider"></span></label></div></div>';_=_.replace("%purposes%",v);let H="";for(let k of e)H=H+'<div class="cst_reason_container"><div class="cst_reason_info"><h5 class="cst_reason_h">'+k.name+'</h5><p class="cst_reason_p"><b>Privacy Policy:</b> '+k.policyUrl+'<p><p class="cst_reason_p"><b>Ablaufdatum:</b> '+Math.round(k.cookieMaxAgeSeconds/(60*60*24))+'d<p><p class="cst_reason_p"><b>Zwecke:</b> '+N(k.purposes)+'<p></div><div class="cst_reason_consent_container"><label class="cst_reason_consent_switch"><input type="checkbox" class="cst_reason_consent_checkbox" value_id="'+k.id+' vendor"><span class="cst_reason_consent_slider"></span></label></div></div>';_=_.replace("%vendors%",H),f.length>=1&&(E(),f[0].innerHTML=_+f[0].innerHTML,Te())}function E(){let f=`
        :root {
            --cst_banner_width: 500px;
            --cst_banner_max_height: %banner_max_hight%px;
            --cst_banner_background: rgb(255, 255, 255);;
            --cst_banner_overlap_color: rgb(0, 0, 0, 0.2);
            --cst_banner_border_radius: 20px;
            --cst_banner_border_color: transparent;
            --cst_banner_border_width:  0px;
            --cst_banner_border_sytle:  solid;
            --cst_banner_position_left: 50%;
            --cst_banner_position_right: 50%;
            --cst_headline_size: 25px;
            --cst_headline_color: rgb(0,0,0);
            --cst_headline2_size: 14px;
            --cst_headline2_color: rgb(31, 31, 31);
            --cst_paragraph_size: 14px;
            --cst_paragraph_color: rgb(31, 31, 31);
            --cst_accept_button_backround_color: rgb(15, 83, 200);
            --cst_accept_button_border_color: rgb(15, 83, 200);
            --cst_accept_button_color: rgb(255, 255, 255);
            --cst_accept_button_font_size: 18px;
            --cst_accept_button_font_weight: bold;
            --cst_accept_button_width: 25%;
            --cst_accept_border_radius: 20px;
            --cst_accept_border_width: 2px;
            --cst_reject_button_backround_color: rgb(15, 83, 200, 0);
            --cst_reject_button_border_color: rgb(15, 83, 200);
            --cst_reject_button_color: rgb(15, 83, 200);
            --cst_reject_button_font_size: 18px;
            --cst_reject_button_font_weight: normal;
            --cst_reject_button_width: 25%;
            --cst_reject_border_radius: 20px;
            --cst_reject_border_width: 2px;
            --cst_settings_button_backround_color: rgb(15, 83, 200, 0);
            --cst_settings_button_border_color: rgb(15, 83, 200);
            --cst_settings_button_color:  rgb(15, 83, 200);
            --cst_settings_button_font_size: 18px;
            --cst_setttings_button_font_weight: normal;
            --cst_settings_button_width: 25%;
            --cst_settings_border_radius: 20px;
            --cst_settings_border_width: 2px;
            --cst_link_color: rgb(0,0,0);
            --cst_link_font_size: 14px;
            --cst_link_decoration: underline;
        }
        
        .cst_container{
            margin: 0;
            padding: 0;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            position: fixed;
            background-color: var(--cst_banner_overlap_color);
            z-index: 999;
        }
        
        .cst_container .cst_cookie_settings{
            position: fixed;
            width: 50px;
            height: 50px;
            max-width: 10%;
            border-radius: 100px;
            background-color: rgb(0, 0, 0);
            left: 3%;
            bottom: 5%;
        }
        
        .cst_container .cst_cookie_settings img{
            height: 50%;
        }
        
        .cst_container .cst_banner{
            background-color: var(--cst_banner_background);
            border-radius: var(--cst_banner_border_radius);
            max-height: 90%;
            overflow: scroll;
            padding: 35px;
            max-width: 90%;
            width: var(--cst_banner_width);
            position: fixed;
            left: var(--cst_banner_position_left);
            top: var(--cst_banner_position_right);
            transform: translateX(-50%) translateY(-50%);
            display: block;
        }
        
        .cst_container .cst_banner .cst_main_container{
            display: block;
        }
        
        .cst_container .cst_banner .cst_settings_container{
            display: none;
        }
        
        .cst_container .cst_banner .cst_vendors_container{
            display: none;
        }
        
        .cst_container .cst_banner .cst_head{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cst_container .cst_banner .cst_head .cst_image{
            max-width: 20%;
        }
        
        .cst_container .cst_banner .cst_head .cst_headline{
            font-weight: bold;
            font-size: var(--cst_headline_size);
            margin: 0px;
            margin-top: 10px;
            color: var(--cst_headline_color);
        }
        
        .cst_container .cst_banner .cst_body {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cst_container .cst_banner .cst_body .cst_text{
            font-weight: normal;
            font-size: var(--cst_paragraph_size);
            margin: 10px;
            color: var(--cst_paragraph_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap{
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_reject{
            min-width: var(--cst_reject_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_reject_button_backround_color);
            color: var(--cst_reject_button_color);
            font-weight: normal;
            font-size: var(--cst_reject_button_font_size);
            border-radius: var(--cst_reject_border_radius);
            border-color: var(--cst_reject_button_border_color);
            border-width: var(--cst_reject_border_width);
            border-style: solid;
            text-decoration: none;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_settings{
            min-width: var(--cst_setting_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_settings_button_backround_color);
            color: var(--cst_settings_button_color);
            font-weight: normal;
            font-size: var(--cst_settings_button_font_size);
            border-radius: var(--cst_settings_border_radius);
            border-color: var(--cst_settings_button_border_color);
            border-width: var(--cst_settings_border_width);
            border-style: solid;
            text-decoration: none;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_accept{
            min-width: var(--cst_accept_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_accept_button_backround_color);
            color: var(--cst_accept_button_color);
            font-weight: normal;
            font-size: var(--cst_accept_button_font_size);
            border-radius: var(--cst_accept_border_radius);
            border-color: var(--cst_accept_button_border_color);
            border-width: var(--cst_accept_border_width);
            border-style: solid;
            text-decoration: none;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_link{
            text-decoration: underline;
            margin: 5px;
            font-size: 16px;
        }
        
        .cst_container .cst_banner .cst_body .cst_scroll{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 400px;
            max-height: 60%;
            overflow: scroll;
            padding-bottom: 20px;
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_h{
            font-weight: bold;
            font-size: var(--cst_headline2_size);
            margin: 5px;
            color: var(--cst_headline2_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_p{
            font-weight: normal;
            font-size: var(--cst_paragraph_size);
            margin: 5px;
            color: var(--cst_paragraph_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table{
            margin: 5px;
            width:90%;
            padding: 10px
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table td, th, tr, table{
            border-width: 1px;
            border-color: rgb(0, 0, 0, 0.5);
            border-style: solid;
            border-collapse: collapse;
            margin: 0;
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table th{
            padding: 4px;
            text-align: start;
            font-size: 16px;
            font-weight: bold;
            color: rgb(0, 0, 0);
            background-color: rgb(0, 0, 0, 0.1);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table td{
            padding: 4px;
            text-align: start;
            font-size: 14px;
            font-weight: normal;
            color: rgb(0, 0, 0);
        }
        
        .cst_container .cst_banner .cst_body .cst_link{
            text-decoration: var(--cst_link_decoration);
            margin: 5px;
            font-size: var(--cst_link_font_size);
            color: var(--cst_link_color);
        }
        
        .cst_reason_consent_switch {
            margin: 5px;
            position: relative;
            display: inline-block;
            width: 45px;
            height: 26px;
          }
          
         .cst_reason_consent_checkbox {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .cst_reason_consent_slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .cst_reason_consent_slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .cst_reason_consent_checkbox:checked + .cst_reason_consent_slider {
            background-color: #2196F3;
          }
          
          .cst_reason_consent_checkbox:focus + .cst_reason_consent_slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          .cst_reason_consent_checkbox:checked + .cst_reason_consent_slider:before {
            -webkit-transform: translateX(17px);
            -ms-transform: translateX(17px);
            transform: translateX(17px);
          }        
        `;document.head.innerHTML=document.head.innerHTML+"<style>"+f+"</style>"}function b(){let f=document.getElementsByTagName("body"),_='<div class="cst_container">';f.length>=1&&(f[0].innerHTML=_+f[0].innerHTML,Te())}function R(){let f=document.getElementsByClassName("cst_banner");Array.from(f).forEach(_=>_.remove())}function N(f){let _="";return f.forEach(v=>{for(let[H,k]of Object.entries(s))v==k.id&&(_=_+k.name+"; ")}),_}function Pe(){for(let[v,H]of Object.entries(s))r.includes(H.id)||r.push(H.id);for(let v of e)v.id!=null&&!t.includes(v.id)&&t.push(v.id);let f=e.filter(v=>v.iab_id!==null&&t.includes(v.iab_id)).map(v=>v.iab_id);i.vendorConsents.set(f),i.purposeConsents.set(r);let _=h();a.update(_,!1),te("cf_tcf_string",_),te("cst_consent",{allowedPurposes:r,allowedVendors:t}),ie(),R()}function ke(){r=[],t=[],i.vendorConsents.empty(),i.purposeConsents.empty();let f=h();a.update(f,!1),te("cf_tcf_string",f),te("cst_consent",{allowedPurposes:r,allowedVendors:t}),ie(),R()}function De(f,_){f.toLowerCase()=="vendor"?t.includes(parseInt(_))||t.push(parseInt(_)):f.toLowerCase()=="purpose"&&(r.includes(parseInt(_))||r.push(parseInt(_)))}function Ue(){let f=e.filter(v=>v.iab_id!==null&&t.includes(v.iab_id)).map(v=>v.iab_id);i.vendorConsents.set(f),i.purposeConsents.set(r);let _=h();a.update(_,!1),te("cf_tcf_string",_),te("cst_consent",{allowedPurposes:r,allowedVendors:t}),ie(),R()}function Fe(){let f=Ve("cst_consent");if(!f||!f.createDate)return!1;if(f.createDate>o)return!0}function Be(){let f=Ve("cst_consent");f.allowedPurposes&&(r=f.allowedPurposes),f.allowedVendors&&(t=f.allowedVendors)}function Me(){let f=Ve("cf_tcf_string");return f||(m(),"")}function ie(){t.forEach(f=>{let _=e.find(v=>v.id==f);_.script&&(document.head.innerHTML=document.head.innerHTML+_.script)})}let Je="https://consentflow.de";function Ye(){}function Te(){let f=document.getElementsByClassName("cst_accept");Array.from(f).forEach(V=>{V.addEventListener("click",()=>{Pe()})});let _=document.getElementsByClassName("cst_reject");Array.from(_).forEach(V=>{V.addEventListener("click",()=>{ke()})});let v=document.getElementsByClassName("cst_save_settings");Array.from(v).forEach(V=>{V.addEventListener("click",()=>{Ue()})}),document.getElementById("cst_settings").addEventListener("click",()=>{let V=document.getElementsByClassName("cst_main_container");Array.from(V).forEach(w=>{w.style.display="none"});let W=document.getElementsByClassName("cst_settings_container");Array.from(W).forEach(w=>{w.style.display="block"})}),document.getElementById("cst_vendor_settings").addEventListener("click",()=>{let V=document.getElementsByClassName("cst_settings_container");Array.from(V).forEach(w=>{w.style.display="none"});let W=document.getElementsByClassName("cst_vendors_container");Array.from(W).forEach(w=>{w.style.display="block"})}),document.getElementById("cst_reason_settings").addEventListener("click",()=>{let V=document.getElementsByClassName("cst_vendors_container");Array.from(V).forEach(w=>{w.style.display="none"});let W=document.getElementsByClassName("cst_settings_container");Array.from(W).forEach(w=>{w.style.display="block"})});let Ge=document.getElementsByClassName("cst_reason_consent_checkbox");Array.from(Ge).forEach(V=>{V.addEventListener("input",W=>{let w=W.target.getAttribute("value_id");if(w){let He=w.split(" ")[1],ze=w.split(" ")[0];De(He,ze)}})})}};document.addEventListener("readystatechange",o=>{if(o.target.readyState==="interactive"){let e=We()}if(o.target.readyState==="complete"){let e=qe()}});})();