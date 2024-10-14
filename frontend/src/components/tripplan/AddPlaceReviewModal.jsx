import {useState} from 'react';

const AddPlaceReviewModal = ({data, onSave, onClose}) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating < 0 || rating > 5) {
            alert('별점을 선택해주세요.');
            return;
        }
        if (!reviewText || reviewText === '') {
            alert('리뷰를 적어주세요.');
            return;
        }
        if (images.length > 4) {
            alert('이미지는 최대 4개까지 저장 가능합니다.');
            return;
        }
        onSave({
            star: rating,
            review: reviewText,
            reviewImg1: images[0],
            reviewImg2: images[1],
            reviewImg3: images[2],
            reviewImg4: images[3],
        });
        onClose(); // 모달 닫기
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{data.title} 리뷰 작성</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">별점:</label>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">리뷰:</label>
                        <textarea
                            className="border border-gray-300 rounded w-full p-2"
                            rows="4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">이미지 업로드:</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                        <div className="mt-2">
                            {images.map((image, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span>{image.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="text-red-500"
                                    >
                                        제거
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-white rounded px-4 py-2"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded px-4 py-2"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPlaceReviewModal;
