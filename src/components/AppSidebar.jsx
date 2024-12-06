import { Button, List, ListInput, ListItem, Panel } from 'konsta/react';
import React, { useContext, useState } from 'react'
import { dataContext } from '../context/Context';
import AppDailog from './AppDailog';

const AppSidebar = ({ leftPanelOpened, setLeftPanelOpened }) => {
    const { db, setdb, activeList, setactiveList } = useContext(dataContext);
    const [isOpened, setIsOpened] = useState(false);
    const [ListName, setListName] = useState("");

    const handleSubmit = () => {
        if (!ListName.trim()) {
            /** list name is empty */
            return false;
        }
        /** add to db */
        setdb([...db, {
            listName: ListName,
            listData: [],
        }]);
        /** finally clear edittext box */
        setListName("");
    }
    return (
        <div>
            <Panel
                side="left"
                opened={leftPanelOpened}
                onBackdropClick={() => setLeftPanelOpened(false)}
            >
                <div className=''>
                    <div className="h-40 flex flex-col justify-center items-center">
                        <img src="/logo.png" className='w-1/3 rounded-xl' alt="logo" />
                        <span className='text-sm mt-1'>Shopping Calculator</span>
                    </div>
                    <div className='border-t-2 pt-4 p-2 '>
                        <Button onClick={() => { setIsOpened(true); setLeftPanelOpened(false) }}>New List</Button>
                        <div>
                            <List nested={"true"}>
                                {db && db.length > 0 && db.map((acc, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            title={acc.listName}
                                            link={true}

                                            onClick={() => {
                                                setactiveList(Number(i));
                                                setLeftPanelOpened(false);
                                            }}
                                            className={`my-2 rounded ${i === activeList && "bg-slate-300/50"}`}
                                        />
                                    )
                                })}
                            </List>
                        </div>
                    </div>
                </div>
            </Panel>

            <AppDailog title='Create new List'
                isOpened={isOpened}
                setIsOpened={setIsOpened}
                OnOk={handleSubmit}
                OnCancel={() => { }}
                content={<List>
                    <ListInput outline
                        type="text"
                        placeholder="Groceries List"
                        name='ListName'
                        value={ListName}
                        onChange={(e) => { setListName(e.target.value) }}
                    />
                </List>}
            />
        </div>
    )
}

export default AppSidebar