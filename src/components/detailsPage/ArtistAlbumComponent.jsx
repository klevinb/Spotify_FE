import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ArtistComponent(props) {
  return (
    <>
      <div className='artistsAlbums'>
        <h3>{props.title}</h3>
        <Row className='row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 '>
          {props.data.map((artist, key) => (
            <Col key={key} className=' d-flex justify-content-center'>
              <Card style={{ width: "11rem" }}>
                <Card.Img
                  onClick={() =>
                    props.history.push("/album/" + artist.album.id)
                  }
                  variant='top'
                  src={artist.album.cover_big}
                />
                <Card.Body>
                  <Card.Text>{artist.album.title}</Card.Text>
                  <span
                    onClick={() =>
                      props.history.push("/artist/" + artist.artist.id)
                    }
                  >
                    {artist.artist.name}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default withRouter(ArtistComponent);
