"use client";

import React from "react";
import { useState } from "react";

const countries = [
  { name: "United States", states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California"] },
  { name: "India", states: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh"] },
  { name: "Australia", states: ["New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria"] },
];

const services = [
  "Training", "Facilities", "Instructional Design", "Lab Machine Creation", "Mentoring",
  "Books, Curriculum", "e-Learning Development", "Translation", "Curriculum Development",
  "Consulting", "Voice Talent", "Other"
];

const VendorContactForm = () => {
  type FormData = {
    legalName: string;
    doingBusinessAs: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    telephone: string;
    website: string;
    topics: string;
    independentInstructor: string;
    learnQuestReference: string;
  };

  const [formData, setFormData] = useState<FormData>({
    legalName: "", doingBusinessAs: "", address1: "", address2: "", city: "", state: "",
    zip: "", country: "", telephone: "", website: "", topics: "", independentInstructor: "",
    learnQuestReference: "",
  });

  const [states, setStates] = useState<string[]>([]);
  const [sameAsPrincipals, setSameAsPrincipals] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "country") {
      const selectedCountry = countries.find(country => country.name === value);
      setStates(selectedCountry ? selectedCountry.states : []);
      setFormData(prev => ({ ...prev, state: "" }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
      <h1 className="text-2xl font-bold mb-4">Vendor/Company Information</h1>
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl">
          {[
            { label: "Legal Vendor/Company Name *", name: "legalName", type: "text", required: true },
            { label: "Doing Business As", name: "doingBusinessAs", type: "text" },
            { label: "Address 1 *", name: "address1", type: "text", required: true },
            { label: "Address 2", name: "address2", type: "text" },
            { label: "City *", name: "city", type: "text", required: true },
            { label: "Zip/Postal Code *", name: "zip", type: "text", required: true },
            { label: "Website", name: "website", type: "text" },
            { label: "Telephone *", name: "telephone", type: "text", required: true },
          ].map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required={required}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Please Select</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Please Select</option>
              {countries.map(country => <option key={country.name} value={country.name}>{country.name}</option>)}
            </select>
          </div>
        </div>

        <h2 className="text-xl font-bold">Topics and Technologies *</h2>
        <textarea
          name="topics"
          value={formData.topics}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          placeholder="Please specify the topics and technologies your company supports..."
          required
        />

        <h2 className="text-xl font-bold">Are you an Independent Instructor? *</h2>
        <select
          name="independentInstructor"
          value={formData.independentInstructor}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        >
          <option value="">Please Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <h2 className="text-xl font-bold">Contact in LearnQuest Reference</h2>
        <input
          type="text"
          name="learnQuestReference"
          value={formData.learnQuestReference}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          placeholder="Contact in LearnQuest"
        />

        <h2 className="text-xl font-bold">Principals and Managers Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["First name *", "Last name *", "Job Title/Position *", "Email *", "Alternate Email", "Telephone *"].map((placeholder, i) => (
            <input key={i} type={placeholder.includes("*") ? "text" : "email"} placeholder={placeholder} className="border p-2" required={placeholder.includes("*")} />
          ))}
        </div>

        <h2 className="text-xl font-bold">Primary Scheduling/Availability Contact Information</h2>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="sameAsPrincipals" checked={sameAsPrincipals} onChange={() => setSameAsPrincipals(!sameAsPrincipals)} className="mr-2" />
          <label htmlFor="sameAsPrincipals">Same as Principals and Managers above</label>
        </div>
        {!sameAsPrincipals && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["First name", "Last name", "Job Title/Position", "Email", "Alternate Email", "Telephone"].map((placeholder, i) => (
              <input key={i} type="text" placeholder={placeholder} className="border p-2" />
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold">Finance or Other Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["First name", "Last name", "Job Title/Position", "Email", "Alternate Email", "Telephone"].map((placeholder, i) => (
            <input key={i} type="text" placeholder={placeholder} className="border p-2" />
          ))}
        </div>

        <h2 className="text-xl font-bold">Please indicate the services you are able to deliver</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map(service => (
            <div key={service} className="flex items-center">
              <input type="checkbox" id={service} name={service} className="mr-2" />
              <label htmlFor={service}>{service}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
      </form>
    </div>
  );
};

export default VendorContactForm;
