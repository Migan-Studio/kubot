# Kubot

당신의 디스코드방을 편리하게 만듭니다.

## 사용법

### 라이센스

![license](https://img.shields.io/github/license/Migan178/kubot)

- 해당코드는 GNU GPL v3 라이센스를 따릅니다.

### 실행

#### 준비

nodejs 16.6.x 이상이 필요하며 yarn도 필요합니다.

##### 모듈 설치

- yarn

```sh
yarn
```

yarn을 입력하여 자동 모듈 설치를 합니다.

##### config.json 설정

1. config.example.json 에 있는 내용을 config.json 에 복사 하세요.
2. 각 항목에 알맞게 넣어줍니다.

koreanbots 토큰이 없을시 그 항목을 완전히 삭제 해주세요.

##### 실행

###### 컴파일 안하고 실행

```sh
yarn test
```

###### 컴파일 하고 실행

```sh
yarn build
yarn start
```
