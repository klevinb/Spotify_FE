import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GoScreenFull } from 'react-icons/go';
import { connect } from 'react-redux';
import { selectSongThunk } from '../../utilitis';
import AudioPlayer from './AudioPlayer';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  selectSong: (id) => dispatch(selectSongThunk(id)),
  likeSong: (song) =>
    dispatch({
      type: 'LIKE_SONG',
      payload: song,
    }),
});

class Footer extends Component {
  state = {
    imgSrc: '',
    albumInfo: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedSong !== this.props.selectedSong) {
      if (this.props.selectedSong.contributors) {
        this.setState({ imgSrc: this.props.selectedSong.album.cover_xl });
      } else {
        if (this.props.selectedSong.album) {
          this.setState({ imgSrc: this.props.selectedSong.album.cover_big });
        } else {
          this.setState({ imgSrc: this.state.albumInfo.cover_big });
        }
      }
    } else if (
      prevProps.albumInfo !== this.props.albumInfo &&
      this.props.albumInfo !== null
    ) {
      this.setState({ albumInfo: this.props.albumInfo });
    }
  }

  render() {
    return (
      <>
        <Col className='d-flex pl-2' md={6} lg={3}>
          <>
            {this.props.selectedSong && <Image src={this.state.imgSrc} />}
            <div className='d-flex justify-content-around w-100'>
              <div className='d-flex flex-column'>
                <span>
                  {this.props.selectedSong ? (
                    this.props.selectedSong.title_short.length > 15 ? (
                      <span style={{ fontSize: '12px' }}>
                        {this.props.selectedSong.title_short.slice(0, 15) +
                          '...'}
                      </span>
                    ) : (
                      <span style={{ fontSize: '14px' }}>
                        {this.props.selectedSong.title_short}
                      </span>
                    )
                  ) : (
                    <p>Select a song</p>
                  )}
                </span>
                <span style={{ color: '#969696', fontSize: '15px' }}>
                  {this.props.selectedSong &&
                    this.props.selectedSong.artist.name}
                </span>
              </div>
              {this.props.selectedSong && (
                <div className='d-flex align-items-center'>
                  {this.props.likedSongs &&
                  this.props.likedSongs.indexOf(
                    this.props.selectedSong && this.props.selectedSong
                  ) !== -1 ? (
                    <AiFillHeart
                      onClick={() =>
                        this.props.likeSong(this.props.selectedSong)
                      }
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={
                        this.props.selectedSong !== null
                          ? () => this.props.likeSong(this.props.selectedSong)
                          : () => {}
                      }
                    />
                  )}
                  <GoScreenFull />
                </div>
              )}
            </div>
          </>
        </Col>

        <AudioPlayer
          selectedSong={this.props.selectedSong && this.props.selectedSong}
          tracksList={this.props.tracksList}
          selectSong={this.props.selectSong}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
