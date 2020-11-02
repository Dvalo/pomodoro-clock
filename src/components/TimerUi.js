import React from 'react';

class TimerUi extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div id="timer-clock">
            <div className="heading">25 + 5 Clock</div>
            <div className="timer-wrapper">
            <div id="timer-label" className="timer-heading">
                {this.props.timerLabel}
            </div>
            <div id="time-left">{this.props.time}</div>
            <div className="indicator">M : S</div>
            </div>
            <div className="setting-wrapper">
            <div className="setting-label">Settings</div>
            <div className="setting-box-wrapper">
                <div className="setting-box break">
                <div id="break-label" className="label">
                    Break Length
                </div>
                <div className="controllers">
                    <div
                    id="controller-switch"
                    onClick={this.props.handleUpdate.bind(this)}>
                    <i id="break-decrement" className="fas fa-minus-circle"></i>
                    </div>
                    <div id="break-length">{this.props.breakLength}</div>
                    <div
                    id="controller-switch"
                    onClick={this.props.handleUpdate.bind(this)}>
                    <i id="break-increment" className="fas fa-plus-circle"></i>
                    </div>
                </div>
                </div>
                <div className="setting-box session">
                <div id="session-label" className="label">
                    Session Length
                </div>
                <div className="controllers">
                    <div
                    id="controller-switch"
                    onClick={this.props.handleUpdate.bind(this)}>
                    <i id="session-decrement" className="fas fa-minus-circle"></i>
                    </div>
                    <div id="session-length">{this.props.sessionLength}</div>
                    <div
                    id="controller-switch"
                    onClick={this.props.handleUpdate.bind(this)}>
                    <i id="session-increment" className="fas fa-plus-circle"></i>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="timer-settings">
            <div className="timer-controller">
                <i
                id="start_stop"
                onClick={
                    this.props.paused ? this.props.startTimer : this.props.stopTimer
                }
                className={this.props.paused ? "fas fa-play" : "fas fa-pause"}></i>
            </div>
            <div className="timer-controller">
                <i
                id="reset"
                onClick={this.props.resetTimer}
                class="fas fa-redo-alt"></i>
            </div>
            </div>
        </div>
        );
    }
}

export default TimerUi;