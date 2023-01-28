/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext,useEffect,useState} from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'
import { useNavigate } from 'react-router-dom'

const Bookcard = ({x,Bookid}) => {
    const {getBooksImg}=useContext(contexData)

    const [imageurl,setImageUrl]=useState()
    const Navigate=useNavigate();

    useEffect(()=>{
        getBooksImg(x.bookImg).then((url)=>setImageUrl(url))
    },[])

    console.log(x);

  return (
    <div>
     <div className='Product_cart'>
        <div className='Product_img_tab'>
                <img src={imageurl} alt="Book Img loading" altimg="../../public/logo192.png" width="240" height="250" />
           </div>
            <div className='product_price_tab'>
              <div>
                    <h1 className='cart_text_title'>{x.name} </h1>
                    <h1 className='cart_text_author'>by {x.authorName} </h1>
                    <h1> ₹ {x.Price}</h1>
                    <div className='Bookbtndiv'>
                    <button type="button" className="btn btn-warning Buynowbtn">Buy Now</button>
                    <button type="button" className="btn btn-info infobtn" onClick={()=>Navigate(`/Bookdetails/${Bookid}`)}>Info</button>
                    </div>
               </div>
            </div>
        </div>
           
      
    </div>
  )
}

export default Bookcard
