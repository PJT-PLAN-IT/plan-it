import {useState} from "react";

const Test = () => {
    const initialList = [
        {
            title: "그룹 1",
            items: ["항목 1-1", "항목 1-2"],
        },
        {
            title: "그룹 2",
            items: ["항목 2-1"],
        },
        {
            title: "그룹 3",
            items: ["항목 3-1"],
        },
    ];

    const [groupList, setGroupList] = useState(initialList);
    const [selectedGroups, setSelectedGroups] = useState([]);

    const addItemToSelected = (item) => {
        // 선택된 항목이 포함된 새로운 그룹 구조 생성
        const newGroup = {
            title: `선택된 그룹 ${selectedGroups.length + 1}`,
            items: [item],
        };
        setSelectedGroups((prevGroups) => [...prevGroups, newGroup]);
    };

    return (
        <div>
            <h1>중첩 리스트에서 항목 선택하기</h1>
            {groupList.map((group, groupIndex) => (
                <div key={groupIndex} style={{ margin: '10px 0' }}>
                    <h2>{group.title}</h2>
                    <ul>
                        {group.items.map((item, itemIndex) => (
                            <li key={itemIndex} onClick={() => addItemToSelected(item)} style={{ cursor: 'pointer' }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <h2>선택된 항목</h2>
            {selectedGroups.map((group, groupIndex) => (
                <div key={groupIndex} style={{ margin: '10px 0' }}>
                    <h3>{group.title}</h3>
                    <ul>
                        {group.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default Test;