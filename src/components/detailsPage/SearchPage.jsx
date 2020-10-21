import React, { useState } from "react";
import { Row, Col, FormControl, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectSongFromSearch } from "../../utilitis";
import { BsSearch } from "react-icons/bs";

const mapDispatchToProps = (dispatch, props) => ({
  selectSong: (song) => dispatch(selectSongFromSearch(song)),
});

function SearchPage(props) {
  const [search, setSearch] = useState("");
  const [searchResult, setSeachResult] = useState([]);
  const [limit, setLimit] = useState(4);

  const fetchArtist = () => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
      },
    })
      .then((resp) => resp.json())
      .then((respResult) => setSeachResult(respResult.data));
  };

  const keyPress = (e) => {
    if (e.key === "Enter" && search.length) {
      fetchArtist();
      setSearch("");
    }
  };

  return (
    <Col className='searchPage' md={9} lg={10}>
      <Row>
        <Col
          className='d-flex justify-content-center align-items-center'
          sm={12}
        >
          <FormControl
            id='searchField'
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value.toLowerCase())}
            onKeyDown={(e) => keyPress(e)}
            className='mr-sm-2'
          />
          <BsSearch
            onClick={() => {
              fetchArtist();
              setSearch("");
            }}
          />
        </Col>
        <Col className='songSearch d-flex flex-column #' sm={12}>
          <Row className='row-cols-1 row-cols-md-3 row-cols-lg-4'>
            {searchResult.slice(0, limit).map((song, key) => (
              <Col
                key={key}
                className='d-flex-justify-content-center'
                sm={12}
                md={6}
              >
                <Card>
                  <Card.Body>
                    <Card.Img
                      variant='top'
                      src={song.album.cover_xl}
                      alt={song.title_short + " img"}
                    />
                    <Card.Title>{song.title_short}</Card.Title>
                    <Card.Text>
                      {song.artist.name}
                      {" - "} {song.album.title}
                    </Card.Text>
                    {song.album.title.includes(song.title_short) ? (
                      <Button
                        className='play'
                        onClick={() => props.selectSong({ ...song })}
                      >
                        PLAY
                      </Button>
                    ) : (
                      <>
                        <div className='d-flex flex-column'>
                          <Button
                            className='play'
                            onClick={() => props.selectSong({ ...song })}
                          >
                            PLAY
                          </Button>
                          <Link to={"album/" + song.album.id}>
                            <Button id='albumButton'>Go to Album Page</Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {searchResult.length && (
            <div
              id='loadMoreBtn'
              onClick={() => {
                setLimit(limit + 4);
              }}
            >
              Show more
            </div>
          )}
        </Col>
      </Row>
    </Col>
  );
}

export default connect(null, mapDispatchToProps)(SearchPage);
