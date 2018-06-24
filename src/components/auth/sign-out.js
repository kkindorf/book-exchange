import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }
    render() {
        return (
            <div>
            We're so sorry to see you go! <Link to={'/'}>See what other books people are adding now!</Link>
            </div>
        );
        
    }
}

export default connect(null, actions)(Signout);