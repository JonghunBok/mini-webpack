(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{371:function(t,a,s){"use strict";s.r(a);var e=s(45),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"tapable"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tapable"}},[t._v("#")]),t._v(" Tapable")]),t._v(" "),s("blockquote",[s("p",[t._v("v2.2.0 건사(鍵寫)")])]),t._v(" "),s("p",[t._v("웹팩의 내부 기작을 이해하려면 Tapable을 이해해야 한다.")]),t._v(" "),s("p",[t._v('node에 util이라는 공식 라이브러리가 있다는 걸 배웠다.\n문자열을 처리하는 기초 함수들도 제공하고,\n로깅 관련 함수들, 비동기처리리를 도와주는 함수들 등 다양한 "utility" 함수들이 있다.')]),t._v(" "),s("p",[t._v("tapable에서 사용되는 함수는 "),s("code",[t._v("deprecate")]),t._v("였다.\n다음처럼 사용하며, "),s("code",[t._v("DeprecationWarning")]),t._v("을 내는 함수를 만들어준다고 한다.")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" util "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'util'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nexports"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("obsoleteFunction "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" util"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("deprecate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do something here.")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'obsoleteFunction() is deprecated. Use newShinyFunction() instead.'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"hook-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hook-js"}},[t._v("#")]),t._v(" Hook.js")]),t._v(" "),s("h3",{attrs:{id:"method-copy-inside-constructor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#method-copy-inside-constructor"}},[t._v("#")]),t._v(" method copy inside constructor...")]),t._v(" "),s("p",[s("code",[t._v("lib/Hook.js")]),t._v("를 따라 치던 중, 의도가 이해되지 않는 부분이 있었다.\n바로 생성자에 있던 "),s("code",[t._v("this.compile = this.compile")]),t._v("...")]),t._v(" "),s("p",[t._v("이 부분이 없어도, 분명 잘 돌아갈 것이다.\n인스턴스는 본인에게 없는 함수를 호출할 때,\n본인의 프로토타입 체인을 거슬러 올라가 기어코 이 compile 메소드를\n찾아내어 호출할 게 분명하다.")]),t._v(" "),s("p",[t._v("하지만, 직접 간단한 클래스를 작성해서 비교해보니\n이렇게 생성자 안에 동명의 메소드를 넣어주니, 다음이 좋았다:")]),t._v(" "),s("ul",[s("li",[t._v("생성자만 보더라도, 클래스의 구성이 한 눈에 들어온다.")]),t._v(" "),s("li",[t._v("인스턴스에서 해당 메소드를 호출할 때, 프로토타입 체인 참조가 적어져 더 빠르다.")]),t._v(" "),s("li",[t._v("인스턴스를 콘솔에서 조사할 때, 가지고 있는 메소드가 자동완성된다.")])]),t._v(" "),s("p",[t._v("재밌는건 2013년 1월 21일에 있었던 "),s("a",{attrs:{href:"https://github.com/webpack/tapable/commit/0324ba6caa7787f9cb8b95120577a3c8aa72b6fc",target:"_blank",rel:"noopener noreferrer"}},[t._v("Tapable의 첫번째 커밋"),s("OutboundLink")],1),t._v("을 보면,\nTapable 함수의 prototype 프로퍼티에 수많은 메소드를 정의한 것을 볼 수 있다.")]),t._v(" "),s("p",[t._v("우와...")]),t._v(" "),s("h3",{attrs:{id:"throwing-error-in-abstract-method"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#throwing-error-in-abstract-method"}},[t._v("#")]),t._v(" throwing error in abstract method")]),t._v(" "),s("p",[s("code",[t._v("compile")]),t._v(" 메소드는 반드시 오버라이드해서 사용되어야 하는 메소드이다.\n이 메소드는 오버라이드 해야 한다는 코멘트를 다는 것으로 만족하지 않고,\n호출되면 에러를 내뱉게 해놓았다.")]),t._v(" "),s("h3",{attrs:{id:"구성"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#구성"}},[t._v("#")]),t._v(" 구성")]),t._v(" "),s("ul",[s("li",[t._v("Hook은 다음의 속성/메소드를 가진다")])]),t._v(" "),s("h4",{attrs:{id:"속성"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#속성"}},[t._v("#")]),t._v(" 속성")]),t._v(" "),s("ul",[s("li",[t._v("name")]),t._v(" "),s("li",[t._v("taps")]),t._v(" "),s("li",[t._v("interceptors")])]),t._v(" "),s("h4",{attrs:{id:"메소드"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#메소드"}},[t._v("#")]),t._v(" 메소드")]),t._v(" "),s("ul",[s("li",[t._v("각종 call")]),t._v(" "),s("li",[t._v("각종 tap")]),t._v(" "),s("li",[t._v("compile")])]),t._v(" "),s("p",[s("code",[t._v("Object.setPrototypeOf(Hook.prototype, null);")]),t._v("를 통해 delegation chain을 끊어,\nHook 이 최상위 클래스가 되게 한 점이 인상깊다.")]),t._v(" "),s("h2",{attrs:{id:"hookcodefactory-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hookcodefactory-js"}},[t._v("#")]),t._v(" HookCodeFactory.js")]),t._v(" "),s("p",[t._v("우와.. 진짜 팩토리다...\n동적으로 코드를 만든다.\n스크립트 언어라서 가능한 구조라고 생각이 든다.")]),t._v(" "),s("p",[t._v("그런데 이게 최선일까?\n성능상의 문제는 없을까?")]),t._v(" "),s("p",[t._v("**왜 스트링으로 코드를 만들어야만 했을까?**를 이해하는 걸\n이 파일의 필사의 목적으로 하면 되겠다...")]),t._v(" "),s("h3",{attrs:{id:"abstract-content-method"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#abstract-content-method"}},[t._v("#")]),t._v(" Abstract "),s("code",[t._v("content")]),t._v(" method...")]),t._v(" "),s("p",[t._v("코드 중간에 파일 내에서 정의를 찾아볼 수 없는 "),s("code",[t._v("content")]),t._v(" 메소드를 사용하는 부분이 나온다.\nHook 에서는 분명히 이런 추상 메소드가 에러를 내뱉게 했었는데, 어떻게 된 일이지?")]),t._v(" "),s("p",[t._v("생각해보니, Hook도, HookCodeFactory도 퍼블릭 클래스들을 위한 기반 클래스인데\n왜 이런 차이가 있을까..?\n혹시 모르니 간단한 수정을 해서 pr을 올려봐야겠다.")]),t._v(" "),s("hr"),t._v(" "),s("h2",{attrs:{id:"ideas"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ideas"}},[t._v("#")]),t._v(" Ideas...")]),t._v(" "),s("ul",[s("li",[t._v("Plugin vs DI..?")]),t._v(" "),s("li",[t._v("Plugin은 Interceptor라고 불리기도 한다... (https://devdocs.magento.com/guides/v2.4/extension-dev-guide/plugins.html)")])])])}),[],!1,null,null,null);a.default=n.exports}}]);