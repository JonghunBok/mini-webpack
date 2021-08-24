# Tapable
> v2.2.0 건사(鍵寫)

웹팩의 내부 기작을 이해하려면 Tapable을 이해해야 한다.



node에 util이라는 공식 라이브러리가 있다는 걸 배웠다.
문자열을 처리하는 기초 함수들도 제공하고,
로깅 관련 함수들, 비동기처리리를 도와주는 함수들 등 다양한 "utility" 함수들이 있다.

tapable에서 사용되는 함수는 `deprecate`였다.
다음처럼 사용하며, `DeprecationWarning`을 내는 함수를 만들어준다고 한다.

```js
const util = require('util');

exports.obsoleteFunction = util.deprecate(() => {
  // Do something here.
}, 'obsoleteFunction() is deprecated. Use newShinyFunction() instead.');
```


## Hook.js
### method copy inside constructor...

`lib/Hook.js`를 따라 치던 중, 의도가 이해되지 않는 부분이 있었다.
바로 생성자에 있던 `this.compile = this.compile`...

이 부분이 없어도, 분명 잘 돌아갈 것이다.
인스턴스는 본인에게 없는 함수를 호출할 때,
본인의 프로토타입 체인을 거슬러 올라가 기어코 이 compile 메소드를
찾아내어 호출할 게 분명하다.

하지만, 직접 간단한 클래스를 작성해서 비교해보니
이렇게 생성자 안에 동명의 메소드를 넣어주니, 다음이 좋았다:

- 생성자만 보더라도, 클래스의 구성이 한 눈에 들어온다.
- 인스턴스에서 해당 메소드를 호출할 때, 프로토타입 체인 참조가 적어져 더 빠르다.
- 인스턴스를 콘솔에서 조사할 때, 가지고 있는 메소드가 자동완성된다.


재밌는건 2013년 1월 21일에 있었던 [Tapable의 첫번째 커밋](https://github.com/webpack/tapable/commit/0324ba6caa7787f9cb8b95120577a3c8aa72b6fc)을 보면,
Tapable 함수의 prototype 프로퍼티에 수많은 메소드를 정의한 것을 볼 수 있다.

우와...



### throwing error in abstract method

`compile` 메소드는 반드시 오버라이드해서 사용되어야 하는 메소드이다.
이 메소드는 오버라이드 해야 한다는 코멘트를 다는 것으로 만족하지 않고,
호출되면 에러를 내뱉게 해놓았다.

### 구성
- Hook은 다음의 속성/메소드를 가진다

#### 속성
  - name
  - taps
  - interceptors
#### 메소드
  - 각종 call
  - 각종 tap
  - compile

`Object.setPrototypeOf(Hook.prototype, null);`를 통해 delegation chain을 끊어,
Hook 이 최상위 클래스가 되게 한 점이 인상깊다.


## HookCodeFactory.js

우와.. 진짜 팩토리다... 
동적으로 코드를 만든다.
스크립트 언어라서 가능한 구조라고 생각이 든다.

그런데 이게 최선일까?
성능상의 문제는 없을까?

**왜 스트링으로 코드를 만들어야만 했을까?**를 이해하는 걸
이 파일의 필사의 목적으로 하면 되겠다...

### Abstract `content` method...

코드 중간에 파일 내에서 정의를 찾아볼 수 없는 `content` 메소드를 사용하는 부분이 나온다.
Hook 에서는 분명히 이런 추상 메소드가 에러를 내뱉게 했었는데, 어떻게 된 일이지?

생각해보니, Hook도, HookCodeFactory도 퍼블릭 클래스들을 위한 기반 클래스인데
왜 이런 차이가 있을까..?
혹시 모르니 간단한 수정을 해서 pr을 올려봐야겠다.


---
## Ideas...

- Plugin vs DI..?
- Plugin은 Interceptor라고 불리기도 한다... (https://devdocs.magento.com/guides/v2.4/extension-dev-guide/plugins.html)





