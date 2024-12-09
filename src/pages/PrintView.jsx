import React, { Fragment, useContext, useEffect } from 'react'
import { dataContext } from '../context/Context';
import { Printpage } from "capacitor-plugin-print-page"

const PrintView = () => {
    const { db, activeList } = useContext(dataContext);
    const cart = db[activeList].listData;

    const getTotalPrice = () => {
        let total = 0;
        cart.forEach((item) => {
            if (Number(item.rate) < 0 || Number(item.qty) < 0) {
                return 0;
            }
            total += parseFloat((((Number(item.rate) * 100) * Number(item.qty)) / 100).toFixed(2));
        });

        if (total <= 0) {
            return 0
        }
        return total.toFixed(2);
    }

    const handlePrint = () => {
        document.getElementById("printBtn").style.display = "none";
        setTimeout(() => {
            Printpage.print();
        }, 300);
    }



    return (
        <div>
            {(cart && cart.length > 0) && <div>
                <button id='printBtn'
                    className='text-sm text-center w-full px-4'
                    onClick={handlePrint}>print to pdf</button>
            </div>
            }
            <h3 className='text-2xl text-center font-bold mt-2 mb-6'>Shopping Invoice</h3>
            {(cart && cart.length > 0) ? <div className="gridList text-sm">
                {/* HEADER START */}
                <div className="item p-1 min-w-0 bg-slate-200">

                </div>

                <div className="item p-1 min-w-0 bg-slate-200">
                    PRODUCT
                </div>

                <div className="item p-1 min-w-0 bg-slate-200">
                    RATE
                </div>

                <div className="item justify-center bg-slate-200"></div>

                <div className="item p-1 min-w-0 bg-slate-200">
                    QTY
                </div>

                <div className="item justify-center bg-slate-200"></div>

                <div className="item bg-slate-200">TOTAL</div>
                {/* HEADER END */}

                {/* ROW START */}
                {cart.map((item, i) => {
                    return (<Fragment key={i}>
                        <div className="item min-w-0 "></div>

                        <div className="item p-1 min-w-0">{item.product}</div>

                        <div className="item p-1 min-w-0">{item.rate}</div>

                        <div className="item justify-center">x</div>

                        <div className="item p-1 min-w-0">{item.qty}</div>

                        <div className="item justify-center">=</div>

                        <div className="item">
                            {(Number(item.rate) <= (-1) || Number(item.qty) <= -1) ? 0 : (((Number(item.rate) * 100) * Number(item.qty)) / 100).toFixed(2)}
                        </div>
                    </Fragment>)
                })}
                {/* ROW END */}

                {/* FOOTER START */}
                <div className="item p-1 min-w-0"></div>

                <div className="item p-1 min-w-0"></div>

                <div className="item p-1 min-w-0"></div>

                <div className="item justify-center"
                    style={{ gridColumn: "4/6" }}>
                    Grand Total
                </div>

                <div className="item justify-center">=</div>

                <div className="item">{getTotalPrice()}</div>
                {/* FOOTER END */}
            </div>
                :
                <div className='text-center text-sm'>
                    Oops! Look like there's no record!<br />
                    Try adding a record to perform operation.<br />
                    <span className='underline mt-2 cursor-pointer' onClick={() => { window.history.back() }}>Home</span>
                </div>}
        </div>
    )
}

export default PrintView