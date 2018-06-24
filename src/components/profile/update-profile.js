import React, { Component } from 'react';

export default (props) => {
    return (
        <div>
            <h1>Update Your Address</h1>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="Address" onChange={props.onAddressChange} defaultValue={props.address}/>
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input type="text" className="form-control" placeholder="State" onChange={props.onStateChange} defaultValue={props.state}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}
