import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const userName = JSON.parse(localStorage.getItem("userInfo")).nickname;
const userNo = JSON.parse(localStorage.getItem("userInfo")).custNo;
const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
export const CommentForm = ({ addNewComment, findMateNo }) => {
  const { token } = useAuth();
  const [comment, setComment] = useState(""); // State to hold the comment input

  const handleChange = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(comment);
    e.preventDefault();

    const formData = {
      find_mate_no: findMateNo,
      reply: comment,
      public_yn: "Y",
      seq: 1,
      cust_no: userNo,
      create_by: userEmail,
    };

    try {
      const response = await axios.post("/api/mate/reply", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });

      console.log("Response from API after posting comment:", response.data);

      if (response.status === 200 && response.data) {
        const newComment = {
          ...formData,
          find_mate_reply_no: response.data,
        };
        addNewComment(newComment); // Add the new comment to the comment list
        setComment(""); // Clear the textarea after submission
        console.log("comment successfully logged");
        console.log(comment);
      } else {
        console.error("Failed to add the comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="border-2 py-2 my-20 flex-col relative">
      <div className="w-[100%] h-[30%] mb-5 pb-5">
        <p className="pl-2 pb-1 border-b text-lg font-semibold">{userName}님</p>
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
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (findMateNo) {
        setLoading(true);
        axios
          .get(`/api/mate/reply?findMateNo=${findMateNo}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("API response:", response.data);
            setComments(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }
    };
    fetchComments();
  }, [findMateNo]);

  const editComment = async (updatedComment) => {
    try {
      const response = await axios.put("/api/mate/reply", updatedComment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const updatedCommentData = {
        ...updatedComment,
        findMateReplyNo: response.data.data || updatedComment.findMateReplyNo,
      };

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.find_mate_reply_no === updatedComment.find_mate_reply_no
            ? updatedCommentData
            : comment
        )
      );
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Function to delete a comment
  const deleteComment = async (deletedCommentId) => {
    try {
      await axios.delete(
        `/api/mate/reply?findMateReplyNo=${deletedCommentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Remove the comment from the state
      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.find_mate_reply_no !== deletedCommentId
        )
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  // Function to add a new comment to the comments list
  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <CommentForm addNewComment={addNewComment} findMateNo={findMateNo} />
      <h1 className="border-b-2 p-2">
        댓글 <b>{comments.length}</b>
      </h1>
      {loading ? ( // Show loading message while data is being fetched
        <p>로딩중...</p>
      ) : comments.length > 0 ? ( // Render comments once available
        comments.map((comment) => (
          <ShowComment
            key={comment.find_mate_reply_no}
            comment={comment}
            editComment={editComment}
            deleteComment={deleteComment} // Pass deleteComment to ShowComment
          />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export const ShowComment = ({ comment, editComment, deleteComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReply, setUpdatedReply] = useState(comment.reply);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedComment = {
      ...comment,
      reply: updatedReply,
    };

    editComment(updatedComment);

    setIsEditing(false);
  };

  const handleDelete = () => {
    const deletedComment = comment.find_mate_reply_no;
    console.log(deletedComment);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(deletedComment);
    }
  };
  console.log(updatedReply);
  return (
    <div className="p-2 py-[40px] border-b-2 relative">
      <div>
        <p className="font-semibold mb-2"> {comment.create_by}</p>
        <div className="flex justify-around w-[10%] absolute top-4 right-6 text-xs underline">
          {userNo == comment.cust_no ? (
            <>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={handleDelete} style={{ color: "red" }}>
                삭제
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <textarea
            className="w-[100%] p-2"
            autoFocus
            value={updatedReply}
            onChange={(e) => setUpdatedReply(e.target.value)}
            required
          />
          <div className="absolute right-2 bottom-2">
            <button className="button" type="submit">
              저장
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <h3 className="py-5">{comment.reply}</h3>
      )}

      <div>
        <span className="font-light">
          {new Date(comment.create_dt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default CommentSection;
