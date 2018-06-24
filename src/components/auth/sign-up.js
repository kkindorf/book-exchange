import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signup extends Component {
    handleFormSubmit(formProps) {
        //call action creator to sign up the user
        //if the form is not valid redux form will not allow the form to be submitted
        this.props.signupUser(formProps);
         
    }
    renderAlert() {
        console.log(this.props.errorMessage)
        if(this.props.errorMessage) {
            
            return ( <div className="alert alert-danger">
                        {this.props.errorMessage}
                    </div>
            );
            
        }
    }
    render() {
        const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        //password.error is property given to us by redux form
        
        //if this returns true && this returns true && this then return the last argument
        //{password.touched && password.error && <div className="error">{password.error}</div>}

        return (
            <div>
            <div className="headline-container">
                    <h1 className="header">Sign Up</h1>
                    <p className="headline">Before you can start adding books to your bookshelf or propose trades with our members, you need to have an account first!</p>
                </div>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input className="form-control" {...email}/>
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input className="form-control" {...password} type="password"/>
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <input className="form-control" {...passwordConfirm} type="password"/>
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            <p>Already have an account? <Link to={'/signin'}>Sign in now.</Link></p>
            </div>
        );
    }
}
function validate(formProps) {
    const errors = {};
    if(!formProps.email) {
        errors.email = "Please enter an email";
    }
    if(!formProps.password) {
        errors.password = "Please enter a password";
    }
    if(!formProps.passwordConfirm) {
        errors.passwordConfirm = "Please confirm your password";
    }
    if(formProps.password !== formProps.passwordConfirm) {
        errors.password = "passwords must match";
    }

    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}
export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);