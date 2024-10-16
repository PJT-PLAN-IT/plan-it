import {CustomOverlayMap, Map, Polyline} from "react-kakao-maps-sdk";
import {useEffect, useState} from "react";

/**
 * [planCoordinate 형식]
 * 날짜(array) : index(array) : {... mapx:'', mapy: '', ...};
 */
const DetailPageMap = ({planCoordinate = {}}) => {
    const [linePath, setLinePath] = useState({});
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        setLinePath(Object.keys(planCoordinate).map((day) => (
            planCoordinate[day].map((pos) => (
                {
                    lat: pos.mapy,
                    lng: pos.mapx,
                    index: pos.seq
                }
            ))
        )));
    }, [planCoordinate]);

    useEffect(() => {
        const allPaths = Object.values(linePath).flat();
        setCenter(calculateCenter(allPaths));
    }, [linePath]);

    /**
     * 지도중간점 계산
     */
    const calculateCenter = (paths) => {
        const totalLat = paths.reduce((sum, point) => sum + point.lat, 0);
        const totalLng = paths.reduce((sum, point) => sum + point.lng, 0);
        const centerLat = totalLat / paths.length;
        const centerLng = totalLng / paths.length;
        return {lat: centerLat, lng: centerLng};
    };

    return (
        <Map id="map" center={center} level={13} className={`w-full h-full flex justify-center items-center`}>
            {Object.keys(planCoordinate).map((day) => (
                planCoordinate[day].map((pos) => (
                    <CustomOverlayMap key={pos.seq} position={{lat: pos.mapy, lng: pos.mapx}}>
                        <div
                            className={`flex items-center justify-center size-7 bg-orange rounded-full font-bold text-white`}>
                            {pos.seq + 1}
                        </div>
                    </CustomOverlayMap>
                ))
            ))}
            <Polyline
                path={linePath}
                strokeWeight={2}
                strokeColor={'#FB6134'}
                strokeOpacity={1}
                strokeStyle={'dash'}
            />
        </Map>
    );
};
export default DetailPageMap;
