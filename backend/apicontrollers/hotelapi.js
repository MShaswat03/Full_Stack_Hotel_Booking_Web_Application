const axios = require("axios");


const getHotelDetailsAPI = async (id) => {
  try {
    const response = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${id}`);
    if (!response.data || Object.keys(response.data).length === 0) {
      const error = new Error("Hotel not found or Invalid hotel ID");
      error.statusCode = 404;
      return;
    }
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Hotel not found or Invalid hotel ID");
    }
    throw new Error('An error occurred while fetching hotel details');
  }
};

const getHotelsDetailsAPI = async (destination_id) => {
  try {
    if (destination_id.length === 0) {
      const error = new Error("Destination ID cannot be empty");
      error.statusCode = 400;
      return;
    }

    const response = await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination_id}`);
    if (response.data.length === 0) {
      const error = new Error("Destination not found or Invalid destination ID");
      error.statusCode = 400;
      return;
    }

    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error;
    }
    throw new Error('An error occurred while fetching hotel details: ' + error.message);
  }
};




const getHotelPricesAPI = async (params) => {
  try {
    const response = await axios.get("https://hotelapi.loyalty.dev/api/hotels/prices", { params });
    if (!response.data || !response.data.hotels || !response.data.completed) {
      console.log("Invalid parameters or no data available")
    }
    return response;
  } catch (error) {
    throw new Error("An error occurred while fetching hotel prices");
  }
};


const getRoomsAPI = async (id, p) =>{
    return await axios.get(
        `https://hotelapi.loyalty.dev/api/hotels/${id}/price`,
        {
          params: p,
        }
      );
}


module.exports = {
    getHotelDetailsAPI,
    getHotelsDetailsAPI,
    getHotelPricesAPI,
    getRoomsAPI,
};