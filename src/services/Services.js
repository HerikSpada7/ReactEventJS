import axios from "axios";

const apiPorta = "5289";

const apiLocal = `http://localhost:${apiPorta}/api/`;

const apiAzure = "https://apieventbryan-gecpbsecgnf4cmc5.brazilsouth-01.azurewebsites.net/api/";

const api = axios.create({
    baseURL: apiAzure
});

export default api;