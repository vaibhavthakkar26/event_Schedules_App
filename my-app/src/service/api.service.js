import { ENDPOINTURL } from "../utils/helper";
import { post } from "../web.request";

export const createEventApiHandler = (data) =>{
    console.log("data",data);
    return post(`${ENDPOINTURL}/api/v1/event/create`,data);
}