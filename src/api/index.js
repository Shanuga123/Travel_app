import axios from "axios";
const URL='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

  
  
export const getPlacesData = async (type,sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '4503023e66mshb55a335639607bcp105608jsnfeb9137c7f65',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://open-weather13.p.rapidapi.com/city/latlon/30.438/-89.1028', {
        params: { lat:lng, lon: lat, },
        headers: {
          'X-RapidAPI-Key': '8f2503306emsh8ab8e13e265890fp1c3029jsn3159080f53d3',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};