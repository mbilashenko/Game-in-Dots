import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getLeaders } from "../../actions/creators";
import { appDefaultState, appPropTypes } from "../../reducers/app";
import { apiDefaultState, apiPropTypes } from "../../reducers/api";

import Game from "../Game";
import Leaders from "../../components/Leaders";

import "./index.sass";

class App extends React.Component {
  componentDidMount() {
    // Get list off all leaders
    this.props.getLeaders();
  }

  render() {
    return (
      <div className="app container">
        <div className="app__columns columns">
          <div className="app__column column is-8-widescreen">
            <Game />
          </div>
          <div className="app__column column">
            <Leaders leaders={this.props.api.leaders} limit={5} />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.exact(appPropTypes).isRequired,
  api: PropTypes.exact(apiPropTypes).isRequired,
  getLeaders: PropTypes.func.isRequired
};

App.defaultProps = {
  app: appDefaultState,
  api: apiDefaultState
};

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = { getLeaders };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
