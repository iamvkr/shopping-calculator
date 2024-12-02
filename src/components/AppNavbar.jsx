import { Navbar, Link } from 'konsta/react'
import { EllipsisVertical, ShoppingBag, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AppNavbar = ({ cart, setcart, triggerCheckbox }) => {
  const [selectedIDS, setselectedIDS] = useState([]);

  const handleMultipleDelete = () => {
    // remove from cart
    setcart(cart.filter((c) => !(selectedIDS.includes(c.id))));
    // remove from selected Id Array as well
    setselectedIDS(selectedIDS.filter((id) => !(selectedIDS.includes(id))))
  }

  useEffect(() => {
    // setselectedIDS()
    cart.forEach((item, i) => {
      if (item.isChecked) {
        // if (true) {
        /** check if id already include in selectedIds array */
        if (!selectedIDS.includes(item.id)) {
          setselectedIDS([...selectedIDS, item.id])
        }
      } else {
        /** remove from selectedIDS list */
        /** check if id already include in selectedIds array */
        if (selectedIDS.includes(item.id)) {
          setselectedIDS(selectedIDS.filter((sid) => sid !== item.id));
        }
      }
    })
  }, [triggerCheckbox])

  return (
    <Navbar
      title="Shopping Calculator"
      // subtitle={JSON.stringify(selectedIDS)}
      className="top-0 sticky"
      // medium={size === 'Medium'}
      // large={size === 'Large'}
      // transparent={true}
      right={<>
        {selectedIDS.length > 0 && <Link navbar={true} onClick={handleMultipleDelete}>
          <Trash className='h-5 w-5' />
        </Link>}
        <Link navbar={true}>
          <EllipsisVertical className='h-5 w-5' />
        </Link>
      </>}
      left={<ShoppingBag className='h-8 w-8' />}
    />
  )
}

export default AppNavbar