import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold  mb-4 text-center">Contact Us</h1>
          <div className="space-y-3 ">
            <p>
              <span className="font-semibold">Merchant Legal Entity Name:</span> ROHIT MAHANT
            </p>
            <p>
              <span className="font-semibold">Registered Address:</span> Ward No.1, Sulithang, Near Pipal Pedh, Chiniyalisour, Uttarakhand, PIN: 249196
            </p>
            <p>
              <span className="font-semibold">Operational Address:</span> Ward No.1, Sulithang, Near Pipal Pedh, Chiniyalisour, Uttarakhand, PIN: 249196
            </p>
            <p>
              <span className="font-semibold">Telephone No:</span>
              <a href="tel:+919548086912" className=" hover:underline ml-1">9548086912</a>
            </p>
            <p>
              <span className="font-semibold">E-Mail ID:</span>
              <a href="mailto:Rohitsinghmahant707@gmail.com" className=" hover:underline ml-1">Rohitsinghmahant707@gmail.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
