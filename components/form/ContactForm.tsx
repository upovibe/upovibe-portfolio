import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Added loading state
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); // Debugging: log form data before sending
    setLoading(true);
  
    // Send the form data using EmailJS
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID from .env file
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID from .env file
        {
          to_name: "Recipient Name",  // You can specify the recipient's name or dynamic data
          from_name: formData.name,   // Matches {{from_name}} in the template
          from_email: formData.email, // Matches {{from_email}} in the template
          message: formData.message,  // Matches {{message}} in the template
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID! // User ID from .env file
      )
      .then(
        (response) => {
          console.log("EmailJS Success Response:", response); // Log success response
          toast.success("Your message was sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Clear form data
          setLoading(false); // Reset loading state
        },
        (error) => {
          console.log("EmailJS Error Response:", error); // Log error response
          toast.error("There was an error sending your message. Please try again later.");
          setLoading(false); // Reset loading state
        }
      );
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-gray-100 flex flex-col gap-5 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-5 rounded-lg shadow-md"
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          className="border-gray-500 text-white"
          type="text"
          id="name"
          name="name"  // Name matches formData
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border-gray-500 text-white"
          type="email"
          id="email"
          name="email"  // Name matches formData
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          className="border-gray-500 text-white"
          id="message"
          name="message"  // Name matches formData
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="w-full flex justify-end">
        <Button className="my-5" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </Button>
      </div>
      {success && (
        <p className="text-emerald-400 text-center mt-2">
          Your message was sent successfully!
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center mt-2">
          There was an error sending your message. Please try again later.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
