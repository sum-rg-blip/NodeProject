import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      // Assuming backend is running on 5000, configuring proxy or direct URL
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.data.success) {
        setStatus({ message: response.data.message, type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: response.data.message, type: 'error' });
      }
    } catch (error) {
      setStatus({ message: 'An error occurred. Please try again.', type: 'error' });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-lavender font-outfit flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[900px] relative">

        {/* Contact Card */}
        <section className="bg-white rounded-xl flex flex-col md:flex-row shadow-premium overflow-hidden min-h-[550px]">
          <div className="flex-[0.9] bg-white p-[40px] flex flex-col relative text-primary-navy">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden mb-[30px] border-[3px] border-bg-lavender">
              <img src="/img/hero-doctor.png" alt="Mecura Pharmacist" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[2.5rem] md:text-[2.8rem] leading-[0.95] mb-[20px] font-medium">Store <br />Pharmacy</h1>
            <p className="text-gray-text text-[0.95rem] leading-[1.6] mb-[30px]">Providing operational healthiness and clinically tested medical solutions for
              over 20 years. Your health is our priority.</p>

            <div className="mb-auto">
              <div className="flex items-center gap-[15px] mb-[20px]">
                <div className="w-[40px] h-[40px] bg-bg-lavender rounded-[12px] flex justify-center items-center">
                  <i className="fas fa-envelope text-[1.1rem] text-primary-navy"></i>
                </div>
                <div>
                  <p className="text-[0.8rem] text-gray-text">Support Email</p>
                  <p className="font-medium">Naima@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-[15px] mb-[20px]">
                <div className="w-[40px] h-[40px] bg-bg-lavender rounded-[12px] flex justify-center items-center">
                  <i className="fas fa-phone-alt text-[1.1rem] text-primary-navy"></i>
                </div>
                <div>
                  <p className="text-[0.8rem] text-gray-text">Quick Contact</p>
                  <p className="font-medium">+252611190772</p>
                </div>
              </div>

              <div className="flex items-center gap-[15px] mb-[20px]">
                <div className="w-[40px] h-[40px] bg-bg-lavender rounded-[12px] flex justify-center items-center">
                  <i className="fas fa-map-marker-alt text-[1.1rem] text-primary-navy"></i>
                </div>
                <div>
                  <p className="text-[0.8rem] text-gray-text">Headquarters</p>
                  <p className="font-medium text-sm">Degmadda Hodan ka soo horjeedka Hayat Market</p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex-[1.1] p-[40px] bg-gray-light text-primary-navy">
            <h2 className="text-[2.2rem] mb-[10px] font-medium">Send a Message</h2>
            <p className="text-gray-text mb-[40px] text-[0.9rem]">We'll get back to you within 2-4 business hours.</p>

            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-0 md:gap-[20px]">
                <div className="mb-[25px] flex-1">
                  <label className="block text-[0.85rem] font-semibold mb-[10px]">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full p-[16px] bg-white border border-[#efefef] rounded-lg text-[0.95rem] outline-none transition-all duration-300 text-black focus:border-accent-teal focus:shadow-[0_0_15px_rgba(129,212,250,0.1)]"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-[25px] flex-1">
                  <label className="block text-[0.85rem] font-semibold mb-[10px]">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email@gmail.com"
                    className="w-full p-[16px] bg-white border border-[#efefef] rounded-lg text-[0.95rem] outline-none transition-all duration-300 text-black focus:border-accent-teal focus:shadow-[0_0_15px_rgba(129,212,250,0.1)]"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-[25px] flex-1">
                <label className="block text-[0.85rem] font-semibold mb-[10px]">How can we help?</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us about your pharmacy needs..."
                  className="w-full p-[16px] bg-white border border-[#efefef] rounded-lg text-[0.95rem] outline-none transition-all duration-300 text-black focus:border-accent-teal focus:shadow-[0_0_15px_rgba(129,212,250,0.1)] resize-none"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="w-full p-[20px] bg-primary-navy text-white border-none rounded-[50px] text-[1rem] font-semibold cursor-pointer transition-all duration-300 mt-[15px] flex justify-center items-center gap-[10px] hover:scale-[0.98] hover:bg-black disabled:opacity-50" id="submitBtn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <>Submit Request <i className="fas fa-paper-plane"></i></>}
              </button>
              {status.message && (
                <p id="formStatus" className={`text-center mt-[20px] font-medium ${status.type === 'success' ? 'text-[#2ecc71]' : 'text-[#e74c3c]'}`}>{status.message}</p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );

};

export default Contact;
