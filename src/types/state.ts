import { AuthorizationStatus, RequestStatus } from '../const';
import { store } from '../store';
import { Review } from './review';
import { TUser } from './user';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export type OffersDataType = {
//   offers: Offer[];
//   activeOffer: null | Offer;
//   nearbyOffers: Offer[];
//   favoriteOffers: Offer[];
//   reviews: Review[];
//   currentCity: CityName;
//   isLoading: boolean;
//   authorizationStatus: AuthorizationStatus;
//   error: string | null;
//   userData: null | UserData;
// };

export type TReviewsData = {
  reviews: Review[];
  reviewFetchingStatus: RequestStatus;
  reviewSendingStatus: RequestStatus;
}

export type TUserData = {
  user: TUser | null;
  authorizationStatus: AuthorizationStatus;
  sendingStatus: RequestStatus;
}
