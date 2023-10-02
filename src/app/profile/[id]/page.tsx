"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const ProfileShow = ({ params }: any) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.delete("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log(`Error while logging out:\n${error.message}`);
    }
  };
  return (
    <div className="flex flex-col space-y-2 justify-center items-center min-h-screen py-2">
      <span>Profile of</span>
      <span className="text-xl bg-orange-200">{params.id}</span>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileShow;
