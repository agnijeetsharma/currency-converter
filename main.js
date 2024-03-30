const BASE_URL =
"https://v6.exchangerate-api.com/v6/2a79e966acf82ebc1874b6e8/latest";

const dropdown=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const tocurr=document.querySelector(".to select")
const fromcurr=document.querySelector(".from select")
const message=document.querySelector("#meassage");
const rate=document.querySelector("#rate");
for(let select of dropdown){
    for (currencyCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText= currencyCode;
        newOption.value= currencyCode;
        if(select.id==="from"&&currencyCode==="INR"){
            newOption.selected="selected"
        }
        if(select.id==="to"&&currencyCode==="USD"){
            newOption.selected="selected"
        }
        select.append(newOption);
       
    }
    select.addEventListener('change',(e)=>{
        changeFlag(e.target);
    });
}
function changeFlag(element){
    let countryCode=countryList[element.value]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img") 
    img.src=newSrc

}
btn.addEventListener('click',async (evn)=>{
   evn.preventDefault();
   let input=document.querySelector(".amount input")
   let inputVal=input.value;
   if(isNaN(inputVal)||inputVal<1||inputVal===""){
    inputVal=1
    input.value="1";
   }

const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}`;
let exchangeRate;
try {
    let response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    let data = await response.json();
    
     exchangeRate = data.conversion_rates[tocurr.value.toUpperCase()];
    console.log(`1 ${fromcurr.value} = ${exchangeRate} ${tocurr.value}`);
} catch (error) {
    console.error('Error fetching currency data:', error.message);
}
const conversion=exchangeRate*inputVal;
message.innerText=`${inputVal} ${fromcurr.value} = ${conversion}${tocurr.value}`
rate.innerText=`1 ${fromcurr.value} = ${exchangeRate} ${tocurr.value}`

});