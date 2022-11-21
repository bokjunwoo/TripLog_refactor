import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios"
import KakaoMapDetail from "../component/KakaoMapDetail";
import Review from "./Review";
import ReviewWrite from "./ReviewWrite";
import KakaoShare from "../component/KakaoShare";

export default function Detail() {
  const nickName = useSelector((state) => state.users.userNickName);

  const params = useParams();
  
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

  // 별점
  const [star, setStar] = useState('');

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
  }, [contentid, setLike])

  // 별점의 평균을 가져오는 useEffect
  useEffect(() => {
    axios.get(`http://localhost:4000/detail/${contentid}`)
    .then((response) => {
      setStar(response.data.star)
    })
    .catch(() => new Error('실패'))
  }, [contentid, setStar])

  // 리뷰 정보 가져오는 useEffect
  useEffect(() => {
    axios.get(`http://localhost:4000/review/${contentid}`)
    .then((response) => {
      setReview(response.data)
    })
    .catch(() => new Error('실패'))
  }, [contentid, review])

  return (
    <div className="container col-8">
      <h2>{nickName}님 로그인</h2>
      <div className="card">
        <img src={detail.firstimage1} className="card-img-top" alt=""/>
        
        <div className="card-body d-flex justify-content-evenly">
          <p>⭐️{like}</p>
          <p>❤️{star}</p>
          <p>조회수 : {detail.view}</p>
          <KakaoShare props={detail}/>
        </div>

        <div className="card-body">
          <h5 className="card-title">{detail.title}</h5>
          <p className="card-text">{detail.addr1}</p>
          <p className="card-text">{overview}</p>
        </div>
        
        <div className="card-body">
          <KakaoMapDetail props={detail} dd={'dd'}/>
        </div>

        <div className="card-body">
          <ReviewWrite />
        </div>

        <div className="card-body">
          <Review props={review}/>
        </div>
      </div>
    </div>
  )
}
