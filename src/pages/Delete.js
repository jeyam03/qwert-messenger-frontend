import React, { useContext } from "react";
import { GunContext } from "../App";
import Gun from "gun";

const Delete = () => {
  const { gun } = useContext(GunContext);

  const handleDelete = () => {
    const gun = Gun({
      peers: ["http://localhost:5050/gun"],
    });
    gun.get("MESSAGES").put(null);
    console.log("deleted");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <button
        onClick={handleDelete}
        className="rounded-full shadow-lg px-16 py-8 text-4xl font-semibold bg-red-400 text-white hover:bg-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
