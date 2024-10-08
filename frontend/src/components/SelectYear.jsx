function SelectYear({year, onChangeYear}) {
    return (
        <>
            <select
                value={year}
                onChange={onChangeYear}
                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
            <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M5.293 7.293l4 4a1 1 0 0 0 1.414 0l4-4A1 1 0 0 0 13.293 6.293L10 9.586 6.707 6.293A1 1 0 0 0 5.293 7.293z"/>
                </svg>
            </div>
        </>
)
    ;
}

export default SelectYear;