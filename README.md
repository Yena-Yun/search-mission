# Week2 - 기업과제 1

## 💡 목표

> **검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현**

## ⚙️ 실행 방법

```
npm install
npm start
```

## 🔗 [배포 링크](https://main--sprightly-meringue-400fe6.netlify.app/)

## 목차

- [Week2 - 기업과제 1](#week2---기업과제-1)
  - [💡 목표](#-목표)
  - [⚙️ 실행 방법](#️-실행-방법)
  - [🔗 배포 링크](#-배포-링크)
  - [목차](#목차)
  - [🧑‍🤝‍🧑 팀원소개](#-팀원소개)
  - [🛠️ 기술 스택](#️-기술-스택)
  - [📖 기능 구현](#-기능-구현)
    - [1️⃣ API 호출별로 로컬 캐싱 구현](#1️⃣-api-호출별로-로컬-캐싱-구현)
      - [🆚 localStorage vs sessionStorage](#-localstorage-vs-sessionstorage)
      - [로컬 캐싱 구현](#로컬-캐싱-구현)
    - [2️⃣ 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행](#2️⃣-입력마다-api-호출하지-않도록-api-호출-횟수를-줄이는-전략-수립-및-실행)
      - [🆚 Debounce vs Throttle](#-debounce-vs-throttle)
      - [띄어쓰기만 있는 검색어 || 초성만 포함된 문자 검색어(e.g. 갑ㅅ)의 경우 API 호출을 하지 않는다.](#띄어쓰기만-있는-검색어--초성만-포함된-문자-검색어eg-갑ㅅ의-경우-api-호출을-하지-않는다)
    - [3️⃣ 키보드만으로 추천 검색어들로 이동 가능하도록 구현](#3️⃣-키보드만으로-추천-검색어들로-이동-가능하도록-구현)
  - [✏️ 팀 규칙](#️-팀-규칙)
    - [1️⃣ 커밋 컨벤션](#1️⃣-커밋-컨벤션)
    - [2️⃣ 폴더 구조](#2️⃣-폴더-구조)

## 🧑‍🤝‍🧑 팀원소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/shaqok"><img src="https://avatars.githubusercontent.com/u/54762756?v=4" width="130px;" alt=""/><br /><sub><b>김대연</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/kyhui1115"><img src="https://avatars.githubusercontent.com/u/113227749?v=4" width="130px;" alt=""/><br /><sub><b>김용희</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/pparksang1013"><img src="https://avatars.githubusercontent.com/u/125449198?v=4" width="130px;" alt=""/><br /><sub><b>박상민</b></sub></a><br /></td>
     <tr/>
      <td align="center"><a href="https://github.com/Yena-Yun"><img src="https://avatars.githubusercontent.com/u/68722179?v=4" width="130px;" alt=""/><br /><sub><b>윤예나</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/powercording"><img src="https://avatars.githubusercontent.com/u/105046423?v=4" width="130px;" alt=""/><br /><sub><b>이상돈</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/1myeji"><img src="https://avatars.githubusercontent.com/u/106291546?v=4" width="130px;" alt=""/><br /><sub><b>임예지</b></sub></a><br /></td>
    </tr>
    <td align="center"><a href="https://github.com/jjangeunyeong"><img src="https://avatars.githubusercontent.com/u/123078739?v=4" width="130px;" alt=""/><br /><sub><b>장은영</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/tmdgus95"><img src="https://avatars.githubusercontent.com/u/118142479?v=4" width="130px;" alt=""/><br /><sub><b>조승현</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/bicco2"><img src="https://avatars.githubusercontent.com/u/77577434?v=4" width="130px;" alt=""/><br /><sub><b>진호병</b></sub></a><br /></td>
  </tbody>
</table>

## 🛠️ 기술 스택

![react](https://user-images.githubusercontent.com/123078739/234895132-18ab503a-fcc7-486d-b89a-cb0cc1f7796b.svg)
![javascript](https://user-images.githubusercontent.com/123078739/236203354-58d48294-1b67-4b0f-a427-0626d0da906b.svg)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![styledcomponents](https://user-images.githubusercontent.com/123078739/234895185-7fd6c334-faca-4520-8551-2f20b32f085e.svg)
![eslint](https://user-images.githubusercontent.com/123078739/234895191-c1198a7b-9e2e-499a-8e61-c3b87bf8e2c2.svg)
![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![netlify](https://img.shields.io/badge/netlify-0F1E25?style=for-the-badge&logo=netlify&logoColor=01BDBA)

## 📖 기능 구현

### 1️⃣ API 호출별로 로컬 캐싱 구현

#### 🆚 localStorage vs sessionStorage

- `sessionStorage`는 세션이 종료되면 (e.g. 브라우저 닫기) 저장한 데이터가 지워지므로 임시적으로 사용하는 데이터를 저장하기 적합합니다.
- `localStorage`는 사용자가 저장된 데이터를 직접 삭제하지 않는 한 영구적으로 보존되기 때문에 사이트를 재방문할 때 사용할 수 있는 데이터를 활용하기 적합합니다.
- 이번 과제를 구현하며 브라우저를 닫았다 다시 방문해도 이전 검색어가 남아있는 것이 낫다는 의견으로 모아져 `localStorage`를 사용하기로 결정했습니다.

#### 로컬 캐싱 구현

```js
const SearchApi = axios.create({
  method: "GET",
  baseURL: "/api/v1/search-conditions",
});

SearchApi.interceptors.request.use((config) => {
  console.info("calling api");
  return config;
});

SearchApi.interceptors.response.use((response) => {
  if (response.status !== 200) {
    throw new Error("api 호출이 실패하였습니다.");
  }
  if (response.data.length === 0) {
    console.info("api 호출이 실패하였습니다.");
  }

  const url = new URLSearchParams(`${response.config.url}`);
  const key = url.get("name");

  localStorage.setItem(
    key,
    JSON.stringify({
      value: response.data,
      expiresAt: Date.now() + 1000 * 60 * 5, // 5분
    })
  );

  return response.data;
});
```

- Axios Instance를 생성하고 `Interceptors`를 사용해서 API 호출 후 성공적으로 받은 응답 데이터를 `localStorage`에 저장하며 캐싱 과정을 간소화했습니다.

```js
const checkExpiredCache = () => {
  Object.keys(localStorage).forEach((key) => {
    const obj = localStorage.getItem(key);

    const searchValueObj = JSON.parse(obj);
    if (Date.now() > searchValueObj.expiresAt) {
      localStorage.removeItem(key);
    }
  });
};
```

- `checkExpiredCache` 함수를 사용해 expire time을 체크하고 로컬스토리지에서 제거했습니다.

### 2️⃣ 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

#### 🆚 Debounce vs Throttle

- 검색창에서 추천 검색어 API를 구현하는 경우:
  - `Debounce`는 입력이 멈추고 정해진 시간 후에 API를 호출하게 됩니다.
  - `Throttle`은 입력이 진행되는 동안 일정한 주기로 API를 호출하게 됩니다.
- `Throttle`을 사용하면 검색어 입력동안 주기적으로 업데이트되는 추천 검색어로 인해 사용자의 측면을 더 고려하며,`Debounce`를 사용하면 입력이 끝나고 일정 시간 후 업데이트되기 때문에 성능적인 측면을 더 고려하게 됩니다.
- 이번 과제에서는 요구 사항에 맞춰 호출 횟수를 줄이는 전략을 수립하기 위해 `Debounce` 사용했습니다.

```js
// src/components/SearchBar.jsx

useEffect(() => {
  const getCachedDataOrFetch = async () => {
    if (!searchName) return setSuggestions([]);

    checkExpiredCache();
    const caches = JSON.parse(localStorage.getItem(searchName));
    if (caches) return setSuggestions(caches.searchValue);

    const searchResult = await fetchResults(searchName);
    setSuggestions(searchResult);
  };

  const debounceFetch = setTimeout(() => {
    getCachedDataOrFetch();
  }, 500);

  return () => {
    clearTimeout(debounceFetch);
  };
}, [searchName, caches]);
```

- `Debounce`를 사용한 검색 최적화
  - 500ms의 지연 시간을 설정하여, 사용자가 입력을 완료할 때까지 요청을 지연시켰습니다.
  - 이를 통해 불필요한 검색 요청을 줄이고 성능을 최적화할 수 있었습니다.

#### 띄어쓰기만 있는 검색어 || 초성만 포함된 문자 검색어(e.g. 갑ㅅ)의 경우 API 호출을 하지 않는다.

```js
// src/components/SearchBar.jsx

if (!searchName || RegExp(searchName)) return setSuggestions([]);
```

### 3️⃣ 키보드만으로 추천 검색어들로 이동 가능하도록 구현

```js
// src/hooks/useSuggestionFocus.jsx

import { useState } from "react";

const KEY = {
  ArrowDown: "ArrowDown",
  ArrowUp: "ArrowUp",
  Enter: "Enter",
  BackSpace: "BackSpace",
  Delete: "Delete",
};

export default function useSuggestionFocus(
  suggestions,
  setSearchName,
  setOpenModal,
  searchRef
) {
  const [focusIdx, setFocusIdx] = useState(-2);
  const suggestionLength = suggestions.length;

  const changeIdxNum = (e) => {
    const key = e.key;

    if (key === KEY.Escape) {
      setOpenModal(false);
      setSearchName("");
    }

    if (suggestionLength > 0) {
      searchRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (key === KEY.ArrowDown) {
        e.preventDefault();
        setFocusIdx((prev) => (prev + 1) % suggestionLength);
      }

      if (key === KEY.ArrowUp) {
        e.preventDefault();
        setFocusIdx((prev) => (prev - 1 + suggestionLength) % suggestionLength);
      }

      if (key === KEY.Enter) {
        if (focusIdx >= 0) {
          setSearchName(suggestions[focusIdx].name);
          setFocusIdx(-1);
        }
      }

      if (key === KEY.BackSpace || key === KEY.Delete) {
        setFocusIdx(-1);
      }
    }
  };

  return {
    changeIdxNum,
    focusIdx,
    setFocusIdx,
  };
}
```

- 화살표 키를 사용하여, 추천 검색어 목록 탐색
  - 위 방향키를 누를 경우, focusIdx가 1 씩 증가합니다. 만약 가장 위의 항목에 도달하여 위 방향키를 누르면, 포커스는 가장 아래 항목으로 이동합니다.
  - 마찬가지로, 아래쪽 방향키를 눌러 만약 가장 아래 항목에 도달하여 아래쪽 방향키를 누르면, 포커스는 가장 위 항목으로 이동합니다.
  - 포커스가 있는 상태에서 Enter 키를 누르면, 선택된 항목의 이름이 검색어로 설정됩니다.

```js
// src/components/SearchSuggestionModal.jsx

<SearchSuggestionListItem
  key={suggestion.id}
  name={suggestion.name}
  focus={focusIdx === idx}
  handleMouseOver={() => setFocusIdx(idx)}
  handleMouseOut={() => setFocusIdx(-2)}
  setSearchName={setSearchName}
  searchRef={searchRef}
/>

// src/components/SearchSuggestionListItem.jsx

<StyledSearchSuggestionListItem
  focus={focus}
  onClick={modalOutSideClick}
  onMouseOver={handleMouseOver}
  onMouseOut={handleMouseOut}
>
</StyledSearchSuggestionListItem>

```

- 마우스 호버와 키보드 포커스 연동 기능

  - 마우스로 항목에 호버할 경우, 해당 항목에 포커스가 됩니다.
  - 마우스가 항목에서 벗어날 경우, 포커스가 초기화됩니다.
  - 이를 통해 사용자가 마우스와 키보드를 동시에 사용하여 추천 검색어 목록에서 원하는 항목을 선택합니다.

```js
// src/hooks/useSuggestionFocus.jsx

searchRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "center",
});

// src/components/SearchSuggestionListItem.jsx

<StyledSearchSuggestionListItem
  focus={focus}
  onClick={modalOutSideClick}
  onMouseOver={handleMouseOver}
  onMouseOut={handleMouseOut}
  ref={focus ? searchRef : null}
></StyledSearchSuggestionListItem>;
```

- 키보드로 추천 검색어 스크롤 시 뷰포인트 이동
  - scrollIntoView 활용하여 키보드로 추천 검색어 이동 시 포커스가 마지막에 가기 전에 다음 목록을 보여줍니다.
  - focus된 StyledSearchSuggestionListItem에 ref를 지정하여 foucs된 검색어를 지정하도록 했습니다.

## ✏️ 팀 규칙

### 1️⃣ 커밋 컨벤션

| 타입     | 내용                                                        |
| -------- | ----------------------------------------------------------- |
| Feat     | 새로운 기능 추가                                            |
| Fix      | 버그 수정                                                   |
| Env      | 개발 환경 관련 설정                                         |
| Style    | 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만) |
| Refactor | 코드 리팩토링 (더 효율적인 코드로 변경 등)                  |
| Design   | CSS 등 디자인 추가/수정iE                                   |
| Comment  | 주석 추가/수정                                              |
| Docs     | 내부 문서 추가/수정                                         |
| Test     | 테스트 추가/수정                                            |
| Chore    | 빌드 관련 코드 수정                                         |
| Rename   | 파일 및 폴더명 수정                                         |
| Remove   | 파일 삭제                                                   |

e.g. Feat: 검색 기능 수정

### 2️⃣ 폴더 구조

```
📦 src
├── 📂 api
├── 📂 assets
├── 📂 components
│ ├── 📄 HeaderTitle
│ ├── 📄 SearchBar
│ ├── 📄 SearchButton
│ ├── 📄 SearchSuggestionListItem
│ ├── 📄 SearchSuggestionModal
├── 📂 hooks
├── 📂 pages
├── 📂 styles
├── 📂 utils
├── 📄 App
└── 📄 index
```
