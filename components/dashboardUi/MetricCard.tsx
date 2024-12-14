import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

interface MetricCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  description: string;
  cardClassName: string;
  iconClassName: string;
  titleColor: string;
  countColor: string;
  link: string; // New prop for link
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  count,
  icon,
  description,
  cardClassName,
  iconClassName,
  titleColor,
  countColor,
  link, // Destructure the link prop
}) => (
  <Link href={link}>
    <Card className={`${cardClassName} hover:shadow-xl transition-all duration-200 ease-linear border border-gray-200 rounded-lg text-center`}>
      <CardHeader>
        <div className="flex justify-center items-center">
          <div className={iconClassName}>{icon}</div>
        </div>
        <CardTitle className={`text-2xl font-bold ${titleColor}`}>{title}</CardTitle>
        <CardDescription className={`text-4xl font-extrabold ${countColor}`}>{count}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 font-medium">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export default MetricCard;
