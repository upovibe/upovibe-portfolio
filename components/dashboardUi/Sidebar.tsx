"use client";

import React, { useState } from "react";
import { User } from "next-auth";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderGit2,
  // FilePenLine,
  LogOut,
  PanelRightClose,
  PanelLeftClose,
  Lightbulb,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface SidebarProps {
  user: User;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: FolderGit2, href: "/dashboard/projects" },
  { label: "My Skills", icon: Lightbulb, href: "/dashboard/skills" },
  { label: "My Contact", icon: Contact, href: "/dashboard/contactlinks" },
];

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Signed out successfully!");
  };

  return (
    <>
      {/* Button to toggle sidebar (visible on small screens only) */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2"
      >
        <PanelRightClose />
      </Button>

      {/* Sidebar Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-950 z-50 shadow-lg md:shadow-none transform transition-all duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block ${
          collapsed ? "w-14 min-w-14" : "w-64 min-w-64"
        } flex flex-col justify-between p-2 border border-gray-800 rounded-lg`}
      >
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 p-2 hover:bg-emerald-500/20 transition-all duration-200 ease-linear rounded-lg text-gray-300"
            >
              <item.icon className="text-emerald-500 text-2xl flex-shrink-0" />
              <span
                className={`text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  collapsed ? "" : "block"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </ul>
        <div className="flex flex-col gap-2 mt-10">
            <Link
            href="https://github.com/upovibe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 hover:bg-emerald-500/20 transition-all duration-200 ease-linear rounded-lg text-gray-300"
            >
            {user?.image && (
              <Avatar className="size-6">
                <AvatarImage src={user.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <span
              className={`text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? "" : "block"
              }`}
            >
              Profile
            </span>
          </Link>
          <Button
            onClick={handleSignOut}
            className="flex items-center gap-2 p-2 hover:bg-red-600/20 transition-all duration-200 ease-linear rounded-lg w-full justify-start text-gray-300"
          >
            <LogOut className="text-emerald-500 text-2xl flex-shrink-0" />
            <span
              className={`text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? "" : "block"
              }`}
            >
              Logout
            </span>
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-4 md:top-0 size-7 p-2 hover:bg-emerald-500/20 border-gray-800 text-gray-300 transition-all duration-300 hidden md:inline-flex"
        >
          {collapsed ? <PanelRightClose /> : <PanelLeftClose />}
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;
