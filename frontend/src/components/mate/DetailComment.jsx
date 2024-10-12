import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export const CommentForm = ({ addNewComment }) => {
  const [comment, setComment] = useState(""); // State to hold the comment input
  const { token } = useAuth();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      findMateNo: 43,
      reply: comment,
      publicYn: "Y",
      custNo: 2,
      seq: 1,
      createDt: new Date(),
    };

    try {
      const response = await axios.post("/api/mate/reply", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      console.log(response.data);
      addNewComment(response.data); // Add the new comment to the comment list
      setComment(""); // Clear the textarea after submission
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  console.log(comment.data);
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

const CommentSection = ({ findMateNo }) => {
  const [comments, setComments] = useState([]); // State to store all comments
  // console.log(findMateNo);
  // Function to fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      if (findMateNo) {
        axios
          .get(`/api/mate/reply?findMateNo=${findMateNo}`)
          .then((response) => {
            console.log("reply response", JSON.stringify(response.data));
            setComments(response.data); // Assuming the response contains an array of comments
          })
          .catch((error) => {
            console.error(error);
          });
        // try {
        //   const response = await axios.get(
        //     `api/mate/reply?findMateNo=${findMateNo}`
        //   );
        //   console.log("response: ", response.data);
        // } catch (error) {
        //   console.error("Error fetching comments:", error);
        // }
      }
    };

    fetchComments(); // Fetch comments on component mount
  }, [findMateNo]); // Dependency array to run this effect when `findMateNo` changes

  // Function to add a new comment to the comments list
  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // Function to update an existing comment
  const editComment = async (updatedComment) => {
    try {
      const response = await axios.put(
        `/mate/reply/${updatedComment.find_mate_reply_no}`,
        updatedComment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.find_mate_reply_no === updatedComment.find_mate_reply_no
            ? response.data
            : comment
        )
      );
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Function to delete a comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/mate/reply/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.find_mate_reply_no !== commentId
        )
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      {/* Comment Form for Adding New Comment */}
      <CommentForm addNewComment={addNewComment} />

      {/* Show all comments */}
      <div className="my-20">
        <h1 className="border-b-2 p-2">
          댓글 <b>{comments.length}</b>
        </h1>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <ShowComment
              key={comment.find_mate_reply_no}
              name={comment.cust_no}
              reply={comment.reply}
              date={comment.date}
            />
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};
export const ShowComment = ({
  name,
  reply,
  date,
  editComment,
  deleteComment,
}) => {
  // Handle comment editing (logic can be expanded as per your requirements)
  const handleEdit = () => {
    const updatedComment = {
      find_mate_reply_no: 1, // Replace with real comment ID
      reply: "Updated comment text", // Replace with actual edited text
      cust_no: name,
      date: new Date().toISOString().slice(0, 10),
    };
    editComment(updatedComment);
  };

  // Handle comment deletion
  const handleDelete = () => {
    deleteComment(1); // Replace with the actual comment ID
  };

  return (
    <div className="p-2 py-[40px] border-b-2">
      <div className="relative ">
        <p className="font-semibold pt-1">{name}</p>
        <div className="flex justify-around w-[5%] absolute top-4 right-6 text-xs underline">
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
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

export default CommentSection;
