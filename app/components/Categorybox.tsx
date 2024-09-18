import React, { useCallback } from 'react'
import { IconType } from 'react-icons/lib'
import { useRouter, useServerInsertedHTML } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import qs from 'query-string';
import { compareSync } from 'bcrypt';
import { categories } from './Categories';
interface box {
    name:string,
    icon:IconType,
    description:string,
    selected?:boolean
}
const Categorybox:React.FC<box> = ({name,icon:Icon,description,selected}) => {

const router=useRouter();
const params=useSearchParams();
const handleclick=
  () => {

const currentQuery=qs.parse(params.toString());
const updatedQuery:any={...currentQuery,category:name }

if(params.get('category')===name){
  delete updatedQuery.category
}
const url:string=qs.stringifyUrl({url:'/',query:updatedQuery});
router.push(url)

}


  return (
    <div className={ `flex flex-col justify-center items-center text-md text-neutral-500 hover:text-neutral-800 cursor-pointer  w-14 pb-2  duration-100 ${selected?`border-b-2 text-neutral-800`:'border-transparent'}  border-neutral-800`} onClick={handleclick}>
       
      <Icon size={30}></Icon>
    <div className='text-sm'>{name}</div>
    </div>
  )
}

export default Categorybox


// console.log('parms');
   
//    console.log(params);
//    console.log('parms.tostring()');
//    console.log(params.toString())
//    let currentQuery=qs.parse(params.toString());
//    const ur =qs.stringifyUrl({
//      url:'/',
//      query:currentQuery 
//    },{skipNull:true});
//    console.log(ur)
//    console.log('qs.parse(params.toString());');
//     console.log( currentQuery)

//    const updatedQuery:any={...currentQuery,category:name}
//    console.log("{...currentQuery,category:name}");
//    console.log(updatedQuery);
//    if(params.get('category')===name){
//     delete updatedQuery.category;
//   }
  
//   const url =qs.stringifyUrl({
//     url:'/',
//     query:updatedQuery
//   },{skipNull:true});
//   console.log("const url =qs.stringifyUrl({")
//   console.log(url);
//   router.push(url)