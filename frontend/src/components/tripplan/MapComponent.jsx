import {CustomOverlayMap, Map, MapMarker, Polyline} from "react-kakao-maps-sdk";
import {useEffect, useState} from "react";

const MapComponent = ({planCoordinate = {}, searchMap}) => {
    const [center, setCenter] = useState({
        lat: searchMap.mapy,
        lng: searchMap.mapx,
    });

    useEffect(() => {
        setCenter({
            lat: searchMap.mapy,
            lng: searchMap.mapx
        })
    }, [searchMap]);


    const linePath = Object.keys(planCoordinate).map((day) => (
        planCoordinate[day].map((pos, index) => (
            {
                lat: pos.mapy,
                lng: pos.mapx,
                index: index
            }
        ))
    ))

    return (
        <Map id="map" center={center} level={searchMap.level} className={`h-full`}
             isPanto={true}>
            {Object.keys(planCoordinate).map((day) => (
                planCoordinate[day].map((pos, index) => (
                    <CustomOverlayMap key={index} position={{lat: pos.mapy, lng: pos.mapx}}>
                        <div
                            className={`flex items-center justify-center size-7 bg-orange rounded-full font-bold text-white`}>
                            {index + 1}
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
            <MapMarker
                position={{
                    lat: searchMap.mapy,
                    lng: searchMap.mapx
                }}
            />
        </Map>
    )

}
export default MapComponent;
