import React from "react";
import PropTypes from "prop-types";

import "./index.sass";

const GameMessage = props =>
  props.message !== "" && <div className="game-message">{props.message}</div>;

GameMessage.propTypes = {
  message: PropTypes.string.isRequired
};

GameMessage.defaultProps = {
  message: ""
};

export default GameMessage;
