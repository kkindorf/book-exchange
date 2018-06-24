import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class BookBlock extends Component {
    constructor(props) {
        super(props);
        this.requestToLend = this.requestToLend.bind(this);
    }

    requestToLend() {
        this.props.sendBookRequest(this.props.id);
    }
    
    render() {
        if(this.props.tradeRequested && !this.props.tradeAccepted) {
            return (
                <div className="book-container">
                    <a href={this.props.previewLink} title={"Preview "+this.props.title}>
                    <img src={this.props.image} alt=""/>
                    </a>
                    <p>Trade Pending</p>
                </div>
            )
            
            
        }
        else if(this.props.tradeRequested && this.props.tradeAccepted) {
            return (
                <div className="book-container">
                    <a href={this.props.previewLink} title={"Preview "+this.props.title}>
                    <img src={this.props.image} alt=""/>
                    </a>
                    <p>Already Traded</p>
                </div>
            )
           
        }
        else {
            return (
                <div className="book-container">
                    <span className="display-none">{this.props.id}</span>
                    {this.props.errorMessage ? <h3 alert={this.props.errorMessage}>{this.props.errorMessage}</h3> : ""}
                    <a href={this.props.previewLink} title={"Preview "+this.props.title}>
                    <img src={this.props.image} alt=""/>
                    </a>
                    <button className="btn btn-success" onClick={this.requestToLend}>Request Book</button>
                </div>
            )
        }
    }
}

export default connect(null, actions)(BookBlock);