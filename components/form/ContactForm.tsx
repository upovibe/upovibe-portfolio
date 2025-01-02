import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ContactForm = () => {
  return (
    <form className="w-full">
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" name="name" />

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>

      <Label htmlFor="message">Message</Label>
      <Textarea id="message" name="message" />

      <Button className="my-5" type="submit">Submit</Button>
    </form>
  );
};

export default ContactForm;
