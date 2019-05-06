import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

export default class TugOfWar extends GameComponent {
  constructor(props) {
    super(props);
    var myId = this.getMyUserId();
    var defaultValue = {};
    defaultValue[myId] = 0;
    this.getSessionDatabaseRef().update(defaultValue);
    this.state = defaultValue;
  }

  onSessionDataChanged(data) {
    // data = {
    //   <user-id-1>: 100,
    //   <user-id-2>: 200,
    // }
    //
    this.setState(data);
    console.log("change", data);
  }

  componentDidMount() {
    document.body.onkeyup = e => {
      if (e.keyCode === 32) {
        var user = this.getMyUserId();
        var newCounter = this.state[user] + 1;
        this.getSessionDatabaseRef()
          .child(user)
          .set(newCounter);
      }
    };
  }

  componentWillUnmount() {
    document.body.onkeyup = null;
  }

  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>
        {UserApi.getName(user_id) + ": " + this.state[user_id]}
      </li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    return (
      <div>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>{users}</ul>
      </div>
    );
  }
}
