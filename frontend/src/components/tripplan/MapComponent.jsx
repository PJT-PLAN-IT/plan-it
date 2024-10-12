import {CustomOverlayMap, Map, MapMarker, Polyline} from "react-kakao-maps-sdk";

const MapComponent = () => {
    const positions = [
        { lat: 33.450701, lng: 126.570667, title: '첫 번째' },
        { lat: 33.452701, lng: 126.572667, title: '두 번째' },
        { lat: 33.453701, lng: 126.573667, title: '세 번째' },
    ];

    const linePath = positions.map(pos => (
        {
            lat : pos.lat,
            lng : pos.lng
        }
    ));

    return (
        <Map id="map" center={{lat: 33.450701, lng: 126.570667}} level={4} className={`h-full`}>
            {positions.map((pos, index) => (
                <CustomOverlayMap key={index} position={{lat: pos.lat, lng: pos.lng}}>
                    <div className={`flex items-center justify-center size-7 bg-orange rounded-full font-bold text-white`}>
                        {index + 1}
                    </div>
                </CustomOverlayMap>
            ))}
            <Polyline
                path={linePath}
                strokeWeight={2}
                strokeColor={'#FB6134'}
                strokeOpacity={1}
                strokeStyle={'dash'}
            />
        </Map>

    )

}
export default MapComponent;
