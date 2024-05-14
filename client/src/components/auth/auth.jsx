import { useEffect } from 'react';


const WithAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/'
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default WithAuth;
