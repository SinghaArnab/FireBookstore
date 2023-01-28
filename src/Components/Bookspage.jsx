/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext,useEffect,useState} from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'
import Bookcard from './Bookcard'

const Bookspage = () => {
    const {allBooks}=useContext(contexData)

    const [books,setBooks]=useState([])
    const [isLoading,setLoading]=useState(true)

   useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },800)
    allBooks().then((books)=>setBooks(books.docs));
   },[])

  return (
    <>
        {

isLoading?
<div className='Booksloading'>
<div className="loader">
        <div className="square-item"></div>
        <div className="square-item"></div>
        <div className="square-item"></div>
        <div className="square-item"></div>
    </div>
</div>
:
 
    <div className='Product_body'>

  { books && books.map((x,index)=>{
    return (
       <Bookcard  x={x.data() } Bookid={x.id} key={index}/>
    )
  })
  }
    </div>
}
    </>
  )
}

export default Bookspage
