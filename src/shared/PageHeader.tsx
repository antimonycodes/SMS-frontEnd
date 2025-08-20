import React from "react";
import Button from "../components/ui/Button";
interface PageHeaderProps {
  title: string;
  sub?: string;
  button?: boolean;
  buttonText?: string;
  buttonClick?: () => void;
}
const PageHeader = ({
  title,
  sub,
  button = true,
  buttonText,
  buttonClick,
}: PageHeaderProps) => {
  return (
    <div className=" flex items-center justify-between w-full">
      <div>
        <h1 className=" text-brand-900 font-semibold text-4xl">{title}</h1>
        <p className=" text-gray-600 font-medium">{sub}</p>
      </div>
      {/*  */}
      {button && (
        <Button variant="primary" onClick={buttonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
