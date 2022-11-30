import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

export default function ListDetail({ props, region }) {
  const navigate = useNavigate();
  /* pagingnation */
  // 첫 번째 페이지
  const [page, setPage] = useState(1);
  // 한 페이지에 보여줄 총 갯수
  const [pagePost] = useState(12);
  // 페이지 이동 이벤트함수
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className='container d-flex flex-wrap'>
        {
          props.length > 0
            ? props
              .slice(
                pagePost * (page - 1),
                pagePost * (page - 1) + pagePost
              )
              .map((a, i) => {
                /* 별점 평균 계산 */
                const INITIALVALUE = 0
                const starSum = a.star.reduce((accumulator, currentValue) => accumulator + currentValue, INITIALVALUE)
                const starAvg = (starSum / a.star.length).toFixed(1);
                
                return (
                  <div className="card col-2" key={i} onClick={() => {
                    navigate(`/detail/${region}/${a.contentid}`);
                  }}>
                    <img src={a.firstimage1} alt="" className="card-img-top" style={{ height: '100px' }} />
                    <div className="card-body">
                      <h5 className="card-title">{a.title}</h5>
                      <p className="card-text">{a.addr1}</p>
                      <p>좋아요 {a.like}</p>
                      <p>별점 {starAvg}</p>
                      <p>조회수 {a.view}</p>
                    </div>
                  </div>
                )
              })
            : null
        }
      </div>

      <div className="d-flex justify-content-center col-2 m-auto mt-4 mb-4" lg={2}>
        <Pagination
          // * 필수 값
          // *활성 페이지
          activePage={page}
          // 페이지당 항목 수
          itemsCountPerPage={12}
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
