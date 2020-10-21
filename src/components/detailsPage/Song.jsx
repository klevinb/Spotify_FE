import React from "react";
import { RiMusicLine } from "react-icons/ri";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

function Song(props) {
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + ~~s;
  };

  return (
    <div
      onClick={() => props.selectSong(props.song.id)}
      className={
        props.selectedSong && props.selectedSong.id === props.song.id
          ? "song selected"
          : "song"
      }
      key={props.song.id}
    >
      <div className='d-flex justify-content-between px-2'>
        <p>
          <RiMusicLine className='mr-2' />
          {props.song.title}
        </p>
        <p>{fmtMSS(props.song.duration)}</p>
      </div>
      <div
        className={
          props.selectedSong && props.selectedSong.id === props.song.id
            ? "text-left px-2"
            : "text-left artistSong px-2"
        }
      >
        <p>{props.song.artist.name}</p>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Song);
