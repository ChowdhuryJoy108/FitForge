import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import useTrainer from '../../hooks/useTrainer';
import AdminHome from '../AdminHome/AdminHome';
import TrainerHome from '../TrainerHome/TrainerHome';
import UserHome from '../UserHome/UserHome';
import useAuth from '../../hooks/useAuth';
import { Spinner } from "@material-tailwind/react";

const DashboardHome = () => {
    const {loading} = useAuth()
    const [isAdmin] = useAdmin()
    const [isTrainer] = useTrainer()

    if(loading){
        return <Spinner />
    }
    return (
        <div>
            {
                isAdmin && <AdminHome />
            }
            {
                isTrainer && <TrainerHome />
            }
            {
                !isAdmin && !isTrainer && <UserHome />
            }
        </div>
    );
};

export default DashboardHome;