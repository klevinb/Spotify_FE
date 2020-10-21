import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import NavigationBar from "./components/navigation_footer/NavigationBar";
import Footer from "./components/navigation_footer/Footer";
import AlbumPage from "./components/detailsPage/AlbumPage";
import ArtistPage from "./components/detailsPage/ArtistPage";
import HomePage from "./components/detailsPage/HomePage";
import SearchPage from "./components/detailsPage/SearchPage";
import Login from "./components/authorization/Login";
import { withRouter, Route } from "react-router-dom";
import Library from "./components/detailsPage/Library";
import { fetchArtistsWithThunk } from "./utilitis";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  fetchArtists: () => dispatch(fetchArtistsWithThunk()),
});

function App(props) {
  useEffect(() => {
    props.fetchArtists();
  }, []);

  return (
    <>
      {props.location.pathname !== "/login" && (
        <Row className='m-0 app'>
          <NavigationBar />
          <Route path='/' exact component={HomePage} />
          <Route path='/artist/:id' component={ArtistPage} />
          <Route path='/album/:id' component={AlbumPage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/library' component={Library} />
        </Row>
      )}
      <Route path='/login' exact component={Login} />
      {props.location.pathname !== "/login" && (
        <Row className='m-0 footer'>
          <Footer />
        </Row>
      )}
    </>
  );
}

export default connect(null, mapDispatchToProps)(withRouter(App));
