import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utility/utility';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Layout from '../../hoc/Layout/Layout';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    errorMsgs = {
        'EMAIL_NOT_FOUND': 'We did not found this email.',
        'INVALID_PASSWORD': 'The password is invalid.',
        'EMAIL_EXISTS': 'This email is already registered.',
        'WEAK_PASSWORD : Password should be at least 6 characters': 'The password should be at least 6 characters.'
    }

    componentDidMount(){
        if (this.props.authRedirectPath !== '/goals'){
            this.props.onSetAuthRedirectPath();
        }
    }



    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
        if (this.props.loading){
            form = <Spinner />;
        }
        let errorMsg = null
        if (this.props.error) {
            errorMsg = <div className='error-msg'>
            {this.errorMsgs[this.props.error.message] || this.props.error.message}
            </div>}; //message comes from firebase
        let authRedirect = null;
        if (this.props.isAuth) authRedirect = <Redirect to={this.props.authRedirectPath} />;
        return (
            <Layout>
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMsg}
                    <h2 className={classes.Title}>{!this.state.isSignup ? 'SIGN IN' : 'REGISTRATION'}</h2>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Primary" width="100%">SUBMIT</Button>
                    </form>
                    <Button 
                    width="100%"
                    clicked={this.switchAuthModeHandler}
                    btnType="Secondary">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'REGISTRATION'}</Button>
                </div>
            </Layout>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/goals'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);