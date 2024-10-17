// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function MateLike({ findMateNo }) {
//   const { token, userInfo } = useAuth();
//   const [isSuccessful, setIsSuccessful] = useState(false);
//   const heartEmpty = (
//     <FontAwesomeIcon className="text-gray-500 text-[25px]" icon={faHeart} />
//   );
//   const heartFull = (
//     <FontAwesomeIcon
//       icon="fa-solid fa-heart"
//       className="text-gray-500 text-[25px]"
//     />
//   );

//   useEffect(() => {
//     const dto = {
//       custNo: userInfo.custNo,
//       findMateNo: findMateNo,
//     };
//     const sendFindMateLike = async () => {
//       try {
//         const response = await axios.post(`/api/mate/like`, dto, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         setIsSuccessful(true);
//       } catch (error) {
//         console.error("Error getting user like: ", error);
//       }
//     };
//     sendFindMateLike();
//   }, [custNo, token]);

//   return (
//     <div>
//       {isSuccessful ? (
//         <span className="inline-block mr-4 ">{heartFull}</span>
//       ) : (
//         <span className="inline-block mr-4 ">{heartEmpty}</span>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartEmptyIcon } from "@fortawesome/free-regular-svg-icons"; // Empty heart icon
import { faHeart as heartFullIcon } from "@fortawesome/free-solid-svg-icons"; // Full heart icon
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function MateLike({ findMateNo }) {
  const { token, userInfo } = useAuth();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const heartEmpty = (
    <FontAwesomeIcon
      className="text-orange text-[25px]"
      icon={heartEmptyIcon}
    />
  );
  const heartFull = (
    <FontAwesomeIcon className="text-orange text-[25px]" icon={heartFullIcon} />
  );

  const sendFindMateLike = async () => {
    setIsLoading(true);
    const dto = {
      custNo: userInfo.custNo,
      findMateNo: findMateNo,
    };

    try {
      const response = await axios.post(`/api/mate/like`, dto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setIsSuccessful(true);
      }
    } catch (error) {
      console.error("Error sending like request: ", error);
      setIsSuccessful(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeartClick = () => {
    sendFindMateLike();
  };

  return (
    <div onClick={handleHeartClick} style={{ cursor: "pointer" }}>
      {isLoading ? (
        <span className="inline-block mr-4">{heartEmpty}</span>
      ) : isSuccessful ? (
        <span className="inline-block mr-4">{heartFull}</span>
      ) : (
        <span className="inline-block mr-4">{heartEmpty}</span>
      )}
    </div>
  );
}
