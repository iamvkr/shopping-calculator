import { Button, Toast } from 'konsta/react'
import React, { useEffect } from 'react'

const AppToast = ({toastCenterOpened, setToastCenterOpened,message}) => {

    /** auto hide toast msg in 3 sec */
    useEffect(() => {
        let tm;
        if (toastCenterOpened) {
            tm = setTimeout(() => {
                setToastCenterOpened(false)
            }, 3000);
        }
        return ()=>{
            clearTimeout(tm);
        }
    }, [toastCenterOpened])
    

    return (
        <Toast
        //   position="left"
          opened={toastCenterOpened}
          button={
            <Button
              rounded
              clear
              small
              inline
              onClick={() => setToastCenterOpened(false)}
            >
              Close
            </Button>
          }
        >
          <div className="shrink">{message}</div>
        </Toast>
    )
}

export default AppToast