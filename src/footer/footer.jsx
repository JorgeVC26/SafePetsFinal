import React from "react";
import './footer.css';

import fb from "../img/facebook.png"
import twitter from "../img/twitter.png"
import insta from "../img/instagram.png"

const Footer=() => {
    return (
        <div className="footer">
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links-div">
                        <h4>
                            For Bussiness
                        </h4>
                        <a href="">
                            <p>Servicios</p>
                        </a>
                    </div>
                    <div className="sb__fotter-links_div">
                        <h4>Resources</h4>
                        <a href="">
                            <p>Blog</p>
                        </a>
                        <a href="">
                            <p>About Us</p>
                        </a>
                        <a href="">
                            <p>Testimonials</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Legal</h4>
                        <a href="">
                            <p>Terms & Conditions</p>
                        </a>
                </div>
                <div className="sb__footer-links_div">
                        <h4>Company</h4>
                        <a href="">
                            <p>Servicios</p>
                        </a>
                        <a href="">
                            <p>Contacto</p>
                        </a>
                        </div>
                        <div className="sb__footer-links_div">
                            <h4>Coming soon on</h4>
                            <div className="socialmedia">
                            <p><img src={fb} alt=""/></p>
                            <p><img src={twitter} alt=""/></p>
                            <p><img src={insta} alt=""/></p>
                        </div>
                        </div>
                        </div>

                        <hr></hr>

                        <div className="sb__footer-below">
                            <div className="sb__footer-copyright">
                                <p>
                                    @{new Date().getFullYear()} SafePets. All right reserved.
                                </p>
                            </div>
                            <div className="sb__footer-below-links">
                                <a href=""><div><p>Terms & Conditions</p></div></a>
                                <a href=""><div><p>Privacy</p></div></a>
                                <a href=""><div><p>Security</p></div></a>
                                <a href=""><div><p>Cookie Declaration</p></div></a>
                            </div>
                        </div>
        </div>
        </div>
    )
}

export default Footer;