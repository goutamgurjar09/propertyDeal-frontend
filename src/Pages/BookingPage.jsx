import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, resetBookingState } from '../redux/slices/bookingSlice';
import { getUserDetail } from "../redux/slices/authUtlis";

const BookingPage = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.booking);
  const selectedProperty = useSelector((state) => state.property.property);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    dateTime: '',
    message: '',
    userId: '',
    propertyId: ''
  });

  useEffect(() => {
    const user = getUserDetail();
    if (user) {
      setFormData(prev => ({ ...prev, userId: user.user_id }));
    }
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      setFormData(prev => ({ ...prev, propertyId: selectedProperty._id }));
    }
  }, [selectedProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetBookingState());
    };
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Property</h2>

      {successMessage && <p className="text-green-600 text-center mb-2">{successMessage}</p>}
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
