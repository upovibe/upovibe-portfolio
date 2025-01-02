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

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send the form data using EmailJS
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: "Promise Uzor",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(
        () => {
          toast.success("Your message was sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          toast.error("There was an error sending your message. Please try again later.");
          setLoading(false);
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
        <Button className="my-5" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
