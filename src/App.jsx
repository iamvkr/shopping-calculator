import { Fragment, useState } from 'react'
import './App.css'
import { Checkbox, Fab, Page } from 'konsta/react'
import {  Plus } from 'lucide-react'
import AppNavbar from './components/AppNavbar'

function App() {
  const [cart, setcart] = useState([{
    id: Date.now(),
    rate: 1,
    qty: 1,
    isChecked:false
  }]);

  /** triggerCheckbox change */
  const [triggerCheckbox, settriggerCheckbox] = useState(false)

  const handleAddToCart = () => {
    setcart([
      {
        id: Date.now(),
        rate: "",
        qty: "",
        isChecked:false,
      },
      ...cart,
    ])
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
    <Page className='h-screen'>

      {/* NAVBAR START */}
      <AppNavbar cart={cart} setcart={setcart} triggerCheckbox={triggerCheckbox} />
      {/* NAVBAR END */}

      <Fab icon={<Plus className='h-6 w-6' />} text="create" textPosition="after" className='fixed bottom-6 right-6 flex items-center' onClick={handleAddToCart} />

      <div className="homepage px-1">

        <div className="gridList">
          {/* HEADER START */}
          <div className="item p-1 min-w-0">

          </div>

          <div className="item p-1 min-w-0">
            RATE
          </div>

          <div className="item justify-center"></div>

          <div className="item p-1 min-w-0">
            QUANTITY
          </div>

          <div className="item justify-center"></div>

          <div className="item">TOTAL</div>
          {/* HEADER END */}

          {/* ROW START */}
          {cart && cart.length > 0 && cart.map((item, i) => {
            return (<Fragment key={i}>
              <div className="item p-1 min-w-0">
                <Checkbox
                  name="checkbox-1"
                  checked={item.isChecked}
                  onChange={(e) => { handleCheckedChange(item.id)}}
                />
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

              <div className="item overflow-auto">
                {(Number(item.rate) <= (-1) || Number(item.qty) <= -1) ? 0 : (((Number(item.rate) * 100) * Number(item.qty)) / 100).toFixed(2)}
              </div>
            </Fragment>)
          })}
          {/* ROW END */}

          {/* FOOTER START */}
          <div className="item p-1 min-w-0"></div>

          <div className="item p-1 min-w-0"></div>

          <div className="item justify-center"></div>

          <div className="item p-1 min-w-0">
            Grand Total
          </div>

          <div className="item justify-center">=</div>

          <div className="item">{getTotalPrice()}</div>
          {/* FOOTER END */}
        </div>

      </div>
    </Page>
  )
}

export default App
