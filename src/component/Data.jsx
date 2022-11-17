import axios from "axios"
import { useEffect, useState } from "react"

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&contentTypeId=12&areaCode=1')
    .then((response) => {
      setData(response.data.response.body.items.item)
    })
  }, [])

  function apiData() {
    axios.post('http://localhost:4000/test', data)
    .then((response) => {
      console.log('성공')
    })
  }
  
  return (
    <button onClick={apiData}>데이터전송</button>
  )
}
