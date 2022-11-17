import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function List() {
  const navigate = useNavigate();

  const [seoul, setSeoul] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/test/data')
      .then((response) => {
        setSeoul(response.data)
      })
  }, [])

  return (
    <>
      <div className='container d-flex flex-wrap'>
        {
          seoul.map((a, i) => {
            return (
              <div className="card col-2" key={i} onClick={() => {
                navigate(`/detail/${a.contentid}`);
              }}>
                <img src={a.firstimage1} alt="" className="card-img-top" style={ {height : '100px'}}/>
                <div className="card-body">
                  <h5 className="card-title">{a.title}</h5>
                  <p className="card-text">{a.addr1}</p>
                  <span>좋아요{a.like}</span> 
                  <span>별점{a.star}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
