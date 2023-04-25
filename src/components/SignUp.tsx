import { useState } from "react";
import { useForm } from "react-hook-form";
import { user } from "../model/user";
import { signUp, signUpCredentials } from "../network/not_api";
import { AiFillCloseSquare, AiFillEye } from "react-icons/ai";
import TextInputField from "./form/textinput";

interface SignUpProps {
  setSignUpBox: React.Dispatch<React.SetStateAction<Boolean>>;

  onSignUpSuccesful: (user: user) => void;
}

export default function SignUp({
  setSignUpBox,
  onSignUpSuccesful,
}: SignUpProps) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<signUpCredentials>();

  async function onSubmit(credentials: signUpCredentials) {
    try {
      console.log(credentials);
      const newUser = await signUp(credentials);
      onSignUpSuccesful(newUser);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const showScrollingOnClosed = () => {
    document.body.style.overflowY = "auto";
  };
  return (
    <div>
      <div className="w-full backdrop-blur-sm px-5 flex items-center justify-center inset-0 bg-transparent fixed">
        <div className="sm:h-[520px] h-[480px] sm:w-[500px] mt-[170px] w-[350px] sm:mt-0 w- sm:max-w-full bg-[#423B34]  rounded-[8px]">
          <div className="flex items-center sm:justify-between  pl-5 py-4 sm:p-5">
            <p className="text-[20px] font-sans text-[#cccccc] font-semibold">
              Sign Up
            </p>
            <div className="fixed right-[20%] sm:right-[35%]">
              <AiFillCloseSquare
                onClick={() => {
                  setSignUpBox(false);
                }}
                className="text-[30px] cursor-pointer text-[#bebab5]"
              />
            </div>
          </div>
          <span className="h-[1px] sm:mb-5 w-full bg-[#626161] block"></span>
          <div className="flex flex-col mt-1 sm:mt-7 items-center justify-center">
            <form
              className="w-full "
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              <div className="flex w-[300px] sm:w-[400px] mx-auto items-center justify-center gap-4 flex-col">
                <TextInputField
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Username*"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.username}
                />
              </div>
              <div className="flex w-[300px] sm:w-[400px] mx-auto items-center justify-center gap-4 flex-col">
                <TextInputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email*"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.email}
                />
              </div>
              <div className="flex w-[300px] relative sm:w-[400px] mx-auto items-center justify-center gap-4 flex-col">
                <TextInputField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder={"Password*"}
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.password}
                />
                <div>
                  <AiFillEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="text-black absolute sm:top-[35%] top-[37%] cursor-pointer right-4 "
                  />
                </div>
              </div>
              <div className="flex justify-center mx-2 mt-1 sm:mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={showScrollingOnClosed}
                  className="h-[44px] text-[18px] text-[#423B34] font-primary font-semibold flex items-center mb-5 justify-center w-[400px] bg-[#cccccc] rounded-[8px]"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
