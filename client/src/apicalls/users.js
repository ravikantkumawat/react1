import { axiosInstances } from ".";

// Api Calls
// Register
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstances.post("/api/users/register", payload);
        return response.data;
    } catch(err) {
        return err;
    }
}

// Login
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstances.post("/api/users/login", payload);
        return response.data;
    } catch(err) {
        return err;
    }
}

// Get current USer
export const GetCurrentUser = async () => {
    console.log("I am inside Front-end API");
    try {
        const response = await axiosInstances.get("/api/users/get-current-user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
        
        return response.data;
    } catch (err) {

        return err;
    }
}
