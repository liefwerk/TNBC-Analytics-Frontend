(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{337:function(t,e,n){"use strict";n(115);var r=n(26),o=n(59),c=n(66),l=n(33);function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var d=function(t){Object(o.a)(n,t);var e=f(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return n}(n(52).Vue),m=n(25),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{attrs:{width:"38",height:"38",viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg"}},[n("defs",[n("linearGradient",{attrs:{x1:"8.042%",y1:"0%",x2:"65.682%",y2:"23.865%",id:"a"}},[n("stop",{attrs:{"stop-color":"#81ade1","stop-opacity":"0",offset:"0%"}}),t._v(" "),n("stop",{attrs:{"stop-color":"#81ade1","stop-opacity":".631",offset:"63.146%"}}),t._v(" "),n("stop",{attrs:{"stop-color":"#81ade1",offset:"100%"}})],1)],1),t._v(" "),n("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[n("g",{attrs:{transform:"translate(1 1)"}},[n("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18",id:"Oval-2",stroke:"url(#a)","stroke-width":"2"}},[n("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.9s",repeatCount:"indefinite"}})],1),t._v(" "),n("circle",{attrs:{fill:"#81ade1",cx:"36",cy:"18",r:"1"}},[n("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.9s",repeatCount:"indefinite"}})],1)])])])}),[],!1,null,null,null);e.a=component.exports},758:function(t,e,n){"use strict";n.r(e);var r=n(4),o=(n(76),n(14),n(60),n(211),n(67),n(32),n(0)),c=n(507),l=n(508),f=n(509),d=(n(115),n(26)),m=n(39),h=n(59),v=n(66),y=n(33),x=n(12),O=(n(38),n(53),n(52)),w=n(337),_=n(328),j=n.n(_);function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(y.a)(t);if(e){var o=Object(y.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(v.a)(this,n)}}var C=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(x.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},T=function(t){Object(h.a)(n,t);var e=k(n);function n(){var t;return Object(d.a)(this,n),(t=e.apply(this,arguments)).receivedTxs={},t.govPK="6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a",t.treasuryPK="23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5",t}return Object(m.a)(n,[{key:"fetch",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://54.183.16.194/bank_transactions?&block__sender=".concat(this.treasuryPK,"&recipient=").concat(this.govPK)).then((function(t){return t.json()})).catch((function(t){return console.log(t)}));case 2:this.receivedTxs=t.sent;case 3:case"end":return t.stop()}}),t,this)}))))},{key:"formatedReceivedData",get:function(){var t=[];return this.receivedTxs.results.map((function(e){var n=j()(e.block.created_date).valueOf();t.push([n,e.amount])})),t}},{key:"transactions",get:function(){return{chart:{type:"areaspline"},title:{text:"Deposits to Government account",margin:30,align:"left"},subtitle:{text:"From Treasury Account",align:"left"},tooltip:{shared:!0,valueSuffix:" TNBC"},scrollbar:{enabled:!1},navigator:{enabled:!1},xAxis:{categories:[]},series:[{name:"Transactions",data:this.formatedReceivedData}]}}}]),n}(O.Vue),P=T=C([Object(O.Component)({components:{CircleSpinner:w.a}})],T),R=n(25),S=Object(R.a)(P,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"relative h-full card"},[t.receivedTxs.results?n("highcharts",{attrs:{"constructor-type":"stockChart",options:t.transactions}}):n("div",[n("CircleSpinner",{staticClass:"h-16 w-16 mx-auto"})],1)],1)}),[],!1,null,null,null).exports;n(44),n(34),n(45),n(29),n(27),n(46),n(47),n(35),n(209),n(210),n(28);function N(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return D(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return D(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function B(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(y.a)(t);if(e){var o=Object(y.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(v.a)(this,n)}}var G=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(x.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},E=function(t){Object(h.a)(n,t);var e=B(n);function n(){var t;return Object(d.a)(this,n),(t=e.apply(this,arguments)).sentTxs={},t.pk="6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a",t}return Object(m.a)(n,[{key:"fetch",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("fetching..."),t.next=3,fetch("http://54.183.16.194/bank_transactions?account_number=".concat(this.pk,"&limit=100&fee=NONE")).then((function(t){return t.json()})).catch((function(t){return console.log(t)}));case 3:this.sentTxs=t.sent;case 4:case"end":return t.stop()}}),t,this)}))))},{key:"formatedSentData",get:function(){var t=this.sentTxs.results,data=this.filterSentData(t),e=this.reduceSentData(data);return this.formatSentData(e)}},{key:"filterSentData",value:function(t){var e,n=[],r=N(t);try{for(r.s();!(e=r.n()).done;){var o=e.value,c=o.recipient,l=o.block.created_date.split("T"),f=0;if(c!=this.pk){var d,m=N(t);try{for(m.s();!(d=m.n()).done;){var h=d.value,v=h.block.created_date.split("T");l[0]===v[0]&&(f+=h.amount)}}catch(t){m.e(t)}finally{m.f()}var y={date:l[0],amount:f};n.push(y)}}}catch(t){r.e(t)}finally{r.f()}return n}},{key:"reduceSentData",value:function(t){return t.reduce((function(t,e){return t.find((function(t){return t.date===e.date}))?t:t.concat([e])}),[])}},{key:"formatSentData",value:function(t){var e=[];return t.forEach((function(element){var t=j()(element.date).fromNow();e.push([t,element.amount])})),e}},{key:"allOptions",get:function(){return{chart:{type:"pie",alignTicks:!0},colors:["#336fdf","#2a297a","#336faf"],title:{text:"Periodic distributions of TNBC",margin:30,align:"left"},subtitle:{text:"From Government Account",align:"left"},navigator:{enabled:!1},tooltip:{enabled:!1,pointFormat:"<b>{point.percentage:.1f}%</b>{point.name}"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.percentage:.1f} % - {point.y}"},showInLegend:!0}},legend:{enabled:!0,floating:!0},series:[{name:"Transactions",data:this.formatedSentData}]}}}]),n}(O.Vue),K=E=G([Object(O.Component)({components:{CircleSpinner:w.a}})],E),$=Object(R.a)(K,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"relative h-full card"},[t.sentTxs.results?n("highcharts",{attrs:{"constructor-type":"stockChart",options:t.allOptions}}):n("div",[n("CircleSpinner",{staticClass:"h-16 w-16 mx-auto"})],1)],1)}),[],!1,null,null,null).exports,L=o.default.extend({components:{Table:c.a,NumberCard:l.a,DefaultCard:f.a,LazyPaymentReceivedGovGraph:S,LazyPaymentsSentGovPieGraph:$},data:function(){return{transactionUrl:{protocol:"http",bank:"54.183.16.194",publicKey:"6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a"},tableOptions:{},government:{},transactions:[],analytics:{},sentTxs:{},receivedTxs:[],numberOfTransactions:0,perPage:5,pageOffset:0,columns:[{name:"date",attribute:"date"},{name:"amount",attribute:"amount"},{name:"github issue id",attribute:"githubLink"},{name:"purpose",attribute:"paymentFor"},{name:"recipient public key",attribute:"recipientPublicKey"}]}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,l,f,d,m,h,v,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$http,r=t.$axios,e.next=3,n.$get("https://tnbanalytics.pythonanywhere.com/government");case 3:return o=e.sent,c=o[0],l="6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a",e.next=8,r.$get("http://54.183.16.194/bank_transactions?limit=5&account_number=".concat(l,"&block__sender=").concat(l,"&fee=NONE"));case 8:return f=e.sent,d=f.results,m={total:f.count,previous:f.previous,next:f.next,count:f.results.length},e.next=13,n.$get("http://52.52.160.149/accounts/".concat(l,"/balance"));case 13:return h=e.sent,e.next=16,r.get("http://54.183.16.194/bank_transactions?account_number=".concat(l,"&limit=1"));case 16:return v=e.sent,y={balance:h.balance,lastTransaction:d[0].amount,lastTransactionDate:j()(d[0].block.created_date).fromNow(),totalOfTransactions:v.data.count,lastTransactionKey:d[0].recipient},e.abrupt("return",{government:c,transactions:d,tableOptions:m,analytics:y});case 19:case"end":return e.stop()}}),e)})))()},methods:{handlePreviousPage:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.tableOptions.previous){e.next=7;break}return e.next=3,fetch("".concat(t.tableOptions.previous)).then((function(t){return t.json()})).catch((function(t){return console.log(t)}));case 3:n=e.sent,t.transactions=n.results,t.tableOptions.previous=n.previous,t.tableOptions.next=n.next;case 7:case"end":return e.stop()}}),e)})))()},handleNextPage:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.tableOptions.next){e.next=7;break}return e.next=3,fetch("".concat(t.tableOptions.next)).then((function(t){return t.json()})).catch((function(t){return console.log(t)}));case 3:n=e.sent,t.transactions=n.results,t.tableOptions.previous=n.previous,t.tableOptions.next=n.next;case 7:case"end":return e.stop()}}),e)})))()},handlePageOffset:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,link,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.transactionUrl,link="".concat(r.protocol,"://").concat(r.bank,"/bank_transactions?limit=").concat(e.perPage,"&offset=").concat(t,"&account_number=").concat(r.publicKey,"&fee=NONE"),n.next=4,fetch(link).then((function(t){return t.json()})).catch((function(t){return console.log(t)}));case 4:o=n.sent,e.pageOffset=t,e.transactions=o.results,e.tableOptions.previous=o.previous,e.tableOptions.next=o.next,e.tableOptions.next=o.next;case 10:case"end":return n.stop()}}),n)})))()},handlePerPageChange:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,link,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.transactionUrl,link="".concat(r.protocol,"://").concat(r.bank,"/bank_transactions?limit=").concat(t,"&offset=").concat(e.pageOffset,"&account_number=").concat(r.publicKey,"&fee=NONE"),n.next=4,fetch(link).then((function(t){return t.json()})).catch((function(t){return console.log(t)}));case 4:o=n.sent,e.perPage=t,e.transactions=o.results,e.tableOptions.previous=o.previous,e.tableOptions.next=o.next,e.tableOptions.count=o.results.length;case 10:case"end":return n.stop()}}),n)})))()},prepareGithubIssue:function(t,e){var n=e.match(/^[\d]+/gm);switch(t){case"PROJECT":var r=e.match(/[\d]+$/gm);return console.log("projetct lqst id",r),{id:r[0],url:"https://github.com/thenewboston-developers/Projects/issues/".concat(r[0])};case"BOUNTY":return{id:n[0],url:"https://github.com/thenewboston-developers/Website/issues/".concat(n[0])};case"TS":return{id:n[0],url:" https://github.com/thenewboston-developers/Contributor-Payments/issues/".concat(n[0])};default:return null}},formatTransactions:function(t){var e=this,n=[];return t.map((function(t){var r=t.block.created_date,o=j()(r).format("MMM Do, YYYY"),c=t.memo.match(/(?<=PROJECT_|BOUNTY_|TS_)[\d+.-].+/),l=t.memo.match(/(?<=TNB_)[\w].*?(?=_)/);n.push({date:o,amount:t.amount,githubLink:c?e.prepareGithubIssue(l[0],c[0]):null,paymentFor:l?l[0]:null,recipientPublicKey:t.recipient})})),n}},computed:{getFormatedTransactions:function(){return this.formatTransactions(this.transactions)}}}),A=Object(R.a)(L,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-12 mb-20 mx-6 md:mx-12"},[t._m(0),t._v(" "),n("div",{staticClass:"flex flex-wrap mx-auto"},[n("div",{staticClass:"w-full mb-8"},[n("div",{staticClass:"flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-4 gap-4 break-words"},[n("NumberCard",{staticClass:"text-red-400 self-start",attrs:{title:"Balance",number:t.analytics.balance}}),t._v(" "),n("NumberCard",{staticClass:"text-blue-400 self-start",attrs:{title:"Number of Transactions",number:t.analytics.totalOfTransactions}}),t._v(" "),n("NumberCard",{staticClass:"text-green-400 self-start",attrs:{title:"Last Transaction Amount",number:t.analytics.lastTransaction}}),t._v(" "),n("DefaultCard",{staticClass:"break-all w-1/2 self-start",attrs:{title:"Last Transaction Date",number:t.analytics.lastTransactionDate}})],1),t._v(" "),n("div",{staticClass:"flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4"},[n("DefaultCard",{staticClass:"break-all w-1/2 self-start",attrs:{title:"Public Key",number:t.government.account_number}}),t._v(" "),n("DefaultCard",{staticClass:"break-all",attrs:{title:"Last Transaction's Recipient's Key",number:t.analytics.lastTransactionKey}})],1)]),t._v(" "),n("div",{staticClass:"flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4"},[n("LazyPaymentReceivedGovGraph"),t._v(" "),n("LazyPaymentsSentGovPieGraph")],1)]),t._v(" "),n("div",{staticClass:"mt-10"},[n("h2",{staticClass:"text-titlemd font-sans font-semibold"},[t._v("Distributions")]),t._v(" "),n("p",{staticClass:"mb-4"},[t._v("TNBC distributed to the contributors")]),t._v(" "),n("Table",{attrs:{options:t.tableOptions,columns:t.columns,items:t.getFormatedTransactions},on:{previousPage:t.handlePreviousPage,nextPage:t.handleNextPage,changePageOffset:t.handlePageOffset,changePerPage:t.handlePerPageChange}})],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mb-16"},[n("h1",{staticClass:"text-titlelg mb-2 font-sans font-semibold"},[t._v("Government")]),t._v(" "),n("span",{staticClass:"text-subtitle text-pcsecondery"},[t._v("TNBC withdrawal and distribution information")])])}],!1,null,null,null);e.default=A.exports}}]);