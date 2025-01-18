import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Classes from '../pages/Classes/Classes';
import Trainers from '../pages/Trainers/Trainers'
import TrainerDetails from '../pages/TrainerDetails/TrainerDetails';
import TrainerBooking from '../pages/TrainerBooking/TrainerBooking';
import Payment from '../pages/Payment/Payment';
import CreateClass from '../components/CreateClass/CreateClass';
import Dashboard from '../layouts/Dashboard';
import Users from '../components/Users/Users';

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout />,
        children:[
            {
                path:"/",
                element:<Home />
            },
            {
                path:'login',
                element:<Login />
            },
            {
                path:'register',
                element:<Register />
            },
            {
                path:'classes',
                element:<Classes />
            },
            {
                path:'trainers',
                element:<Trainers />
            },
            {
                path:"trainer/:trainerId",
                element:<TrainerDetails />
            },
            {
                path:"trainer-booked",
                element:<TrainerBooking />
            },
            {
                path:'payment',
                element:<Payment />
            },
            {
                path:'createClass',
                element:<CreateClass />
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard />,
        children:[
            {
                path:"/dashboard/users",
                element:<Users />
            }
        ]
    }
])

export default router;