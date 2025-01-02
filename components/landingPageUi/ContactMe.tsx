"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/form/ContactForm";
import { Separator } from "../ui/separator";

interface ContactLink {
  id: string;
  name: string;
  image: string | null;
  href: string;
}

interface ContactMeProps {
  contactlinks: ContactLink[];
}

const ContactMe: React.FC<ContactMeProps> = ({ contactlinks }) => {
  return (
    <div
      id="contact"
      className="h- w-full max-w-lg flex flex-col items-center container mx-auto py-40 px-6 gap-10"
    >
      <h3 className="text-2xl font-bold text-emerald-400  mb-10 border-b-2 border-emerald-400 pb-2">
        Contact Me
      </h3>
      <ContactForm />
      <div className="w-full flex flex-col items-center gap-4 text-white">
        <div className="w-full flex items-center justify-center gap-1">
          <div className="h-[1px] w-full bg-white"></div>
          <span className="mx-3">OR</span>
          <div className="h-[1px] w-full bg-white"></div>
        </div>
        <div className="w-full flex items-center justify-center gap-2 mt-4">
          {contactlinks.map((contactLink) => (
            <Link
              key={contactLink.id}
              href={contactLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center"
            >
              {contactLink.image !== null && (
                <Image
                  src={contactLink.image}
                  alt={contactLink.name}
                  width={400}
                  height={400}
                  className="min-w-6 max-w-6 transition-all duration-300"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
