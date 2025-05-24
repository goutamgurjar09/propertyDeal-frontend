import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { createBooking } from "../redux/slices/bookingSlice";
import { getUserDetail } from "../redux/slices/authUtlis";
import { showSuccess } from "../Alert";
import { sendSms } from "../redux/slices/authSlice";
import { InputField } from "../CommonComponent/InputField";
import { TextareaField } from "../CommonComponent/TextareaField";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .min(3, "Name must contain 3 letters"),

  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),

  dateTime: yup.string().required("Date and time is required"),

  message: yup
    .string()
    .required("Message is required")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Message can only contain letters, numbers, and spaces"
    ),
});

const BookingPage = ({ propertyId, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const user = getUserDetail();
    const { loading } = useSelector((state) => state.booking);
  

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      dateTime: "",
      message: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("userId", user.userId); // not rendered, just used on submission
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      propertyId,
      userId: user.userId,
    };

    const response = await dispatch(createBooking(bookingData));
    if (response.payload.status) {
      showSuccess(response.payload.message);

      // Send SMS
      dispatch(
        sendSms({
          message: `Property Booked Successfully by ${user.full_name}`,
          userId: user.userId,
        })
      );

      setIsModalOpen(false);
      reset(); // clears form
    }
  };

  return (
    <div className="p-4 mt-6 rounded-lg no-scrollbar max-h-[60vh] overflow-scroll">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          register={register}
          name="name"
          error={errors?.name?.message}
        />

        <InputField
          label="Mobile Number"
          type="tel"
          placeholder="Mobile Number"
          register={register}
          name="mobile"
          error={errors?.mobile?.message}
        />
        <InputField
          label="Date and Time"
          type="datetime-local"
          placeholder="Select date and time"
          register={register}
          name="dateTime"
          error={errors?.dateTime?.message}
        />
        <TextareaField
          label="Message"
          name="message"
          register={register}
          required={true}
          errors={errors}
        />
        <div className="flex justify-center align-middle mt-10">
          <button
            type="submit"
            disabled={loading}
            className="w-75 p-6 bg-[#005555] hover:bg-[#004444] transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
