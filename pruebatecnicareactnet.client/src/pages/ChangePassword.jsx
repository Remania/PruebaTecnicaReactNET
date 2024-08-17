import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import FormValidationInfo from '../components/FormValidationInfo/FormValidationInfo';
import useUserForm from '../hooks/useUserForm';

const ChangePassword = () => {
    const navigate = useNavigate();

    const initialData = {
        firstName: '',
        lastName: '',
        newPassword: '',
        confirmPassword: '',
        password: '',
        email: '',
        username: '',
        phoneNumber: ''
    };

    const validateForm = (data) => {
        const newErrors = {
            currentPassword: '',
            newPassword: [],
            confirmPassword: ''
        };
        let isValid = true;

        if (!data.password.trim()) {
            newErrors.currentPassword = 'Fill the Current Password field';
            isValid = false;
        }

        if (!data.newPassword.trim()) {
            newErrors.newPassword.push('Fill the New Password field');
            isValid = false;
        } else {
            const passwordLengthRegex = /^.{8,16}$/;
            const uppercaseRegex = /^(?=.*[A-Z])/;
            const specialCharRegex = /^(?=.*[@$!%*?&])/;

            if (!passwordLengthRegex.test(data.newPassword)) {
                newErrors.newPassword.push('Password must be 8-16 characters long');
                isValid = false;
            }

            if (!uppercaseRegex.test(data.newPassword) || !specialCharRegex.test(data.newPassword)) {
                newErrors.newPassword.push('Include at least 1 upper case and a special character');
                isValid = false;
            }

            if (passwordLengthRegex.test(data.newPassword) && uppercaseRegex.test(data.newPassword) && specialCharRegex.test(data.newPassword)) {
                newErrors.newPassword.push('Password must be 8-16 characters long');
                newErrors.newPassword.push('Include at least 1 upper case and a special character');
                newErrors.newPassword.status = 'success';
                isValid = true;
            }
        }

        if (data.newPassword !== data.confirmPassword) {
            newErrors.confirmPassword = 'Passwords don\'t match';
            isValid = false;
        }

        if (!data.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Fill the Confirm Password field';
            isValid = false;
        }

        return { isValid, newErrors };
    };

    const submitForm = async (data) => {
        try {
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
                console.error('Failed to update user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const { userData, errors, handleChange, handleSubmit } = useUserForm(initialData, validateForm, submitForm);

    return (
        <>
            <Header title="Change Password" />
            <main>
                <form className="form__container" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Current Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={userData.password}
                                onChange={handleChange}
                                readOnly
                            />
                            {errors.currentPassword && <FormValidationInfo value={errors.currentPassword} status="error" />}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                value={userData.newPassword}
                                onChange={handleChange}
                            />
                            {Array.isArray(errors.newPassword) && errors.newPassword.map((error, index) => (
                                <FormValidationInfo key={index} value={error} status={errors.newPassword.status === 'success' ? 'success' : 'error'} />
                            ))}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <FormValidationInfo value={errors.confirmPassword} status="error" />}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </main>
        </>
    );
};

export default ChangePassword;
