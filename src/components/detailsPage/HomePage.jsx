import React, { useState, useCookies } from "react";
import { Col, Container } from "react-bootstrap";
import "../../styles/home.css";
import ArtistAlbumComponent from "./ArtistAlbumComponent";

import { connect } from "react-redux";

const mapStateToProps = (state) => state;

function HomePage(props) {
  const [selected, setSelected] = useState("TRENDING");
  return (
    <Col className='homePage' md={9} lg={10}>
      <div className='nav-links'>
        <ul>
          <li
            className={selected === "TRENDING" ? "nav-selected" : ""}
            onClick={() => setSelected("TRENDING")}
          >
            <span>TRENDING</span>
          </li>
          <li
            className={selected === "PODCAST" ? "nav-selected" : ""}
            onClick={() => setSelected("PODCAST")}
          >
            <span>PODCAST</span>
          </li>
          <li
            className={selected === "MOODS AND GENRES" ? "nav-selected" : ""}
            onClick={() => setSelected("MOODS AND GENRES")}
          >
            <span>MOODS AND GENRES</span>
          </li>
          <li
            className={selected === "NEW RELEASES" ? "nav-selected" : ""}
            onClick={() => setSelected("NEW RELEASES")}
          >
            <span>NEW RELEASES</span>
          </li>
          <li
            className={selected === "DISCOVER" ? "nav-selected" : ""}
            onClick={() => setSelected("DISCOVER")}
          >
            <span>DISCOVER</span>
          </li>
        </ul>
      </div>
      <Container className=' d-flex flex-column'>
        {props.albums && (
          <>
            <ArtistAlbumComponent title='UK Artists' data={props.albums.uk} />
            <ArtistAlbumComponent title='USA Artists' data={props.albums.usa} />
          </>
        )}
      </Container>
    </Col>
  );
}

export default connect(mapStateToProps)(HomePage);
