// import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    // const [cart] = useCart();

    // TODO: get isAdmin value from the database
    // const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu flex flex-col gap-4 p-4">
                   <NavLink to="/">Home</NavLink>
                   <NavLink to="/dashboard/subscribers">Subcribers</NavLink>
                   <NavLink to="/dashboard/users">Users</NavLink>
                   <NavLink to="/dashboard/trainers">Trainers</NavLink>
                   <NavLink to="/dashboard/applications">Applications</NavLink>
                   <NavLink to="/dashboard/payment">Forum</NavLink>
                   <NavLink to="/dashboard/payment">AddClass</NavLink>
                   
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;