
import {useEffect, useState} from 'react'
import userData from './assets/data';

function App() {
  const [value,setValue] = useState('');
  const [data,setData] = useState(userData);
  const [userTags,setUserTags] = useState([]);
  useEffect(() => {
     if(value){
      const filteredData = userData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      setData(filteredData);
     }
  },[value])
   
function handleUser(idx){
   const userTagsCopy = [...userTags];
   userTagsCopy.push(data[idx]);
   setData([])
   setValue('')
   setUserTags(userTagsCopy);
}

function handleDeletion(idx){
  console.log('inside deletion fn');
   setUserTags((prevTags => {
   const filteredData =  prevTags.filter((_,id) => id !== idx);
   console.log(filteredData)
   return filteredData
   }));
}

  return <div className='flex justify-center pt-12 relative'>
    <label className='flex gap-4 flex-wrap w-[750px] border-b-4 p-2'>
    {
     userTags.length > 0 && <ul className='flex gap-4'>
       {userTags.map((item,idx) => {
        return <li key={idx} className='bg-gray-300 rounded-[50px] pr-2 w-fit flex items-center gap-3'>
          <img className='w-12 rounded-full' src={item.src} alt='avatar'/>
          <span>{item.name}</span>
          <button className='font-bold' onClick={() => handleDeletion(idx)}>X</button>
        </li>
       })}
     </ul>
     }
     <input className='border-solid  p-2 focus:outline-none' type={'text'} placeholder={"Add new user"} value={value} onChange={(e) => setValue(e.target.value)}/>
    
     </label>
    <ul className='absolute top-24 flex-col items-center'>
      {
      data.map((item,idx) => {
        return <li key={idx} onClick={() => handleUser(idx)} className='p-2 rounded-md bg-gray-300 flex items-center justify-center gap-4 w-96' >
          <img src={item.src} className='rounded-full w-12' alt={'avatar'}/>
           <span>{item.name}</span>
           <span>{item.email}</span>
        </li>
      
      })
    }
      </ul>
  </div>
}

export default App;
