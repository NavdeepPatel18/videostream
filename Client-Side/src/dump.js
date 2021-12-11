import React, { Component } from "react";
// import { PrismCode } from "react-prism";
import { Player } from "video-react";
import { Button } from "reactstrap";

const sources = {
  sintelTrailer: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  bunnyTrailer: "http://media.w3.org/2010/05/bunny/trailer.mp4",
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
  test: "http://media.w3.org/2010/05/video/movie_300.webm",
};

export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.bunnyMovie,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  render() {
    return (
      <div style={{ marginTop: "-700px" }}>
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
        >
          <source src={this.state.source} />
        </Player>
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
        >
          <source src={this.state.source} />
        </Player>
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
        >
          <source src={this.state.source} />
        </Player>
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
        >
          <source src={this.state.source} />
        </Player>
        <div className="py-3">
          <Button onClick={this.play} className="mr-3">
            play()
          </Button>
          <Button onClick={this.pause} className="mr-3">
            pause()
          </Button>
        </div>

        <div className="pb-3">
          <Button onClick={this.setMuted(true)} className="mr-3">
            muted=true
          </Button>
          <Button onClick={this.setMuted(false)} className="mr-3">
            muted=false
          </Button>
        </div>
      </div>
    );
  }
}
