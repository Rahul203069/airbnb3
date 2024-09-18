
"use client"
import React, { useState } from 'react'
import Select from'react-select';
import countries from 'world-countries';
import makeAnimated from 'react-select/animated';
import { IconType } from 'react-icons/lib';
 
 export type Countryselectvalue={
    flag:string;
    label:any;
    latlng:number[];
    region:string;
    value:string;
}
interface Countryselectprops {

    value?:Countryselectvalue;
    onChange: (value:Countryselectvalue)=>void
}

const Countryselect:React.FC<Countryselectprops> = ({
    value,onChange
}) => {


    const fromattedCountries =countries.map((country)=>{
        return({
            value:country.cca2,
            label:country.name.common,
            flag:country.flag,
            latlng:country.latlng,
            region:country.region
        })
    });
    
 
    
  return (
    <div>
      <Select placeholder="Anywhere"  options={fromattedCountries}
    
      value={value}
      onChange={(value:any)=>{onChange(value)}}
 formatOptionLabel={(option)=>{
    return(
        <div className='flex flex-row items-center'>
            
            <div>{option.label}</div>,
            <div>{option.region}</div>
        </div>
    );
 }}
 classNames={{control:()=>'p-3',
    input:()=>"text-lg"
 }}
     theme={(theme)=>{

        return({...theme,borderRadius:8,colors:{...theme.colors, primary25:'#ffe4e6'}})
     }} ></Select>

     
    

    </div>
  )
}

export default Countryselect
