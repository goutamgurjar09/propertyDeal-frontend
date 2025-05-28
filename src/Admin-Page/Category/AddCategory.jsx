import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategoriesById,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { showError, showSuccess } from "../../Alert";
import { InputField } from "../../CommonComponent/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ✅ Yup Validation Schema
const schema = yup.object().shape({
  categoryName: yup
    .string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Category name must contain only letters and spaces"
    ),

  subCategories: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required("Subcategory name is required")
        .min(2, "Subcategory name must be at least 2 characters")
        .matches(
          /^[A-Za-z\s]+$/,
          "Subcategory name must contain only letters and spaces"
        ),
    })
  ),
});

const AddCategoryForm = ({ setIsModalOpen, userId, id, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, category } = useSelector((state) => state.category);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: "",
      createdBy: userId,
      subCategories: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit = async (data) => {
    const payload = { ...data, createdBy: userId };
    const action = id
      ? updateCategory({ id, data: payload })
      : createCategory(payload);
    const res = await dispatch(action);

    if (res.payload?.success) {
      showSuccess(res.payload.message);
      reset();
      setIsModalOpen(false);
      onSuccess && onSuccess();
    } else {
      showError(res.payload?.message || "Failed to create/update category");
    }
  };

  useEffect(() => {
    if (id) dispatch(getCategoriesById(id));
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
    <div className="p-4 no-scrollbar max-h-[40vh] overflow-scroll">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Category Name"
          placeholder="Category Name"
          register={register}
          name="categoryName"
          error={errors?.categoryName?.message}
        />

        <div className="mt-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <InputField
                label="SubCategory Name"
                placeholder={`Subcategory ${index + 1}`}
                register={register}
                name={`subCategories.${index}.name`}
                error={errors?.subCategories?.[index]?.name?.message}
                className="w-96"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 h-10 flex items-center justify-center mt-6"
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

        <div className="flex justify-center align-middle mt-10">
          <button
            type="submit"
            disabled={loading}
            className={`w-75 p-6 ${
              loading ? "opacity-40" : ""
            } bg-[#005555] hover:bg-[#004444] transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md`}
          >
            {loading
              ? "Creating..."
              : id
              ? "Update Category"
              : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
