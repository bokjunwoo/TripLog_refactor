import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { imageUpdate } from '../store/modules/users';
import axios from 'axios';
import styled from 'styled-components'

const IMG = styled.img`
  border: 3px solid black;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`

// 이미지 사용을 위한 FormData()
const formData = new FormData();

export default function UserImage() {
  // 디스패치
  const dispatch = useDispatch();

  // 리덕스 이미지 store 에서 리뷰 업데이트 현황 받아오기
  const updateUserImage = useSelector((state) => state.users.userImageUpdate);

  // 유저 닉네임
  const nickName = useSelector(state => state.users.userNickName);

  // 이미지 정보
  const [userImageData, setUserImageData] = useState('')

  // 이미지 사용
  const imageRef = useRef();

  // 이미지 함수
  const handleImg = (e) => {
    formData.append('image', e.target.files[0])
  }

  // 이미지 가져오기
  useEffect(() => {
    axios.post('http://localhost:4000/user', { nickName })
      .then((response) => {
        setUserImageData(response.data.image)
      })
      .catch(() => { new Error('실패') })
  }, [nickName, updateUserImage])

  // 이미지 저장 클릭 이벤트
  const userUploadImage = () => {
    axios.post('http://localhost:4000/user/image', formData)
      .then((response) => response.data)
      .then((data) => {
        axios.post('http://localhost:4000/user/upload', [{ nickName, image: data }])
          .then(() => {
            dispatch(imageUpdate(data));
            alert('이미지가 등록되었습니다.');
            imageRef.current.value = '';
          })
          .catch(() => {
            new Error('실패');
          });
      });
  };

  // 유저 이미지 핸들러
  const handlerUserImage = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/userNoImage.png';
  };

  return (
    <>
      <h1>여기는 {nickName}님의 마이페이지 입니다!</h1>
      <input className="mt-3" type="file" ref={imageRef} onChange={handleImg} />
      <button type='button' onClick={userUploadImage}>저장</button>
      <div>
        {userImageData !== '' ? <IMG src={`http://localhost:4000/uploads/${userImageData}`} alt="" /> : <IMG onError={handlerUserImage} src=''></IMG>}
      </div>
    </>
  )

}
