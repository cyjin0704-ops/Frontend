# Frontend
## P097 조용진

## 26.08.24 (1일차)

### 1. Vue single file component
Vue component는 일반적으로 하나의 .vue 파일 안에 작성하는데, <'script setup'>을 사용하면 작성한 변수와 가져온 컴포넌트를 <'template'>에서 바로 사용할 수 있다.

### 2. 컴포넌트 사용
작성한 자식 컴포넌트를 App.vue에서 import한 뒤 태그 형태로 사용했는데, 이를 통해 화면을 기능별 컴포넌트로 나누어 관리할 수 있다는 것을 배웠다.

### 3. 일반 변수와 반응형 변수
일반 변수의 값은 JS 내부에서 변경되지만, 값이 변경됐다는 사실을 vue가 추적하지 않으므로 화면이 즉시 갱신되지 않는다. 
반면 ref()로 만든 변수는 vue가 값의 변화를 추적한다. 따라서 변경되면 관련된 하면이 자동으로 다시 렌더링된다.

### 4. Text interpolation
중괄호 두 개를 사용하는 텍스트 보간법으로 데이터를 화면에 출력했다. 택스트 보간식 안에는 단순한 변수 뿐 아니라 JS 표현식도 사용할 수 있었다.

### 5. v-html
일반 텍스트 보간법인 `{{ }}`는 HTML 태그가 포함된 문자열을 실제 HTML로 해석하지 않고 일반 문자로 출력한다.
반면 `v-html` 디렉티브는 문자열을 HTML로 해석하여 화면에 출력한다. 내부적으로 JavaScript의 `innerHTML`과 유사하게 동작한다.

### 6. v-html과 XSS
v-html은 문자열을 실제 HTML로 해석하여 출력한다. 사용자 입력을 그대로 v-html에 넣으면 악성 스크립트가 실행되는 XSS 문제가 발생할 수 있으므로 검증된 데이터에만 사용해야 한다.

### 7. v-text
v-text는 지정한 변수의 값을 태그의 텍스트로 출력한다. HTML 태그가 포함되어 있어도 일반 문자열로 표시되며, 일반적으로는 텍스트 보간법인 {{ }}를 더 많이 사용한다.

### 8. v-bind
v-bind는 HTML 속성과 Vue 데이터를 연결하며 `:`로 줄여 쓸 수 있다. 링크, 이미지, disabled 속성을 동적으로 변경하고 객체와 배열을 이용해 class와 style도 제어할 수 있었다.

### 9. v-if / v-else-if / v-else
조건에 따라 HTML 요소를 생성하거나 제거하는 조건부 렌더링을 실습했다. 로그인 상태와 점수에 따라 서로 다른 내용을 화면에 출력했다.

### 10. v-show
v-show는 조건에 따라 CSS의 display 속성을 변경하여 요소를 보여주거나 숨긴다. 조건이 false여도 HTML 요소는 DOM에서 제거되지 않는다는 점을 배웠다.

### 11. v-for
v-for를 사용해 배열과 객체의 데이터를 반복 출력했다. 각 항목을 구분하고 효율적으로 관리하기 위해 고유한 key 값을 지정해야 한다.

### 12. v-pre
v-pre는 해당 요소와 자식 요소의 Vue 문법을 컴파일하지 않고 작성된 내용을 그대로 출력한다. 따라서 {{ message }}도 변수의 값이 아닌 일반 문자로 표시된다.

### 13. v-cloak
v-cloak은 Vue의 데이터 바인딩이 완료되기 전에 {{ }} 문법이 화면에 노출되는 현상을 방지한다. CSS의 [v-cloak] 선택자와 함께 사용해야 한다.

### 14. v-once
v-once는 요소를 최초 한 번만 렌더링한다. 이후 반응형 데이터가 변경되어도 v-once가 적용된 화면은 처음 출력된 값을 유지한다.

### 15. v-memo
v-memo는 지정한 값이 변경될 때만 해당 영역을 다시 렌더링한다. 불필요한 화면 갱신을 줄여 렌더링 성능을 최적화할 수 있다는 것을 배웠다.

## 26.08.25 (2일차)

### 16. v-on 이벤트 핸들링
`v-on-event-handler-example.vue`라는 독립 컴포넌트로 분리했다. @click을 사용해 count 값을 직접 증가시키는 인라인 처리와 별도로 선언한 함수를 호출하는 이벤트 처리 방법을 실습했다.

### 17. 이벤트 객체
`event-object-example.vue`라는 독립 컴포넌트로 작성했다. 일반 이벤트 함수에서는 이벤트 객체를 바로 전달받고, 추가 매개변수와 함께 사용할 때는 $event를 전달하여 클릭 좌표와 클릭된 태그 정보를 확인했다.

### 18. 이벤트 수식어
`event-modifier-example.vue`로 분리하고 .prevent와 .stop 기능만 확인할 수 있게 구성했다. .prevent로 링크의 기본 이동을 막고, .stop으로 자식 요소의 클릭 이벤트가 부모 요소로 전달되는 이벤트 버블링을 차단했다.

### 19. Form 데이터 바인딩
`form-elements-handling-example.vue`로 분리하여 textarea, checkbox, radio, select와 v-model을 연결했다. 단일 checkbox는 Boolean으로, 다중 checkbox는 선택된 값이 배열로 저장되는 것을 확인했다.

### 20. v-model 수식어
`v-model-modifiers-example.vue`에서 .lazy, .number, .trim 수식어를 각각 실습했다. 입력값의 반영 시점을 변경하고 숫자 타입으로 변환하거나 앞뒤 공백을 제거할 수 있으며, 여러 수식어를 함께 사용할 수도 있다는 것을 배웠다.

### 21. Vue Style
`vue-style-example.vue`로 분리하고 강의안에서 참조한 외부 스타일 파일이 없어 `challenge.css`를 직접 추가했다. scoped 스타일은 현재 컴포넌트에만 적용되고, @import를 사용하면 외부 CSS의 버튼 스타일을 불러올 수 있다는 것을 확인했다. (import 뒤에는 '-'를 쓰면 안 된다.)

### 22. Weather Mockup
날씨 데이터를 배열로 만들고 v-for로 카드를 반복 출력했다. 온도에 따라 v-if/v-else로 더움과 선선함을 구분하고, v-model로 입력값을 화면에 표시했으며, 버튼 클릭 시 함수에 도시명과 날씨 상태를 전달하는 방법을 실습했다. 기존 데이터에는 판교의 날씨 정보를 직접 추가했다.
처음에는 ref로 만든 값을 JavaScript에서는 `.value`로 사용하지만 template에서는 `.value` 없이 사용한다는 점이 헷갈릴 수 있었다. 또한 v-for의 `:key`에는 중복되지 않는 id를 사용해야 하고, v-else는 v-if 바로 다음에 작성해야 정상적으로 연결된다는 점을 배웠다.

### 23. ref()
ref를 사용해 숫자, 문자열, Boolean, 배열, 객체를 반응형 데이터로 만들고 버튼과 v-model로 값을 변경했다. 처음에는 JavaScript 영역에서는 `.value`로 접근하지만 template에서는 `.value` 없이 사용한다는 차이가 헷갈릴 수 있었다.

### 24. reactive()
reactive를 사용해 객체의 속성을 변경하고 배열에 항목을 추가하거나 삭제했다. ref와 달리 `.value`를 사용하지 않으며, reactive는 주로 객체와 배열에 사용한다는 점을 배웠다.

### 25. computed()
일반 함수와 computed의 실행 횟수를 Console에서 비교했다. 일반 함수는 화면이 다시 렌더링될 때마다 실행되지만 computed는 의존하는 count가 바뀔 때만 다시 계산하고, 관계없는 dummy가 변경되면 이전 값을 재사용한다. template에서 computed 결과는 함수처럼 `()`를 붙이지 않고 변수처럼 사용한다는 점이 헷갈릴 수 있었다.

### 26. watch()
`watch()-example.vue`에서 선택한 도시를 watch로 감시하고, 값이 변경될 때 이전 값과 새로운 값을 화면과 Console에 출력했다. 같은 도시를 다시 선택하면 값이 변하지 않았기 때문에 watch가 실행되지 않는다는 점을 배웠다.

### 27. 여러 반응형 변수 감시
`watch()-multi-source-example.vue`에서 도시와 날짜를 배열로 묶어 한 번에 감시했다. 둘 중 하나만 변경되어도 watch가 실행되며, 새 값과 이전 값도 각각 배열로 전달되므로 변수의 순서를 동일하게 맞춰야 한다.

### 28. ref 객체의 깊은 감시
`watch()-deep-example.vue`에서 객체 전체는 `deep: true`로 감시하고, 특정 속성은 화살표 함수로 선택하여 감시했다. deep 감시에서는 이전 값과 새 값이 같은 객체를 참조할 수 있으므로, 정확한 이전 값이 필요하면 `() => user.value.age`처럼 특정 속성을 감시해야 한다는 점이 헷갈릴 수 있었다.

### 29. reactive 데이터 감시
`watch()-reactive-example.vue`에서 reactive 객체를 watch에 직접 전달하면 하위 속성까지 자동으로 감시되는 것을 확인했다. 객체 전체를 감시할 때는 이전 값도 함께 변경될 수 있지만, 특정 속성만 감시하면 변경 전 값을 정확하게 확인할 수 있었다.

### 30. watchEffect()
`watchEffect()-example.vue`에서 함수 안에서 사용한 반응형 변수를 Vue가 자동으로 찾아 감시하는 기능을 실습했다. watch와 달리 감시 대상을 따로 지정하지 않고 화면이 처음 실행될 때도 즉시 동작한다는 차이를 배웠다.

(주석도 옮겨적어 학습에 조금 더 초점을 두었다.)

### 31. Weather Composition
`searchQuery`, `selectedCityInfo`, `weatherList`를 반응형 상태로 만들고 computed를 사용해 검색어가 포함된 도시만 출력했다. 도시 선택은 watch로 감시하고 검색어는 watchEffect로 추적했으며, 검색 결과가 없을 때는 안내 문구를 표시했다. 추가 기능으로 관심 도시를 저장하는 `favoriteCity`, 선택한 관심 도시의 정보를 찾는 computed, 관심 도시 변경을 기록하는 watcher를 작성했다. 처음에는 computed는 계산된 값을 만들고 watch는 값이 바뀐 뒤 별도의 작업을 실행한다는 역할 차이가 헷갈릴 수 있었다.

## 26.08.26 (3일차)

### 32. Component Lifecycle
`lifecycle-hook-example.vue`에서 컴포넌트가 화면에 나타날 때 `onMounted`로 타이머를 시작하고, 반응형 데이터가 변경될 때 `onUpdated`가 실행되는 것을 Console에서 확인했다. 컴포넌트가 사라질 때는 `onUnmounted`에서 타이머를 정리했다. 처음에는 `onUpdated` 안에서 반응형 데이터를 다시 변경하면 계속 갱신될 수 있다는 점과, 타이머 같은 작업은 컴포넌트가 사라지기 전에 반드시 정리해야 한다는 점이 헷갈릴 수 있었다.

### 33. Props & Emits
`PropsEmitsParent.vue`와 `PropsEmitsChild.vue`를 작성해 부모가 props로 데이터를 내려주고, 자식은 emit으로 갱신 요청과 새로운 값을 부모에게 전달하도록 구성했다. props는 부모에서 자식으로 전달되고 emit은 자식에서 부모로 전달된다는 방향을 배웠다. 처음에는 template에서 `parentData`가 `parent-data`로, `update-request`가 `@update-request`로 작성되는 이름 표기 방식과 자식이 props를 직접 변경하면 안 된다는 점이 헷갈릴 수 있었다.

### 34. Default Slot
`SlotDefaultParent.vue`와 `SlotDefaultChild.vue`에서 이름이 없는 `<slot>`을 사용해 부모가 작성한 여러 형태의 HTML을 자식 컴포넌트 내부에 출력했다. 부모가 아무 내용도 전달하지 않으면 자식의 slot 태그 안에 작성한 기본 콘텐츠가 표시된다는 것을 배웠다.

### 35. Named Slot
Named Slot을 사용해 자식 컴포넌트의 header 영역과 기본 본문 영역에 서로 다른 내용을 주입했다. 자식은 `<slot name="header">`로 위치를 정하고 부모는 `<template #header>`로 대상을 지정하며, slot 이름이 서로 같아야 한다는 점이 헷갈릴 수 있었다.

### 36. Scoped Slot
`SlotScopedChild.vue`의 데이터를 slot 속성으로 부모에게 전달하고, 부모가 `v-slot="slotBag"`으로 받아 원하는 HTML에 출력했다. 일반 props와 달리 자식 컴포넌트가 가진 데이터를 부모가 slot 내용을 작성할 때 활용하는 방식이며, `slotBag.text`처럼 slot 객체를 통해 접근해야 한다는 점을 배웠다.
