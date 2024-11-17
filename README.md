![header](https://capsule-render.vercel.app/api?type=Waving&color=6738ff&height=230&section=header&text=유앤밋&fontSize=84&fontColor=f0ebff&animation=fadeIn)

<br/>

# 🏃 12Gain 🏃

멋쟁이 사자처럼 프론트엔드 스쿨 10기 파이널 프로젝트 12조 12득이조

<br/>

### 프로젝트 관련 사이트

- [💁 유앤밋 배포 사이트 ](https://uandmeet.netlify.app/)
- [📖 유앤밋 위키 사이트 ](https://github.com/FRONTENDSCHOOL10/12Gain/wiki)

<br/>

## ✨ 프로젝트 소개

- 프로젝트명: 유앤밋 (U&M)
- 주제: 가볍게 만나 부담 없이 다양한 운동 모임을 찾아 즐길 수 있는 앱서비스
  - `가벼운 모임` + `유연한 일정 관리` + `다양한 운동 기회`
  - 슬로건: 간편한 만남, 건강한 즐거움

<br/>

### 개발 기간

- 2024.08.26 ~ 2024.09.24

<br/>

### 프로젝트 목표

- 적극적으로 소통하고 함께 배우며 성장하기

<br/>

### 개발 환경 및 기술 스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1727054827993?alt=media&token=ac2dcf94-b411-453d-a309-7bb224fb3478)](https://github.com/msdio/stackticon)

<br/>

### 유저 플로우
![image](https://github.com/user-attachments/assets/50a0e73d-6a9f-42a9-ba86-09d9fd610647)

<br/>

## ✨ 주요 기능

1. 로그인 / 회원가입
2. 모임 생성 및 관리 (모임 관리, 채팅)
3. 커뮤니티 (피드 생성, 댓글)
4. 프로필

---

1. 로그인 / 회원가입
      
    - 조건 검증을 통한 처리
    - emailJS 라이브러리를 통한 회원가입 이메일 인증 연동

2. 모임 생성 및 관리 (모임 참여, 채팅)

    - 메인 페이지
        - 모임 게시글 렌더링
        - 카테고리 탭 신규, 추천, 관심(관심 운동 종목 관련 게시글)에 따른 필터링 정렬
        - 글쓰기 버튼을 통한 모임 생성
       
    - 모임 상세 페이지
        - 모임 상세 페이지 내 모임 관련 정보 표시
        - 참여하기 버튼 누를 시 참여 완료
        - 참여가 완료되면 포켓베이스 subscribe API를 통한 채팅 기능 활성화

    - 내 모임 페이지
        - 참여한 모임 게시글 렌더링

3. 커뮤니티

    - 커뮤니티 피드 렌더링
    - 카테고리 탭 신규, 추천에 따른 정렬
    - 글쓰기 버튼을 통한 피드 생성 기능
    - 댓글 아이콘을 눌러 댓글 작성 기능

4. 프로필

    - 프로필 유저 정보 표시
    - 유저가 작성한 모임, 게시글 렌더링 및 수정, 삭제 기능
    - 프로필 정보 수정
    - 설정 페이지: 로그아웃, 회원 탈퇴

<br/>

## ✨ 화면 구성


### 랜딩 페이지 및 로그인, 회원가입
![12Gain-랜딩로그인회원가입](https://github.com/user-attachments/assets/a3caeb51-3fc1-4555-af9d-4768245dfb7d)

### 메인, 모임 페이지
![12Gain-메인,모임](https://github.com/user-attachments/assets/e301ec80-bc04-4165-80cd-8438c1ae02a7)

### 채팅하기-1
![12Gain-모임채팅](https://github.com/user-attachments/assets/11c44839-40ae-4bc9-9bcd-834e7b327874)

### 채팅하기-2
![12Gain-채팅](https://github.com/user-attachments/assets/52dbdb09-c6c4-4640-b9c2-9a7cf9f7ba5b)

### 검색 페이지
![12Gain-검색](https://github.com/user-attachments/assets/d9b2b627-2128-4d16-bfcd-cddcccb9355d)


### 모임 게시글 생성
![12Gain-모임생성](https://github.com/user-attachments/assets/8bf9ac7b-66fc-4572-9df1-b74e0e292b19)

### 모임 게시글 삭제
![12Gain-모임삭제](https://github.com/user-attachments/assets/ef34c55c-4a94-4b88-bd20-f026a200ad73)

### 내 모임 페이지
![12Gain-내모임](https://github.com/user-attachments/assets/f4d7a672-f1e7-4509-92be-01e2c2d349f3)

### 커뮤니티 페이지
![12Gain-커뮤니티](https://github.com/user-attachments/assets/eaa5dbe5-addd-4bce-8343-1a0feb1ca14f)

### 커뮤니티 피드 생성
![12Gain-커뮤니티피드생성](https://github.com/user-attachments/assets/6350af8c-fc24-47bb-b807-fcc2d4ca3774)

### 프로필 (기본)
![12Gain-프로필기본](https://github.com/user-attachments/assets/9665ae78-dfee-4891-9d89-9b4d6abd77a2)

### 프로필 (사용자 설정)
![12Gain-프로필사용자설정](https://github.com/user-attachments/assets/fed10372-5b84-4b77-b7e3-8ca52895ab45)

### 내가 작성한 모임글, 피드
![12Gain-내가작성한글](https://github.com/user-attachments/assets/59caede4-85e3-4c78-8ad0-38e4be0b5ee5)

### 로그아웃
![12Gain-로그아웃](https://github.com/user-attachments/assets/3c62d495-689d-4a42-956a-0b8d2eed2337)

### 회원 탈퇴
![12Gain-탈퇴](https://github.com/user-attachments/assets/d40f4bf9-967a-49ac-9d0b-b03c76f4aba7)

<br/>

## ✨ 팀원 소개

<table>
  <tbody>
    <tr>
<td align="center"><a href="https://github.com/hyoungsiyoung">
<img src="https://avatars.githubusercontent.com/u/148939130?v=4" width="150," alt="형시영" >
</a><br/><sub><b>조장 : 형시영</b></sub></a><br /></td>

<td align="center"><a href="https://github.com/seungsu-K">
<img src="https://avatars.githubusercontent.com/u/153834323?v=4" width="150," alt="김승수" >
</a><br/><sub><b>조원 : 김승수</b></sub></a><br /></td>

<td align="center"><a href="https://github.com/Yooniverse42">
<img src="https://avatars.githubusercontent.com/u/162732401?v=4" width="150," alt="김지윤" >
</a><br/><sub><b>조원 : 김지윤</b></sub></a><br /></td>

<td align="center"><a href="https://github.com/soyeonpaark">
<img src="https://github.com/user-attachments/assets/7fdb393b-3438-4453-a977-705ba39001b3" width="150," alt="박소연" >
</a><br/><sub><b>조원 : 박소연</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
