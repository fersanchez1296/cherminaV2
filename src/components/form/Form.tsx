// import React, { FC, ReactNode, FormEvent } from "react";

// interface FormProps {
//   onSubmit: (event: FormEvent<HTMLFormElement>) => void;
//   children: ReactNode;
//   className?: string;
// }

// const Form: FC<FormProps> = ({ onSubmit, children, className }) => {
//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault(); // Prevent default form submission
//         onSubmit(event);
//       }}
//       className={` ${className}`} // Default spacing between form fields
//     >
//       {children}
//     </form>
//   );
// };

// export default Form;

import React, { FC, ReactNode } from "react";

interface FormProps {
  onSubmit: (data: any) => void; // react-hook-form handleSubmit ya se encarga del evento
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
