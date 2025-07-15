import React, { FC, ReactNode } from "react";

interface FormProps {
  onSubmit: (data: any) => void;
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ onSubmit, children, className }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
