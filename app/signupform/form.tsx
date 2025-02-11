"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Country, State } from "country-state-city";

interface StateType {
  name: string;
  isoCode: string;
}

// Define interfaces for form data
interface FormData {
  legalName: string;
  doingBusinessAs: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  website: string;
  telephone: string;
  email: string;
  state: string;
  country: string;
  topics: string;
  independentInstructor: string;
  learnQuestReference: string;
  principals: ContactInfo;
  schedulingContact: ContactInfo;
  financeContact: ContactInfo;
  services: string[];
  otherServiceDetail: string; // Added for "Other" service detail
  captchaInput: string; // Added for user's CAPTCHA input
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  alternateEmail: string;
  telephone: string;
}

const services = [
  "Training",
  "Curriculum Development",
  "Books, Curriculum",
  "Instructional Design",
  "Voice Talent",
  "Translation",
  "Mentoring",
  "Facilities",
  "Consulting",
  "e-Learning Development",
  "Lab Machine Creation",
  "Other",
];

const darkNightAmbrosia = "#2e3440";
const lightBackgroundColor = "#eceff4";
const lightTextColor = "#4c566a";
const subtleTextColor = "#616e88";
const inputBorderColor = "#d8dee9";

const VendorForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    legalName: "",
    doingBusinessAs: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    website: "",
    telephone: "",
    email: "",
    state: "",
    country: "",
    topics: "",
    independentInstructor: "",
    learnQuestReference: "",
    principals: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      alternateEmail: "",
      telephone: "",
    },
    schedulingContact: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      alternateEmail: "",
      telephone: "",
    },
    financeContact: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      alternateEmail: "",
      telephone: "",
    },
    services: [],
    otherServiceDetail: "", // Initialize the "otherServiceDetail" state
    captchaInput: "", // Initialize the CAPTCHA input
  });

  const [captchaText, setCaptchaText] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [sameAsPrincipals, setSameAsPrincipals] = useState<boolean>(false);
  const countries = Country.getAllCountries(); // No setter needed
  const [states, setStates] = useState<StateType[]>([]);

  // Generate a CAPTCHA text
  const generateCaptcha = (): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      // Generate 6-character CAPTCHA
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // useEffect to generate the captcha on component mount and whenever we need a new one.
  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []); // Empty dependency array means it runs only once on mount

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setFormData((prev) => ({ ...prev, country: countryCode, state: "" }));

    if (countryCode) {
      const countryStates = State.getStatesOfCountry(countryCode);
      setStates(countryStates as StateType[]); // Type assertion
    } else {
      setStates([]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      if (name === "Other") {
        // Handle the "Other" checkbox separately
        setFormData((prev) => {
          const updatedServices = checked
            ? [...prev.services, name]
            : prev.services.filter((service) => service !== name);
          return { ...prev, services: updatedServices };
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          services: checked
            ? [...prev.services, name]
            : prev.services.filter((service) => service !== name),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: value,
      }));
    }
  };

  const handleNestedChange = (
    section: keyof FormData,
    field: keyof ContactInfo,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedSection =
        typeof prev[section] === "object" && prev[section] !== null
          ? { ...prev[section] }
          : {};
      if (
        updatedSection &&
        typeof updatedSection === "object" &&
        updatedSection !== null
      ) {
        (updatedSection as ContactInfo)[field] = value;
      }

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const requiredFields = [
      "legalName",
      "address1",
      "city",
      "zip",
      "telephone",
      "email",
      "state",
      "country",
      "topics",
      "independentInstructor",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      if (!value) {
        newErrors[field] = `This field is required`;
      }
    });

    if (formData.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (formData.telephone) {
      if (!/^\+?[0-9]{7,15}$/.test(formData.telephone)) {
        newErrors.telephone = "Invalid phone number (e.g., +15551234567)";
      }
    }

    if (formData.zip) {
      if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        newErrors.zip = "Invalid zip code (e.g., 12345 or 12345-6789)";
      }
    }

    if (formData.website) {
      try {
        new URL(formData.website);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_unused) {
        newErrors.website = "Invalid URL";
      }
    }

    const requiredPrincipalsFields = [
      "firstName",
      "lastName",
      "jobTitle",
      "email",
      "telephone",
    ];
    requiredPrincipalsFields.forEach((field) => {
      if (!formData.principals[field as keyof ContactInfo]) {
        newErrors[`principals.${field}`] = `This field is required`;
      }
    });

    if (!sameAsPrincipals) {
      requiredPrincipalsFields.forEach((field) => {
        if (!formData.schedulingContact[field as keyof ContactInfo]) {
          newErrors[`schedulingContact.${field}`] = `This field is required`;
        }
      });
    }

    // CAPTCHA VALIDATION
    if (formData.captchaInput !== captchaText) {
      newErrors.captchaInput = "CAPTCHA text is incorrect";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Form submitted successfully:", formData);
        alert("Form submitted successfully!");

        setFormData({
          legalName: "",
          doingBusinessAs: "",
          address1: "",
          address2: "",
          city: "",
          zip: "",
          website: "",
          telephone: "",
          email: "",
          state: "",
          country: "",
          topics: "",
          independentInstructor: "",
          learnQuestReference: "",
          principals: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            email: "",
            alternateEmail: "",
            telephone: "",
          },
          schedulingContact: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            email: "",
            alternateEmail: "",
            telephone: "",
          },
          financeContact: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            email: "",
            alternateEmail: "",
            telephone: "",
          },
          services: [],
          otherServiceDetail: "",
          captchaInput: "",
        });
        setCaptchaText(generateCaptcha()); // Generate a new CAPTCHA
        setErrors({});
        setSameAsPrincipals(false);
        setStates([]);
      } catch (error) {
        console.error("Form submission failed:", error);
        alert("Form submission failed. Please try again.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto py-12 px-8 rounded-xl shadow-lg"
      style={{ backgroundColor: lightBackgroundColor }}
    >
      <h1
        className="text-3xl font-semibold mb-8 text-center"
        style={{ color: darkNightAmbrosia }}
      >
        Vendor/Company Information
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Company Information Section */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Company Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Legal Vendor/Company Name",
                name: "legalName",
                type: "text",
                required: true,
              },
              {
                label: "Doing Business As",
                name: "doingBusinessAs",
                type: "text",
              },
              {
                label: "Address 1",
                name: "address1",
                type: "text",
                required: true,
              },
              {
                label: "Address 2",
                name: "address2",
                type: "text",
              },
              {
                label: "City",
                name: "city",
                type: "text",
                required: true,
              },
              {
                label: "Zip/Postal Code",
                name: "zip",
                type: "text",
                required: true,
              },
              {
                label: "Website",
                name: "website",
                type: "text",
              },
              {
                label: "Telephone",
                name: "telephone",
                type: "tel",
                required: true,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                required: true,
              },
            ].map(({ label, name, type, required }) => (
              <div key={name} className="relative mb-4">
                <input
                  placeholder={label}
                  className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                  style={{
                    borderColor: inputBorderColor,
                    color: lightTextColor,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  required={required}
                  id={name}
                  name={name}
                  type={type}
                  value={
                    typeof formData[name as keyof FormData] === "string"
                      ? (formData[name as keyof FormData] as string)
                      : ""
                  }
                  onChange={handleChange}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                  style={{ color: subtleTextColor, paddingLeft: "1rem" }}
                  htmlFor={name}
                >
                  {label}
                </label>
                {errors[name] && (
                  <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            {/* State and Country Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative mb-4">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className="peer h-10 w-full border-b-2  text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                  style={{
                    borderColor: inputBorderColor,
                    color: lightTextColor,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  required
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="country"
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                  style={{ color: subtleTextColor, paddingLeft: "1rem" }}
                >
                  Country
                </label>
                {errors.country && (
                  <p className="text-sm text-red-500 mt-1">{errors.country}</p>
                )}
              </div>

              <div className="relative mb-4">
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                  style={{
                    borderColor: inputBorderColor,
                    color: lightTextColor,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  required
                  disabled={states.length === 0}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="state"
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                  style={{ color: subtleTextColor, paddingLeft: "1rem" }}
                >
                  State
                </label>
                {errors.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Topics and Technologies */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Topics and Technologies
          </h2>
          <div className="relative mb-4">
            <textarea
              placeholder="Please specify the topics and technologies your company supports..."
              className="peer h-20 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
              style={{
                borderColor: inputBorderColor,
                color: lightTextColor,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
              id="topics"
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="topics"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
              style={{ color: subtleTextColor, paddingLeft: "1rem" }}
            >
              Topics and Technologies
            </label>
            {errors.topics && (
              <p className="text-sm text-red-500 mt-1">{errors.topics}</p>
            )}
          </div>
        </div>

        {/* Independent Instructor */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Independent Instructor
          </h2>
          <div className="relative mb-4">
            <select
              id="independentInstructor"
              name="independentInstructor"
              value={formData.independentInstructor}
              onChange={handleChange}
              className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
              style={{
                borderColor: inputBorderColor,
                color: lightTextColor,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
              required
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label
              htmlFor="independentInstructor"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
              style={{ color: subtleTextColor, paddingLeft: "1rem" }}
            >
              Independent Instructor
            </label>
            {errors.independentInstructor && (
              <p className="text-sm text-red-500 mt-1">
                {errors.independentInstructor}
              </p>
            )}
          </div>
        </div>

        {/* LearnQuest Reference */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            LearnQuest Reference
          </h2>
          <div className="relative mb-4">
            <input
              placeholder="Contact in LearnQuest"
              className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
              style={{
                borderColor: inputBorderColor,
                color: lightTextColor,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
              id="learnQuestReference"
              name="learnQuestReference"
              type="text"
              value={formData.learnQuestReference}
              onChange={handleChange}
            />
            <label
              htmlFor="learnQuestReference"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
              style={{ color: subtleTextColor, paddingLeft: "1rem" }}
            >
              LearnQuest Reference
            </label>
          </div>
        </div>

        {/* Principals and Managers Contact Information */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Principals and Managers Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "First name",
                name: "firstName",
                type: "text",
                required: true,
              },
              {
                label: "Last name",
                name: "lastName",
                type: "text",
                required: true,
              },
              {
                label: "Job Title/Position",
                name: "jobTitle",
                type: "text",
                required: true,
              },
              { label: "Email", name: "email", type: "email", required: true },
              {
                label: "Alternate Email",
                name: "alternateEmail",
                type: "email",
              },
              {
                label: "Telephone",
                name: "telephone",
                type: "tel",
                required: true,
              },
            ].map(({ label, name, type, required }) => (
              <div key={name} className="relative mb-4">
                <input
                  placeholder={label}
                  className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                  style={{
                    borderColor: inputBorderColor,
                    color: lightTextColor,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  required={required}
                  id={`principals.${name}`}
                  name={`principals.${name}`}
                  type={type}
                  value={formData.principals[name as keyof ContactInfo] || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNestedChange(
                      "principals",
                      name as keyof ContactInfo,
                      e.target.value
                    )
                  }
                />
                <label
                  htmlFor={`principals.${name}`}
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                  style={{ color: subtleTextColor, paddingLeft: "1rem" }}
                >
                  {label}
                </label>
                {errors[`principals.${name}`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`principals.${name}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Primary Scheduling/Availability Contact Information */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Primary Scheduling Contact
          </h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sameAsPrincipals"
              checked={sameAsPrincipals}
              onChange={() => setSameAsPrincipals(!sameAsPrincipals)}
              className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
            />
            <label
              htmlFor="sameAsPrincipals"
              className="ml-2 text-sm"
              style={{ color: lightTextColor }}
            >
              Same as Principals and Managers above
            </label>
          </div>
          {!sameAsPrincipals && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "First name",
                  name: "firstName",
                  type: "text",
                  required: true,
                },
                {
                  label: "Last name",
                  name: "lastName",
                  type: "text",
                  required: true,
                },
                {
                  label: "Job Title/Position",
                  name: "jobTitle",
                  type: "text",
                  required: true,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                },
                {
                  label: "Alternate Email",
                  name: "alternateEmail",
                  type: "email",
                },
                {
                  label: "Telephone",
                  name: "telephone",
                  type: "tel",
                  required: true,
                },
              ].map(({ label, name, type, required }) => (
                <div key={name} className="relative mb-4">
                  <input
                    placeholder={label}
                    className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                    style={{
                      borderColor: inputBorderColor,
                      color: lightTextColor,
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                    required={required}
                    id={`schedulingContact.${name}`}
                    name={`schedulingContact.${name}`}
                    type={type}
                    value={
                      formData.schedulingContact[name as keyof ContactInfo] ||
                      ""
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleNestedChange(
                        "schedulingContact",
                        name as keyof ContactInfo,
                        e.target.value
                      )
                    }
                  />
                  <label
                    htmlFor={`schedulingContact.${name}`}
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                    style={{ color: subtleTextColor, paddingLeft: "1rem" }}
                  >
                    {label}
                  </label>
                  {errors[`schedulingContact.${name}`] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[`schedulingContact.${name}`]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Primary Finance/Accounting Contact Information */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Primary Finance Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "First name",
                name: "firstName",
                type: "text",
                required: true,
              },
              {
                label: "Last name",
                name: "lastName",
                type: "text",
                required: true,
              },
              {
                label: "Job Title/Position",
                name: "jobTitle",
                type: "text",
                required: true,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                required: true,
              },
              {
                label: "Alternate Email",
                name: "alternateEmail",
                type: "email",
              },
              {
                label: "Telephone",
                name: "telephone",
                type: "tel",
                required: true,
              },
            ].map(({ label, name, type, required }) => (
              <div key={name} className="relative mb-4">
                <input
                  placeholder={label}
                  className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                  style={{
                    borderColor: inputBorderColor,
                    color: lightTextColor,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  required={required}
                  id={`financeContact.${name}`}
                  name={`financeContact.${name}`}
                  type={type}
                  value={
                    formData.financeContact[name as keyof ContactInfo] || ""
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNestedChange(
                      "financeContact",
                      name as keyof ContactInfo,
                      e.target.value
                    )
                  }
                />
                <label
                  htmlFor={`financeContact.${name}`}
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                  style={{ color: subtleTextColor, paddingLeft: "1rem" }}
                >
                  {label}
                </label>
                {errors[`financeContact.${name}`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`financeContact.${name}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={service}
                  name={service}
                  checked={formData.services.includes(service)}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                />
                <label
                  htmlFor={service}
                  className="ml-2 text-gray-700"
                  style={{ color: lightTextColor }}
                >
                  {service}
                </label>
              </div>
            ))}
          </div>
          {/* "Other" service detail text input */}
          {formData.services.includes("Other") && (
            <div className="relative mb-4">
              <input
                placeholder="Please specify the other service"
                className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
                style={{
                  borderColor: inputBorderColor,
                  color: lightTextColor,
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
                id="otherServiceDetail"
                name="otherServiceDetail"
                type="text"
                value={formData.otherServiceDetail}
                onChange={handleChange}
              />
              <label
                htmlFor="otherServiceDetail"
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
                style={{ color: subtleTextColor, paddingLeft: "1rem" }}
              >
                Other Service Detail
              </label>
            </div>
          )}
        </div>

        {/* CAPTCHA Section */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2
            className="text-xl font-semibold border-b pb-2 mb-4"
            style={{ borderColor: darkNightAmbrosia, color: lightTextColor }}
          >
            Human Verification
          </h2>
          <div className="mb-4">
            <label
              htmlFor="captcha"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter the following text:
            </label>
            <div
              className="text-2xl font-bold text-gray-800 select-none" // select-none to prevent selection
              id="captcha"
            >
              {captchaText}
            </div>
          </div>
          <div className="relative mb-4">
            <input
              placeholder="Enter CAPTCHA"
              className="peer h-10 w-full border-b-2 text-gray-700 bg-transparent placeholder-transparent focus:outline-none focus:border-[${accentColor}]"
              style={{
                borderColor: inputBorderColor,
                color: lightTextColor,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
              id="captchaInput"
              name="captchaInput"
              type="text"
              value={formData.captchaInput}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="captchaInput"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[${accentColor}]"
              style={{ color: subtleTextColor, paddingLeft: "1rem" }}
            >
              CAPTCHA
            </label>
            {errors.captchaInput && (
              <p className="text-sm text-red-500 mt-1">{errors.captchaInput}</p>
            )}
          </div>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
            onClick={() => setCaptchaText(generateCaptcha())}
          >
            Refresh CAPTCHA
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-md shadow-lg text-white font-semibold transition duration-200 focus:outline-none"
            style={{ backgroundColor: darkNightAmbrosia }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;
