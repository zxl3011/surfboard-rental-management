import axios from "axios"

const api = axios.create({
    baseURL: "https://surfboard-rental-management.onrender.com",
    timeout: 15000, // 15s
});

/* retry helper (handle Render cold start) */
async function withRetry(fn, { retries = 2, delays = [1500, 3000] } = {}) {
    let lastErr;

    for (let i = 0; i <= retries; i++) {
        try {
            return await fn();
        } catch (err) {
            lastErr = err;

            if (i === retries) break;

            await new Promise((r) =>
                setTimeout(r, delays[i] ?? delays[delays.length - 1])
            );
        }
    }

    throw lastErr;
}


export default class ApiService {

    static BASE_URL = "https://surfboard-rental-management.onrender.com"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */


    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This is the  to get user rentals by the user id */
    static async getUserRentals(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-rentals/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is to delete a user */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /**ROOM */
    /* This adds a new equipment to the database */
    static async addEquipment(formData) {
        const result = await axios.post(`${this.BASE_URL}/equipments/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /* This  gets all availavle equipments */
    // static async getAllAvailableEquipments() {
    //     const result = await axios.get(`${this.BASE_URL}/equipments/all-available-equipments`)
    //     return result.data
    // }

    static async getAllAvailableEquipments(){
        const result = await withRetry(() =>
            api.get(`/equipments/all-available-equipments`),
            {retries: 2, delays: [1500, 3000]}
        );
            return result.data;
    }


    /* This gets all available by dates equipments from the database with a given date and an equipment type */
    // static async getAvailableEquipmentByDateAndType(startDate, endDate, category) {
    //     const result = await axios.get(
    //         `${this.BASE_URL}/equipments/available-equipments-by-date-and-type?startDate=${startDate}&endDate=${endDate}&category=${category}`
    //     )
    //     return result.data
    // }

    static async getAvailableEquipmentByDateAndType(startDate, endDate, category){
        const result = await withRetry(() =>
            api.get(`/equipments/available-equipments-by-date-and-type?startDate=${startDate}&endDate=${endDate}&category=${category}`),
            {retries: 2, delays: [1500, 3000]}
        );
        return result.data;
    }

    /* This gets all categories from the database */
    // static async getCategories() {
    //     const response = await axios.get(`${this.BASE_URL}/equipments/categories`)
    //     return response.data
    // }
    //use withRetry
    static async getCategories() {
        const response = await withRetry(() =>
            api.get(`/equipments/categories`)
        );

        return response.data;
    }

    /* This gets all equipments from the database */
    static async getAllEquipments() {
        const result = await axios.get(`${this.BASE_URL}/equipments/all`)
        return result.data
    }
    /* This function gets an equipment by the id */
    static async getEquipmentById(equipmentId) {
        const result = await axios.get(`${this.BASE_URL}/equipments/equipment-by-id/${equipmentId}`)
        return result.data
    }

    /* This  deletes an equipment by the Id */
    static async deleteEquipment(equipmentId) {
        const result = await axios.delete(`${this.BASE_URL}/equipments/delete/${equipmentId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This updates an equipment */
    static async updateEquipment(equipmentId, formData) {
        const result = await axios.put(`${this.BASE_URL}/equipments/update/${equipmentId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }


    /**Rental */
    /* This  saves a new rental to the databse */
    static async rentalEquipment(equipmentId, userId, rental) {

        console.log("USER ID IS: " + userId)

        const response = await axios.post(`${this.BASE_URL}/rentals/rental-equipment/${equipmentId}/${userId}`, rental, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This gets all rentals from the database */
    static async getAllRentals() {
        const result = await axios.get(`${this.BASE_URL}/rentals/all`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This get rental by the cnfirmation code */
    static async getRentalByConfirmationCode(rentalCode) {
        const result = await axios.get(`${this.BASE_URL}/rentals/get-by-confirmation-code/${rentalCode}`)
        return result.data
    }

    /* This is to cancel user rental */
    static async cancelRental(rentalId) {
        const result = await axios.delete(`${this.BASE_URL}/rentals/cancel/${rentalId}`, {
            headers: this.getHeader()
        })
        return result.data
    }


    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}
// export default new ApiService();