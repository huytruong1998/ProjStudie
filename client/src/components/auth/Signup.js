import React, { Component } from 'react';
import propTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { registerUser } from '../../action/authActions';
import classnames from "classnames";
import './auth.css';
import { Link } from "react-router-dom";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    }
    render() {
        const { errors } = this.state;

        return (
            <div className="auth-form container-fluid row">

                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">SIGN UP</h1>
                        <div className="authenticate-form-align">
                            <form className="authenticate-input" onSubmit={this.onSubmit}>
                        
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.email
                                        })}
                                        placeholder="EMAIL"
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
                                        name="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.email
                                    })}
                                        placeholder="PASSWORD"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />

                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password2"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.email
                                    })}
                                        placeholder="CONFIRM PASSWORD"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                    />
                                    {errors.password2 && (
                                        <div className="invalid-feedback">{errors.password2}</div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-info btn-block mt-4" href="#">
                                    SIGN UP</button>
                            </form>
                        <div className="sign-up-ask">
                            <p>Already got an account?</p>
                            <Link to="/login">Log in</Link>
                        </div>
                        </div>
                    </div>
                </div>
        
        );
    }
}

SignUp.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(SignUp));