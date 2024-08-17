import { useState, useEffect } from 'react';

const useUserForm = (initialData, validateForm, submitForm) => {
    const [userData, setUserData] = useState(initialData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://localhost:7082/User/2');
                if (response.ok) {
                    const data = await response.json();
                    setUserData((prevData) => ({
                        ...prevData,
                        firstName: data.name?.split(" ")[0] || '',
                        lastName: data.name?.split(" ")[1] || '',
                        password: data.password,
                        email: data.email || '',
                        phoneNumber: data.phoneNumber || '',
                        username: data.username || ''
                    }));
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { isValid, newErrors } = validateForm(userData);
        setErrors(newErrors);

        if (isValid) {
            try {
                await submitForm(userData);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    return { userData, errors, handleChange, handleSubmit, setUserData };
};

export default useUserForm;
