import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios"
import ListDetail from "./ListDetail";

export default function List() {
  const navigate = useNavigate();

  const params = useParams();

  // 해당 페이지 Id 값
  const region = params.region;
  const type = params.type;

  const [data, setData] = useState([]);

  // 데이터 받아오기
  useEffect(() => {
    axios.get(`http://localhost:4000/list/${region}/${type}`)
      .then((response) => {
        setData(response.data)
      })
  }, [region, type])

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h2 onClick={() => {navigate(`/list/${region}/sightseeing`)}}>관광</h2>
        <h2 onClick={() => {navigate(`/list/${region}/culture`)}}>문화</h2>
        <h2 onClick={() => {navigate(`/list/${region}/lodgment`)}}>숙박</h2>
        <h2 onClick={() => {navigate(`/list/${region}/shopping`)}}>쇼핑</h2>
        <h2 onClick={() => {navigate(`/list/${region}/food`)}}>음식</h2>
      </div>
      <ListDetail props={data} region={region} />
    </>
  )
}
