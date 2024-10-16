import { MyTripPlans } from "../../components/mate/MyTrip";
import { useState, useEffect, memo } from "react";

const TripDetails = ({ tripDetails, selectedTrip }) => {
  const [groupedByDate, setGroupedByDate] = useState({});

  useEffect(() => {
    if (Array.isArray(tripDetails) && selectedTrip) {
      const grouped = tripDetails.reduce((acc, detail) => {
        const date = detail.plan_dt;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(detail);
        return acc;
      }, {});

      setGroupedByDate(grouped);
    }
  }, [tripDetails, selectedTrip]);

  if (!tripDetails || !Array.isArray(tripDetails) || !selectedTrip) {
    return <p></p>;
  }

  return (
    <div className="flex flex-col pt-10">
      <div className="font-semibold p-[30px] mb-10 border-t-2">
        <h1 className="TitleLabel mb-5 text-3xl">{selectedTrip.title}</h1>
        <p>
          {selectedTrip.startDt.slice(0, 10)} to <span> </span>
          {selectedTrip.endDt.slice(0, 10)}
        </p>
      </div>

      <div className="flex-col ml-8 mb-20">
        {Object.keys(groupedByDate).length > 0 ? (
          Object.keys(groupedByDate).map((date, index) => (
            <div key={index} className="pb-5">
              <h2 className="text-2xl font-bold mt-4">
                Day {index + 1} ({date.slice(0, 10)})
              </h2>

              {groupedByDate[date].map((detail, index) => (
                <div key={index}>
                  <div className="flex-1 relative mt-10">
                    <MyTripPlans
                      title={detail.title}
                      address={detail.address}
                      seq={detail.seq + 1}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default memo(TripDetails);
