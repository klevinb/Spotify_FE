import React, { Component } from "react";
import { Col } from "react-bootstrap";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeUp,
  MdRepeat,
  MdVolumeOff,
} from "react-icons/md";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { TiArrowShuffle } from "react-icons/ti";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statevolum: 1,
      dur: 0,
      currentTime: 0,
      muted: false,
    };
    this.audio = React.createRef("audio_tag");
  }

  setStateVolum = (q) => {
    this.setState({
      statevolum: q,
    });
  };
  setDur = (q) => {
    this.setState({
      dur: q,
    });
  };
  setCurrentTime = (q) => {
    this.setState({
      currentTime: q,
    });
  };

  mute = () => {
    if (this.state.muted) {
      this.audio.current.muted = false;
      this.setState({ muted: false });
    } else {
      this.audio.current.muted = true;
      this.setState({ muted: true });
    }
  };

  fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + ~~s;
  };

  handleVolume = (q) => {
    if (this.state.muted === true) {
      this.audio.current.muted = false;
      this.setState({ muted: false });
    }
    this.setStateVolum(q);
    this.audio.current.volume = q;
  };

  togglePlaying = () => {
    if (this.audio.current.paused) {
      this.audio.current.play();
    } else {
      this.audio.current.pause();
    }
  };

  repeatSongs = () => {
    if (this.state.repeat) {
      this.setState({ repeat: false });
    } else {
      this.setState({ repeat: true });
    }
  };

  handleProgress = (e) => {
    let compute = (e.target.value * this.state.dur) / 100;
    this.setCurrentTime(compute);
    this.audio.current.currentTime = compute;
  };

  playNext = () => {
    if (this.props.tracksList !== null) {
      const findIndex = this.props.tracksList.indexOf(this.props.selectedSong);

      if (findIndex !== this.props.tracksList.length - 1) {
        const findNext = this.props.tracksList.slice(
          findIndex + 1,
          findIndex + 2
        );

        const findId = this.props.tracksList.find(
          (track) => track.preview === findNext[0].preview
        );

        this.props.selectSong(findId.id);
      } else {
        this.props.selectSong(this.props.tracksList[0].id);
      }
    }
  };

  playPrevious = () => {
    if (this.props.tracksList !== null) {
      const findIndex = this.props.tracksList.indexOf(this.props.selectedSong);
      if (findIndex !== 0) {
        const findNext = this.props.tracksList.slice(findIndex - 1, findIndex);
        const findId = this.props.tracksList.find(
          (track) => track.preview === findNext[0].preview
        );

        this.props.selectSong(findId.id);
      }
    }
  };

  myFunction = () => {
    if (this.state.repeat) {
      if (this.props.tracksList !== null) this.playNext();
    } else {
      this.audio.current.pause();
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.repeat !== this.state.repeat) {
      this.audio.current.addEventListener("ended", this.myFunction);
    }
  }

  render() {
    return (
      <>
        <Col className='d-flex justify-content-center flex-column' md={6}>
          <div className='musicControls d-flex justify-content-center align-items-center'>
            <span>
              <TiArrowShuffle />
            </span>
            <span>
              <MdSkipPrevious onClick={() => this.playPrevious()} />
            </span>
            <span className='playbtn'>
              {this.audio.current && this.audio.current.paused ? (
                <AiOutlinePlayCircle
                  onClick={() => {
                    this.togglePlaying();
                  }}
                />
              ) : (
                <AiOutlinePauseCircle
                  onClick={() => {
                    this.togglePlaying();
                  }}
                />
              )}
            </span>
            <span>
              <MdSkipNext onClick={() => this.playNext()} />
            </span>
            <span>
              <MdRepeat
                className={this.state.repeat ? "clicked" : ""}
                onClick={() => this.repeatSongs()}
              />
            </span>
          </div>
          <audio
            onTimeUpdate={(e) => this.setCurrentTime(e.target.currentTime)}
            onCanPlay={(e) => this.setDur(e.target.duration)}
            ref={this.audio}
            type='audio/mpeg'
            preload='true'
            autoPlay={true}
            src={this.props.selectedSong && this.props.selectedSong.preview}
          />

          <div className='progressb d-flex justify-content-center'>
            <span className='currentT'>
              {this.fmtMSS(this.state.currentTime)}
            </span>
            <input
              onChange={this.handleProgress}
              value={
                this.state.dur
                  ? (this.state.currentTime * 100) / this.state.dur
                  : 0
              }
              type='range'
              name='progresBar'
              id='prgbar'
              className='mx-2'
            />
            <span className='totalT'>{this.fmtMSS(this.state.dur)}</span>
          </div>
        </Col>
        <Col className='d-flex justify-content-end align-items-center' md={3}>
          <span className='volum' onClick={this.mute}>
            {this.audio && this.state.muted ? <MdVolumeOff /> : <MdVolumeUp />}
          </span>
          <input
            value={Math.round(this.state.statevolum * 100)}
            type='range'
            name='volBar'
            id='volBar'
            onChange={(e) => this.handleVolume(e.target.value / 100)}
          />
        </Col>
      </>
    );
  }
}

export default AudioPlayer;
