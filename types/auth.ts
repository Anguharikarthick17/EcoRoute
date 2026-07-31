// ── Auth-specific TypeScript Types ───────────────────────────
// Appended to types/index.ts — Auth Module additions

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success" | "warning";
export type AlertBoxVariant = "info" | "success" | "warning" | "security";
export type ValidationVariant = "error" | "success" | "hint" | "warning";

// ── FormInput ─────────────────────────────────────────────────
export interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  state?: InputState;
  errorMessage?: string;
  successMessage?: string;
  hintMessage?: string;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
  maxLength?: number;
  pattern?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

// ── PasswordInput ─────────────────────────────────────────────
export interface PasswordInputProps extends Omit<FormInputProps, "type" | "suffix"> {
  showStrengthMeter?: boolean;
}

// ── FormSelect ────────────────────────────────────────────────
export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  state?: InputState;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
}

// ── FormCheckbox ──────────────────────────────────────────────
export interface FormCheckboxProps {
  id: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

// ── ValidationMessage ─────────────────────────────────────────
export interface ValidationMessageProps {
  variant: ValidationVariant;
  message: string;
  className?: string;
}

// ── GovAlertBox ───────────────────────────────────────────────
export interface GovAlertBoxProps {
  variant?: AlertBoxVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// ── AuthCard ──────────────────────────────────────────────────
export interface AuthCardProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
  className?: string;
}
