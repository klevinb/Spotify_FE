import React, { useEffect } from "react";
import { Row, Col, Image, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Song from "./Song";
import { connect } from "react-redux";
import { fetchArtistInfos, selectSongThunk } from "../../utilitis";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  fetchArtist: (id) => dispatch(fetchArtistInfos(id)),
  selectSong: (id) => dispatch(selectSongThunk(id)),
  clearState: () =>
    dispatch({
      type: "CLEAR_STATE",
    }),
});

function ArtistPage(props) {
  useEffect(() => {
    props.fetchArtist(props.match.params.id);
    return () => props.clearState();
  }, [props.match.params.id]);

  return (
    <>
      {props.artistInfo && (
        <Col className='albumPage' md={9} lg={10}>
          <Row className='row row-cols-xs-1'>
            <div
              id='content'
              className='col-12 col-md-12 col-lg-4  d-flex justify-content-end'
            >
              <div id='artist' className='card mt-5'>
                <Image
                  src={props.artistInfo.artist.picture_xl}
                  style={{ height: "250px" }}
                />
                <p></p>
                <h4 id='label1'>
                  {props.artistInfo.artist.name}
                  {" - Top 50"}
                </h4>
                <Button className='play'>PLAY</Button>
                <Link to={"/artist/" + props.artistInfo.artist.id}>
                  <label id='label2'>{props.artistInfo.artist.name}</label>
                </Link>
              </div>
            </div>
            <div id='songs' className='col'>
              <div className='card'>
                {props.artistInfo.topSongs.data.map((song, i) => (
                  <Song selectSong={props.selectSong} key={i} song={song} />
                ))}
              </div>
            </div>
          </Row>
        </Col>
      )}

      {props.loading.artistInfo && (
        <Col className='albumPage' style={{ height: "90vh" }} md={9} lg={10}>
          <Row className='row row-cols-xs-1'>
            <Col
              id='content'
              className='col-12 col-md-12 col-lg-4  mt-5 pt-5 d-flex justify-content-end'
            >
              <Spinner animation='border' variant='light' />
            </Col>
            <Col
              id='songs'
              className='col  mt-5 pt-5 d-flex justify-content-center'
            >
              <Spinner animation='border' variant='light' />
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
