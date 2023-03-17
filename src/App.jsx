import './App.css'
import { useEffect, useState } from "react"
import FoodComponent from "./Components/FoodComponent"
import MenuData from "./Data/MenuData"

function App() {

  const [foodData, setFoodData] = useState(MenuData)
  const [dataInpage, setDataInpage] = useState([])
  const [page, setPage] = useState(0)

  const Pagination = () => {
    const foodPerPage = 3
    const pages = Math.ceil(MenuData.length / foodPerPage)//หารเหลือเศษปัดขึ้น
    //console.log(`เลขหน้า = ${pages}`);

    const foodSliced = Array.from({ length: pages }, (data, index) => {//สร้าง Array ก้อนใหม่แต่ละก้อนมีขนาดตามค่า pages
      const start = index * foodPerPage//กำหนดช่วงในแต่ละก้อน Array [0,2] | [3,5]index(1) start=3 | [6,8]index(2) start=6
      return MenuData.slice(start, start + foodPerPage)//slice ข้อมูลตั้งเเต่ start ถึงตัวที่ start+foodPerPage แต่ไม่นีบตัวท้สาย [3,6) = [3,5]
    })
    return foodSliced;
    //console.log(foodSliced);
  }

  const handlePage = (index) => {
    setPage(index)
  }

  useEffect(() => {
    const paginate = Pagination()//ใช้งานตั้งเเต่ Render หน้าขึ้นมา
    setDataInpage(paginate)//รายการแต่ละหน้า
    setFoodData(paginate[page])
  }, [page])

  return (
    <div className="App">
      <h1>Workshop | Pagination</h1>
      <div className="container">
        {foodData.map((data, index) => {
          return <FoodComponent key={index} {...data} />
        })}
      </div>
      <div className='pagination-container'>
        {dataInpage.map((data, index) => {
          return (
            <button key={index} onClick={() => handlePage(index)} className={`page-btn ${index === page ? "active-btn" : null}`}>{index + 1}</button>
          )
        })}
      </div>
    </div>
  );
}

export default App
