import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import FormValidationInfo from '../components/FormValidationInfo/FormValidationInfo';
import useUserForm from '../hooks/useUserForm';

const Name = () => {
    const navigate = useNavigate();

    const validateForm = (data) => {
        const newErrors = {
            firstName: '',
            lastName: ''
        };
        let isValid = true;
        if (!data.firstName.trim()) {
            newErrors.firstName = 'Fill the First Name field';
            isValid = false;
        }
        if (!data.lastName.trim()) {
            newErrors.lastName = 'Fill the Last Name field';
            isValid = false;
        }
        return { isValid, newErrors };
    };

    const submitForm = async (data) => {
        const response = await fetch('https://localhost:7082/User/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('User updated successfully');
            navigate("/");
        } else {
            throw new Error('Failed to update user');
        }
    };

    const { userData, errors, handleChange, handleSubmit } = useUserForm(
        {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            userName: '',
            phoneNumber: ''
        },
        validateForm,
        submitForm
    );

    return (
        <>
            <Header title="Name" />
            <main>
                <form className="form__container" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={userData.firstName || ''}
                                onChange={handleChange}
                            />
                            {(errors.firstName || '') && <FormValidationInfo value={errors.firstName || ''} />}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={userData.lastName || ''}
                                onChange={handleChange}
                            />
                            {(errors.lastName || '') && <FormValidationInfo value={errors.lastName || ''} />}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </main>
        </>
    );
}

export default Name;
