import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import BookShelf from './book-shelf';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={};

    }
    componentWillMount() {
        //return user's own requests and other requests made by others for user's books
        this.props.getUserRequests();
    }

    render() {
        return (
            <BookShelf/>
        )
        
    }
}

// function mapStateToProps(state) {

// }
export default connect(null, actions)(UserProfile);