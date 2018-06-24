import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RequestFromOther from './request-from-other';
import UpdateProfile from './update-profile';
import UserTradeRequest from './user-trade-request';

class BookShelf extends Component {
    constructor(props) {
        super(props);
        this.state = {state: "", address: "", updateProfileClicked: false};
        this.stateChange = this.stateChange.bind(this);
        this.addressChange = this.addressChange.bind(this);
        this.submitAddress = this.submitAddress.bind(this);
        this.updateProfileButton = this.updateProfileButton.bind(this);

    }
    componentWillMount() {
        this.props.getUserBookShelf();
        this.props.getUserAddress();  
    }
    updateProfileButton(e) {
        this.setState({updateProfileClicked: true, state: this.props.userState, address: this.props.userAddress});
    }
    stateChange(e) {
       
        this.setState({state: e.target.value});
    }
    addressChange(e) {
        this.setState({address: e.target.value});
    }
    submitAddress(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.updateProfile(this.state)
        this.setState({updateProfileClicked: false})
    }
    render() {
      
        if(!this.props.bookShelfLoaded) {
            return (
                <div>
                    <h1>Loading Bookshelf...</h1>
                </div>
            )
        }
        else {
            let userTradeRequests = this.props.userTradeRequests.map(function(request, i) {
        
                return (
                    <li className="list-group-item" key={i}>
                        <UserTradeRequest previewLink = {request.previewLink}
                                          title={request.title}
                                          bookId = {request._id}
                                          tradeAccepted = {request.tradeAccepted}
                                          tradeRequested = {request.tradeRequested}/>

                    </li>
                )
            })
            let requestsFromOther = this.props.tradeRequestsFromOther.map(function(request, i) {

                return (
                    <li className="list-group-item" key={i}>
                    <RequestFromOther previewLink = {request.book.previewLink}
                                      title={request.book.title}
                                      requestorId={request.requestorId}
                                      bookId={request.book._id}
                                      requestorEmail={request.requestorId.email}
                                      requestorState={request.requestorId.state}
                                      requestorAddress={request.requestorId.address}
                                      tradeAccepted = {request.book.tradeAccepted} />
                    </li>
                )
            })
            
            let bookShelf = this.props.userBookShelf.map((book, i) => {
                return (
                    <div className="book-container" key = {i}>
                        <a href={book.previewLink} title={book.title}>
                            <img src={book.image}/>
                        </a>
                    </div>
                )
            })
            return (
                <div>
                    {!this.state.updateProfileClicked ? 
                        <div className="profile-container">
                            <div className="headline-container">
                            <h1>Your Bookshelf</h1>
                            <p>Use your bookshelf to view the books you own, update your address, approve requests that others have made for your books, or see the status of requests you have made.</p>
                            </div>
                            <button className="btn btn-info" onClick={this.updateProfileButton}>Update Address</button>
                            <h2>Your Books</h2>
                            {bookShelf.length ? 
                            <div className="book-shelf">
                                {bookShelf}
                            </div> 
                            :
                            <p>You don't have any books saved yet.</p>
                            }
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Requests you have made</h2>
                                    {userTradeRequests.length ?
                                    <ul className="list-group">{userTradeRequests}</ul>
                                    : <p>You haven't made any requests yet.</p>
                                    }
                                    
                                </div>
                                <div className="col-sm-6">
                                    <h2>Requests for your books</h2>
                                    {requestsFromOther.length ? 
                                    <ul className="list-group">{requestsFromOther}</ul>
                                    :
                                    <p>Nobody has made a request for one of your books.</p>
                                    }
                                    
                                </div>
                            </div>
                            
                        </div> 
                        : 
                        <div className="profile-container">
                            <div className="headline-container">
                            <h1>Your Bookshelf</h1>
                            <p>Use your bookshelf to view the books you own, update your address, approve requests that others have made for your books, or see the status of requests you have made.</p>
                            </div>
                            <UpdateProfile onSubmit={this.submitAddress}
                                    onAddressChange={this.addressChange}
                                    onStateChange={this.stateChange}
                                    state={this.props.userState}
                                    address={this.props.userAddress}/>
                            <h2>Your Books</h2>
                            {bookShelf.length ? 
                            <div className="book-shelf">
                                {bookShelf}
                            </div> 
                            :
                            <p>You don't have any books saved yet.</p>
                            }
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Requests you have made</h2>
                                    {userTradeRequests.length ?
                                    <ul className="list-group">{userTradeRequests}</ul>
                                    : <p>You haven't made any requests yet.</p>
                                    }
                                    
                                </div>
                                <div className="col-sm-6">
                                    <h2>Requests for your books</h2>
                                    {requestsFromOther.length ? 
                                    <ul className="list-group">{requestsFromOther}</ul>
                                    :
                                    <p>Nobody has made a request for one of your books. </p>
                                    }
                                    
                                </div>
                            </div>
                            
                        </div> 
                        
                    }
                        
                    
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        bookShelfLoaded: state.bookResult.bookShelfLoaded,
        userBookShelf: state.bookResult.userBookShelf,
        userTradeRequests: state.bookResult.userTradeRequests,
        tradeRequestsFromOther: state.bookResult.tradeRequestsFromOther,
        userAddress: state.auth.address,
        userState: state.auth.state
        
    }
}

export default connect(mapStateToProps, actions)(BookShelf);