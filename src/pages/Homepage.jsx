import { Card, Checkbox } from 'konsta/react';
import React, { Fragment, useContext } from 'react'
import { dataContext } from '../context/Context';

const Homepage = ({ triggerCheckbox, settriggerCheckbox }) => {

    const { db, setdb, activeList } = useContext(dataContext);

    const cart = db[activeList].listData;

    const setcart = (arr) => {
        setdb(db.map((items, i) => {
            if (i === activeList) {
                return { ...items, listData: arr }
            } else {
                return items
            }
        }));
    }

    const handlePrductInputChange = (value, id) => {
        const temp = cart.map((c) => {
            if (c.id === id) {
                return {
                    ...c,
                    product: value
                }
            }
            return c;
        });
        setcart(temp)
    }

    const handleRateInputChange = (value, id) => {
        const temp = cart.map((c) => {
            if (c.id === id) {
                return {
                    ...c,
                    rate: value
                }
            }
            return c;
        });
        setcart(temp)
    }

    const handleQtyInputChange = (value, id) => {
        const temp = cart.map((c) => {
            if (c.id === id) {
                return {
                    ...c,
                    qty: value
                }
            }
            return c;
        });
        setcart(temp)
    }

    const handleCheckedChange = (id) => {
        const temp = cart.map((c) => {
            if (c.id === id) {
                return {
                    ...c,
                    isChecked: !(c.isChecked)
                }
            }
            return c;
        });
        setcart(temp);
        /** this will trigger state change at navbar */
        settriggerCheckbox(!triggerCheckbox)
    }

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

    return (
        <div className="homepage px-1 mb-18">

            {cart && cart.length > 0 && <div className="gridList text-sm">
                {/* HEADER START */}
                <div className="item p-1 min-w-0">

                </div>

                <div className="item p-1 min-w-0">
                    PRODUCT
                </div>

                <div className="item p-1 min-w-0">
                    RATE
                </div>

                <div className="item justify-center"></div>

                <div className="item p-1 min-w-0">
                    QTY
                </div>

                <div className="item justify-center"></div>

                <div className="item">TOTAL</div>
                {/* HEADER END */}

                {/* ROW START */}
                {cart.map((item, i) => {
                    return (<Fragment key={i}>
                        <div className="item min-w-0 ">
                            <Checkbox className='overflow-hidden'
                                name="checkbox-1"
                                checked={item.isChecked}
                                onChange={(e) => { handleCheckedChange(item.id) }}
                            />
                        </div>

                        <div className="item p-1 min-w-0">
                            <input type="text" value={item.product} placeholder='e.g. food' className='w-full block focus:outline-none'
                                onChange={(e) => { handlePrductInputChange(e.target.value, item.id) }} />
                        </div>

                        <div className="item p-1 min-w-0">
                            <input type="number" value={item.rate} placeholder='e.g 60/kg' className='w-full block focus:outline-none'
                                onChange={(e) => { handleRateInputChange(e.target.value, item.id) }} />
                        </div>

                        <div className="item justify-center">x</div>

                        <div className="item p-1 min-w-0">
                            <input type="number" value={item.qty} placeholder='e.g 0.5 kg' className='w-full block focus:outline-none'
                                onChange={(e) => { handleQtyInputChange(e.target.value, item.id) }} />
                        </div>

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

                {/* <div className="item p-1 min-w-0"> </div> */}

                <div className="item justify-center">=</div>

                <div className="item">{getTotalPrice()}</div>
                {/* FOOTER END */}
            </div>}


            {/* greetings card */}
            {cart && cart.length <= 0 && <Card raised header="Welcome" >
                Welcome to shopping calculator. See exactly how much you will pay at the register.
                <br />
                Calculate items price by Quantity and Rate. <br /><br />
                Instant calculations for single or multiple items. Ideal for calculating big shopping lists or simply use it as a price calculator.

                <br /><br />
                Features:
                <br />
                <ul className='list-disc list-inside'>
                    <li>User Friendly Interface</li>
                    <li>Auto save</li>
                    <li>Print to Pdf</li>
                </ul>

                <br />
                click on create button to get started
            </Card>}

        </div>
    )
}

export default Homepage