import countries from 'world-countries';



const useCountries=()=>{
    const fromattedCountries =countries.map((country)=>{
        return({
            value:country.cca2,
            lable:country.name.common,
            flag:country.flag,
            latlng:country.latlng,
            region:country.region
        })
    });
const getall=(value:object[])=>{return value }

const getbyvalue=(value:string)=>{
    console.log(fromattedCountries);
    return fromattedCountries.find((item)=>item.value===value);

}

return{
    getall, getbyvalue,fromattedCountries
}

}

export default useCountries;

