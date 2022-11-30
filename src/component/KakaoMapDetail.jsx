import { useEffect } from "react"

export default function KakaoMapDetail({ props }) {
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(props.mapy, props.mapx),
      level: 7,
    };

    const map = new kakao.maps.Map(container, options);

    map.setDraggable(false);
    map.setZoomable(false);

    new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(props.mapy, props.mapx),
    });
  }, [kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Marker, props.mapx, props.mapy]);

  return (
    <div id="map" style={{ width: '100%', height: '200px' }}></div>
  )
}
