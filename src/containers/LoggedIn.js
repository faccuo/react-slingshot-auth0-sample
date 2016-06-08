import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import FormPage from '../components/FormPage';
import Loading from '../components/Loading';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

import { logout, sendUserData  } from '../actions/actions';

class LoggedIn extends Component {

  logout() {
    this.props.dispatch(logout());
  }

  send(data) {
    this.props.dispatch(sendUserData(data));
  }

  render() {
    const { isFetching, finished, message } = this.props;
    const logo = require('../images/auth0-logo-light.png');

    return (<div className="container">
      <AppBar
        iconElementRight={<IconButton onClick={this.logout.bind(this)}><ExitToApp/></IconButton>}
        iconElementLeft={<img src={logo} style={{ height: 47 }}></img>}
      />
      <Paper>
        {
          isFetching &&
          <Loading/>
        }
        {
          !isFetching &&
          <FormPage onSubmit={this.send.bind(this)}/>
        }
        <Snackbar
          open={finished}
          message={message}
          autoHideDuration={4000}/>
      </Paper>
    </div>);
  }

}

LoggedIn.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isFetching: state.userData.isFetching,
    finished: state.userData.finished,
    message: state.userData.message || ''
  };
}

export default connect(mapStateToProps)(LoggedIn);
