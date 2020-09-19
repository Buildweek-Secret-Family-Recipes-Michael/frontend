import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://secret-family-recipes-pt16.herokuapp.com/",
        headers: { Authorization: token }
    });
};