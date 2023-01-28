import React,{useState,useContext} from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const AddBooks = () => {
    const {userDetails,RegisterNewBook}=useContext(contexData)
    const Navigate=useNavigate();

    const [bookDetails,setBook]=useState({
        id:uuidv4(),
        bookName:"",
        authorName:"",
        category:"",
        ISBN:"",
        Price:""
    })

    const [isModel,setModel]=useState(false)

    const [Bookimg,setBookImg]=useState('')

    const handelChange=(e)=>{
        const {name,value}=e.target;
        setBook((prev)=>{
           return {
            ...prev,[name]:value
           } 
        })   
    }

    const formSubmit=(e)=>{
        e.preventDefault()

        if(bookDetails.bookName && bookDetails.authorName && bookDetails.category && bookDetails.ISBN && bookDetails.Price && Bookimg){
          RegisterNewBook(bookDetails.id,bookDetails.bookName,bookDetails.authorName,bookDetails.category,bookDetails.ISBN,bookDetails.Price,Bookimg)

          setModel(true)
        }
        else{
          console.log("Please Fill all the Fileds");
        }
        console.log(bookDetails);
      }


  return (
    <>
    {userDetails===false?  Navigate('/login'):
      <div className='main'>
      {isModel? 
      <div className='altBody'>
      <section className='altsection'>
      <div className='alttext'>
      <h3> Your book Has been Added</h3>
      <button className='altButton' onClick={()=>setModel(false)}>Close</button>
      </div>
      </section> 
      </div>
      :''}
      <h1>Post New Book</h1>
      <div className='Form'>
      <form className="row g-3" onSubmit={formSubmit}>
        <div className="col-md-6">
          <label className="form-label">Book Name</label>
          <input type="text" name='bookName' className="form-control"  placeholder='Enter Book Name...' onChange={handelChange}  required/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Author Name</label>
          <input type="text"  name='authorName' className="form-control"  placeholder='Enter Book Name...' onChange={handelChange}  required/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Book Image</label>
          <input className="form-control" type="file" name='img' onChange={(e)=>{setBookImg(e.target.files[0])}} />
          </div>
        <div className="col-md-6">
          <label className="form-label">ISBN</label>
          <input className="form-control" type="text" name='ISBN'  placeholder='Enter ISBN Number...' onChange={handelChange} />
          </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input className="form-control" type="number" name='Price'  placeholder='Enter Book Price...' onChange={handelChange} />
          </div>
        <div className="col-md-6">
          <label className="form-label">Book Category</label>
          <input type="text" className="form-control"  placeholder='Enter Book Name...'  name='category'  onChange={handelChange} required/>
        </div>
        <div className="h-100 d-flex align-items-center justify-content-center">
          <button className="btn btn-primary Bookbtn2" type="submit" >Save  </button>
        </div>
      </form>
      </div>
    </div>
    }
    </>
  )
}

export default AddBooks
