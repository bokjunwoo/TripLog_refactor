import { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import axios from "axios"
import styled from "styled-components"

const DivBorder = styled.div`
  border: 1px solid black;
  border-radius: 10px;
`

// 이미지 사용을 위한 FormData()
const formData = new FormData();

export default function ReviewWrite() {
  // contentId 받아오는 useParams
  const params = useParams();
  const contentid = params.contentid;

  // 로그인 유저 닉네임
  const nickName = useSelector((state) => state.users.userNickName);

  // 로그인 유저 이미지
  const userImage = useSelector((state) => state.users.userImage)

  // 이미지 업로드 관련 useState
  const [upload, setUpload] = useState(false);

  //이미지 함수
  const handleImg = (e) => {
    formData.append('image', e.target.files[0]);
    setUpload(true);
  };

  /* 데이터 */
  // 별점 데이터
  const star = useRef();
  // 내용 데이터
  const content = useRef();
  // 이미지 데이터
  const image = useRef();

  // 리뷰 저장 클릭 이벤트
  const sendReview = () => {
    const starData = star.current.value;
    const contentData = content.current.value;

    if (nickName === '') {
      alert('로그인이 필요한 기능입니다.')
    } else if (upload) {
      axios.post('http://localhost:4000/review/image', formData)
        .then((response) => response.data)
        .then((data) => {
          axios.post('http://localhost:4000/review/write', [{
            nickName,
            userImage,
            contentid,
            contentData,
            starData,
            image: data,
          }])
            .then(() => {
              star.current.value = '';
              content.current.value = '';
              image.current.value = '';
              alert('댓글 등록을 성공하였습니다.')
            })
            .catch((err) => {
              new Error(err)
              alert('댓글 등록을 실패하였습니다.')
            })
        }
        )
        .catch((err) => new Error(err))
    } else {
      axios
        .post('http://localhost:4000/review/write', [
          {
            nickName,
            userImage,
            contentid,
            contentData,
            starData,
            image: '',
          },
        ])
        .then(() => {
          star.current.value = '';
          content.current.value = '';
          image.current.value = '';
          alert('댓글 등록을 성공하였습니다.');
        })
        .catch((err) => {
          new Error(err)
          alert('댓글 등록을 실패하였습니다.');
        });
    }
  }

  return (
    <>
      <DivBorder className="p-2">
        <h3>내용</h3>
        <div className="mb-2">
          <span>평점 : </span><input type='number' className="w-25" ref={star} />
        </div>

        <div className="mb-2">
          <span>내용</span><input type="text" className="w-100" ref={content} />
        </div>

        <div className="mb-2">
          <span>이미지</span><input type="file" ref={image} onChange={handleImg} />
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" onClick={sendReview}>저장</button>
        </div>
      </DivBorder>
    </>
  )
}
