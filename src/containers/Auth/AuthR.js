import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import classes from './Auth.module.css';
import Title from "../../components/Title/Title";
import Dismiss from "../../components/UI/Dismiss/Dismiss";
import WithFlash from "../../components/UI/WithFlash/WithFlash";
import { Redirect } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utility/utility';


class Auth extends Component {
    state = {
        flash: false,
        flashMsg: '',
        username: '',
        password: '',
        toLogin: false,
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
    };
    componentDidMount(){
        if (this.props.authRedirectPath !== '/'){
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
    handleSubmit(e) {
        e.preventDefault();
/*         if (password.length > 7 && username.length > 3) {
            axios.post("/login", { username, password }).then(res => {
                console.log("errMsg", res.data.errMsg);
                console.log("res", res);
                if (res.data.errMsg) {
                    setFlashMsg(res.data.errMsg);
                    setFlash(true);
                    console.log(res.data.errMsg);
                }
                console.log(res.data.toString());
                if (res.data.toString() === "OK") {
                    setToLogin(true);
                    console.log("allowed to log in");
                }

            });
        } else {
            setFlash(true);
            if (password.length < 8) setFlashMsg("Please provide a proper password");
            if (username.length < 4) setFlashMsg("Please provide an email.");
        } */
    }
    
    render (){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let formContent = formElementsArray.map(formElement => (
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
            formContent = <Spinner />;
        }
        let errorMessage = null;
        if (this.props.error) errorMessage = (<p>{this.props.error.message}</p>); //message comes from firebase
        let authRedirect = null;
        if (this.props.isAuth) authRedirect = <Redirect to={this.props.authRedirectPath} />;
        return (
        <Layout>
            <Dismiss></Dismiss>
            {this.flash && <WithFlash flash={this.flash} msg={this.flashMsg} severity='error'></WithFlash>}
            <form action="login" method="post">
                <Title name="Login"></Title>
                {formContent}
                <input type="submit" className="submitBtn" value="LOG IN" onClick={this.handleSubmit} />
            </form>
            <div className="toTheMiddle"><Link to={"/forgot"}> I forgot my password.</Link></div>
            <div className="toTheMiddle">Don't have an account? <Link to="/register">Register.</Link></div>
            {this.toLogin && <Redirect to='/goals' />}
        </Layout>);
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
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
