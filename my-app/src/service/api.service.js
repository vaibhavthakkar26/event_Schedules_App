import { ENDPOINTURL } from "../utils/helper";
import { get, post, put } from "../web.request";

export const createEventApiHandler = (data) =>{
    console.log("data",data);
    return post(`${ENDPOINTURL}/api/v1/event/create`,data);
}

export const editEventApiHandler = (data) =>{
    console.log("data",data);
    return put(`${ENDPOINTURL}/api/v1/event/create`,data);
}


export const ListEventApiHandler = () =>{
    return get(`${ENDPOINTURL}/api/v1/event/list`);
}