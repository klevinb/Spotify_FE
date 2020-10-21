import React, { useEffect } from "react";
import { Row, Col, Image, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Song from "./Song";
import { connect } from "react-redux";
import { fetchAlbumInfos, selectSongThunk } from "../../utilitis";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  fetchAlbumInfo: (id) => dispatch(fetchAlbumInfos(id)),
  selectSong: (id) => dispatch(selectSongThunk(id)),
  clearState: () =>
    dispatch({
      type: "CLEAR_STATE",
    }),
});

function AlbumPage(props) {
  useEffect(() => {
    props.fetchAlbumInfo(props.match.params.id);
    return () => props.clearState();
  }, [props.match.params.id]);

  return (
    <>
      {props.albumInfo && (
        <Col className='albumPage' md={9} lg={10}>
          <Row className='row row-cols-xs-1'>
            <div
              id='content'
              className='col-12 col-md-12 col-lg-4 d-flex justify-content-end'
            >
              <div id='artist' className='card mt-5'>
                <Image
                  src={props.albumInfo.cover_xl}
                  style={{ height: "250px" }}
                />
                <p></p>
                <h4 id='label1'>
                  {props.albumInfo.artist.name} {props.albumInfo.title}
                </h4>
                <Button className='play'>PLAY</Button>
                <Link to={"/artist/" + props.albumInfo.artist.id}>
                  <label id='label2'>{props.albumInfo.artist.name}</label>
                </Link>
              </div>
            </div>
            <div id='songs' className='col'>
              <div className='card'>
                {props.albumInfo.tracks.data.map((song, i) => (
                  <Song selectSong={props.selectSong} key={i} song={song} />
                ))}
              </div>
            </div>
          </Row>
        </Col>
      )}

      {props.loading.albumInfo && (
        <Col className='albumPage' style={{ height: "90vh" }} md={9} lg={10}>
          <Row className='row row-cols-xs-1'>
            <Col
              id='content'
              className='col-12 col-md-12 col-lg-4 mt-5 pt-5 d-flex justify-content-end'
            >
              <Spinner animation='border' variant='light' />
            </Col>
            <Col
              id='songs'
              className='col pt-5  mt-5 d-flex justify-content-center'
            >
              <Spinner animation='border' variant='light' />
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
