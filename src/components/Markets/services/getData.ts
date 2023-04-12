import api from "../../../services/api";

// That function retrieves data from an API endpoint and returns it as an array
const getData = async (market : string): Promise<never[]> => {
  let data: any = [];
  
  await api.get("/data").then((response) => {
    let res: any;
    console.log(market)
    if(market === 'spot'){
      res = response.data.spot;
    }else if(market === 'futures'){
      res = response.data.futures;
    }
    
    // Convert the object of spot values into an array
    data = Object.keys(res).map((key) => res[key]);
    data.sort((a: any, b: any) => b.volume - a.volume);
  });
  return data ?? [];
};

export default getData;