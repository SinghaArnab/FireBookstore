import { createContext,useState,useEffect} from "react";
import {app} from './Firebase'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,onAuthStateChanged,signOut} from "firebase/auth";
import { getFirestore,addDoc,collection,getDocs ,getDoc,doc,query,where,updateDoc} from "firebase/firestore";
import { getStorage,uploadBytes,ref ,getDownloadURL } from "firebase/storage";


const auth =getAuth(app)
const googleProvider = new GoogleAuthProvider();
const fireStoreDb = getFirestore(app);
const fireStorage = getStorage(app);


const contexData=createContext();

const FirebaseDB=({children})=>{

const [userDetails, setuserDetails] = useState(false)
const [user, setuser] = useState("")
const [qty,setQty]=useState(1)

//if user Dont't log out then this will keep user login when he/she come back

  useEffect(()=>{
    onAuthStateChanged (auth ,(user)=>{
        if(user){
            console.log('you log in');
            setuserDetails(true)
            setuser(user);
        }
        else{
            console.log('You loged out')
            setuserDetails(false)
        }
    })     
  },[])

// This function is for register any new user with email & password

  const RegisterUser=(username,passsword)=>{
    createUserWithEmailAndPassword(auth,username,passsword)
  }

// This function is for Signin any existing user with their email & password

const singinUser=(username,passsword)=>{
    signInWithEmailAndPassword(auth,username,passsword)
  }

// This function is used for login throw Direct gmail   

  const googleSignIN=()=>{
    signInWithPopup(auth, googleProvider)
}

// This function is used for logout user

const Logout=()=>{
  signOut(auth)
}

//This function is used for Register any new Book on the Realtime fireStore 

const RegisterNewBook= async (id,bookName,authorName,category,ISBN,Price,Bookimg)=>{

  const imageRef= ref(fireStorage,`uploads/booksImages/${id}-${Bookimg.name}`)
  const uploadImg= await uploadBytes(imageRef,Bookimg);
  await addDoc(collection(fireStoreDb,'Books'),{
    name:bookName,
    authorName: authorName,
    bookImg : uploadImg.ref.fullPath,
    category:category,
    ISBN:ISBN,
    Price:Price,
    quantity:Number(0),
    admin:false,
    userID:user.uid,
    userEmail:user.email,
    displayName:user.displayName,
 })
}

// get all the books details from Firestore

const allBooks=()=>{
  return getDocs(collection(fireStoreDb,'Books'));
}

// get all the images from storage

const getBooksImg=(path)=>{
   return getDownloadURL(ref(fireStorage,path))

}

// get Books from id 

const getBookById= async (id)=>{
  const Docref= doc(fireStoreDb,'Books',id);
  const result=await getDoc(Docref)
  return result
}

// place order by bookid 

const placeOrder = async(BookId,qty)=>{
  const docRef=doc(fireStoreDb,'Books',BookId)
  await updateDoc(docRef ,{
    quantity:Number(qty),
  })
}

// get the orders 

const fetchMyOrder= async()=>{
  const collectionRef=collection(fireStoreDb,'Books')
  const q=query(collectionRef, where('userEmail','==',user.email))
   const snapshot=await getDocs(q)
    
   return snapshot
}




  return (
    <contexData.Provider value={{RegisterUser,googleSignIN,userDetails,user,Logout,RegisterNewBook,singinUser,allBooks,getBooksImg,getBookById,placeOrder,fetchMyOrder
    ,setQty,qty
    }}>
      {children}
    </contexData.Provider>
  )
}

export default FirebaseDB
export {contexData}