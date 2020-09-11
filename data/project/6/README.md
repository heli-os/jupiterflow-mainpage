<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/960813/jquery-kobis-app">
    <img src="https://github.com/960813/jquery-kobis-app/blob/master/_data/README.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">[kobis-movie-app] 영화진흥위원회 오픈 API 활용 제이쿼리 과제</h3>

  <p align="center">
    제이쿼리(jQuery) 및 영화진흥위원회 오픈API를 이용한 일별 박스오피스, 영화사 목록, 영화인 목록 제공 웹 서비스
    <br />
    <a href="https://github.com/960813/jquery-kobis-app"><strong>Explore the Github »</strong></a>
    <br />
    <br />
    <a href="http://ync.jupiterflow.com/movie/">View Demo</a>
    ·
    <a href="https://www.youtube.com/watch?v=rUvsVF08Sw0">Review Video</a>
    ·
    <a href="https://github.com/960813/jquery-kobis-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/960813/jquery-kobis-app/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Usage](#usage)
  * [Summary](#summary)
  * [Main Features](#main-features)
  * [Built With](#built-with)
  * [Code Review](#code-review)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project
[![영화진흥위원회 오픈 API 활용 제이쿼리 과제][product-screenshot-1]](https://jupiterflow.com/project/6)
[![영화진흥위원회 오픈 API 활용 제이쿼리 과제][product-screenshot-2]](https://jupiterflow.com/project/6)
[![영화진흥위원회 오픈 API 활용 제이쿼리 과제][product-screenshot-3]](https://jupiterflow.com/project/6)

'영화진흥위원회 오픈 API 활용 제이쿼리 과제'는 2020년 컴퓨터정보과 2학년 1학기 제이쿼리 강의 수행 목적으로 제작/개발한 프로젝트입니다. 

### Usage
1. `static/js/serviceKey.js` 생성
2. 해당 파일에 `const serviceKey = "{영화진흥위원회 OpenAPI 인증키}";` 작성

### Summary
* 반응형 웹 뷰(모바일, 타블렛, PC 3구간으로 나누어 지원)
* 사용한 API(XML) - 총 4개
    1. 일별 박스오피스
    2. 영화 상세정보
    3. 영화사 목록
    4. 영화인 목록

### Main Features
* 일별 박스오피스 랭킹 조회
    * 영화진흥위원회 일별 박스오피스 API 이용 
    * 날짜 지정 가능, 기본적으로 가장 최신 데이터를 조회
    * 좌측->우측, 상단->하단으로 1위~10위 포스터 출력
    * 포스트 클릭 시 제목, 상영시간, 장르 등 기본적인 정보 조회
    * 네이버 영화 바로가기 기능 지원
* 영화사 목록 조회
    * 영화진흥위원회 영화사 목록 API 이용
    * 반환되는 목록 중 1페이지~5페이지(50개)를 테이블로 출력
* 영화인 목록 조회
    * 영화진흥위원회 영화인 목록 API 이용
    * 반환되는 목록 중 1페이지~5페이지(50개)를 테이블로 출력
      
### Code Review
* 공통
    1. ajax 진행 상황에 따른 로딩 아이콘 및 현황 출력
        ```html
        <!-- loading 현황 출력 Element -->
        <div id="loading"><img src="static/images/loading.svg"><span></span></div>
        ```
        ```javascript
        /* 로딩에 따른 로딩 현황 업데이트 */
        $('#loading > span').text((++cnt) + '/' + '10');
        $('#app > #loading').css({display: 'flex'});
       
        /* ajax 파싱 완료 후 로딩 현황 초기화 */
        $('#loading > span').empty();
        $('#app > #loading').css({display: 'none'});
        ```
    2. ajax가 비동기이기 때문에 발생하는 문제 해결  
        박스오피스 랭킹을 가져온 후 각 박스오피스의 세부정보를 가져올 경우 비동기적으로 작동하기때문에 작업이 끝나는 시간이 다르다.  
        이로 인해 랭킹 순서대로 값을 저장할 수 없는 문제점이 있다. 해당 문제를 해결하기 위해 jQuery의 `$.when` 메소드를 활용하였다.  
        `$.when` 메소드는 전달 인자로 받은 ajax 결과가 모두 true(성공적 종료)될 때까지 대기하는 메소드이다. 모든 ajax가 종료되면 랭킹 순서에 맞게 movieItem을 추가한다.
        ```javascript
        const movieItemArray = new Array(10);
        const deferreds = new Array(10);
        /* .. something .. */
        $.when.apply(this, deferreds).done(() => {
           $('#loading > span').empty();
           movieItemArray.forEach((item, idx) => {
               $('.movieItems').append(item);
           });
           // last-callback
           if (callback) callback();
        });
        ```
* index.js
    1. Custom API를 이용한 영화세부정보 파싱  
        영화진흥위원회 API에서 imgsrc(포스터 이미지 주소), naverMovieSrc(네이버영화 바로가기 링크)가 추가됨.
        ```javascript
        const jqxhr = $.ajax({
                        url: 'http://ync.jupiterflow.com/jquery/searchMovieInfo' +
                            `?key=${serviceKey}` +
                            `&movieCd=${movieCd}`,
                        type: 'get',
                        dataType: 'xml'
                    }).then((data) => {
                        const renderData = {
                            movieCd: movieCd,
                            movieNm: $(data).find('movieNm').text(),
                            movieNmEn: $(data).find('movieNmEn').text(),
                            showTm: $(data).find('showTm').text(),
                            openDt: $(data).find('openDt').text().replace(/(\d{4})(\d{2})(\d{2})/g, '$1년 $2월 $3일'),
                            nations: [],
                            genres: [],
                            directors: [],
                            imgsrc: $(data).find('imgSrc').text(),
                            naverMovieSrc: $(data).find('naverMovieSrc').text()
                        };
                    /* .. something .. */
                    // Mustache 탬플릿을 이용해 HTML 렌더링한 결과를 영화 목록 배열에 순위에 맞게끔 저장
                    movieItemArray[idx] = Mustache.render(movieItem, renderData);
                    });
        /* .. something .. */
        $.when.apply(this, deferreds).done(() => {
           /* .. */
           // 영화 목록 배열(movieArray)을 바탕으로 순차적으로 append(출력)
           movieItemArray.forEach((item, idx) => {
               $('.movieItems').append(item);
           });
           /* .. */
        });
        ```
       
### Built With
* [jQuery](https://jquery.com/)
* [KOBIS OpenAPI](http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do)
* [Express.js](https://expressjs.com/)
    * with CustomAPI: 기존 영화상세정보 API에서 영화 포스터, 네이버 영화 페이지 바로가기 엘리먼트 추가
    * URI: http://ync.jupiterflow.com/jquery/searchMovieInfo
    * queryString: key(KOBIS OpenAPI 인증키), movieCd(영화코드)
    * Return: [영화 상세정보 API](http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do)와 동일
    * 응답 예시: [바로가기](http://ync.jupiterflow.com/jquery/searchMovieInfo?key=430156241533f1d058c603178cc3ca0e&movieCd=20124079)

<!-- CONTRIBUTING -->
## Contributing
This repository is not managed.

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact
JIN TAEYANG - keriel@jupiterflow.com

Project Link: [https://jupiterflow.com/project/6](https://jupiterflow.com/project/6)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [mustache.js](https://mustache.github.io/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/960813/jquery-kobis-app?style=flat-square
[contributors-url]: https://github.com/960813/jquery-kobis-app/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/960813/jquery-kobis-app?style=flat-square
[forks-url]: https://github.com/960813/jquery-kobis-app/network/members

[stars-shield]: https://img.shields.io/github/stars/960813/jquery-kobis-app?style=flat-square
[stars-url]: https://github.com/960813/jquery-kobis-app/stargazers

[issues-shield]: https://img.shields.io/github/issues/960813/jquery-kobis-app?style=flat-square

[issues-url]: https://github.com/960813/jquery-kobis-app/issues

[license-shield]: https://img.shields.io/github/license/960813/jquery-kobis-app?style=flat-square
[license-url]: https://github.com/960813/jquery-kobis-app/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jupiterflow

[product-screenshot-1]: https://github.com/960813/jquery-kobis-app/blob/master/_data/001.JPG?raw=true
[product-screenshot-2]: https://github.com/960813/jquery-kobis-app/blob/master/_data/002.JPG?raw=true
[product-screenshot-3]: https://github.com/960813/jquery-kobis-app/blob/master/_data/003.JPG?raw=true