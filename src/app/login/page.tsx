"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialUserState = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState(initialUserState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);

      console.log(`Response when logging in:\n${response.data}`);

      router.push("/profile");
    } catch (error: any) {
      console.log(`Login failed:\n${error.message}`);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <section className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-opacity-50"
        >
          Login
        </button>
        <Link href="/forgot-password" className="ml-3 text-blue-600 underline text-sm">
          Forgot Password?
        </Link>
        <Link href="/signup" className="ml-3 text-blue-600 underline">
          Sign Up
        </Link>
      </section>
    </div>
  );
};

export default Login;
