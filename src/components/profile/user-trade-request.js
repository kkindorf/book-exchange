import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class UserTradeRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.returnBook = this.returnBook.bind(this);
    }
    returnBook(e) {
        let bookId = e.target.value;
        this.props.returnBook(bookId);

    }
    render() {
        if(!this.props.tradeAccepted && this.props.tradeRequested) {
            return (
                <div className="request-container">
                    <p><a href={this.props.previewLink}>{this.props.title}</a></p>
                    <div className="requestor-data">
                    <p>trade not accepted yet</p>
                    </div>
                </div>
            )
        }
        else if(this.props.tradeAccepted){
            return (
                <div className="request-container">
                    <div className="requestor-data">
                        <p>Your trade for <a href={this.props.previewLink}>{this.props.title}</a> has been accepted. You can hold onto it for as long as you want.</p>
                        <button onClick={this.returnBook} value={this.props.bookId}>Return Book</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="request-container">
                    <div className="requestor-data">
                        <p>Successful return!</p>
                    </div>
                </div>
            )
             
        }

    }
}


export default connect(null, actions)(UserTradeRequest);