const apiKey = "c60b6fb3cb7dd48a8722bdf3fcb16018";
const city = 'delhi'

const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

 console.log(api)

 fetch (api).then((res)=>res.json())
 .then((data)=>{
  let temp=data.main.temp;
  console.log(temp)
 })