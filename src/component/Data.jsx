import axios from "axios"
import { useEffect, useState } from "react"

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=989&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&contentTypeId=39&areaCode=39')
      .then((response) => {
        setData(response.data.response.body.items.item)
      })
  }, [])

  function apiData() {
    axios.post('http://localhost:4000/test/1', data)
      .then((response) => {
        console.log('성공')
      })
  }

  function apiData1() {
    axios.post('http://localhost:4000/test/2', data)
      .then((response) => {
        console.log('성공')
      })
  }
  console.log(data)
  return (
    <>
      <button onClick={apiData}>전체데이터전송</button>
      <button onClick={apiData1}>기타데이터전송</button>
    </>
  )
}
