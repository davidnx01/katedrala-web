import { cn } from "@/lib/utils";

interface FormFieldProps {
  /** Id of the control inside; the label and the error message are wired to it. */
  htmlFor: string;
  label: string;
  required?: boolean;
  /** Already translated error message, if the field is invalid. */
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ htmlFor, label, required, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy">
        {label}
        {required && (
          <span className="ml-0.5 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
