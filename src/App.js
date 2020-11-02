import React from 'react';
import TimerUi from './components/TimerUi'
import './App.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      time: 25 * 60,
      timerLabel: "session",
      paused: true,
    };
  }

  startTimer = () => {
    const { paused } = this.state;
    if (paused) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ paused: false });
    }
  };

  stopTimer = () => {
    this.setState({ paused: true });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      time: 25 * 60,
      timerLabel: "session",
      paused: true,
    });

    clearInterval(this.timer);
    this.beepAudio.pause();
    this.beepAudio.currentTime = 0;
  };

  updateTimer = (type) => {
    const { timerLabel, breakLength, sessionLength } = this.state;
    if (timerLabel === "session" && type === "session-update") {
      this.setState({ time: sessionLength * 60 });
    } else if (timerLabel === "break" && type === "break-update") {
      this.setState({ time: breakLength * 60 });
    }
  };

  handleUpdate = (event) => {
    const { breakLength, sessionLength, paused } = this.state;
    const action = event.target.id;
    if (paused) {
      switch (action) {
        case "break-decrement":
          if (breakLength > 1) {
            this.setState({ breakLength: breakLength - 1 }, () => {
              this.updateTimer("break-update");
            });
          }
          break;
        case "break-increment":
          if (breakLength != 60) {
            this.setState({ breakLength: breakLength + 1 }, () => {
              this.updateTimer("break-update");
            });
          }
          break;
        case "session-decrement":
          if (sessionLength > 1) {
            this.setState({ sessionLength: sessionLength - 1 }, () => {
              this.updateTimer("session-update");
            });
          }
          break;
        case "session-increment":
          if (sessionLength != 60) {
            this.setState({ sessionLength: sessionLength + 1 }, () => {
              this.updateTimer("session-update");
            });
          }
          break;
      }
    }
  };

  countDown = () => {
    const { time, timerLabel, breakLength, sessionLength } = this.state;

    if (time <= 0) {
      this.stopTimer();
      if (timerLabel === "session") {
        this.swapTimers(breakLength, "break");
      } else if (timerLabel === "break") {
        this.swapTimers(sessionLength, "session");
      }
      this.startTimer();
      this.beepAudio.play();
    } else {
      this.setState({ time: time - 1 });
    }
  };

  swapTimers = (comp, switchTo) => {
    this.setState({
      time: comp * 60,
      timerLabel: switchTo,
    });
  };

  formatTime = () => {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return minutes + ":" + seconds;
  };

  render() {
    return (
      <div id="pomodoro-clock">
        <TimerUi
          startTimer={this.startTimer}
          timerLabel={this.state.timerLabel}
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          paused={this.state.paused}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
          time={this.formatTime()}
          handleUpdate={this.handleUpdate}/>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.beepAudio = audio;
          }}/>
      </div>
    );
  }
}

export default Timer;
