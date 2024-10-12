import {Data} from './../../data/travelDetailInfoData.js';

function TourInfo({contentTypeId, item}) {

    return (
        <div>
            <h2 className="text-lg font-semibold bg-orange text-white px-4 py-2 rounded-t-md">관광지</h2>
            <table className="w-full text-sm border">
                <tbody>
                {Data[contentTypeId].map((info, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{info.label}</td>
                        <td className="border px-4 py-2">{item[info.key]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TourInfo;