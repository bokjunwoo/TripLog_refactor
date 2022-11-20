import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function SubMain() {
  const navigate = useNavigate();

  const params = useParams();

  // 해당 페이지 Id 값
  const region = params.region;

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 onClick={() => {navigate(`/list/${region}/sightseeing`)}}>{region}의 리스트 보러가기</h1>
      </div>
    </>
  )
}
