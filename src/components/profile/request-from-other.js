import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RequestFromOther extends Component {
    constructor(props) {
        super(props);
        this.state = { bookLentOut: false};
        this.approveRequest = this.approveRequest.bind(this);
    }
    
    approveRequest(e) {
        let bookId = e.target.value;
        this.setState({ bookLentOut: true});
        this.props.approveBookRequest(bookId);
    }
    
    render() {
         if(this.state.bookLentOut || this.props.tradeAccepted) {
            return (
                <div className="request-container">
                    <p><a href={this.props.previewLink}>{this.props.title}</a></p>
                    <p>Lent Out to {this.props.requestorEmail}</p> 
                </div>
            )
        }
        else if(!this.props.tradeAccepted) {
            return (
                <div className="request-container">
                    <p><a href={this.props.previewLink}>{this.props.title}</a></p>
                    <div className="requestor-data">
                        <p>{this.props.requestorEmail} from {this.props.requestorAddress}, {this.props.requestorState} wants to borrow your book.</p>
                        <button className="btn btn-success" onClick={this.approveRequest} value={this.props.bookId}>Approve Request</button>
                    </div>
                </div>

            )
        }
        
       
    }
}




export default connect(null, actions)(RequestFromOther);