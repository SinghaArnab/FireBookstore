/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext,useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { contexData } from '../FirebaseContext/ConfigContext'

const Bookdetails = () => {
    const {getBookById,getBooksImg ,placeOrder,setQty,qty}=useContext(contexData)
    const {BookId}=useParams();
    const Navigate=useNavigate();

    const [Data,setBookDetails]=useState(null)
    const [imgaeUrl,setUrl]=useState(null)
    // const [qty,setQty]=useState(1)

    useEffect(() => {
        getBookById(BookId).then((value) =>setBookDetails(value.data()))
    }, [getBookById])
    
    useEffect(() => {
        if (Data){
            const imgUrl=Data.bookImg
            getBooksImg(imgUrl).then((url)=>setUrl(url))
        }
    }, [Data])

     const placeOrd=async()=>{
       const result= await placeOrder(BookId,qty)
       console.log(result);
     }
    
  return (
    <>
 {
    Data === null ? <h1>Data loading ...</h1>  :
 
     <div>
    <h1>Book Details Page</h1>
    
            <div className='BookCardcontainer'>
            <div className='BookCardcontainerBody'>


          <div className="show BookSIngleImg " key={Data.ISBN}>
                <div className="BookimgBid"><img  src={imgaeUrl} alt=" Book img"  className='Bookimgsin'/></div>
                
            </div> 

         
            </div>
            <div className='SingleBookdetails'>
            <div className=" SingleBookdetailstext">Product Name : {Data.name}</div>
            <div className=" SingleBookdetailstext">Author Name :{Data.authorName}</div>
            <div className=" SingleBookdetailstext"> ₹ {Data.Price}</div>
            <div className=" SingleBookdetailstext">Quantity</div>
            <div>
            <div>
                <input type="number" id="small-input"  onChange={(e)=>setQty(e.target.value)}  className="block w-[30px] p-2 text-gray-900 border border-blue-700 hover:bg-blue-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>
                </div>
                </div>
                <div className='flex flex-row'>
                <button className='shoppingbtn1' onClick={placeOrd}>Buy Now</button>
                <div className="back"><button className='backbtn'  onClick={()=>Navigate("/")}>Back</button></div>
                </div>

            </div>
    </div>
      
    </div>
 }
 </>
  )
}

export default Bookdetails
