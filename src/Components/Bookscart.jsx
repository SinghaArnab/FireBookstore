/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useEffect} from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'



const Bookscart = () => {
    const {userDetails,fetchMyOrder,qty ,setQty ,placeOrder}=useContext(contexData)
    const [books, setBooks] = useState([]);

    useEffect(() => {
      fetchMyOrder().then((books)=>setBooks(books.docs));
      }, [userDetails]);

      console.log(books);
  
      const placeOrd=async(BookId)=>{
        const result= await placeOrder(BookId,qty)
        console.log(result);
      }

      const filtered = books.filter((x) =>x.data().quantity >= 1);

  return (
    <div>
  <h1>Cart page yh</h1> 

  {
    filtered &&  filtered.map((x ,index)=>{
      return ( 
      <div className="col-sm-12 col-md-10 col-md-offset-1" key={index}>
      <table className="table table-hover booktablebody">
      <thead>
      <tr>
      <th>Product</th>
      <th>Authorized</th>
      <th>Quantity</th>
      <th className="text-center">Price</th>
      <th className="text-center">Total</th>
      <th> </th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td className="col-sm-8 col-md-6 ">
      <div className="media">
      <img className="media-object imgcart thumbnail pull-left" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" alt="alt img"/>
      <div className="media-body">
      <h4 className="media-heading">{x.data().name} </h4>
      <h5 className="media-heading"> by {x.data().authorName}</h5>
      <span>Status: </span><span className="text-warning"><strong>In Stock</strong></span>
      </div>
      </div></td>
      <td className="col-md-1 text-left"><strong className="label label-danger">None</strong></td>
      <td className="col-sm-1 col-md-1 text-center">
      <input type="email" className="form-control" id="exampleInputEmail1"  value={x.data().quantity} />
      
      </td>
      <td className="col-sm-1 col-md-1 text-center"><strong>₹ {x.data().Price}</strong></td>
      <td className="col-sm-1 col-md-1 text-center"><strong>$99.99</strong></td>
      <td className="col-sm-1 col-md-1">
      <button type="button" className="btn btn-danger" onClickCapture={()=>placeOrd(x.key().segments[6])} onClick={()=>setQty(0)}>
      <span className="fa fa-remove"></span> Remove
      </button></td>
      </tr>



      </tbody>
      </table>
</div>  
      
      )
    })

  }

     
    </div>
  )
}

export default Bookscart
