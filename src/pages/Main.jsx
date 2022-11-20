import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h1 onClick={() => {navigate('/submain/seoul')}}>서울</h1>
        <h1 onClick={() => {navigate('/submain/busan')}}>부산</h1>
        <h1 onClick={() => {navigate('/submain/gangneung')}}>강릉</h1>
        <h1 onClick={() => {navigate('/submain/gyeongju')}}>경주</h1>
        <h1 onClick={() => {navigate('/submain/jeonju')}}>전주</h1>
        <h1 onClick={() => {navigate('/submain/jeju')}}>제주</h1>
      </div>
    </>
  )
}
