import { createStore, compose, applyMiddleware } from 'redux';
import mainReducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = {
  albums: null,
  loading: {
    albums: true,
    albumInfo: true,
    artistInfo: true,
  },
  albumInfo: null,
  artistInfo: null,
  tracksList: null,
  selectedSong: null,
  playing: false,
  user: null,
  likedSongs: [],
  loggedin: false,
};

export default function configureStore() {
  return createStore(
    mainReducer,
    initialStore,
    composeEnhancers(applyMiddleware(thunk))
  );
}
