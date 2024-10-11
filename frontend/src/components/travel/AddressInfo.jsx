function AddressInfo({zipcode, addr1}) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold bg-orange-100 text-white px-4 py-2 rounded-t-md">기본 정보</h2>
            <table className="w-full text-sm border">
                <tbody>
                <tr>
                <td className="border px-4 py-2">우편번호</td>
                    <td className="border px-4 py-2">{zipcode}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">주소</td>
                    <td className="border px-4 py-2">{addr1}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AddressInfo;