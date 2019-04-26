import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../action/authActions';
import './auth.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
        console.log(this.state);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div className="login">
                <div className="auth-form container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">LOG IN</h1>
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className='form-control form-control-lg'
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className='form-control form-control-lg'
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                            <div className="sign-up-ask">
                                <p>No account yet?</p>
                                <a href="#">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
