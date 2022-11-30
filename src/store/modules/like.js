// 액션 타입
const LIKE_UPDATE = 'LIKE_UPDATE';

// 액션 생성 함수
export function likeUpdate() {
  return {
    type: LIKE_UPDATE,
  };
};

// 초기 상태 설정
const initState = {
  likeUpdate: false,
};

// 리듀서
export default function like(state = initState, action) {
  switch (action.type) {
    case LIKE_UPDATE:
      return {
        ...state,
        // 업데이트 여부에서 데이터 값만 변화하면 되므로 NOT 을 붙여서 처리
        likeUpdate: !state.likeUpdate,
      };
    default:
      return state;
  }
}