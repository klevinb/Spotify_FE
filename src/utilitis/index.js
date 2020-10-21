import authAxios from '../components/authorization/http';
import axios from 'axios';

export const fetchArtistsWithThunk = () => {
  let albums = [];
  let albums2 = [];
  const artistsArray = [
    'stormzy',
    'skepta',
    'dave',
    'chip',
    'bugzy malone',
    'nadia rose',
  ];
  const usaArtists = [
    'adele',
    'dua lipa',
    'eminem',
    'drake',
    'kendrick lamar',
    'nicki minaj',
  ];
  return (dispatch, getState) => {
    let promises = [];
    let promises2 = [];
    artistsArray.forEach((artist) =>
      promises.push(
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key':
              'b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443',
          },
        })
          .then((resp) => resp.json())
          .then((respObj) => albums.push(respObj.data[3]))
      )
    );
    usaArtists.forEach((artist) =>
      promises2.push(
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key':
              'b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443',
          },
        })
          .then((resp) => resp.json())
          .then((respObj) => albums2.push(respObj.data[3]))
      )
    );
    Promise.all([...promises, ...promises2]).then(() =>
      dispatch({
        type: 'FETCH_ARTISTS',
        payload: { uk: albums, usa: albums2 },
      })
    );
  };
};

export const fetchAlbumInfos = (id) => {
  return (dispatch, getState) => {
    axios(process.env.REACT_APP_API_URL + '/deezer/albumInfo/' + id, {
      method: 'GET',
      withCredentials: true,
    })
      .then((resp) => resp.data)
      .then((respObj) =>
        dispatch({
          type: 'FETCH_ALBUM_INFO',
          payload: respObj,
        })
      );
  };
};

export const selectSongThunk = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SELECT_SONG',
      payload: id,
    });
  };
};
export const selectSongFromSearch = (song) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'PLAY_PREVIEW',
      payload: song,
    });
  };
};

export const fetchArtistInfos = (id) => {
  return (dispatch, getState) => {
    axios(process.env.REACT_APP_API_URL + '/deezer/artitisInfo/' + id, {
      method: 'GET',
      withCredentials: true,
    }).then((data) =>
      dispatch({
        type: 'FETCH_ARTIST',
        payload: { artist: data.data[0], topSongs: data.data[1] },
      })
    );
  };
};
