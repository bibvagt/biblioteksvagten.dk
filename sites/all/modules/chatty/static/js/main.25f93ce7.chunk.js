(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);n(55);var a=n(0),r=n.n(a),s=n(25),c=n.n(s),u=function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var a=t[n].split("=");if(a[0]===e)return a[1]}return""},i=n(3),o=n(11),l=r.a.createContext(),d=function(e,t){switch(t.type){case"RESET_CHAT":return localStorage.removeItem("clientActiveQuestionId"),Object(o.a)({},e,{clientChat:null});case"SET_ACTIVE_CHAT":return localStorage.setItem("clientActiveQuestionId",t.payload),Object(o.a)({},e,{clientChat:{questionId:t.payload}});default:return e}},m=function(e){var t=e.children,n=Object(a.useReducer)(d,{clientChat:null}),s=Object(i.a)(n,2),c=s[0],u=s[1];return Object(a.useEffect)(function(){var e=localStorage.getItem("clientActiveQuestionId");e&&u({type:"SET_ACTIVE_CHAT",payload:e})},[]),r.a.createElement(l.Provider,{value:[c,u]},t)},b=(n(60),n(12)),f=n(9),v=n(10),E=n.n(v);function g(){var e=Object(f.a)(["\n  mutation CreateQuestionMutation(\n    $agencyId: String!\n    $agencyMail: String!\n    $authorName: String!\n    $authorEmail: String!\n    $subject: String!\n    $url: String!\n  ) {\n    createQuestion(\n      data: {\n        authorName: $authorName\n        authorEmail: $authorEmail\n        agencyMail: $agencyMail\n        agencyId: $agencyId\n        subject: $subject\n        url: $url\n      }\n    ) {\n      id\n      subject\n      authorName\n      status\n    }\n  }\n"]);return g=function(){return e},e}var p=E()(g()),_=function(e){var t=e.createQuestion,n=e.loading,s=Object(a.useRef)(""),c=Object(a.useRef)(""),i=Object(a.useRef)(""),o=n;return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=u("agency_id"),a=u("agency_mail"),r=u("url");if(!n||!r)return alert("A needed param was not set.");t({variables:{agencyId:n,agencyMail:a,authorName:s.current.value,authorEmail:c.current.value,subject:i.current.value,url:r}})}},r.a.createElement("div",{className:"question-form__input-wrapper question-form__input-wrapper--question"},r.a.createElement("label",null,"Hvad vil du sp\xf8rge om?"),r.a.createElement("div",null,r.a.createElement("textarea",{disabled:o,rows:"5",ref:i}))),r.a.createElement("div",{className:"question-form__input-wrapper question-form__input-wrapper--name"},r.a.createElement("label",null,"Dit navn",r.a.createElement("div",null,r.a.createElement("input",{type:"text",disabled:o,ref:s,required:!0})))),r.a.createElement("div",{className:"question-form__input-wrapper question-form__input-wrapper--email"},r.a.createElement("label",null,"Din e-mail adresse",r.a.createElement("div",null,r.a.createElement("input",{type:"email",disabled:o,ref:c,required:!0})))),r.a.createElement("input",{type:"submit",value:"Sp\xf8rg nu"}))},q=function(){var e=Object(a.useContext)(l),t=Object(i.a)(e,2)[1];return r.a.createElement("div",{className:"question-form"},r.a.createElement(b.b,{mutation:p},function(e,n){var a=n.loading,s=n.data;return s&&s.createQuestion.id&&t({type:"SET_ACTIVE_CHAT",payload:s.createQuestion.id}),r.a.createElement(_,{createQuestion:e,loading:a})}))};n(69);function j(){var e=Object(f.a)(["\n  query QuestionQuery($questionId: ID!) {\n    question(questionId: $questionId) {\n      id\n      subject\n      authorName\n      authorEmail\n      consultant\n      status\n      source\n      lastHeartbeatAt\n      createdAt\n      messages {\n        id\n        text\n        sentFrom\n        createdAt\n      }\n    }\n  }\n"]);return j=function(){return e},e}var I=E()(j());function O(){var e=Object(f.a)(["\n  mutation CreateMessageMutation($questionId: ID!, $sentFrom: String!, $text: String!) {\n    createMessage(questionId: $questionId, data: { text: $text, sentFrom: $sentFrom }) {\n      id\n      text\n      sentFrom\n      createdAt\n      question {\n        id\n        authorName\n      }\n    }\n  }\n"]);return O=function(){return e},e}var h=E()(O()),y=r.a.createContext(),k=function(e,t){switch(t.type){case"RESET_CHAT":return localStorage.removeItem("backendActiveQuestionId"),Object(o.a)({},e,{backendChat:null});case"SET_ACTIVE_CHAT":return localStorage.setItem("backendActiveQuestionId",t.payload),Object(o.a)({},e,{backendChat:{questionId:t.payload,message:""}});case"SET_CHAT_MESSAGE_TEXT":return Object(o.a)({},e,{backendChat:Object(o.a)({},e.backendChat,{message:t.payload})});default:return e}},S=function(e){var t=e.children,n=Object(a.useReducer)(k,{backendChat:null}),s=Object(i.a)(n,2),c=s[0],u=s[1];return Object(a.useEffect)(function(){var e=localStorage.getItem("backendActiveQuestionId");e&&u({type:"SET_ACTIVE_CHAT",payload:e})},[]),r.a.createElement(y.Provider,{value:[c,u]},t)};function C(){var e=Object(f.a)(["\n  mutation MakeHeartbeatMutation($questionId: ID!) {\n    makeHeartbeat(questionId: $questionId) {\n      id\n    }\n  }\n"]);return C=function(){return e},e}var T=E()(C()),N=r.a.createContext(),A=function(e,t){switch(t.type){case"RESET_SETTINGS":return localStorage.removeItem("clientSettings"),{};case"SET_SETTINGS":return localStorage.setItem("clientSettings",JSON.stringify(t.payload)),Object(o.a)({},t.payload,{messages:JSON.parse(t.payload.messages),standardAnswers:JSON.parse(t.payload.standardAnswers)});default:return e}},w=function(e){var t=e.children,n=Object(a.useReducer)(A,{}),s=Object(i.a)(n,2),c=s[0],u=s[1];return Object(a.useEffect)(function(){var e=localStorage.getItem("clientSettings");e&&u({type:"SET_SETTINGS",payload:JSON.parse(e)})},[]),r.a.createElement(N.Provider,{value:[c,u]},t)},x=function(e){var t=e.status,n=Object(a.useContext)(N),s=Object(i.a)(n,1)[0];return"pending"===t?r.a.createElement("div",{className:"client-status-bar client-status-bar--".concat(t)},s.messages.chatPending):""},D=n(19);function Q(){var e=Object(f.a)(["\n  subscription NewMessageSubscription($questionId: ID!) {\n    newMessage(questionId: $questionId) {\n      id\n      text\n      sentFrom\n      createdAt\n      question {\n        id\n        authorName\n      }\n    }\n  }\n"]);return Q=function(){return e},e}var $=E()(Q());function H(){var e=Object(f.a)(["\n  subscription QuestionClosedSubscription($questionId: ID!) {\n    questionClosed(questionId: $questionId) {\n      id\n      status\n      subject\n      authorName\n      authorEmail\n      consultant\n      source\n      createdAt\n      lastHeartbeatAt\n      messages {\n        id\n        text\n        sentFrom\n        createdAt\n      }\n    }\n  }\n"]);return H=function(){return e},e}var M=E()(H());function R(){var e=Object(f.a)(["\n  subscription QuestionAssignedSubscription($questionId: ID) {\n    questionAssigned(questionId: $questionId) {\n      status\n    }\n  }\n"]);return R=function(){return e},e}var F=E()(R());function V(){var e=Object(f.a)(["\n  subscription QuestionReopenedSubscription($questionId: ID) {\n    questionReopened(questionId: $questionId) {\n      id\n      status\n      consultant\n      subject\n      authorName\n      authorEmail\n      source\n      createdAt\n      lastHeartbeatAt\n    }\n  }\n"]);return V=function(){return e},e}var G=E()(V()),B=function(e){return new Date(1e3*e)},J=n(38),K=n.n(J),P=n(39),X=n.n(P),Y=function(e){var t=X()(e,"DD.MM.YYYY",{locale:K.a}),n=X()(e,"HH:mm",{locale:K.a});return"D. ".concat(t," kl. ").concat(n)},L=function(e){var t=e.sentFrom,n=e.text,s=e.createdAt,c=B(s),u=Object(a.useState)(Y(c)),o=Object(i.a)(u,2),l=o[0],d=o[1];return Object(a.useEffect)(function(){var e=setInterval(function(){d(Y(c))},3e4);return function(){return clearInterval(e)}}),r.a.createElement("div",{className:"client-message client-message--".concat(t)},r.a.createElement("div",{className:"client-message__box"},r.a.createElement("div",{className:"client-message__text"},n)),"system"===t?"":r.a.createElement("div",{className:"client-message__created-at"},l))},z=function(e){if(0===e.length)return!1;var t=e.scrollHeight;e.scrollTop=t},U=function(e){var t=e.disabled,n=e.subject,s=e.questionCreatedAt,c=e.messages,u=e.subscribeToMore,d=e.makeHeartbeat,m=Object(a.useContext)(l),b=Object(i.a)(m,2),f=b[0],v=b[1];Object(a.useEffect)(function(){u({document:$,variables:{questionId:f.clientChat.questionId},updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=Object.assign({},e,Object(o.a)({},e,{question:Object(o.a)({},e.question,{messages:[n.data.newMessage]})}));return e.question.messages&&(a.question.messages=[].concat(Object(D.a)(e.question.messages),[n.data.newMessage])),a}}),u({document:F,variables:{questionId:f.clientChat.questionId},updateQuery:function(e,t){var n=t.subscriptionData;return n.data?Object.assign({},e,Object(o.a)({},e,{question:Object(o.a)({},e.question,n.data.questionAssigned)})):e}}),u({document:M,variables:{questionId:f.clientChat.questionId},updateQuery:function(e,t){return t.subscriptionData.data?(v({type:"RESET_CHAT",payload:null}),Object.assign({},e,Object(o.a)({},e,{question:null}))):e}}),u({document:G,variables:{questionId:f.clientChat.questionId},updateQuery:function(e,t){var n=t.subscriptionData;return n.data?Object.assign({},e,Object(o.a)({},e,{question:Object(o.a)({},e.question,n.data.questionReopened)})):e}})},[]),Object(a.useEffect)(function(){var e=setInterval(function(){d({variables:{questionId:f.clientChat.questionId}})},1e4);return function(){return clearInterval(e)}}),Object(a.useEffect)(function(){z(document.querySelector(".client-messages"))});return r.a.createElement("div",{className:t?"client-messages client-messages--disabled":"client-messages"},function(){if(t)return r.a.createElement("div",{className:"loading"},r.a.createElement("div",null),r.a.createElement("div",null))}(),r.a.createElement(L,{text:n,createdAt:s,sentFrom:"user"}),c.map(function(e,t){return r.a.createElement("div",{key:"client-message-".concat(t,"-").concat(e.id)},r.a.createElement(L,{text:e.text,createdAt:e.createdAt,sentFrom:e.sentFrom}))}))},W=n(31),Z=function(e){var t=e.createMessage,n=e.disabled,s=Object(a.useContext)(l),c=Object(i.a)(s,1)[0],u=Object(a.useState)(""),o=Object(i.a)(u,2),d=o[0],m=o[1],b=Object(a.useRef)();return r.a.createElement("div",{className:"client-form"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""!==d&&(t({variables:{questionId:c.clientChat.questionId,text:d,sentFrom:"user"}}),m(""))},ref:b},r.a.createElement(W.a,{minRows:2,maxRows:5,value:d,placeholder:"Indtast din besked...",onChange:function(e){return m(e.target.value)},onKeyDown:function(e){(13===e.keyCode&&e.metaKey||13===e.keyCode&&e.ctrlKey)&&b.current.dispatchEvent(new Event("submit"))},disabled:n})))},ee=function(){var e=Object(a.useContext)(l),t=Object(i.a)(e,2),n=t[0],s=t[1];return r.a.createElement(b.c,{query:I,variables:{questionId:n.clientChat.questionId}},function(e){var t=e.data,n=e.loading,a=e.subscribeToMore;if(!t||n)return"";var c=t.question.status,u="pending"===c||"complete"===c;return"complete"===t.question.status&&s({type:"RESET_CHAT",payload:null}),r.a.createElement("div",{className:"client-chat"},r.a.createElement(x,{status:t.question.status}),r.a.createElement(b.b,{mutation:T},function(e){return r.a.createElement(U,{disabled:u,subject:t.question.subject,questionCreatedAt:t.question.createdAt,messages:t.question.messages,subscribeToMore:a,makeHeartbeat:e})}),r.a.createElement(b.b,{mutation:h},function(e){return r.a.createElement(Z,{disabled:u,createMessage:e})}))})},te=function(){var e=Object(a.useContext)(l);return Object(i.a)(e,1)[0].clientChat?r.a.createElement(ee,null):r.a.createElement(q,null)},ne=n(21),ae=n(50),re=n(15),se=n(52),ce=n(51),ue=n(16),ie=new se.a({uri:"https://new.biblioteksvagten.dk/graphql"}),oe=new ce.a({uri:"wss://new.biblioteksvagten.dk/graphql",options:{reconnect:!0}}),le=Object(re.d)(function(e){var t=e.query,n=Object(ue.a)(t);return"OperationDefinition"===n.kind&&"subscription"===n.operation},oe,ie),de=new ae.a,me=new ne.c({link:le,cache:de}),be=function(e){var t=e.children;return r.a.createElement(b.a,{client:me},t)},fe=function(e){var t=e.children;return r.a.createElement(w,null,r.a.createElement(m,null,t))};function ve(){var e=Object(f.a)(["\n  query {\n    settings {\n      messages\n      standardAnswers\n    }\n  }\n"]);return ve=function(){return e},e}var Ee=E()(ve()),ge=function(e){var t=e.children,n=e.data,r=e.loading,s=Object(a.useContext)(N),c=Object(i.a)(s,2)[1];return Object(a.useEffect)(function(){n&&!r&&c({type:"SET_SETTINGS",payload:n.settings})},[]),t},pe=function(e){var t=e.children;return r.a.createElement(b.c,{query:Ee},function(e){var n=e.data,a=e.loading;return!n||a?t:r.a.createElement(ge,{data:n,loading:a},t)})},_e=function(){return r.a.createElement(be,null,r.a.createElement(fe,null,r.a.createElement(pe,null,r.a.createElement(te,null))))};n(92),n(93);function qe(){var e=Object(f.a)(["\n  query QuestionsQuery($statusType: String!, $consultantId: ID) {\n    questions(statusType: $statusType, consultantId: $consultantId) {\n      id\n      subject\n      authorName\n      authorEmail\n      consultant\n      status\n      source\n      lastHeartbeatAt\n      createdAt\n    }\n  }\n"]);return qe=function(){return e},e}var je=E()(qe());function Ie(){var e=Object(f.a)(["\n  subscription NewQuestionSubscription($statusType: String!) {\n    newQuestion(statusType: $statusType) {\n      id\n      status\n      subject\n      authorName\n      authorEmail\n      source\n      consultant\n      createdAt\n      lastHeartbeatAt\n    }\n  }\n"]);return Ie=function(){return e},e}var Oe=E()(Ie());function he(){var e=Object(f.a)(["\n  subscription QuestionAssignedToConsultantSubscription($consultantId: ID) {\n    questionAssignedToConsultant(consultantId: $consultantId) {\n      id\n      status\n      subject\n      authorName\n      authorEmail\n      consultant\n      source\n      createdAt\n      lastHeartbeatAt\n    }\n  }\n"]);return he=function(){return e},e}var ye=E()(he()),ke=n(27),Se=n.n(ke);function Ce(){var e=Object(f.a)(["\n  mutation AssignQuestionMutation($questionId: ID!, $consultantId: ID!) {\n    assignQuestion(questionId: $questionId, consultantId: $consultantId) {\n      id\n      subject\n      authorName\n      createdAt\n    }\n  }\n"]);return Ce=function(){return e},e}var Te=E()(Ce()),Ne=n(49),Ae=n.n(Ne),we=function(e){var t=B(e);return Ae()(new Date,t)>15},xe=function(e){var t=e.canAssign,n=e.canSetActive,s=e.questionId,c=e.heading,u=e.text,o=e.source,l=e.createdAt,d=e.lastHeartbeat,m=e.subscribeToMore,f=B(l),v=window.Drupal&&window.Drupal.settings&&window.Drupal.settings.consultantId?window.Drupal.settings.consultantId.toString():"1",E=Object(a.useState)(!1),g=Object(i.a)(E,2),p=g[0],_=g[1],q=Object(a.useState)(Y(f)),j=Object(i.a)(q,2),I=j[0],O=j[1],h=Object(a.useState)(we(d)),k=Object(i.a)(h,2),S=k[0],C=k[1],T=Object(a.useContext)(y),N=Object(i.a)(T,2),A=N[0],w=N[1];Object(a.useEffect)(function(){var e=setInterval(function(){O(Y(f))},3e4);return function(){return clearInterval(e)}}),Object(a.useEffect)(function(){var e=setInterval(function(){C(we(d))},1e4);return function(){return clearInterval(e)}}),Object(a.useEffect)(function(){m({document:$,variables:{questionId:s},updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.newMessage;return"admin"===a.sentFrom?(_(!1),e):A.backendChat&&A.backendChat.questionId&&A.backendChat.questionId===a.question.id?(_(!1),e):(_(!0),e)}})},[A]);return c=S?Se()(c,20)+" (offline)":Se()(c,32),r.a.createElement(b.b,{mutation:Te},function(e){return r.a.createElement("div",{className:"question question--teaser",onClick:function(){var a;t&&(a=e,window.confirm("Vil du overtage dette sp\xf8rgsm\xe5l?")&&a({variables:{questionId:s,consultantId:v}})),n&&(w({type:"SET_ACTIVE_CHAT",payload:s}),_(!1))}},r.a.createElement("div",{className:"question__heading"},r.a.createElement("div",{className:"question__heading__title"},c)),r.a.createElement("div",{className:"question__body"},Se()(u,35)),r.a.createElement("div",{className:"question__source"},Se()(o,35)),r.a.createElement("small",{className:"question__created-at"},I),p&&r.a.createElement("small",{className:"question__unread-messages"},"Der er ul\xe6ste beskeder"))})},De=function(e){var t=e.canAssign,n=e.canSetActive,s=e.title,c=e.questions,u=e.subscriptions,i=e.subscribeToMore,o=window.Drupal&&window.Drupal.settings&&window.Drupal.settings.consultantId?window.Drupal.settings.consultantId.toString():"1";Object(a.useEffect)(function(){for(var e=0;e<u.length;e++)u[e]()},[]);return r.a.createElement("div",{className:"backend-list"},r.a.createElement("div",{className:"backend-list__heading"},r.a.createElement("h4",{className:"backend-list__heading__title"},s)),r.a.createElement("div",{className:"backend-list__body"},c&&0!==c.length?c.map(function(e){return r.a.createElement("div",{className:o!==e.consultant?"backend-list__item backend-list__item--faded":"backend-list__item",key:"question-".concat(e.id)},r.a.createElement(xe,{questionId:e.id,heading:e.authorName,text:e.subject,createdAt:e.createdAt,canAssign:t,canSetActive:n,lastHeartbeat:e.lastHeartbeatAt,readOnly:o!==e.consultant,subscribeToMore:i}))}):r.a.createElement("div",{className:"backend-list__item backend-list__item--no-result"},"Ingen samtaler at vise.")))};function Qe(){var e=Object(f.a)(["\n  subscription QuestionHeartbeatSubscription($questionId: ID) {\n    questionHeartbeat(questionId: $questionId) {\n      id\n      lastHeartbeatAt\n    }\n  }\n"]);return Qe=function(){return e},e}var $e=E()(Qe()),He=function(){var e=[];return r.a.createElement(b.c,{query:je,variables:{consultantId:null,statusType:"pending"}},function(t){var n=t.loading,a=t.data,s=t.subscribeToMore;return a?n?"Henter...":(e.push(function(){return s({document:Oe,variables:{consultantId:null,statusType:"pending"},updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.newQuestion;setTimeout(function(){return Object.assign({},e,{questions:[].concat(Object(D.a)(e.questions),[a])})},700)}})}),e.push(function(){return s({document:ye,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.questionAssignedToConsultant,r=e.questions.filter(function(e){return e.id!==a.id});return Object.assign({},e,{questions:r})}})}),e.push(function(){return s({document:G,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.questionReopened,r=e.questions.filter(function(e){return e.id!==a.id});return r.push(a),Object.assign({},e,{questions:r})}})}),e.push(function(){return s({document:$e,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.questionHeartbeat,r=e.questions.find(function(e){return e.id===a.id});if(!r)return e;var s=Object(o.a)({},r),c=e.questions.filter(function(e){return e.id!==a.id});return c.push(s),Object.assign({},e,{questions:c})}})}),r.a.createElement(De,{title:"Chats, Afventer svar",questions:a.questions,subscriptions:e,subscribeToMore:s,canAssign:!0,canSetActive:!0})):""})};function Me(){var e=Object(f.a)(["\n  subscription AssignedQuestionClosedSubscription($consultantId: ID) {\n    assignedQuestionClosed(consultantId: $consultantId) {\n      id\n      status\n      subject\n      authorName\n      authorEmail\n      consultant\n      source\n      createdAt\n      lastHeartbeatAt\n    }\n  }\n"]);return Me=function(){return e},e}var Re=E()(Me()),Fe=function(){var e=[];return r.a.createElement(b.c,{query:je,variables:{statusType:"assigned",consultantId:null}},function(t){var n=t.loading,a=t.data,s=t.subscribeToMore;return a?n?"Henter...":(e.push(function(){return s({document:ye,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.questionAssignedToConsultant;return Object.assign({},e,{questions:[].concat(Object(D.a)(e.questions),[a])})}})}),e.push(function(){return s({document:Re,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.assignedQuestionClosed,r=e.questions.filter(function(e){return e.id!==a.id});return Object.assign({},e,{questions:r})}})}),e.push(function(){return s({document:G,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.questionReopened,r=e.questions.filter(function(e){return e.id!==a.id});return Object.assign({},e,{questions:r})}})}),e.push(function(){return s({document:$e,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.questionHeartbeat,r=e.questions.find(function(e){return e.id===a.id});if(!r)return e;var s=Object(o.a)({},r),c=e.questions.filter(function(e){return e.id!==a.id});return c.push(s),Object.assign({},e,{questions:c})}})}),r.a.createElement(De,{title:"Chats, Ved at blive besvaret",questions:a.questions,subscriptions:e,subscribeToMore:s,canAssign:!1,canSetActive:!0})):""})},Ve=function(){return r.a.createElement("div",{className:"backend-sidebar"},r.a.createElement(He,null),r.a.createElement(Fe,null))},Ge=(n(99),function(e){var t=e.lastHeartbeat,n=Object(a.useState)(we(t)),s=Object(i.a)(n,2),c=s[0],u=s[1];return Object(a.useEffect)(function(){var e=setInterval(function(){u(we(t))},1e4);return function(){return clearInterval(e)}}),c?r.a.createElement("div",{className:"backend-notice backend-notice--offline"},"Brugeren er offline..."):r.a.createElement(r.a.Fragment,null)}),Be=function(){return r.a.createElement("div",{className:"backend-notice backend-notice--readonly"},"Du observerer en chat der er tildelt en anden bruger.")},Je=function(e){var t=e.name,n=e.email,s=e.source,c=Object(a.useContext)(y),u=Object(i.a)(c,2)[1];return r.a.createElement("div",{className:"backend-bar"},r.a.createElement("div",{className:"backend-bar__heading"},r.a.createElement("h2",null,t),r.a.createElement("h3",null,r.a.createElement("a",{href:"mailto:".concat(n)},n)),r.a.createElement("h4",null,s)),r.a.createElement("div",{className:"backend-bar__spacer"}),r.a.createElement("span",{className:"backend-bar__button bar__button--close",onClick:function(){u({type:"RESET_CHAT",payload:null})},title:"Klik for at lukke"},"X"))},Ke=function(e){var t=e.sentFrom,n=e.text,s=e.createdAt,c=B(s),u=Object(a.useState)(Y(c)),o=Object(i.a)(u,2),l=o[0],d=o[1];return Object(a.useEffect)(function(){var e=setInterval(function(){d(Y(c))},3e4);return function(){return clearInterval(e)}}),r.a.createElement("div",{className:"backend-message backend-message--".concat(t)},r.a.createElement("div",{className:"backend-message__box"},r.a.createElement("div",{className:"backend-message__text"},n)),"system"===t?"":r.a.createElement("div",{className:"backend-message__created-at"},l))},Pe=function(e){var t=e.subject,n=e.questionCreatedAt,s=e.messages,c=e.subscribeToMore,u=Object(a.useContext)(y),l=Object(i.a)(u,1)[0];Object(a.useEffect)(function(){c({document:$,variables:{questionId:l.backendChat.questionId},updateQuery:function(e,t){var n=t.subscriptionData;return n.data?Object.assign({},e,Object(o.a)({},e,{question:Object(o.a)({},e.question,{messages:[].concat(Object(D.a)(e.question.messages),[n.data.newMessage])})})):e}})},[]),Object(a.useEffect)(function(){z(document.querySelector(".backend-chat__messages"))});return r.a.createElement("div",{className:"backend-chat__messages"},r.a.createElement(Ke,{text:t,createdAt:n,sentFrom:"user"}),s.map(function(e,t){return r.a.createElement("div",{key:"backend-message-".concat(t,"-").concat(e.id)},r.a.createElement(Ke,{text:e.text,createdAt:e.createdAt,sentFrom:e.sentFrom}))}))};function Xe(){var e=Object(f.a)(["\n  mutation CloseQuestionMutation(\n    $questionId: ID!\n    $reason: String!\n    $keepConsultant: Boolean\n    $title: String\n  ) {\n    closeQuestion(\n      questionId: $questionId\n      reason: $reason\n      keepConsultant: $keepConsultant\n      title: $title\n    ) {\n      id\n      subject\n      authorName\n      createdAt\n      messages {\n        id\n        text\n        sentFrom\n        createdAt\n      }\n    }\n  }\n"]);return Xe=function(){return e},e}var Ye=E()(Xe());function Le(){var e=Object(f.a)(["\n  mutation ReopenQuestionMutation($questionId: ID!) {\n    reopenQuestion(questionId: $questionId) {\n      id\n    }\n  }\n"]);return Le=function(){return e},e}var ze=E()(Le()),Ue=function(e){var t=e.children,n=e.title,a=e.toggle,s=e.visible;return r.a.createElement("div",{className:"overlay ".concat(s?"overlay--visible":"")},r.a.createElement("div",{className:"modal"},r.a.createElement("div",{className:"modal__heading"},r.a.createElement("h1",{className:"modal__heading__title"},n)),r.a.createElement("div",{className:"modal__body"},t),r.a.createElement("div",{className:"modal__footer"},r.a.createElement("button",{className:"modal__footer__button",onClick:function(){return a(!s)}},"Luk vindue"))))},We=function(e){var t=e.closeQuestion,n=e.confirmText,s=e.text,c=e.reason,u=e.data,o=e.loading,l=Object(a.useContext)(y),d=Object(i.a)(l,2),m=d[0],b=d[1];!o&&u&&u.closeQuestion.id&&b({type:"RESET_CHAT",payload:null});var f=function(e){e.preventDefault(),window.confirm(n)&&t({variables:{reason:c,questionId:m.backendChat.questionId}})};return o?r.a.createElement("button",{className:"backend-chat__button backend-chat__button--close-question",onClick:f,disabled:!0},"Vent venligst..."):r.a.createElement("button",{className:"backend-chat__button backend-chat__button--close-question",onClick:f},s)},Ze=function(e){var t=e.reopenQuestion,n=Object(a.useContext)(y),s=Object(i.a)(n,2),c=s[0],u=s[1];return r.a.createElement("button",{className:"backend-chat__button backend-chat__button--reopen-question",onClick:function(e){e.preventDefault(),window.confirm("Vil du gen\xe5bne dette sp\xf8rgsm\xe5l?")&&(t({variables:{questionId:c.backendChat.questionId}}),u({type:"RESET_CHAT",payload:null}))}},"Forlad chat")},et=function(e){var t=e.closeQuestion,n=e.data,s=e.loading,c=Object(a.useContext)(y),u=Object(i.a)(c,2),o=u[0],l=u[1],d=Object(a.useState)(!1),m=Object(i.a)(d,2),b=m[0],f=m[1],v=Object(a.useRef)(""),E=Object(a.useRef)("");!s&&n&&n.closeQuestion.id&&l({type:"RESET_CHAT",payload:null});return s?r.a.createElement("button",{className:"backend-chat__button backend-chat__button--answer-later",disabled:!0},"Vent venligst..."):r.a.createElement("div",null,r.a.createElement("button",{className:"backend-chat__button backend-chat__button--answer-later",onClick:function(e){e.preventDefault(),window.confirm("Vil du besvare dette sp\xf8rgsm\xe5l senere?")&&f(!0)}},"Besvar senere"),b&&r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t({variables:{questionId:o.backendChat.questionId,reason:"later",title:v.current.value,keepConsultant:E.current.checked}}),f(!1)}},r.a.createElement("div",null,r.a.createElement("strong",null,"Der er behov for ekstra informationer."),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"title"},"Titel"),r.a.createElement("input",{type:"text",id:"title",ref:v})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"keepConsultant"},r.a.createElement("input",{type:"checkbox",id:"keepConsultant",ref:E}),"Jeg besvarer selv sp\xf8rgsm\xe5let"))),r.a.createElement("button",{type:"submit"},"Send")))},tt=r.a.createContext(),nt=function(e,t){switch(t.type){case"RESET_SETTINGS":return localStorage.removeItem("backendSettings"),{};case"SET_SETTINGS":return localStorage.setItem("backendSettings",JSON.stringify(t.payload)),Object(o.a)({},t.payload,{messages:JSON.parse(t.payload.messages),standardAnswers:JSON.parse(t.payload.standardAnswers)});default:return e}},at=function(e){var t=e.children,n=Object(a.useReducer)(nt,{messages:null,standardAnswers:null}),s=Object(i.a)(n,2),c=s[0],u=s[1];return Object(a.useEffect)(function(){var e=localStorage.getItem("backendSettings");e&&u({type:"SET_SETTINGS",payload:JSON.parse(e)})},[]),r.a.createElement(tt.Provider,{value:[c,u]},t)},rt=function(e){var t=e.modalToggle,n=e.modalVisible,s=Object(a.useContext)(tt),c=Object(i.a)(s,1)[0],u=Object(a.useContext)(y),o=Object(i.a)(u,2)[1],l=c.standardAnswers,d=Object.keys(l).map(function(e,a){var s=e,c=l[e],u=Object.keys(c).map(function(e,a){var s=e,u=c[e];return r.a.createElement("div",{className:"standard-answer",key:"answer-item-".concat(e,"-").concat(a),onClick:function(){return function(e){o({type:"SET_CHAT_MESSAGE_TEXT",payload:e}),t(!n)}(u)}},r.a.createElement("div",{className:"standard-answer__heading"},r.a.createElement("h4",{className:"standard-answer__heading__title"},s)),r.a.createElement("div",{className:"standard-answer__text"},u))});return r.a.createElement("div",{className:"standard-answer-list__item",key:"answer-".concat(e,"-").concat(a)},r.a.createElement("div",{className:"standard-answer-list__item__heading"},r.a.createElement("h3",{className:"standard-answer-list__item__heading__title"},s)),r.a.createElement("div",{className:"standard-answer-list__item__content"},u))});return r.a.createElement("div",{className:"standard-answer-list"},d)},st=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],c=Object(a.useState)(!1),u=Object(i.a)(c,2),o=u[0],l=u[1],d=function(e){l(!1),s(e)},m=function(e){s(!1),l(e)};return r.a.createElement("div",{className:"backend-chat__actions"},r.a.createElement("div",{className:"button-list"},r.a.createElement("div",{className:"button-list__item"},r.a.createElement(Ue,{toggle:d,visible:n,title:"Standard svar"},r.a.createElement(rt,{modalToggle:d,modalVisible:n})),r.a.createElement("button",{className:"backend-chat__button",onClick:function(){return d(!n)}},"Standard svar")),r.a.createElement("div",{className:"button-list__item"},r.a.createElement("button",{className:"backend-chat__button",onClick:function(){return m(!o)}},"Afslut samtale"),r.a.createElement(Ue,{toggle:m,visible:o,title:"Afslut samtalen"},r.a.createElement("div",{className:"button-list"},r.a.createElement("div",{className:"button-list__item"},r.a.createElement(b.b,{mutation:ze},function(e){return r.a.createElement(Ze,{reopenQuestion:e})})),r.a.createElement("div",{className:"button-list__item"},r.a.createElement(b.b,{mutation:Ye},function(e,t){var n=t.loading,a=t.data;return r.a.createElement(We,{text:"Luk grundet spam",confirmText:"Vil du lukke dette sp\xf8rgsm\xe5l og markere sp\xf8rgsm\xe5let som spam?",reason:"spam",closeQuestion:e,loading:n,data:a})})),r.a.createElement("div",{className:"button-list__item"},r.a.createElement(b.b,{mutation:Ye},function(e,t){var n=t.loading,a=t.data;return r.a.createElement(We,{text:"Luk som besvaret",confirmText:"Vil du lukke dette sp\xf8rgsm\xe5l og markere sp\xf8rgsm\xe5let som besvaret?",reason:"answered",closeQuestion:e,loading:n,data:a})})),r.a.createElement("div",{className:"button-list__item"},r.a.createElement(b.b,{mutation:Ye},function(e,t){var n=t.loading,a=t.data;return r.a.createElement(et,{closeQuestion:e,loading:n,data:a})})))))))},ct=function(e){var t=e.createMessage,n=Object(a.useContext)(y),s=Object(i.a)(n,2),c=s[0],u=s[1],o=Object(a.useRef)();return r.a.createElement("div",{className:"backend-form"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""!==c.backendChat.message&&(t({variables:{questionId:c.backendChat.questionId,text:c.backendChat.message,sentFrom:"admin"}}),u({type:"SET_CHAT_MESSAGE_TEXT",payload:""}))},ref:o},r.a.createElement(W.a,{minRows:2,maxRows:5,value:c.backendChat.message,placeholder:"Indtast din besked...",onChange:function(e){u({type:"SET_CHAT_MESSAGE_TEXT",payload:e.target.value})},onKeyDown:function(e){(13===e.keyCode&&e.metaKey||13===e.keyCode&&e.ctrlKey)&&o.current.dispatchEvent(new Event("submit"))}})))},ut=function(){var e=window.Drupal&&window.Drupal.settings&&window.Drupal.settings.consultantId?window.Drupal.settings.consultantId.toString():"1",t=Object(a.useContext)(y),n=Object(i.a)(t,2),s=n[0],c=n[1];return r.a.createElement(b.c,{query:I,fetchPolicy:"network-only",variables:{questionId:s.backendChat.questionId}},function(t){var n=t.data,a=t.loading,s=t.subscribeToMore;return n&&n.question&&!a?("complete"===n.question.status&&c({type:"RESET_CHAT",payload:null}),r.a.createElement("div",{className:"backend-chat"},r.a.createElement(Je,{name:n.question.authorName,email:n.question.authorEmail,source:n.question.source}),r.a.createElement(Ge,{lastHeartbeat:n.question.lastHeartbeatAt}),n.question.consultant!==e&&r.a.createElement(Be,null),r.a.createElement(Pe,{subject:n.question.subject,questionCreatedAt:n.question.createdAt,messages:n.question.messages,subscribeToMore:s}),n.question.consultant===e&&r.a.createElement(st,null),n.question.consultant===e&&r.a.createElement(b.b,{mutation:h},function(e){return r.a.createElement(ct,{createMessage:e})}))):""})},it=function(){var e=Object(a.useContext)(y),t=Object(i.a)(e,1)[0].backendChat?r.a.createElement(ut,null):"";return r.a.createElement(a.Fragment,null,r.a.createElement(Ve,null),t)},ot=function(e){var t=e.children;return r.a.createElement(at,null,r.a.createElement(S,null,t))},lt=function(e){var t=e.children,n=e.data,r=e.loading,s=Object(a.useContext)(tt),c=Object(i.a)(s,2)[1];return Object(a.useEffect)(function(){n&&!r&&c({type:"SET_SETTINGS",payload:n.settings})},[]),t},dt=function(e){var t=e.children;return r.a.createElement(b.c,{query:Ee},function(e){var n=e.data,a=e.loading;return!n||a?t:r.a.createElement(lt,{data:n,loading:a},t)})},mt=function(){return r.a.createElement(be,null,r.a.createElement(ot,null,r.a.createElement(dt,null,r.a.createElement(it,null))))};""!==u("renderOnly")?("backend"===u("renderOnly")&&document.getElementById("chatty_backend")&&c.a.render(r.a.createElement(mt,null),document.getElementById("chatty_backend")),"client"===u("renderOnly")&&document.getElementById("chatty_client")&&c.a.render(r.a.createElement(_e,null),document.getElementById("chatty_client"))):(document.getElementById("chatty_client")&&c.a.render(r.a.createElement(_e,null),document.getElementById("chatty_client")),document.getElementById("chatty_backend")&&c.a.render(r.a.createElement(mt,null),document.getElementById("chatty_backend")))},54:function(e,t,n){e.exports=n(100)},55:function(e,t,n){},60:function(e,t,n){},69:function(e,t,n){},92:function(e,t,n){},99:function(e,t,n){}},[[54,1,2]]]);
//# sourceMappingURL=main.25f93ce7.chunk.js.map