import React, { InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from "react";

// Input Component
export const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`border px-3 py-2 rounded w-full ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

// TextArea Component
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`border px-3 py-2 rounded w-full ${className}`}
      {...props}
    />
  )
);
TextArea.displayName = "TextArea";

// Button Component
export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", children, ...props }) => (
  <button
    className={`px-4 py-2 rounded bg-sky-600 text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Label Component
interface LabelProps {
  children: React.ReactNode;
}
export const Label: React.FC<LabelProps> = ({ children }) => (
  <label className="block text-sm font-medium mb-1">{children}</label>
);
