import React, { useState } from "react";
import img from "../assets/image copy.png";

const BookingPage = () => {
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyName: "",
    propertyAddress: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
    termsAccepted: false,
  });

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyName: "",
    propertyAddress: "",
    message: "",
    file: null,
    preferredContact: "Email",
    termsAccepted: false,
  });

  const bookings = [
    {
      id: 1,
      image: img,
      propertyName: "Luxury Villa",
      userName: "Amit Sharma",
      contact: "+91 98765 43210",
      email: "amit.sharma@example.com",
      status: "Active",
    },
    {
      id: 2,
      image: img,
      propertyName: "Ocean View Apartment",
      userName: "Priya Mehta",
      contact: "+91 87654 32109",
      email: "priya.mehta@example.com",
      status: "Pending",
    },
    {
      id: 3,
      image: img,
      propertyName: "City Center Flat",
      userName: "Rohan Verma",
      contact: "+91 76543 21098",
      email: "rohan.verma@example.com",
      status: "Closed",
    },
    {
      id: 3,
      image: img,
      propertyName: "City Center Flat",
      userName: "Rohan Verma",
      contact: "+91 76543 21098",
      email: "rohan.verma@example.com",
      status: "Closed",
    },
    {
      id: 3,
      image: img,
      propertyName: "City Center Flat",
      userName: "Rohan Verma",
      contact: "+91 76543 21098",
      email: "rohan.verma@example.com",
      status: "Closed",
    },
    {
      id: 3,
      image: img,
      propertyName: "City Center Flat",
      userName: "Rohan Verma",
      contact: "+91 76543 21098",
      email: "rohan.verma@example.com",
      status: "Closed",
    },
    {
      id: 3,
      image: img,
      propertyName: "City Center Flat",
      userName: "Rohan Verma",
      contact: "+91 76543 21098",
      email: "rohan.verma@example.com",
      status: "Closed",
    },
    {
      id: 3,
      image: img,
      propertyName: "City Center Flat",
      userName: "Rohan Verma",
      contact: "+91 76543 21098",
      email: "rohan.verma@example.com",
      status: "Closed",
    },
  ];

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInquiryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInquiryForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    console.log("Booking Submitted", bookingForm);
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted", inquiryForm);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Booking Table */}
      <div className="overflow-x-auto p-5 mt-24 bg-gray-800 rounded-lg shadow-xl">
        <table className="min-w-full bg-gray-800 border border-gray-700 shadow-lg rounded-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-gray-200">Image</th>
              <th className="py-3 px-4 text-left text-gray-200">Property Name</th>
              <th className="py-3 px-4 text-left text-gray-200">User Name</th>
              <th className="py-3 px-4 text-left text-gray-200">Contact</th>
              <th className="py-3 px-4 text-left text-gray-200">Email</th>
              <th className="py-3 px-4 text-left text-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-700 transition-all duration-300">
                <td className="py-2 px-4">
                  <img
                    src={booking.image}
                    alt="Property"
                    className="w-12 h-12 object-cover rounded-full shadow-md hover:shadow-xl transition-all duration-300"
                  />
                </td>
                <td className="py-2 px-4">{booking.propertyName}</td>
                <td className="py-2 px-4">{booking.userName}</td>
                <td className="py-2 px-4">{booking.contact}</td>
                <td className="py-2 px-4">
                  <a
                    href={`mailto:${booking.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {booking.email}
                  </a>
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      booking.status === "Active"
                        ? "bg-green-600 text-green-200 hover:bg-green-500"
                        : booking.status === "Pending"
                        ? "bg-yellow-600 text-yellow-200 hover:bg-yellow-500"
                        : "bg-red-600 text-red-200 hover:bg-red-500"
                    } transition-all duration-300`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Form */}
      <div className="mt-8 bg-gray-800 p-12 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 p-2">Book a Property Viewing</h3>
        <form onSubmit={handleSubmitBooking}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={bookingForm.name}
              onChange={handleBookingChange}
              placeholder="Your Name"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={bookingForm.email}
              onChange={handleBookingChange}
              placeholder="Email Address"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              value={bookingForm.phone}
              onChange={handleBookingChange}
              placeholder="Phone Number"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="propertyName"
              value={bookingForm.propertyName}
              onChange={handleBookingChange}
              placeholder="Property Name"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="propertyAddress"
              value={bookingForm.propertyAddress}
              onChange={handleBookingChange}
              placeholder="Property Address"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="preferredDate"
              value={bookingForm.preferredDate}
              onChange={handleBookingChange}
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="preferredTime"
              value={bookingForm.preferredTime}
              onChange={handleBookingChange}
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="notes"
              value={bookingForm.notes}
              onChange={handleBookingChange}
              placeholder="Additional Notes"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        

          <div className="mt-4 flex justify-start items-center space-x-2 ml-8">
  <label className="flex items-center space-x-2 text-sm">
    <input
      type="checkbox"
      name="termsAccepted"
      checked={inquiryForm.termsAccepted}
      onChange={handleInquiryChange}
      className="form-checkbox"
    />
    {/* <span>I accept the Terms and Conditions</span> */}
    <span>    "I acknowledge that I have read, understood, and agree to abide by the Terms and Conditions, Privacy Policy, and other relevant agreements governing the use of this platform and services."
    </span>

  </label>
</div>


          <button
            type="submit"
            className="mt-6  w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
          >
           Book Viewing
          </button>

        </form>
      </div>

      {/* Inquiry Form */}
      <div className="mt-8 bg-gray-800 p-12 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold mb-4 p-2">Send an Inquiry</h3>
        <form onSubmit={handleSubmitInquiry}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={inquiryForm.name}
              onChange={handleInquiryChange}
              placeholder="Your Name"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={inquiryForm.email}
              onChange={handleInquiryChange}
              placeholder="Email Address"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              value={inquiryForm.phone}
              onChange={handleInquiryChange}
              placeholder="Phone Number"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="propertyName"
              value={inquiryForm.propertyName}
              onChange={handleInquiryChange}
              placeholder="Property Name"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="propertyAddress"
              value={inquiryForm.propertyAddress}
              onChange={handleInquiryChange}
              placeholder="Property Address"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={inquiryForm.message}
              onChange={handleInquiryChange}
              placeholder="Your Message"
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              name="file"
              onChange={handleInquiryChange}
              className="p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div className="mt-4 flex justify-start items-center space-x-2 ml-8">
  <label className="flex items-center space-x-2 text-sm">
    <input
      type="checkbox"
      name="termsAccepted"
      checked={inquiryForm.termsAccepted}
      onChange={handleInquiryChange}
      className="form-checkbox"
    />
    {/* <span>I accept the Terms and Conditions</span> */}
    <span>    "I acknowledge that I have read, understood, and agree to abide by the Terms and Conditions, Privacy Policy, and other relevant agreements governing the use of this platform and services."
    </span>

  </label>
</div>


          <button
            type="submit"
            className="mt-6  w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;


