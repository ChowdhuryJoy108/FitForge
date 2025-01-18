import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const { trainer, selectedSlot, selectedPlan } = location.state || {};
    console.log(trainer, selectedSlot, selectedPlan)
    return (
        <div>
            This is payment page!
        </div>
    );
};

export default Payment;