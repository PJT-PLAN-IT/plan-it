function ReviewFile({images, newImagesUrl, removeImage}) {
    return(
        <div className="flex space-x-2 mt-4">
            {/* 기존 사진 */}
            {images.map((image, index) => (
                <div key={index} className="relative w-20 h-20 border rounded-lg">
                    <button
                        type="button"
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                        onClick={() => removeImage(index, "stored")}
                    >
                        X
                    </button>
                    <img src={image} alt="첨부된 사진" className="w-full h-full object-cover rounded-lg" />
                </div>
            ))}
            {/* 신규 추가된 사진 */}
            {newImagesUrl.map((image, index) => (
                <div key={index} className="relative w-20 h-20 border rounded-lg">
                    <button
                        type="button"
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                        onClick={() => removeImage(index, "new")}
                    >
                        X
                    </button>
                    <img src={image} alt="첨부된 사진" className="w-full h-full object-cover rounded-lg" />
                </div>
            ))}
        </div>
    );
}

export default ReviewFile;