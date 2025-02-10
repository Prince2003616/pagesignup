'use client';

import { useState, FormEvent } from 'react';
import signupData from '@/app/utils/signupData.json';

interface SignupCardProps {
  onClose: () => void;
}

export default function SignupCard({ onClose }: SignupCardProps) {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [county, setCounty] = useState('');
  const [phone, setPhone] = useState('');
  const [extension, setExtension] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    confirmEmail?: string;
    agreed?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      confirmEmail?: string;
      agreed?: string;
    } = {};

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!confirmEmail) {
      newErrors.confirmEmail = 'Confirm Email is required';
    } else if (confirmEmail !== email) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    if (!agreed) {
      newErrors.agreed = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log({
        title,
        firstName,
        lastName,
        email,
        confirmEmail,
        company,
        address1,
        address2,
        city,
        state,
        zipcode,
        county,
        phone,
        extension,
        agreed,
      });

      // Reset the form fields
      setTitle('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setConfirmEmail('');
      setCompany('');
      setAddress1('');
      setAddress2('');
      setCity('');
      setState('');
      setZipcode('');
      setCounty('');
      setPhone('');
      setExtension('');
      setAgreed(false);

      // Clear errors
      setErrors({});

      // Close the modal
      onClose();
    }
  };

  return (
    <div className="border border-gray-200 shadow-lg w-full sm:w-[90%] md:w-[800px] p-4 sm:p-8 rounded-lg bg-white relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
        <button
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition-colors"
      >
        ← Back
      </button>
        </div>
        <p className="text-sm text-gray-600">
          {signupData.loginText}{' '}
          <a href="#" className="font-semibold text-blue-600 hover:underline">
            {signupData.loginLinkText}
          </a>
        </p>
      </div>

      {/* Title and Description */}
      <div className="mt-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Sign up to receive LearnQuest updates and newsletters
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Please complete the form below to receive the latest in LearnQuest news, course offerings, and special promotions.
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <input
              placeholder={signupData.titlePlaceholder}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.firstNamePlaceholder}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors ${
                errors.firstName ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}

            <input
              placeholder={signupData.lastNamePlaceholder}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors ${
                errors.lastName ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}

            <input
              placeholder={signupData.emailPlaceholder}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors ${
                errors.email ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

            <input
              placeholder={signupData.confirmEmailPlaceholder}
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className={`w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors ${
                errors.confirmEmail ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <input
              placeholder={signupData.companyPlaceholder}
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.address1Placeholder}
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.address2Placeholder}
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.cityPlaceholder}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.statePlaceholder}
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.zipcodePlaceholder}
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.countyPlaceholder}
              type="text"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.phonePlaceholder}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />

            <input
              placeholder={signupData.extensionPlaceholder}
              type="text"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6 flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 ${
              errors.agreed ? 'border-red-500' : ''
            }`}
          />
          <div className="ml-2">
            <label htmlFor="terms" className="text-sm text-gray-600">
              {signupData.termsText}{' '}
              <a href="#" className="text-blue-600 hover:underline">
                {signupData.termsLinkText}
              </a>
            </label>
            {errors.agreed && <p className="text-red-500 text-sm mt-1">{errors.agreed}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-[#7FC0AA] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#6BAE99] transition-colors"
        >
          {signupData.submitButtonText}
        </button>
      </form>
    </div>
  );
}