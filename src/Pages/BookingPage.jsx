import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBooking, resetBookingState } from "../redux/slices/bookingSlice";
import { getUserDetail } from "../redux/slices/authUtlis";
import { showSuccess } from "../Alert";

const BookingPage = ({ propertyId, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    dateTime: "",
    message: "",
    userId: "",
    propertyId,
  });

  useEffect(() => {
    const user = getUserDetail();
    if (user) {
      setFormData((prev) => ({ ...prev, userId: user.user_id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createBooking(formData));
    if (response.payload.status) {
      showSuccess(response.payload.message);
      setIsModalOpen(false);
      setFormData({
        name: "",
        mobile: "",
        dateTime: "",
        message: "",
      });
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4 mt-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          className="w-full px-4 py-2 border rounded"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="dateTime"
          className="w-full px-4 py-2 border rounded"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          className="w-full px-4 py-2 border rounded"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
