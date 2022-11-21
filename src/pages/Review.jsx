import { useState } from "react";
import Pagination from 'react-js-pagination';
import styled from "styled-components";
import '../style/Paging.css';

const DivBorder = styled.div`
  border: 1px solid black;
  border-radius: 10px;
`
export default function Review({ props }) {

  /* pagingnation */
  // 첫 번째 페이지
  const [page, setPage] = useState(1);
  // 한 페이지에 보여줄 총 갯수
  const [pagePost] = useState(4);
  // 페이지 이동 이벤트함수
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      {
        props.length > 0
        ? props
          .slice(
            pagePost * (page - 1),
            pagePost * (page - 1) + pagePost
          )
        .map((a, i) => {
          return (
            <DivBorder className="p-2 mb-2" key={i}>
              <h5 className="card-title">닉네임 : {a.nickName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">별점 : {a.star}</h6>
              <p className="card-text">내용 : {a.content}</p>
              {
                a.image ? <img src={`http://localhost:4000/uploads/${a.image}`} alt='이미지' style={{ width: '100px', height: '100px' }} /> : null
              }
            </DivBorder>
          )
        })
        : null
      }

      <div className="d-flex justify-content-center col-2 m-auto mt-4 mb-4" lg={2}>
        <Pagination
          // * 필수 값
          // *활성 페이지
          activePage={page}
          // 페이지당 항목 수
          itemsCountPerPage={4}
          // 페이지 총 아이템수
          totalItemsCount={props.length}
          // 페이지 범위
          pageRangeDisplayed={5}
          // 이전 페이지 탐색 버튼의 텍스트
          prevPageText={'<'}
          // 다음 페이지 탐색 버튼의 텍스트
          nextPageText={'>'}
          // 페이지 변경 핸들러 pageNumber를 인수로 수신
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}
