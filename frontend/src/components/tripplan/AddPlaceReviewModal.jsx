import {useEffect, useState} from 'react';

const AddPlaceReviewModal = ({data, onSave, onClose}) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [imageUrls, setImageUrls] = useState([]); // 기존 이미지 리스트(URL)
    const [newImages, setNewImages] = useState([]); // 신규 이미지 리스트(FILE)
    const [newImageUrls, setNewImageUrls] = useState([]); // 신규 이미지 리스트(URL)

    useEffect(() => {
        if (data.placeReviewNo) {
            setRating(data.star);
            setReviewText(data.review);
            setImageUrls([data.reviewImg1, data.reviewImg2, data.reviewImg3, data.reviewImg4].filter(Boolean));
        }
    }, []);

    const urlToFile = async (imgUrl, filename) => {
        const response = await fetch(imgUrl); // URL에서 이미지 데이터 가져오기
        const blob = await response.blob(); // Blob 데이터로 변환
        return new File([blob], filename, {type: blob.type}); // Blob을 File 객체로 변환
    };

    const handleImageChange = (e) => {
        if (e.target.files.length === 0) {
            return;
        }
        const newImages = Array.from(e.target.files);
        const newImageUrls = newImages.map(file => URL.createObjectURL(file));

        if (imageUrls.length + newImages.length <= 4) {
            setNewImages((prev) => [...prev, ...newImages]);
            setNewImageUrls((prev) => [...prev, ...newImageUrls]);
        } else {
            alert('이미지는 최대 4개까지 저장 가능합니다.');
        }
    };

    const handleRemoveImage = (index, type) => {
        if (type === "prev") {
            // 기존 이미지
            setImageUrls((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
            // 신규 이미지
            setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
            setNewImageUrls((prevImages) => prevImages.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating < 0 || rating > 5) {
            alert('별점을 선택해주세요.');
            return;
        }
        if (!reviewText || reviewText === '') {
            alert('리뷰를 적어주세요.');
            return;
        }
        if (imageUrls.length + newImages.length > 4) {
            alert('이미지는 최대 4개까지 저장 가능합니다.');
            return;
        }

        const images = await Promise.all(imageUrls.map(async (imgUrl) => {
            const lastIndexOf = imgUrl.lastIndexOf("/");
            return await urlToFile(imgUrl, imgUrl.substr(lastIndexOf + 1));
        }));

        let returnData = {
            star: rating,
            review: reviewText,
            images: images,
            newImages: newImages,
            totalImages: images.concat(newImages)
        };

        if (data.placeReviewNo) {
            returnData = {
                ...returnData,
                placeReviewNo: data.placeReviewNo
            };
        }

        onSave(returnData);
        onClose(); // 모달 닫기
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
                            {imageUrls.map((imageUrl, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <img src={imageUrl} alt="첨부된 사진"
                                         className="w-20 h-20 object-cover rounded-lg"/>
                                    <span>{"Image" + index}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index, "prev")}
                                        className="text-red-500"
                                    >
                                        제거
                                    </button>
                                </div>
                            ))}
                            {newImageUrls.map((newImageUrl, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <img src={newImageUrl} alt="첨부된 사진"
                                         className="w-20 h-20 object-cover rounded-lg"/>
                                    <span>{newImages[index].name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index, "new")}
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
