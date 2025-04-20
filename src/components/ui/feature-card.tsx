
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
  color?: "green" | "orange";
}

export const FeatureCard = ({
  title,
  description,
  icon,
  linkTo,
  color = "green"
}: FeatureCardProps) => {
  const colorClasses = {
    green: "bg-nutribite-green-light/10 border-nutribite-green/20 hover:border-nutribite-green",
    orange: "bg-nutribite-orange-light/10 border-nutribite-orange/20 hover:border-nutribite-orange",
  };

  const iconColorClasses = {
    green: "text-nutribite-green",
    orange: "text-nutribite-orange",
  };

  const buttonColorClasses = {
    green: "bg-nutribite-green hover:bg-nutribite-green-dark",
    orange: "bg-nutribite-orange hover:bg-nutribite-orange-dark",
  };

  return (
    <div className={`relative rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md ${colorClasses[color]}`}>
      <div className={`mb-4 text-4xl ${iconColorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link to={linkTo}>
        <Button className={buttonColorClasses[color]}>Learn More</Button>
      </Link>
    </div>
  );
};
