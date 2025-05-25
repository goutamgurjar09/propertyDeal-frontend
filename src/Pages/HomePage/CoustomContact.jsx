import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  submitEnquiryForm,
  resetFormStatus,
} from "../../redux/slices/enquirySlices";
import { showError, showSuccess } from "../../Alert";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup validation schema
const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces")
    .min(3, "Full name must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  message: yup
    .string()
    .required("Message is required")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Message can only contain letters, numbers, and spaces"
    ),
});

const CoustomContact = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { loading, success, error } = useSelector((state) => state.enquiry);

  const onSubmit = async (formData) => {
    const response = await dispatch(submitEnquiryForm(formData));
    if (response.payload?.status) {
      showSuccess(response.payload.message);
    } else {
      showError(response.payload?.message);
    }
  };

  useEffect(() => {
    if (success) {
      reset();
      setTimeout(() => dispatch(resetFormStatus()), 3000);
    }
  }, [success, dispatch, reset]);

  return (
    <div className="text-[#005555] py-12 px-10 md:px-32 ">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold font-serif mb-4">Get in Touch</h2>
          <p className="text-lg text-[#005555]/80">
            Send us a message and we will get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl border border-[#cccccc] overflow-hidden p-10 md:p-14 gap-10 bg-white">
          {/* Left - Contact Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 font-semibold">Your Name</label>
                  <input
                    type="text"
                    {...register("fullname")}
                    className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005555]"
                    placeholder="Enter your name"
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-1/2">
                  <label className="block mb-2 font-semibold">Your Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005555]"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Mobile</label>
                <input
                  type="text"
                  {...register("mobile")}
                  className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005555]"
                  placeholder="Enter Mobile Number"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold">Your Message</label>
                <textarea
                  rows="4"
                  {...register("message")}
                  className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005555]"
                  placeholder="Enter your message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#005555] hover:bg-[#004444] transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Right - Contact Info + Map */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
            <div className="bg-[#f5f5f5] w-full p-6 rounded-xl shadow-md border border-gray-300">
              <h3 className="text-lg font-semibold text-[#005555] mb-2">
                Contact Information
              </h3>
              <p className="text-sm">📍 123 Street, Mumbai, India</p>
              <p className="text-sm">📧 email@example.com</p>
              <p className="text-sm">📞 +91 98765 43210</p>
            </div>

            <iframe
              title="Google Map"
              className="w-full h-72 rounded-xl shadow-md border border-gray-300"
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

export default CoustomContact;
