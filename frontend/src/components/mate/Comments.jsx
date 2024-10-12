import { useState } from "react";
import axios from "axios";

// export const CommentForm = () => {
//   const [comment, setComment] = useState(""); // State to hold the comment input

//   // Handle input change
//   const handleChange = (e) => {
//     setComment(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Prepare the data to send
//     const formData = {
//       findMateNo: 43,
//       reply: comment,
//       publicYn: "Y",
//       custNo: 2,
//       seq: 1,
//     };

//     try {
//       const response = axios.post("/mate/reply", formData, {
//         headers: {
//           "Content-Type": "application/json", // Set the content type to JSON
//         },
//       });
//       console.log("Success:", response.data); // Handle success response
//       setComment(""); // Clear the textarea after submission
//     } catch (error) {
//       console.error("Error submitting comment:", error); // Handle error response
//     }
//   };

//   return (
//     <div className="border-2 py-2 my-20 flex-col relative">
//       <div className="w-[100%] h-[30%] mb-5 pb-5">
//         <p className="pl-2 pb-1 border-b text-lg font-semibold">윤님</p>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             className="w-[100%] min-h-[120px] p-2 focus:outline-none"
//             placeholder="댓글을 입력하세요"
//             value={comment}
//             onChange={handleChange}
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="border-2 button gen my-2 absolute right-5 bottom-2"
//           >
//             등록
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

const CommentForm = ({ addNewComment }) => {
  const [comment, setComment] = useState(""); // State to hold the comment input

  // Handle input change
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send
    const formData = {
      findMateNo: 43,
      reply: comment,
      publicYn: "Y",
      custNo: 2,
      seq: 1,
    };

    try {
      const response = await axios.post("/api/mate/reply", formData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });

      console.log("Success");

      addNewComment(response.data);

      setComment(""); // Clear the textarea after submission
    } catch (error) {
      console.error("Error submitting comment:", error); // Handle error response
    }
  };

  return (
    <div className="border-2 py-2 my-20 flex-col relative">
      <div className="w-[100%] h-[30%] mb-5 pb-5">
        <p className="pl-2 pb-1 border-b text-lg font-semibold">윤님</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-[100%] min-h-[120px] p-2 focus:outline-none"
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="border-2 button gen my-2 absolute right-5 bottom-2"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

const ShowComment = ({ name, reply, date }) => {
  return (
    <div className="p-2 py-[40px] border-b-2">
      <div className="relative ">
        <p className="font-semibold pt-1">{name}</p>
        <div className="flex justify-around w-[5%] absolute top-4 right-6 text-xs underline">
          <button>수정</button>
          <button onClick={deleteComment}>삭제</button>
        </div>
      </div>
      <h3 className="py-5">{reply}</h3>
      <div>
        <div className="flex justify-between ">
          <span className="font-light">{date}</span>
          <a className="underline font-medium">답글</a>
        </div>
      </div>
    </div>
  );
};

// const ShowComment = (prop) => {
//   return (
//     <div className="p-2 py-[40px] border-b-2">
//       <div className="relative ">
//         <p className="font-semibold pt-1">{prop.name}</p>
//         <div className="flex justify-around w-[5%] absolute top-4 right-6 text-xs underline">
//           <button>수정</button>
//           <button>삭제</button>
//         </div>
//       </div>
//       <h3 className="py-5">{prop.reply}</h3>
//       <div>
//         <div className="flex justify-between ">
//           <span className="font-light">{prop.date}</span>
//           <a className="underline font-medium">답글</a>
//         </div>
//       </div>
//     </div>
//   );
// };

export { ShowComment, CommentForm };
