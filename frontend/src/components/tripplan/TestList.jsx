import { useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
} from '@hello-pangea/dnd';

const TripList = () => {
    const [selectedPlans, setSelectedPlans] = useState({
        day1: [
            { title: "가락몰 빵축제", contentid: "3113671" },
            { title: "새로운 이벤트", contentid: "123456" }
        ],
        day2: [
            { title: "가락옥토버페스트 캠핑축제", contentid: "3379778" }
        ],
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;  // 아이템이 드롭된 위치가 없을 경우 드래그 종료

        const { source, destination } = result; //result 값을 받기 위한 구조분해할당

        const sourceDay = source.droppableId; // 요소의 이전 day
        const destinationDay = destination.droppableId; // 요소의 이후 day
        const sourceIndex = source.index; // 요소의 이전 day 내에서의 index
        const destinationIndex = destination.index; // 요소의 이후 day 내에서의 index

        let sourceArray = selectedPlans[sourceDay]; // drag 출발지 day list
        let destinationArray = selectedPlans[destinationDay]; // drag 목적지 day list

        let [element] = sourceArray.splice(sourceIndex, 1); // 드래그한 요소 추출 및 이전 day list에서의 삭제

        // 출발지와 목적지가 같을 경우 목적지와 출발지를 같게 설정
        // if (sourceDay === destinationDay) {
        //     destinationArray = sourceArray;
        // }
        
        // 목적지의 index에 추출한 요소 추가
        destinationArray.splice(destinationIndex, 0, element);

        setSelectedPlans({
            ...selectedPlans,
            [sourceDay]: sourceArray,
            [destinationDay]: destinationArray,
        });

        console.log(selectedPlans);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                {Object.keys(selectedPlans).map((day) => (
                    <Droppable key={day} droppableId={day}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <h2>{day}</h2>
                                {selectedPlans[day].map((event, index) => (
                                    <Draggable key={`${day}-${event.contentid}`} draggableId={`${day}-${event.contentid}`} index={index}>
                                    {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    padding: '16px',
                                                    margin: '8px 0',
                                                    backgroundColor: '#f0f0f0',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                {event.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TripList;
