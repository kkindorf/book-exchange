import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {bookSaved: false};
        this.saveBook = this.saveBook.bind(this);
    }
    saveBook(e) {
        this.setState({bookSaved: true});
        this.props.saveBookData({
            title: this.props.title,
            image: this.props.image,
            authors: this.props.authors,
            previewLink: this.props.previewLink
        })
    }
    render() {
        return (
            <div className="panel panel-default">
            
                <div className="panel-body">
                    <div className="result-container">
                        <a href={this.props.previewLink}>
                            <p>{this.props.title}</p>
                            <img src={this.props.image} alt=""/>
                        </a>
                        <div className="book-details">
                            <p>Written by: {this.props.authors}</p>
                            <p>Published: {this.props.publishedDate}
                            </p>
                        </div>
                    </div>
                    {!this.state.bookSaved ? <button className="btn btn-success" onClick={this.saveBook}>Add To Your List</button> :
                    <p className="saved-book">Book Saved To List</p>
                    }
                </div>
            </div>
        )
    }
}
export default connect(null, actions)(BookDetail);