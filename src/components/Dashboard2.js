import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                let endpoint = 'user';
                if (role === 'Admin') endpoint = 'admin';
                if (role === 'SuperAdmin') endpoint = 'superadmin';

                const res = await axios.get(`http://localhost:5000/api/auth/${endpoint}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage(res.data.message);
            } catch (err) {
                setMessage('Access Denied');
            }
        };

        fetchData();
    }, [role]);

    return <h1>{message}</h1>;
};

export default Dashboard;
