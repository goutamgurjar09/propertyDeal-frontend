import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../redux/slices/authSlice";
import { showSuccess } from "../Alert";
const ProfileUpdateForm = ({
  userData,
  setIsModalOpen,
  onSuccess,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  // Set userData in form fields
  useEffect(() => {
    if (userData) {
      reset({
        email: userData.email || "",
        fullname: userData.fullname || "",
        mobile: userData.mobile || "",
        profileImg: userData?.profileImg,
      });
      if (userData.profileImg) {
        setPreviewImage(userData.profileImg);
      }
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("fullname", data.fullname);
    formData.append("mobile", data.mobile);
    formData.append("profileImg", data.profileImg?.[0]);
    formData.append("_id", userData?._id);

    console.log("Form Data to be sent:", data);
    const response = await dispatch(updateUserDetails(formData));
    if (response.payload.status === "success") {
      showSuccess(response.payload.message || "Profile updated successfully");
      setIsModalOpen(false);
      onSuccess();
    } else {
      console.error("Error updating profile:", response.payload.message);
    }
  };

  const profileImgWatch = watch("profileImg");

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullname", { required: "Full name is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname.message}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block mb-1 font-medium">Mobile</label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter valid Indian mobile number",
              },
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("profileImg")}
            onChange={handleImagePreview}
            className="w-full"
          />
          {errors.profileImg && (
            <p className="text-red-500 text-sm">{errors.profileImg.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="mt-2">
            <img
              src={previewImage}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-full"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "opacity-40" : ""
          } w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700`}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
