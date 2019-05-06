import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../action/authActions';
import './auth.css'
import { Link } from "react-router-dom";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.submitHandler.bind(this);
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
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
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
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-info btn-block mt-4" href="#">
                                    LOG IN</button>
                            </form>
                            <div className="sign-up-ask">
                                <p>No account yet?</p>
                                <Link to="/signup">Sign up</Link>
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
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
