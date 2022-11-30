// 액션 타입
const REVIEW_UPDATE = 'REVIEW_UPDATE';

// 액션 생성 함수
export function reviewUpdate() {
  return {
    type: REVIEW_UPDATE,
  };
};

// 초기 상태 설정
const initState = {
  reviewUpdate: false,
};

// 리듀서
export default function review(state = initState, action) {
  switch (action.type) {
    case REVIEW_UPDATE:
      return {
        ...state,
        // 업데이트 여부에서 데이터 값만 변화하면 되므로 NOT 을 붙여서 처리
        reviewUpdate: !state.reviewUpdate,
      };
    default:
      return state;
  }
}