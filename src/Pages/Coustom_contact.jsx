import React from "react";

const ContactForm = () => {
  return (
    <div className="bg-[#005555] text-gray-900 py-20 px-10 md:px-32 mt-8 min-h-screen">
      <div className="max-w-8xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-300 text-lg">
            Send us a message and we will get back to you shortly.
          </p>
        </div>

        {/* Contact Form and Info Section */}
        <div className="flex flex-col md:flex-row  rounded-2xl shadow-xl border border-green-900 overflow-hidden p-10 md:p-14 gap-10">
          {/* Left Side - Contact Fields */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label className="text-white block mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 text-gray-900 focus:ring-2 focus:ring-gray-500 outline-none transition-all duration-300 hover:shadow-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-white block mb-2">Your Email</label>
                  <input
                    type="email"
                    className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 text-gray-900 focus:ring-2 focus:ring-gray-500 outline-none transition-all duration-300 hover:shadow-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="text-white block mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 text-gray-900 focus:ring-2 focus:ring-gray-500 outline-none transition-all duration-300 hover:shadow-lg"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Your Message</label>
                <textarea
                  rows="4"
                  className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 text-gray-900 focus:ring-2 focus:ring-gray-500 outline-none transition-all duration-300 hover:shadow-lg"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#008080] hover:bg-[#007070] transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Address & Map */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
            <div className="bg-[#003333] w-full p-6 rounded-lg shadow-md border border-gray-500 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-300">📍 123 Street, Mumbai, India</p>
              <p className="text-gray-300">📧 email@example.com</p>
              <p className="text-gray-300">📞 +91 98765 43210</p>
            </div>

            <iframe
              title="Google Map"
              className="w-full h-72 rounded-2xl shadow-md border border-gray-500 transition-all duration-300 hover:shadow-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609853004!2d72.74109784687007!3d19.0821978395417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b75f0f3aaf93%3A0x3b12b3b3c3a3b3a3!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2s!4v1635525812345!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
