"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token") || "";
    setToken(urlToken);
  }, [searchParams]);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });

        setVerified(true);
      } catch (error: any) {
        setError(true);
      }
    };

    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-green-200 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
