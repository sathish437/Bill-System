import { useState } from 'react'
import Bill from './Bill.jsx'
import Product from './Product.jsx'

function App() {
  const [addCount, setAddCount] = useState(0)
  const [keys, setKeys] = useState(null)
  const [Qtycount, setQtycount] = useState(1)

return (
  <>

  <div className="
    min-h-screen
    p-4 sm:p-6
    shadow-lg shadow-black/30
    bg-gradient-to-br from-slate-50 via-blue-500 to-violet-100
  ">

    <h1 className="
      text-xl sm:text-2xl md:text-3xl
      font-bold text-center
      text-slate-700
      mb-6
    ">
      🧾 Billing Software
    </h1>

    <main className="
      flex flex-col md:flex-row
      gap-6
      justify-center items-start
    ">
      <div className="
        flex flex-col md:flex-row
        justify-center
        w-full 
        bg-white/80
        rounded-2xl
        shadow-md shadow-black/20
      ">
        <Product
          setAddCount={setAddCount}
          setKeys={setKeys}
          setQtycount={setQtycount}
        />

        <Bill
          Qtycount={Qtycount}
          addCount={addCount}
          keys={keys}
          />
      </div>
    </main>
  </div>
  </>
)

}

export default App
