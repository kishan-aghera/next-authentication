"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// {
//   "_id": "64d5c2468b4f060981749d93",
//   "username": "kishan",
//   "email": "kishan@example.com",
//   "isVerified": false,
//   "isAdmin": false,
//   "__v": 0
// }

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  const logout = async () => {
    try {
      await axios.delete("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log(`Error while logging out:\n${error.message}`);
    }
  };

  const getUserData = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response);
    setUser(response.data.user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      {user ? (
        <Link
          className="py-2 px-4 bg-green-200 rounded-full my-6 hover:bg-green-300"
          href={`/profile/${user?._id}`}
        >
          {user?.username}
        </Link>
      ) : (
        ""
      )}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
