import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, FormControl, MenuItem, Select, TextField, Button, InputLabel } from '@mui/material';

import EditToday from '../../../../Board/EditToday';
import { Modal } from 'react-bootstrap';



const TeamBoard = ({posts}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const items = [ /* 상태 색상 표기 */
        { id: '대기', color: '#CCCCFF' },
        { id: '진행중', color: '#ADD8E6' },
        { id: '완료', color: '#FFD700' },
        { id: '이슈', color: '#FFC0CB' },
        { id: '알림', color: '#E64F5A' },
    ];

    const columns = [
        { name: "#", width: "2%" },
        { name: "프로젝트", width: "12%" },
        { name: "등록 날짜", width: "7%" },
        { name: "변경 날짜", width: "7%" },
        { name: "이 름", width: "5%" },
        { name: "Title", width: "25%" },
        { name: "To Do List", width: "" },
        { name: "목표일", width: "5%" },
        { name: "상태", width: "5%" },];

    const isLogged = useSelector(state => state.auth.isLoggedIn);
    const [board, setBoard] = useState([]);
    const [selectvalue, setSelectvalue] = useState(null);
    const [show, setShow] = useState(false);
    const [selectRowIndex, setSelectRowIndex] = useState(false);

    

    const handleRowClick = (row) => {
        console.log('클릭된 행의 데이터:', row, row.Index);
        setSelectvalue(row);
        setSelectRowIndex(row.Index);

    }

    const getRowStyle = (index) => {
        return index === selectRowIndex ? { backgroundColor: '#fff3cd' } : {}; // 클릭된 행의 배경색을 lightblue로 설정, 아니면 기본색
    };

    // 상태에 따른 색상을 찾는 함수
    const findColorById = (id) => {
        const item = items.find(item => item.id === id);
        return item ? item.color : 'white'; // 해당 상태가 없으면 투명색 반환
    };

    //목표일에 따른 색상 변경
    const findDayById = (id) => {
        if (id.includes('D-')) {
            return 'red';
        } else {
            return id.color;
        }
    };

    // 말풍선 위치 상태
    const [previewPos, setPreviewPos] = useState({ top: 0, left: 0 });

    // 마우스 움직임에 따라 말풍선 위치 업데이트
    const handleMouseMove = (e) => {

        //console.log(`Mouse Position - X: ${e.clientX}, Y: ${e.clientY}`);
        let newTop = e.clientY - 250; // 마우스 위에 말풍선 위치
        let newLeft = e.clientX + 50;


        if(newLeft > 1300){
            newLeft = newLeft - 560;
        }

        setPreviewPos({ top: newTop, left: newLeft });
        // setPreviewPos({
        //     top: e.clientY - 250, // 마우스 포인터 아래로 조금 떨어진 위치
        //     left: e.clientX + 50, // 마우스 포인터의 가운데 정도에 위치
        // });
    };

    // 다이얼로그가 닫혔을 때 실행할 로직
    const handleDialogClose = () => {
        // 다이얼로그 닫힘 후 필요한 작업 수행, 예를 들어, 데이터를 새로 고침
        //getBoardData();
        setSelectvalue(null);
        setSelectRowIndex(false);
        //console.log('setState true');

    };

    const openModal = (row) => {
        console.log('row', row);
        setSelectedRowData(row);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedRowData(null);
    };

    useEffect(() => {
        if (posts !== undefined) {
            setBoard(posts);
        }
    }, [posts])


    return (
        <div>
            <table className="table table-striped table-hover border-primary table-fixed">
                <thead className="list-Title">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} style={{ width: col.width }}>
                                {col.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {board.map((row, index) => (

                        <tr
                            key={index + 1}
                            onClick={() => {
                                openModal(row);
                            }}
                            style={getRowStyle(row.Index)}
                        >
                            <td type="checkbox">
                                {" "}
                                {row.Index}
                            </td>
                            <td>{row.ProjectName}</td>
                            <td onMouseMove={handleMouseMove}>{row.Date}</td>
                            <td onMouseMove={handleMouseMove}>{row.ChangeDate}</td>
                            <td onMouseMove={handleMouseMove}>{row.Name}</td>
                            <td className="truncate">{row.Title}</td>
                            <td className="truncate">
                                <div className="preview-container" onMouseMove={handleMouseMove}>
                                    {row.Content}

                                    <div className="preview" style={{ top: `${previewPos.top}px`, left: `${previewPos.left}px`, flex: '10' }}>
                                        <div className='preview-hover'>
                                            {row.Content}
                                            {row.details && (
                                                <div>
                                                    {row.details.map((detail, index) => {
                                                        return (
                                                            <span key={index} style={{ fontSize: 'smaller' }}>{detail.Content}</span>
                                                        )

                                                    })}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style={{ color: findDayById(`${row.Period}`) }}>
                                    {row.Period}
                                </div>
                            </td>
                            <td>
                                <div style={{ backgroundColor: findColorById(`${row.details === undefined ? row.Status : row.details[0].Status}`) }}>
                                    {row.details === undefined ? row.Status : row.details[0].Status}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Row Details"
                className="modal"
                overlayClassName="modal-overlay"
            >
                {selectedRowData && (
                    <div>
                        <h2>Row Details</h2>
                        <p><strong>날짜:</strong> {selectedRowData.date}</p>
                        <p><strong>이름:</strong> {selectedRowData.name}</p>
                        <p><strong>Title:</strong> {selectedRowData.title}</p>
                        <p><strong>To Do List:</strong> {selectedRowData.todo}</p>
                        <p><strong>목표일:</strong> {selectedRowData.goal}</p>
                        <p><strong>상태:</strong> {selectedRowData.status}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
            </Modal>
        </div>
    )
}


export default TeamBoard
