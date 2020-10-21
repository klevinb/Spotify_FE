export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_ARTISTS':
      return {
        ...state,
        albums: action.payload,
        loading: {
          ...state.loading,
          albums: false,
        },
      };
    case 'FETCH_ALBUM_INFO':
      return {
        ...state,
        albumInfo: {
          ...action.payload,
        },
        tracksList: action.payload.tracks.data.map((track) => track),
        loading: {
          ...state.loading,
          albumInfo: false,
        },
      };
    case 'FETCH_ARTIST':
      return {
        ...state,
        loading: {
          ...state.loading,
          artistInfo: false,
        },
        artistInfo: action.payload,
        tracksList: action.payload.topSongs.data,
      };
    case 'SELECT_SONG':
      return {
        ...state,
        selectedSong: state.tracksList.find(
          (track) => track.id === action.payload
        ),
        playing: true,
      };
    case 'PLAY_PREVIEW':
      return {
        ...state,
        tracksList: null,
        selectedSong: action.payload,
        playing: true,
      };
    case 'PLAY_LIKEDSONG':
      return {
        ...state,
        tracksList: null,
        selectedSong: state.likedSongs.find(
          (song) => song.id === action.payload
        ),
        playing: true,
      };
    case 'TOGGLE_PLAY':
      return {
        ...state,
        playing: !state.playing,
      };
    case 'LIKE_SONG':
      return {
        ...state,
        user: {
          ...state.user,
          likedSongs:
            state.user.likedSongs.indexOf(action.payload) !== -1
              ? [
                  ...state.user.likedSongs.filter(
                    (like) => like !== action.payload
                  ),
                ]
              : [...state.user.likedSongs, action.payload],
        },
      };
    case 'CLEAR_STATE':
      return {
        ...state,
        loading: {
          albums: true,
          albumInfo: true,
          artistInfo: true,
        },
        albumInfo: null,
        artistInfo: null,
      };
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
        loggedin: true,
      };

    default:
      return state;
  }
}
