import { Navbar, Link } from 'konsta/react'
import { EllipsisVertical, MenuIcon, Trash } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MenuItems from './MenuItems';
import AppToast from './AppToast';
import { useLocation } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { dataContext } from '../context/Context';

const AppNavbar = ({ triggerCheckbox }) => {
  const location = useLocation();
  const { db, setdb, activeList } = useContext(dataContext);
  const cart = db[activeList].listData;

  const [selectedIDS, setselectedIDS] = useState([]); /** this will store all checked items id */

  const [leftPanelOpened, setLeftPanelOpened] = useState(false);

  const [popoverOpened, setPopoverOpened] = useState(false); /** menuItem handler */
  const popoverTargetRef = useRef(null);
  const openPopover = (targetRef) => {
    popoverTargetRef.current = targetRef;
    setPopoverOpened(true);
  };

  const [toastCenterOpened, setToastCenterOpened] = useState(false);

  const setcart = (arr) => {
    setdb(db.map((items, i) => {
      if (i === activeList) {
        return { ...items, listData: arr }
      } else {
        return items
      }
    }));
  }

  const handleMultipleDelete = () => {
    /** remove from cart */
    setcart(cart.filter((c) => !(selectedIDS.includes(c.id))));
    /** remove from selected Id Array as well */
    setselectedIDS(selectedIDS.filter((id) => !(selectedIDS.includes(id))));
    /** toast message that item deleted: */
    setToastCenterOpened(true);
  }

  useEffect(() => {
    cart.forEach((item, i) => {
      if (item.isChecked) {
        /** check if id already include in selectedIds array */
        if (!selectedIDS.includes(item.id)) {
          /** id not includes, so add the id in selected ids array state to checked item  */
          setselectedIDS([...selectedIDS, item.id]);
        }
      } else {
        /** remove from selectedIDS list */
        /** check if id already include in selectedIds array */
        if (selectedIDS.includes(item.id)) {
          /** id already include, so remove id from selected ids array to uncheck item */
          setselectedIDS(selectedIDS.filter((sid) => sid !== item.id));
        }
      }
    })
  }, [triggerCheckbox])

  useEffect(() => {
    /** removes all ids from selectedIDS arr */
    setselectedIDS([]);
    /** uncheck all checkbox: */
    setdb(db.map((items, i) => {
      if (i === activeList) {
        return {
          ...items, listData: items.listData.map((c, i) => {
            return {
              ...c,
              isChecked: false
            }
          })
        }
      } else {
        return items;
      }
    }));
  }, [activeList])


  return (location.pathname != "/printPage" &&
    <>
      <Navbar
        title="Shopping Calculator"
        subtitle={db[activeList].listName.toLowerCase()}
        className="top-0 sticky"
        right={<>
          {selectedIDS.length > 0 && <Link navbar={true} onClick={handleMultipleDelete}>
            <Trash className='h-5 w-5' />
          </Link>}
          <Link className='menu-btn' navbar={true} onClick={() => { openPopover(".menu-btn") }}>
            <EllipsisVertical className='h-5 w-5' />
          </Link>
        </>}
        left={<Link navbar={true} onClick={() => { setLeftPanelOpened(true) }}><MenuIcon className='h-5 w-5' /></Link>}
      />

      <AppSidebar leftPanelOpened={leftPanelOpened} setLeftPanelOpened={setLeftPanelOpened} />

      <MenuItems popoverOpened={popoverOpened} setPopoverOpened={setPopoverOpened} popoverTargetRef={popoverTargetRef} />

      <AppToast toastCenterOpened={toastCenterOpened} setToastCenterOpened={setToastCenterOpened} message={"Items Deleted Successfully!"} />

    </>
  )
}

export default AppNavbar