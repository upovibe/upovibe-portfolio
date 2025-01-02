import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
        formData,
        "YOUR_USER_ID" // Replace with your EmailJS User ID
      )
      .then(
        () => {
          setSuccess(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
        },
        () => {
          setError(true);
          setTimeout(() => setError(false), 5000); // Hide error message after 5 seconds
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
          name="name"
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
          name="email"
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
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="w-full flex justify-end">
        <Button className="my-5" type="submit">
          Submit
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
