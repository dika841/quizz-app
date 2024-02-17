import { Button, TextField } from "@libs/components";
import { FC, FormEvent, ReactElement, useState } from "react";
import { userData } from "@store/store";
import { useNavigate } from "react-router-dom";
export const LoginModule: FC = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setIsError(true);
      setMessage("Email or Password Cannot be Empty");
    } else if (email !== userData.email || password !== userData.password) {
      setIsError(true);
      setMessage("Incorrect Email or Password");
    } else {
      navigate("/quiz");
    }
  };
  return (
    <section className=" flex justify-center items-center w-full h-screen ">
      <div className="flex flex-col items-center bg-white w-full md:w-1/3 h-fit py-6 px-8 rounded-lg">
        <div>
          <h1 className="font-bold text-2xl">Login</h1>
        </div>
        {isError && (
          <div className="bg-pink-100 border border-red-500 w-full p-2 text-center my-3 rounded-md text-red-600">
            <p>{message}</p>
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-y-2 items-center justify-center w-full h-full "
        >
          <TextField
            label="Email"
            type="text"
            name="email"
            placeholder="jhondoe@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div className="w-full">
            <Button variant="primary" size="full" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
