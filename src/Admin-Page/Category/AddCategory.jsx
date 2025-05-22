// src/components/AddCategoryForm.jsx
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategoriesById,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { showSuccess } from "../../Alert";

const AddCategoryForm = ({ setIsModalOpen, userId, id, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.category);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: "",
      createdBy: userId, // Replace with actual logic
      subCategories: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const { category } = useSelector((state) => state.category);

  const onSubmit = async (data) => {
    if (id) {
      const res = await dispatch(updateCategory({ id, data }));
      if (res.payload.success) {
        reset();
        showSuccess(res.payload.message);
        setIsModalOpen(false);
        if (onSuccess) onSuccess();
      }
    } else {
      const res = await dispatch(createCategory(data));
      if (res.payload.success) {
        reset();
        showSuccess(res.payload.message);
        setIsModalOpen(false);
        if (onSuccess) onSuccess();
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getCategoriesById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category && id) {
      reset({
        categoryName: category.categoryName,
        createdBy: userId,
        subCategories: category.subCategories.map((sub) => ({
          name: sub.name,
        })),
      });
    }
  }, [id, category]);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-3">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Category Name"
            {...register("categoryName", {
              required: "Category name is required",
            })}
            className="border w-full p-2 mb-2"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-sm">
              {errors.categoryName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Subcategories</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                placeholder={`Subcategory ${index + 1}`}
                {...register(`subCategories.${index}.name`, {
                  required: "Subcategory name is required",
                })}
                className="border flex-1 p-2"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="text-blue-500 mb-2 text-sm"
          >
            + Add Subcategory
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>

        {success && (
          <p className="text-green-600 mt-2">Category created successfully!</p>
        )}
        {error && (
          <p className="text-red-600 mt-2">
            {error.message || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddCategoryForm;
