# 영화 시간표

내가 보려고 만드는 영화제 시간표 Viewer :clapper:

## Data format

데이터 파일은 일자별로 아래와 같은 형식

```
{
  name: 영화제 이름,
  year: 영화제 년도,
  date: 일자,
  dateStr: 화면에 표시하기 위한 날짜 정보(연.월.일 요일),
  screening: [
    {
      theater: 상영관,
      times: [
        {
          time: 시간,
          title: 대표제목(단편 모음인 경우 programs에 세부 정보),
          grade: [
            등급, 자막, GV 등
          ],
          code: 예매 코드,
          programs: [
            {
              title: 제목,
              titleEng: 영어 제목,
              url: 세부 정보 URL,
              desc: 상세 설명,
              info: {
                productionCountry: [
                  국가
                ],
                yearOfProduction: 제작연도,
                length: 러닝타임,
                format: 상영포맷,
                color: 컬러,
                genre: 장르
              },
              credit: {
                cast: [
                  출연
                ],
                [cinematography|cinematographer]: 촬영,
                director: [
                  감독
                ],
                editor: 편집자,
                music: 음악,
                producer: [
                  프로듀서
                ],
                productionCompany: 프로덕션 회사,
                [productionDesign|productionDesigner]: 프로덕션 디자인,
                [screenplay|screenwriter]: 각본, 시나리오,
                sound: 사운드,
                story: 전체 플롯, 캐릭터 등 스토리,
                worldSales: 국제 배급?,
                supervisor: 관리자?,
                barrier-freeVersionDirector: 배리어 프리 감독,
                commentary: 코멘터리
              }
            },
            ...
          ]
        },
        ...
      ]
    },
    ...
  ]
}
```

## Gatsby

https://github.com/gatsbyjs/gatsby-starter-hello-world
