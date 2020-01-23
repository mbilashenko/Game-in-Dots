import React from "react";
import PropTypes from "prop-types";

import "./index.sass";

const Leaders = props => {
  const { leaders, limit } = props;

  // Limit leaders array
  if (limit > 0) {
    leaders.length = Math.min(leaders.length, limit);
  }

  return (
    <div className="game-leaders">
      <div className="game-leaders__title">
        Leader Board
      </div>
      <ul className="game-leaders__list">
        {leaders.length > 0 &&
          leaders.map(value => (
            <li key={value.id}>
              <span>{value.winner}</span>
              <span>{value.date}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

Leaders.propTypes = {
  leaders: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired
};

export default Leaders;
