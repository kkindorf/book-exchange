import React, { Component } from 'react';

export default (props) => {
    return (
        <div className="search-bar">
            <h1>Search for books</h1>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label className="sr-only">Search for books</label>
                    <input type="text" className="form-control"  placeholder="Let's find your next great read." onChange={props.onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}