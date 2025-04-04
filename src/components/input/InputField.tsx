import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Field, FieldProps } from "formik";
import { forwardRef } from "react";

interface InputFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
  leftAddon?: string | React.ReactNode;
  rightAddon?: string | React.ReactNode;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      name,
      label,
      type = "text",
      placeholder,
      error,
      touched,
      required = false,
      leftAddon,
      rightAddon,
      autoComplete,
      ...props
    },
    ref
  ) {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <Label htmlFor={name} className="text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <Field name={name}>
          {({ field }: FieldProps) => (
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-gray-300">
              {leftAddon && (
                <span className="px-3 text-sm text-gray-700">
                  {leftAddon}
                </span>
              )}
              <Input
                ref={ref}
                id={name}
                placeholder={placeholder}
                type={type}
                className={cn(
                  "flex-1 px-3 py-2 text-sm text-black border-none",
                  error && touched && "border-red-500"
                )}
                {...field}
                {...props}
                required={required}
                aria-invalid={error && touched ? "true" : "false"}
                aria-describedby={
                  error && touched ? `${name}-error` : undefined
                }
                autoComplete={autoComplete}
              />
              {rightAddon && (
                <span className="px-3 text-sm text-gray-700">
                  {rightAddon}
                </span>
              )}
            </div>
          )}
        </Field>
        {error && touched && (
          <p id={`${name}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
