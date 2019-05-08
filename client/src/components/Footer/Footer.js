import React, { Component } from 'react';
import './Footer.css';


class Footer extends Component {
    render() {
        return (
          <div id="Footer">
                <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                            <h6><b>TOP CATEGORIES</b></h6>
                            <ul>
                                <li><b><a href="#">Clothes</a></b></li>
                                <li><b><a href="#">Electronics</a></b></li>
                                <li><b><a href="#">Household Item</a></b></li>
                                <li><b><a href="#">Accessories</a></b></li>
                            </ul>
                    </div>
                        <div className="col-sm-4">
                            <h6><b>CUSTOMER SUPPORT</b></h6>
                            <ul>
                                <li><b><a href="#">About Us</a></b></li>
                                <li><b><a href="#">Contact Us</a></b></li>
                                <li><b><a href="#">Returns</a></b></li>
                                <li><b><a href="#">Shipping Info</a></b></li>
                                <li><b><a href="#">Payment</a></b></li>
                            </ul>

                        </div>
                        <div className="col-sm-4">
                        <h6><b>SUBCRIBE NOW WITH SPECIAL DISCOUNT</b></h6>
                        <form className='form-sub'>
                            <p><input className='sub-input' type="text"/> <button className='sub-button'>SUBSCRIBE</button></p>
                        </form>
                           <div className="social-media">
                                <h6><b>Follow us in scoial media</b></h6>
                                <i className="contact-icon fab fa-facebook-f"></i>
                                <i className="contact-icon fab fa-instagram"></i>
                                <i className="contact-icon fab fa-twitter"></i>
                                <i className="contact-icon fab fa-youtube"></i>
                           </div>
                        </div>
                </div>
                </div>
          </div>
        );
    }
}

export default Footer;