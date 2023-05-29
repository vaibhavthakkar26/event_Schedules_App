import { ENDPOINTURL } from "../utils/helper";
import { DELETE, get, post, put } from "../web.request";

export const createEventApiHandler = (data) =>{
    console.log("data",data);
    return post(`${ENDPOINTURL}/api/v1/event/create`,data);
}

export const editEventApiHandler = (id,data) =>{
    return put(`${ENDPOINTURL}/api/v1/event/${id}`,data);
}

export const getListById = (id) =>{
    return get(`${ENDPOINTURL}/api/v1/event/${id}`);
}


export const ListEventApiHandler = () =>{
    return get(`${ENDPOINTURL}/api/v1/event/list`);
}

export const eventsDeleteById = (id) =>{
    return DELETE(`${ENDPOINTURL}/api/v1/event/${id}`)
}

export const priorityListHandler = () =>{
    return get(`${ENDPOINTURL}/api/v1/priority/list`)
}