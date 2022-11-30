import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios"
import KakaoMapDetail from "../component/KakaoMapDetail";
import Review from "./Review";
import ReviewWrite from "./ReviewWrite";
import KakaoShare from "../component/KakaoShare";

export default function Detail() {
  const params = useParams();

  // 리덕스 detail store 에서 리뷰 업데이트 현황 받아오기
  const updateReview = useSelector((state) => state.detail.reviewUpdate);

  // 로그인 유저 닉네임
  const nickName = useSelector((state) => state.users.userNickName);
  
  // 해당 페이지 Id 값
  const contentid = params.contentid;
  
  // 해당 지역 위치
  const region = params.region;

  // 디테일 정보
  const [detail, setDetail] = useState([]);

  // 해당지역 상세 정보
  const [overview, setOverview] = useState([]);

  // 리뷰 정보
  const [review, setReview] = useState([]);

  // 좋아요
  const [like, setLike] = useState('');

  // 전체 데이터를 가져오는 useEffect
  useEffect(() => {
    axios.get(`http://localhost:4000/detail/${region}/${contentid}`)
    .then((response) => {
      setDetail(response.data)
    })
  }, [contentid, region])

  // 페이지정보를 가져오는 API
  useEffect(() => {
    axios.get(`https://apis.data.go.kr/B551011/KorService/detailCommon?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
      .then((response) => {
        setOverview(response.data.response.body.items.item[0].overview)
      })
      .catch(() => new Error('실패'))
  }, [contentid])

  // 좋아요의 개수를 가져오는 useEffect
  useEffect(() => {
    axios.get(`http://localhost:4000/detail/${contentid}`)
    .then((response) => {
      setLike(response.data.like)
    })
    .catch(() => new Error('실패'))
  }, [contentid])

  // 리뷰 정보 가져오는 useEffect
  useEffect(() => {
    axios.get(`http://localhost:4000/review/${contentid}`)
    .then((response) => {
      setReview(response.data)
    })
    .catch(() => new Error('실패'))
  }, [contentid, updateReview])

  /* 별점 평균 계산 */
  const INITIALVALUE = 0
  const starList = [];
  for (let key in review) {
    starList.push(parseInt(review[key].star));
  }
  const starSum = starList.reduce((accumulator, currentValue) => accumulator + currentValue, INITIALVALUE)
  const starAvg = (starSum / starList.length).toFixed(1);
  
  return (
    <div className="container col-8">
      <h2>{nickName}님 로그인</h2>
      <div className="card">
        <img src={detail.firstimage1} className="card-img-top" alt=""/>
        
        <div className="card-body d-flex justify-content-evenly">
          <p>⭐️{starAvg === 'NaN' ? 0 : starAvg}</p>
          <p>❤️{like}</p>
          <p>조회수 : {detail.view}</p>
          <KakaoShare props={detail}/>
        </div>

        <div className="card-body">
          <h5 className="card-title">{detail.title}</h5>
          <p className="card-text">{detail.addr1}</p>
          <p className="card-text">{overview}</p>
        </div>
        
        <div className="card-body">
          <KakaoMapDetail props={detail}/>
        </div>

        <div className="card-body">
          <ReviewWrite title={detail.title} region={region}/>
        </div>

        <div className="card-body">
          <Review props={review} />
        </div>
      </div>
    </div>
  )
}
