"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialUserState = {
  email: "",
  password: "",
  username: "",
};

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState(initialUserState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(`Error in signing up:\n${error}`);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <section className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign up to our platform
        </h5>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="username"
            id="username"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={onSignUp}
          type="submit"
          disabled={buttonDisabled}
          className="text-white disabled:bg-opacity-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
        <Link href="/login" className="ml-3 text-blue-600 underline">
          Login
        </Link>
      </section>
    </div>
  );
};

export default SignUp;
