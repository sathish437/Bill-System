import {  useEffect, useState,useRef } from "react"

const Bill = ({Qtycount, keys, addCount}) => {
    let [billDatas,setBillDatas]=useState([])
    let [subTotal,setSubTotal]=useState()
    let [gst,setGst]=useState()
    let [getQty,setGetQty]=useState()
    const alertRef = useRef(false);
    useEffect(()=>{
      if (!keys) return;
      const dataPro = JSON.parse(localStorage.getItem(`inputs${keys}`));
      if (!dataPro) return;
      setGetQty(dataPro.Qty); 
     },[keys])
    useEffect(() => {
    if (!keys) return;
    const dataPro = JSON.parse(localStorage.getItem(`inputs${keys}`));
    if (!dataPro) return;

    setBillDatas(prev => {
      let index = prev.findIndex(item => item.id === dataPro.id);

      let finalQty = Qtycount;
      if (index !== -1) {
        finalQty = prev[index].qty + Qtycount;
      }

      if (finalQty > dataPro.Qty) {
        finalQty = dataPro.Qty;
        if (!alertRef.current) {
          alert(`Available quantity is less ${dataPro.Qty}`);
          alertRef.current = true;
        }
      }

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          qty: finalQty,
          amount: finalQty * dataPro.Price
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: dataPro.id,
          name: dataPro.Name,
          qty: finalQty,
          amount: finalQty * dataPro.Price
        }
      ];
    });
  }, [addCount, Qtycount, keys]);


  useEffect(()=>{
    setSubTotal(billDatas.reduce((total,item)=>total+item.amount,0))
  },[billDatas])
  
  useEffect(()=>{
    setGst((subTotal*(17/100)).toFixed(2))
  },[subTotal])
  
   useEffect(() => {
    billDatas.forEach(item => {
      if (item.qty > getQty && !alertRef.current) {
        alert(`Available quantity is less ${getQty}`);
        alertRef.current = true; 
      }
    });
  }, [billDatas, getQty]);


  return (
    <>
      <div className="
        max-w-md mx-auto
        flex flex-col gap-4
        m-4 sm:m-7
        p-4 sm:p-5
        rounded-2xl
        border
        bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100
        shadow-lg shadow-black/30
      ">

        <section className="flex flex-col gap-2">
          <h1 className="text-[18px] font-semibold text-slate-700">
            Bill
          </h1>

          <table className="w-full border-collapse bg-white/80 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-emerald-200 to-emerald-300">
              <tr>
                <th className="p-2 border text-sm">Name</th>
                <th className="p-2 border text-sm">Qty</th>
                <th className="p-2 border text-sm">Amount</th>
              </tr>
            </thead>

            <tbody>
              {billDatas.map((data, index) => (
                <tr
                  key={index}
                  className="hover:bg-emerald-50 transition"
                >
                  <td className="p-1 text-center border text-sm">
                    {data.name}
                  </td>
                  <td className="p-1 text-center border text-sm">
                    {data.qty}
                  </td>
                  <td className="p-1 text-center border text-sm">
                    ₹{data.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="flex flex-col gap-1 text-right text-sm">
          <p className="text-slate-700">
            Subtotal :
            <span className="font-medium"> ₹{subTotal}</span>
          </p>

          <p className="text-slate-700">
            GST (17%) :
            <span className="font-medium"> ₹{gst}</span>
          </p>

          <p className=" font-semibold">
            Total : ₹{(Number(subTotal) + Number(gst)).toFixed(2)}
          </p>
        </section>
      </div>
    </>
  )

}

export default Bill
