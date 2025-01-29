import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-foreground shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Merchant Legal Entity Name:</span> ROHIT MAHANT
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Registered Address:</span> Ward No.1, Sulithang, Near Pipal Pedh, Chiniyalisour, Uttarakhand, PIN: 249196
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Operational Address:</span> Ward No.1, Sulithang, Near Pipal Pedh, Chiniyalisour, Uttarakhand, PIN: 249196
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Telephone No:</span> 
            <a href="tel:+919548086912" className="text-blue-600 hover:underline ml-1">9548086912</a>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">E-Mail ID:</span> 
            <a href="mailto:Rohitsinghmahant707@gmail.com" className="text-blue-600 hover:underline ml-1">Rohitsinghmahant707@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
