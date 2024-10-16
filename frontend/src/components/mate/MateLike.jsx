import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MateLike() {
  const { token, userInfo } = useAuth();

  const heart = (
    <FontAwesomeIcon className="text-gray-500 text-[25px]" icon={faHeart} />
  );
  useEffect(() => {
    const custNo = {
      custNo: userInfo.custNo,
    };
    const sendFindMateLike = async () => {
      try {
        const response = await axios.post(`/api/mate/like`, custNo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if(response.code == 200)
      } catch (error) {
        console.error("Error getting user like: ", error);
      }
    };
    sendFindMateLike();
  }, [custNo, token]);

  return (
    <div>
      <span className="inline-block mr-4 ">{heart}</span>;
    </div>
  );
}
