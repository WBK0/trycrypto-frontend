import api from "../../../../services/api";

// That function retrieves data from an API endpoint and returns it as an array
const getData = async (): Promise<never[]> => {
  let data: any = [];
  
  await api.get("/data").then((response) => {
    const res = response.data.spot;
    
    // Convert the object of spot values into an array
    data = Object.keys(res).map((key) => res[key]);
  });
  return data ?? [];
};

export default getData;