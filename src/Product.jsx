import { useEffect, useState } from "react";

const Product = ({ setAddCount, setKeys, setQtycount }) => {
  const [proData, setProData] = useState({
    proName: "",
    price: "",
    qty: "",
  });

  let [datas, setData] = useState([]);
  let [show, setShow] = useState(false);
  let [qtyCnt, setQtyCnt] = useState({});
  const handleChange = (e) => {
    let { name, value } = e.target;
    setProData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const add = () => {
    if ((proData.proName && proData.price && proData.qty) !== "") {
      let id = JSON.parse(localStorage.getItem("id")) || 0;
      let data = {
        id: id + 1,
        Name: proData.proName,
        Price: Number(proData.price),
        Qty: Number(proData.qty),
      };
      localStorage.setItem(`inputs${id + 1}`, JSON.stringify(data));
      localStorage.setItem("id", id + 1);
      setProData({
        proName: "",
        price: "",
        qty: "",
      });
      alert("Product added successfully");
    } else {
      alert("enter your product details");
    }
  };

  const searchx = (e) => {
    const ProductName = e.target.value.trim();
    let id = JSON.parse(localStorage.getItem("id")) || 0;
    let arr = [];
    for (let i = 1; i <= id; i++) {
      let Prodata = JSON.parse(localStorage.getItem(`inputs${i}`));
      if (
        Prodata?.Name?.toLowerCase().includes(ProductName.toLowerCase()) &&
        ProductName !== ""
      ) {
        arr.push(Prodata);
        setShow(true);
      }
    }
    setData(arr);
  };

  const addbtn = (id) => {
    const getAvlQty = JSON.parse(localStorage.getItem(`inputs${id}`));

    const selectedQty = qtyCnt[id] ?? 1;

    setKeys(id);
    setAddCount(prev => prev + 1);

    if (selectedQty > getAvlQty?.Qty) {
      alert(`Available quantity is less ${getAvlQty?.Qty} `)
      return
    } else {
      setQtycount(selectedQty)
    }
  };


  const delbtn = (id) => {
    localStorage.removeItem(`inputs${id}`)
  };

  return (
    <>
      <div
        className="
        flex flex-col md:gap-2 
        md:m-10 sm:m-5 m-4 
        md:p-5 p-3 
        rounded-2xl
        bg-gradient-to-br from-slate-500 via-blue-100 to-violet-100
        shadow-lg shadow-black/30
        border
        "
      >
        <section className="flex flex-col gap-3">
          <h1 className="text-[18px] font-semibold text-slate-700">
            Add Product
          </h1>

          <div className="flex flex-wrap gap-2">
            <input
              onChange={handleChange}
              name="proName"
              value={proData.proName}
              className="border rounded-xl p-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Product Name"
              type="text"
            />
            <input
              onChange={handleChange}
              name="price"
              value={proData.price}
              className="border rounded-xl p-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Price"
              type="number"
            />
            <input
              onChange={handleChange}
              name="qty"
              value={proData.qty}
              className="border rounded-xl p-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Available Qty"
              type="number"
            />

            <button
              onClick={add}
              className="
                px-9 py-2 rounded-xl text-white font-medium
                bg-gradient-to-r from-blue-600 to-blue-800
                hover:from-blue-700 hover:to-blue-900
                transition-all
                "
            >
              Add
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3 overflow-x-auto mt-3">
          <h1 className="sm:text-[18px] text-[14px] font-semibold text-slate-700">
            Search Product
          </h1>

          <input
            onChange={searchx}
            className="border rounded-xl sm:p-2 p-1.5 bg-white/80 
                        focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Type product name..."
            type="search"
          />

          <table className="border-collapse w-full mt-2 bg-white/80 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-slate-200 to-slate-300">
              <tr>
                <th className="p-1 text-[12px] sm:text-[15px] border">Name</th>
                <th className="p-1 text-[12px] sm:text-[15px] border">Price</th>
                <th className="p-1 text-[12px] sm:text-[15px] border">Qty</th>
                <th className="p-1 text-[12px] sm:text-[15px] border">Add</th>
                <th className="p-1 text-[12px] sm:text-[15px] border">Del</th>
              </tr>
            </thead>

            <tbody>
              {show &&
                datas.map((data) => (
                  <tr key={data.id} className="hover:bg-violet-50 transition">
                    <td className="p-[0.5px] sm:p-1 text-[12px] sm:text-[15px] text-center border">
                      {data.Name}
                    </td>
                    <td className="p-[0.5px] sm:p-1 text-[12px] sm:text-[15px] text-center border">
                      {data.Price}
                    </td>
                    <td className="p-[0.5px] sm:p-1 text-[12px] sm:text-[15px] text-center border">
                      <input
                        type="number"
                        min="1"
                        value={qtyCnt[data.id] ?? 1}
                        onChange={(e) =>
                            setQtyCnt(prev => ({
                            ...prev,
                            [data.id]: +e.target.value
                            }))
                        }
                      />

                    </td>
                    <td className="p-[0.5px] sm:p-1 text-[12px] sm:text-[15px] text-center border">
                      <button
                        onClick={() => addbtn(data.id)}
                        className="
                        sm:px-3 px-2 my-1 py-1 rounded-lg text-white text-xs sm:text-sm
                        bg-gradient-to-r from-green-600 to-green-800
                        hover:from-green-700 hover:to-green-900           
                        "
                      >
                        Add
                      </button>
                    </td>
                    <td className="p-[0.5px] text-[12px] sm:text-[15px] sm:p-1 text-center border">
                      <button
                        onClick={() => delbtn(data.id)}
                        className="
                        sm:px-3 px-2 my-1 py-1 rounded-lg text-white text-xs sm:text-sm
                        bg-gradient-to-r from-red-600 to-red-800
                        hover:from-red-700 hover:to-red-900
                        "
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Product;
