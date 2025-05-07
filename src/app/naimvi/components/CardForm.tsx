// components/CardForm.tsx
"use client"; // Add this at the top

// components/CardForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa"; // Card logos
import Image from "next/image";

interface CardFormInputs {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardholderName: string;
  saveCard: boolean;
}

const CardForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormInputs>({
    defaultValues: {
      saveCard: false,
    },
  });

  const onSubmit: SubmitHandler<CardFormInputs> = (data) => {
    console.log("Form Data:", data);
    // Here, you would typically send the data to your backend for encryption and storage
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header with Card Logos */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Credit or debit card
        </h2>
        <div className="flex space-x-2">
          <FaCcVisa className="text-2xl text-blue-600" />
          <FaCcMastercard className="text-2xl text-orange-500" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Card Number */}
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            }`}
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                message: "Invalid card number",
              },
            })}
          />
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* Expiry and CVC */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700"
            >
              MM/YYYY
            </label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YYYY"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.expiry ? "border-red-500" : "border-gray-300"
              }`}
              {...register("expiry", {
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{4}$/,
                  message: "Invalid expiry date (MM/YYYY)",
                },
              })}
            />
            {errors.expiry && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expiry.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700"
            >
              CVC
            </label>
            <div className="relative">
              <input
                id="cvc"
                type="text"
                placeholder="123"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                }`}
                {...register("cvc", {
                  required: "CVC is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "Invalid CVC",
                  },
                })}
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Image
                  src="/card-icon.svg"
                  alt="Card Icon"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            {errors.cvc && (
              <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label
            htmlFor="cardholderName"
            className="block text-sm font-medium text-gray-700"
          >
            Cardholder Name
          </label>
          <input
            id="cardholderName"
            type="text"
            placeholder="John Doe"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.cardholderName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("cardholderName", {
              required: "Cardholder name is required",
            })}
          />
          {errors.cardholderName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.cardholderName.message}
            </p>
          )}
        </div>

        {/* Save Card Checkbox */}
        <div className="flex items-start">
          <input
            id="saveCard"
            type="checkbox"
            className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            {...register("saveCard")}
          />
          <label
            htmlFor="saveCard"
            className="ml-2 block text-sm text-gray-900"
          >
            <span className="font-medium">
              Save this card for a faster checkout
            </span>
            <p className="text-gray-500 mt-1">
              By saving your card you grant us your consent to store your
              payment method for future orders. You can withdraw consent at any
              time.
            </p>
            <p className="text-gray-500">
              For more information, please visit the{" "}
              <a
                href="/privacy-policy"
                className="text-indigo-600 hover:underline"
              >
                Privacy policy
              </a>
              .
            </p>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CardForm;
