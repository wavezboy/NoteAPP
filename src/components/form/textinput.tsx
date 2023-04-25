import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

export default function TextInputField({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps) {
  return (
    <div className="flex min-h-[106px] w-full  gap-2 flex-col">
      <label className="font-sans font-normal text-[15px] text-[#cccccc]">
        {label}
      </label>
      <input
        className=" placeholder:text-[#423B34] outline-none font-secondary rounded-[4px] text-black border-[#CCCCCC] border-2 w-[400px] max-w-full p-2 bg-[#cccccc]"
        {...props}
        {...register(name, registerOptions)}
      />
      {error?.message && <p className="text-[#a1a1a1]">{label} is required</p>}
    </div>
  );
}
