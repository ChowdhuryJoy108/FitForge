import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://fit-forge-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;