import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import FormValidationInfo from '../components/FormValidationInfo/FormValidationInfo';
import useUserForm from '../hooks/useUserForm'; // Importa el custom hook

const UserName = () => {
    const navigate = useNavigate();

    // Define la data inicial
    const initialData = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        username: '',
        phoneNumber: ''
    };

    // Define la función de validación
    const validateForm = (data) => {
        const newErrors = {
            username: ''
        };
        let isValid = true;
        if (!data.username.trim()) {
            newErrors.username = 'Fill the User Name field';
            isValid = false;
        }
        return { isValid, newErrors };
    };

    // Define la función de envío
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
            console.error('Failed to update user:', response.statusText);
        }
    };

    // Usa el custom hook
    const { userData, errors, handleChange, handleSubmit } = useUserForm(initialData, validateForm, submitForm);

    return (
        <>
            <Header title="User Name" />
            <main>
                <form className="form__container" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={userData.username || ''}
                                onChange={handleChange}
                            />
                            {errors.username && <FormValidationInfo value={errors.username} />}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </main>
        </>
    );
}

export default UserName;

