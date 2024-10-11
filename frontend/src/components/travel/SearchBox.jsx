function SearchBox({searchValue, setSearchValue, onSearchClick}) {
    const onChageHandler = (e) => {
        setSearchValue(e.target.value);
    };

    return(
        <div className="text-right mb-6">
            <div className="inline-block relative w-1/3">
                <input
                    onChange={onChageHandler}
                    value={searchValue}
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                    onClick={() => {onSearchClick(searchValue)}}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    🔍
                </button>
            </div>
        </div>
    );
}

export default SearchBox;