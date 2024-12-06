import { Dialog, DialogButton } from 'konsta/react'
import React from 'react'

const AppDailog = ({ title = "Alert", content, isOpened, setIsOpened, OnOk, OnCancel }) => {
    return (
        <Dialog
            opened={isOpened}
            onBackdropClick={() => setIsOpened(false)}
            title={title}
            content={content ? content : ""}
            buttons={
                <>
                    {OnCancel && <DialogButton onClick={() => { setIsOpened(false); OnCancel() }}>
                        Cancel
                    </DialogButton>}
                    {OnOk && <DialogButton onClick={() => { setIsOpened(false); OnOk() }}>
                        Ok
                    </DialogButton>}
                </>
            }
        />
    )
}

export default AppDailog