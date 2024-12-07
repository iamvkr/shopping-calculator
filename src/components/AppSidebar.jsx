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
        /** inc active list to point to newly created list */
        setactiveList(Number(activeList) + 1);
        /** finally clear edittext box */
        setListName("");
    }
    return (
        <div>
            {/* <Panel
                side="left"
                opened={leftPanelOpened}
                onBackdropClick={() => setLeftPanelOpened(false)}
            > */}
            <div className={`fixed top-0 left-0 h-screen w-full  opacity-0 bg-black/40 back_overlay ${leftPanelOpened ? 'z-20 open':"hidden"}`} onClick={() => { setLeftPanelOpened(false) }}></div>
            <div className={`fixed top-0 left-0 h-screen w-3/4 z-20 flex my_sidebar  backdrop-blur-sm ${leftPanelOpened && 'open'}`}>
                <div className={`left bg-white`}>
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
            </div>
            
            {/* </Panel> */}

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