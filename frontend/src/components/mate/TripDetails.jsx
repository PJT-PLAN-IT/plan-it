import { MyTripPlans } from "../../components/mate/MyTrip";
import { useState, useEffect, memo } from "react";

// const TripDetails = ({ tripDetails, selectedTrip }) => {
//   const [groupedByDate, setGroupedByDate] = useState({});
//   console.log(tripDetails.data);
//   console.log("Selected Trip: ", selectedTrip);
//   console.log("Trip Details: ", tripDetails);
//   console.log("Grouped By Date: ", groupedByDate);

//   useEffect(() => {
//     if (tripDetails?.data?.data) {
//       const grouped = tripDetails.data.tripPlanDetails.reduce((acc, detail) => {
//         const date = detail.planDt; // Assuming 'planDt' is the date field in your trip details
//         if (!acc[date]) {
//           acc[date] = []; // Initialize an array for this date if it doesn't exist
//         }
//         acc[date].push(detail);
//         return acc;
//       }, {});

//       setGroupedByDate(grouped); // Store the grouped data in state
//     }
//   }, [tripDetails]);
//   if (!selectedTrip || !tripDetails || !groupedByDate) {
//     return <p>Loading trip details...</p>; // A fallback while data is loading
//   }

//   return tripDetails && tripDetails.data && groupedByDate ? (
//     <div className="flex flex-col pt-10">
//       <div className="font-semibold p-[30px] mb-10 border-t-2">
//         <h1 className="TitleLabel">{selectedTrip.title}</h1>
//         <p>
//           {selectedTrip.start_dt} to <span> </span>
//           {selectedTrip.end_dt}
//         </p>
//       </div>

//       <div className="flex-col ml-8 mb-20">
//         {Object.keys(groupedByDate).map((date, index) => (
//           <div key={index} className="pb-5">
//             <h2 className="text-2xl font-bold mt-4">day {index + 1}</h2>

//             {groupedByDate[date]
//               .sort((a, b) => a.seq - b.seq)
//               .map((detail) => (
//                 <div key={detail.tripDetailNo}>
//                   <div className="flex-3 mt-3.5 font-bold text-xl">
//                     {detail.content}
//                   </div>
//                   <div className="flex-1 relative">
//                     <MyTripPlans
//                       title={detail.title}
//                       address={detail.address}
//                       seq={detail.seq}
//                     />
//                   </div>
//                 </div>
//               ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   ) : (
//     ""
//   );
// };

// const TripDetails = ({ tripDetails }) => {
//   const [groupedByDate, setGroupedByDate] = useState({});

//   // Group the tripPlanDetails by date (planDt)
//   useEffect(() => {
//     if (tripDetails) {
//       console.log("Trip Plan Details: ", tripDetails);

//       if (Array.isArray(tripPlanDetails) && selectedTrip) {
//         // Filter trip details based on selected trip's tripPlanNo
//         const filteredTripDetails = tripPlanDetails.filter(
//           (detail) => detail.tripPlanNo === selectedTrip.tripPlanNo
//         );

//       const grouped = tripDetails.reduce((acc, detail) => {
//         const date = detail.planDt; // Assuming 'planDt' is the date field
//         if (!acc[date]) {
//           acc[date] = []; // Initialize an array for this date if it doesn't exist
//         }
//         acc[date].push(detail);
//         return acc;
//       }, {});

//       setGroupedByDate(grouped); // Store the grouped data in state
//     }
//   }, [tripDetails]);

//   // Check if data is ready before rendering
//   if (!tripDetails) {
//     return <p>Loading trip details...</p>;
//   }

//   return (
//     <div className="flex flex-col pt-10">
//       <div className="font-semibold p-[30px] mb-10 border-t-2">
//         <h1 className="TitleLabel">Trip Plan Details</h1>
//       </div>

//       <div className="flex-col ml-8 mb-20">
//         {/* Ensure groupedByDate has valid data */}
//         {Object.keys(groupedByDate).length > 0 ? (
//           Object.keys(groupedByDate).map((date, index) => (
//             <div key={index} className="pb-5">
//               <h2 className="text-2xl font-bold mt-4">
//                 Day {index + 1} ({date})
//               </h2>

//               {groupedByDate[date]
//                 .sort((a, b) => a.seq - b.seq) // Sort by 'seq' if applicable
//                 .map((detail) => (
//                   <div key={detail.tripDetailNo}>
//                     <div className="flex-3 mt-3.5 font-bold text-xl">
//                       {detail.content}
//                     </div>
//                     <div className="flex-1 relative">
//                       <MyTripPlans
//                         title={detail.title}
//                         address={detail.address}
//                         seq={detail.seq}
//                       />
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           ))
//         ) : (
//           <p>No trip details available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const TripDetails = ({ tripDetails, selectedTrip }) => {
//   const [groupedByDate, setGroupedByDate] = useState({});

//   useEffect(() => {
//     console.log("Trip Plan Details: ", tripDetails);
//     if (Array.isArray(tripDetails) && selectedTrip) {
//       const filteredTripDetails = tripDetails.filter(
//         (detail) => detail.tripPlanNo === selectedTrip.tripPlanNo
//       );

//       console.log("Filtered Trip Details: ", filteredTripDetails);

//       const grouped = filteredTripDetails.reduce((acc, detail) => {
//         const date = detail.planDt;
//         if (!acc[date]) {
//           acc[date] = [];
//         }
//         acc[date].push(detail);
//         return acc;
//       }, {});

//       console.log("Grouped By Date: ", grouped);
//       setGroupedByDate(grouped);
//     } else {
//       console.warn(
//         "tripPlanDetails is not an array or selectedTrip is missing."
//       );
//     }
//   }, [tripDetails, selectedTrip]);

//   if (!tripDetails || !Array.isArray(tripDetails) || !selectedTrip) {
//     return <p>Loading trip details...</p>;
//   }

//   return (
//     <div className="flex flex-col pt-10">
//       <div className="font-semibold p-[30px] mb-10 border-t-2">
//         <h1 className="TitleLabel">{selectedTrip.title} Details</h1>
//         <p>
//           {selectedTrip.start_dt} to <span> </span>
//           {selectedTrip.end_dt}
//         </p>
//       </div>

//       <div className="flex-col ml-8 mb-20">
//         {Object.keys(groupedByDate).length > 0 ? (
//           Object.keys(groupedByDate).map((date, index) => (
//             <div key={index} className="pb-5">
//               <h2 className="text-2xl font-bold mt-4">
//                 Day {index + 1} ({date})
//               </h2>

//               {groupedByDate[date]
//                 .sort((a, b) => a.seq - b.seq)
//                 .map((detail) => (
//                   <div key={detail.tripDetailNo}>
//                     <div className="flex-3 mt-3.5 font-bold text-xl">
//                       {detail.content}
//                     </div>
//                     <div className="flex-1 relative">
//                       <MyTripPlans
//                         title={detail.title}
//                         address={detail.address}
//                         seq={detail.seq}
//                       />
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           ))
//         ) : (
//           <p>No trip details available</p>
//         )}
//       </div>
//     </div>
//   );
// };

const TripDetails = ({ tripDetails, selectedTrip }) => {
  const [groupedByDate, setGroupedByDate] = useState({});

  useEffect(() => {
    // console.log("Trip Plan Details: ", tripDetails);

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

  // console.log("groupedByDate", groupedByDate);
  // console.log(selectedTrip);
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
              {/* {groupedByDate[date]
                .sort((a, b) => a.seq - b.seq)
                .map((detail) => (
                  <div key={detail.tripDetailNo}>
                    <div className="flex-3 mt-3.5 font-bold text-xl">
                      {detail.content}
                    </div>
                    <div className="flex-1 relative">
                      <MyTripPlans
                        title={detail.title}
                        address={detail.address}
                        seq={detail.seq}
                      />
                    </div>
                  </div>
                ))} */}
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
