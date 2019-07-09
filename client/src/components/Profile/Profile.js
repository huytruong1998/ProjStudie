import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editprofile, getallProfile} from '../../action/profile';
import './Profile.css';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import classnames from 'classnames';
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            address:'',
            postalcode:'',
            city:'',
            country:'',
            birthdate:'',
            gender:'',
            errors:{}
        }
        this.onChange = this.onChange.bind(this);

    }
    componentWillMount() {
        this.props.getallProfile(this.props.match.params.id);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            const product = nextProps.profile;
            // If product field doesnt exist, make empty string
            product.firstname = !isEmpty(product.firstname) ? product.firstname : '';
            product.lastname = !isEmpty(product.lastname) ? product.lastname : '';
            product.address = !isEmpty(product.address) ? product.address : '';
            product.country = !isEmpty(product.country) ? product.country : '';
            product.postalcode = !isEmpty(product.postalcode) ? product.postalcode : '';
            product.city = !isEmpty(product.city) ? product.city : null;
            product.birthdate = !isEmpty(product.birthdate) ? product.birthdate : null;
            product.gender = !isEmpty(product.gender) ? product.gender : null;
          

            this.setState({
                firstname: product.firstname,
                lastname: product.lastname,
                address: product.address,
                country: product.country,
                postalcode: product.postalcode,
                city: product.city,
                birthdate: product.birthdate,
                gender: product.gender
            })


        }
    }
    updateprofile(){
        const profileData={
            profile: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                address: this.state.address,
                postalcode: this.state.postalcode,
                city: this.state.city,
                country: this.state.country,
                gender: this.state.gender,
                birthdate: this.state.birthdate,
            }
        }

        this.props.editprofile(profileData,this.props.match.params.id)
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const {errors} = this.state;
        return <div className="profile-form container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">PROFILE INFO</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                placeholder="First Name"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.onChange}
                            />
                        
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                placeholder="Last Name"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                placeholder="Birth Date"
                                name="birthdate"
                                value={this.state.birthdate}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <select id="lang" className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.tag
                            })} onChange={this.onChange} value={this.state.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                placeholder="Address"
                                name="address"
                                value={this.state.address}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                placeholder="Postal Code"
                                name="postalcode"
                                value={this.state.postalcode}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                placeholder="City"
                                name="city"
                                value={this.state.city}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                placeholder="Country"
                                name="country"
                                value={this.state.country}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" onClick={() => this.updateprofile()} className="btn btn-info btn-block mt-4">
                            APPLY</button>
                    </form>
                    
                </div>
            </div>
        </div>
    }
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.auth.profile
});

export default connect(
    mapStateToProps,
    { getallProfile ,editprofile }
)(Profile);

