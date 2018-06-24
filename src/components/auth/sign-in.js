import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log(email, password);
        this.props.signinUser({ email, password });
    }
    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render() {
        //handleSubmit is a helper from redux-form and the fields email and password are also from redux-form
        const { handleSubmit, fields: { email, password }} = this.props;

       return (
            <div>
                <div className="headline-container">
                    <h1 className="header">Sign In</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <fieldset className="form-group">
                            <label>Email:</label>
                            <input {...email} className="form-control"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Password:</label>
                            <input {...password} type="password" className="form-control"/>
                        </fieldset>
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
                <p>Don't have an account yet? <Link to={'/signup'}>Sign up now.</Link></p>
            </div>
       );
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}
export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);