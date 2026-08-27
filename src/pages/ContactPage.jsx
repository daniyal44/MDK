import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AddressAutocomplete from '../components/AddressAutocomplete';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ContactPage = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    useScrollReveal();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (addressVal) => {
        setFormData(prev => ({ ...prev, address: addressVal }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Show success state
        setTimeout(() => {
            alert(`Thank you ${formData.name}! Your message has been received.`);
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                message: ''
            });
            setIsSubmitted(false);
        }, 500);
    };

    return (
        <article className="container">
            {/* Contact Section */}
            <section className="contact" id="contact" style={{ paddingTop: '140px' }}>
                <div className="contact-content section-content" data-reveal="left">
                    <p className="section-subtitle">{t('contact_subtitle')}</p>
                    <h1 className="h3 section-title">{t('contact_title')}</h1>
                    <p className="section-text">{t('contact_text')}</p>

                    <ul className="contact-list">
                        <li className="contact-list-item">
                            <div className="contact-item-icon" aria-hidden="true">
                                <i className="ri-map-pin-2-line"></i>
                            </div>

                            <div className="wrapper">
                                <h3 className="h4 contact-item-title">Address: </h3>
                                <address className="contact-info">
                                    House No. 490, Block 5 Sector D2, Green Town, Lahore, Pakistan
                                </address>
                            </div>
                        </li>

                        <li className="contact-list-item">
                            <div className="contact-item-icon" aria-hidden="true">
                                <i className="ri-phone-line"></i>
                            </div>

                            <div className="wrapper">
                                <h3 className="h4 contact-item-title">Phone: </h3>
                                <a href="tel:+923230112464" className="contact-info">+92 3230-112464</a>
                            </div>
                        </li>

                        <li className="contact-list-item">
                            <div className="contact-item-icon" aria-hidden="true">
                                <i className="ri-mail-send-line"></i>
                            </div>

                            <div className="wrapper">
                                <h3 className="h4 contact-item-title">Email: </h3>
                                <a href="mailto:m.daniyalkhan490@gmail.com" className="contact-info">m.daniyalkhan490@gmail.com</a>
                                <br />
                                <a href="mailto:ItxMDK@proton.me" className="contact-info">ItxMDK@proton.me</a>
                            </div>
                        </li>

                        <li>
                            <ul className="contact-social-list">
                                <li>
                                    <a 
                                        href="https://www.facebook.com/muhammad.daniyal.522942" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="contact-social-link" 
                                        aria-label="Visit Facebook Profile of Muhammad Daniyal"
                                    >
                                        <div className="tooltip">Facebook</div>
                                        <i className="ri-facebook-fill"></i>
                                    </a>
                                </li>

                                <li>
                                    <a 
                                        href="https://www.google.com/search?q=Muhammad+Daniyal+Zyphuel+ItxMDK" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="contact-social-link" 
                                        aria-label="Search Muhammad Daniyal on Google"
                                    >
                                        <div className="tooltip">Google</div>
                                        <i className="ri-google-fill"></i>
                                    </a>
                                </li>

                                <li>
                                    <a 
                                        href="https://wa.me/923230112464" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="contact-social-link" 
                                        aria-label="Chat with Muhammad Daniyal on WhatsApp"
                                    >
                                        <div className="tooltip">WhatsApp</div>
                                        <i className="ri-whatsapp-fill"></i>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="https://www.linkedin.com/in/muhammad-daniyal490" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="contact-social-link" 
                                        aria-label="Visit LinkedIn Profile of Muhammad Daniyal"
                                    >
                                        <div className="tooltip">LinkedIn</div>
                                        <i className="ri-linkedin-fill"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="contact-form-wrapper" data-reveal="right">
                    <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-wrapper">
                            <label htmlFor="name" className="form-label">{t('contact_lbl_name')}</label>
                            <div className="input-wrapper">
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    placeholder="John Doe" 
                                    className="input-field" 
                                    autoComplete="name" 
                                />
                                <i className="ri-user-line input-icon"></i>
                            </div>
                        </div>

                        <div className="form-wrapper">
                            <label htmlFor="email" className="form-label">{t('contact_lbl_email')}</label>
                            <div className="input-wrapper">
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    placeholder="johndoe@gmail.com" 
                                    className="input-field" 
                                    autoComplete="email" 
                                />
                                <i className="ri-mail-line input-icon"></i>
                            </div>
                        </div>

                        <div className="form-wrapper">
                            <label htmlFor="phone" className="form-label">{t('contact_lbl_phone')}</label>
                            <div className="input-wrapper">
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    id="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required 
                                    placeholder="+1 234-567-8901" 
                                    className="input-field" 
                                    autoComplete="tel" 
                                />
                                <i className="ri-phone-line input-icon"></i>
                            </div>
                        </div>

                        {/* Smart Address Autocomplete Field */}
                        <AddressAutocomplete 
                            value={formData.address}
                            onChange={handleAddressChange}
                        />

                        <div className="form-wrapper">
                            <label htmlFor="message" className="form-label">{t('contact_lbl_msg')}</label>
                            <div className="input-wrapper">
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="input-field" 
                                    required 
                                    placeholder="Write your Message"
                                    rows="4"
                                ></textarea>
                                <i className="ri-chat-3-line input-icon"></i>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            id="submitBtn"
                            disabled={isSubmitted}
                        >
                            {isSubmitted ? 'Sending...' : t('contact_btn_send')}
                        </button>
                    </form>
                </div>
            </section>
        </article>
    );
};

export default ContactPage;
