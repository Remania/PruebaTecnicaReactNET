import Header from '../components/Header/Header';
import UserData from '../components/UserData/UserData';
import { useEffect, useState } from 'react';

function ProfileSetting() {
    const [profileData, setProfileData] = useState({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('https://localhost:7082/User/2');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setProfileData({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                    });
                } else {
                    throw new Error("Received content is not JSON");
                }

            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);


    return (
        <>
            <Header isIndex={true} title="Profile Settings" />
            <main>
                <div className="list__container">
                    <UserData link="Name" title="Name" value={profileData.name} />
                    <UserData link="UserName" title="User Name" value={profileData.username} />
                    <UserData title="Email" value={profileData.email} />
                    <UserData title="Phone Number" value={profileData.phoneNumber} />
                    <UserData link="ChangePassword" title="Change Password" />
                </div>
                <div className="spacing"></div>
                <UserData title="Delete my account and data" isIndividual={true} />
                <div className="spacing"></div>
                <UserData title="Notification" value="On" isIndividual={true} />
            </main>
        </>
    );
}

export default ProfileSetting;