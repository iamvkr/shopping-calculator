import { List, ListInput, ListItem, Popover } from 'konsta/react'
import { DownloadIcon, File, Info, Pen, Printer, Share2, Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppDailog from './AppDailog'
import { useState } from 'react'
import { dataContext } from '../context/Context'
import AppToast from './AppToast'
import {Share} from "@capacitor/share"

const MenuItems = ({ popoverOpened, setPopoverOpened, popoverTargetRef }) => {
    const { db, setdb, activeList, setactiveList } = useContext(dataContext);
    const navigate = useNavigate();
    const [isOpened, setIsOpened] = useState(false);
    const [isOpenedDelete, setIsOpenedDelete] = useState(false);
    const [editField, setEditField] = useState("");
    const [toastCenterOpened, setToastCenterOpened] = useState(false);

    const handleUpdateListName = () => {
        if (!editField.trim()) {
            return false;
        }
        setdb(db.map((d, i) => {
            if (i === activeList) {
                return { ...d, listName: editField }
            } else {
                return d;
            }
        }))
        /** clear edit text box */
        setEditField("")
    }

    const handleDeleteList = () => {
        if (db.length > 1) { /** only delete if list items are more than one */
            setdb(db.filter((d, i) => (i !== activeList)));
            /* also update active list to 0*/
            setactiveList(0);
            /** show deleted toast msg */
            setToastCenterOpened(true);
        }
    }

    const handleShare = ()=>{
        Share.share({
            dialogTitle:"Share with Buddies",
            text:"Download Shopping Calculator App on Android",
            title:"Download Shopping Calculator App",
            url:"https://github.com/iamvkr/shopping-calculator/"
        })
    }
    return (
        <>
            <Popover angle={false}
                opened={popoverOpened}
                target={popoverTargetRef.current}
                onBackdropClick={() => setPopoverOpened(false)}
            >
                <List nested={"true"}>
                    <ListItem
                        title="Print to Pdf"
                        link
                        onClick={() => {
                            setPopoverOpened(false);
                            navigate("/printPage")
                        }}
                        media={<Printer />}
                    />
                    <ListItem
                        title="Edit List"
                        link
                        onClick={() => { setPopoverOpened(false); setIsOpened(true) }}
                        media={<Pen />}
                    />
                    {db.length > 1 && <ListItem
                        title="Delete List"
                        link
                        onClick={() => { setPopoverOpened(false); setIsOpenedDelete(true) }}
                        media={<Trash />}
                    />}
                    {/* <ListItem
                        title="Download App"
                        link
                        onClick={() => setPopoverOpened(false)}
                        media={<DownloadIcon />}
                    /> */}
                    <ListItem
                    title="Share App"
                    link
                    onClick={() => {setPopoverOpened(false);handleShare();}}
                    media={<Share2/>}/>
                    {/* <ListItem
                    title="Backup & Import"
                    link
                    onClick={() => setPopoverOpened(false)}
                    media={<DatabaseBackup/>}/> */}
                    <ListItem
                    title="About"
                    link
                    onClick={() => {setPopoverOpened(false);navigate("/about")}}
                    media={<Info/>}/>
                    <ListItem
                    title="Privacy Policy"
                    link
                    onClick={() => {setPopoverOpened(false);navigate("/privacy")}}
                    media={<File/>}/>
                </List>
            </Popover>

            <AppDailog title='Edit List Name' isOpened={isOpened} setIsOpened={setIsOpened}
                OnOk={handleUpdateListName}
                OnCancel={() => { }}
                content={<List>
                    <ListInput outline
                        type="text"
                        placeholder="Enter new List Name"
                        name='editField'
                        value={editField}
                        onChange={(e) => { setEditField(e.target.value) }}
                    />
                </List>} />

            <AppDailog title='Delete List' isOpened={isOpenedDelete} setIsOpened={setIsOpenedDelete}
                OnOk={handleDeleteList}
                OnCancel={() => { }}
                content={"Are you sure to delete?"} />

            <AppToast message={"List Deleted successfully"} toastCenterOpened={toastCenterOpened} setToastCenterOpened={setToastCenterOpened} />
        </>
    )
}

export default MenuItems