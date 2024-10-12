import Review from "../../components/mypage/Review.jsx";

function MyReview() {
    return (
        <div className="App mx-[300px]">
            <h1 className="text-2xl font-bold mb-10 mt-10">내가 작성한 리뷰</h1>
            <Review></Review>
        </div>
    );
}

export default MyReview;
