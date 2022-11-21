export default function KakaoShare({props}) {

  const currentUrl = window.location.href;

  const kakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao

      if (!kakao.isInitialized()) {
        kakao.init('e79b288ebffab6c35ea1c3d7624e2f3a')
      }

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: props.title,
          description: props.addr1,
          imageUrl: props.firstimage1,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        social: {
          likeCount: props.like,
          viewCount: props.view,
        },
        buttons: [
          {
            title: '홈페이지 가기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: 'https://developers.kakao.com',
            },
          },
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    }
  }

  return (
    <p onClick={kakaoButton}>카카오톡</p>
  )
}