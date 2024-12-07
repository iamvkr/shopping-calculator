import { Fab } from 'konsta/react'
import { Plus } from 'lucide-react'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { dataContext } from '../context/Context';

const AppFabBtn = () => {
    const location = useLocation();
    const { db, setdb, activeList } = useContext(dataContext);

    const handleAddToCart = () => {
        setdb(db.map((items, i) => {
            if (i === activeList) {
                return {
                    ...items,
                    listData: [
                        ...items.listData,
                        {
                            id: Date.now(),
                            rate: "",
                            qty: "",
                            product: "",
                            isChecked: false,
                        }
                    ]
                }
            } else {
                return items
            }
        }))
    }

    return ((location.pathname != "/printPage" && location.pathname != "/privacy") &&
        <Fab icon={<Plus className='h-6 w-6' />}
            text="create"
            textPosition="after"
            className='fixed bottom-6 right-6 flex items-center'
            onClick={handleAddToCart} />
    )
}

export default AppFabBtn