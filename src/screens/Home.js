import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';

export default function Home() {
    const [date, setDate] = useState(null);

    useEffect(() => {
        let dt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        setDate(dt);
    }, []);

    const hours = new Date().getHours();
    const getGreeting = () => {
        if (hours < 12) return 'Good Morning.';
        if (hours < 18) return 'Good Afternoon.';
        return 'Good Evening.';
    };

    const [inputValue, setInputValue] = useState('');
    const [listTodo, setListTodo] = useState([]);
    const handleClick = () => {
        handleAddTodo();
        handleInputValue();
    };
    const handleAddTodo = () => {
        if (inputValue.length > 0) {
            const newList = [...listTodo, inputValue];
            setListTodo(newList);
        }
    };
    const handleInputValue = () => {
        setInputValue('');
    };
    const handleDelete = (indexToDelete) => {
        setListTodo((prevList) => prevList.filter((_, index) => index !== indexToDelete));
    };
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleCheckboxChange = (index) => {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter((item) => item !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ maxWidth: '600px' }}>
                <div
                    className="text-white mt-4 d-flex justify-content-start align-items-center flex-wrap"
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontStyle: 'normal',
                        fontSize: 'x-large',
                    }}
                >
                    <span className="me-2">{date}</span>
                    <div className="text-start">
                        <div>{getGreeting()}</div>
                        <div>What's your plan for today?</div>
                    </div>
                </div>
                <div className="mt-3 row g-2 align-items-center">
                    <div className="col-9 col-md-10">
                        <input
                            className="form-control bg-dark text-white border-none"
                            style={{ height: '50px' }}
                            placeholder="Add Todo"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <div className="col-3 col-md-2">
                        <button className="btn btn-dark w-100" style={{ height: '50px' }} onClick={handleClick}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                {listTodo.map((item, index) => {
                    return (
                        <ul className="list-group mt-2" key={index}>
                            <li
                                className={`list-group-item bg-dark text-white d-flex justify-content-between align-items-center flex-wrap ${completedTasks.includes(index) ? 'completed-task' : ''
                                    }`}
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={`flexCheckDefault-${index}`}
                                        checked={completedTasks.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label className="form-check-label" htmlFor={`flexCheckDefault-${index}`}>
                                        {item}
                                    </label>
                                </div>
                                <FontAwesomeIcon
                                    className="btn btn-light"
                                    onClick={() => handleDelete(index)}
                                    icon={faTrash}
                                />
                            </li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
}
