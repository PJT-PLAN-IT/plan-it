import {useState} from "react";
import ReviewFile from "./ReviewFile.jsx";

function ReviewModal({isOpen, closeModal, review, updateOnClick}) {
    if (!isOpen) return null; // 모달이 열리지 않은 상태면 아무것도 렌더링하지 않음
    const [formData, setFormData] = useState(review);

    // 기존 저장된 이미지 URL (서버에서 가져옴)
    const [images, setImages] = useState([formData.reviewImg1, formData.reviewImg2, formData.reviewImg3, formData.reviewImg4].filter(Boolean) || []); // 서버에서 가져온 이미지
    const [newImages, setNewImages] = useState([]); // 신규 추가된 이미지
    const [newImageUrls, setNewImageUrls] = useState([]);

    // 최대 4개의 이미지만 허용하는 파일 첨부 처리
    const handleFileChange = (e) => {
        if(e.target.files.length === 0){
            return;
        }
        const files = Array.from(e.target.files);
        const newImageUrl = files.map(file => URL.createObjectURL(file));

        if (images.length + newImages.length < 4) {
            setNewImageUrls((prev) => [...prev, newImageUrl]);
            setNewImages((prev) =>  [...prev, ...files]);
        } else {
            alert("최대 4개의 이미지만 첨부할 수 있습니다.");
        }
    };

    // 사진 삭제 함수 (기존 또는 신규 사진에서 삭제)
    const removeImage = (index, type) => {
        if (type === "stored") {
            setImages(images.filter((_, i) => i !== index));
        } else {
            setNewImages(newImages.filter((_, i) => i !== index));
        }
    };

    //리뷰 변경
    const reviewOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            review : e.target.value
        }));
    }

    //수정버튼클릭
    const updateBtnOnClick = () => {
        const data = {
            ...formData,
            images : images,
            newImages : newImages
        };

        updateOnClick(data);
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <form className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
                    <h2 className="text-xl font-bold mb-2">{formData.title}에 관해서 후기를 남겨보세요!</h2>

                    <div className="flex items-center mb-6">
                        <div className="flex ml-2 space-x-2">
                            {[...Array.from({length : formData.star}).map((s, index) => (
                                <button key={index} type="button" className="text-orange text-2xl">★</button>
                            ))]}

                            {[...Array.from({length : 5 - formData.star}).map((s, index) => (
                                <button key={index} type="button" className="text-gray-400 text-2xl">★</button>
                            ))]}
                        </div>
                    </div>

                    <label htmlFor="review" className="block text-gray-700 font-semibold mb-2">어떤 점이 좋았나요?</label>
                    <textarea id="review"
                              value={formData.review}
                              onChange={reviewOnChange}
                              rows={7}
                              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                              ></textarea>

                    <div className="text-right text-gray-400 text-sm mt-1">0/5000</div>

                    {/* 사진 첨부 버튼 */}
                    <button type="button" className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 mt-4 hover:bg-gray-100">
                        <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>사진 첨부하기</span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </button>

                    <ReviewFile images={images} newImagesUrl={newImageUrls} removeImage={removeImage}></ReviewFile>

                    <div className="flex justify-center mt-10">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="w-1/5 bg-white-500 text-orange py-2 border border-orange rounded-full mt-10 mr-5">
                            취소
                        </button>

                        <button
                            type="button"
                            onClick={updateBtnOnClick}
                            className="w-1/5 bg-orange text-white py-2 rounded-full hover:bg-orange mt-10">
                            수정
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewModal;