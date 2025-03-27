import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Layout, Menu } from "antd";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { Header } from "antd/es/layout/layout";
import {HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlined />,
            onClick: () => {
                navigate("/");
            },
        },
        {
            label: `${user ? user.name : "anonymous"}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <span 
                            onClick = { () => {
                                if (user.role === "admin") {
                                    navigate("/admin");
                                } else {
                                    navigate("/profile");
                                }
                            }}
                        >
                            My Profile
                        </span>
                    ), 
                    icon: <ProfileOutlined />
                },

                {
                    label: (
                        <Link to="/login" onClick={() => {
                            localStorage.removeItem("token");
                        }}>
                            Log Out
                        </Link>
                    ),
                    icon: <LogoutOutlined/>
                },
            ],
        },
    ];

    const getValidUserDetails = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
            if (response.success) {
                dispatch(setUser(response.data));
            } else {
                dispatch(setUser(null));
                localStorage.removeItem("token");
                navigate("/login");
            }
            //console.log(response);
        } catch (err) {
            dispatch(HideLoading());
            dispatch(setUser(null));
            localStorage.removeItem("token");
            navigate("/login");
            //console.log('A', err);
        }   
    };  
    
    console.log("USER => ", user);

    useEffect(() => {
        if(localStorage.getItem("token")) {
            getValidUserDetails();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <Layout>
                <Header
                    className="d-flex justify-content-between"
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                        Book My Show
                    </h3>
                    <Menu theme="dark" mode="horizontal" items={navItems} />
                </Header>
                <div style={{ padding: 24, minHeight: "100vh", background: "#fff" }}>
                    { children }
                </div>
            </Layout>
        </>
    )
};

export default ProtectedRoute;