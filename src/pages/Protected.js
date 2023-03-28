import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Preloader from '../components/Preloader';
import Sidebar from '../components/Sidebar';
import { Routes } from '../routes';

const Protected = ({ component: Cmp, ...rest }) => (
    // const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //   const timer = setTimeout(() => setLoaded(true), 1000);
    //   return () => clearTimeout(timer);
    // }, []);

    // const localStorageIsSettingsVisible = () => {
    //   return localStorage.getItem('settingsVisible') === 'false' ? false : true
    // }

    // const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    // const toggleSettings = () => {

    //   setShowSettings(!showSettings);
    //   localStorage.setItem('settingsVisible', !showSettings);
    // }


    <Route {...rest} render={props => (
        <>
            <Preloader />
            <Sidebar />

            <main className="content">
                <Navbar />
                <Cmp {...props} />
                <Footer />
            </main>
        </>
    )}
    />,

<Route
    {...rest}
    render={(props) =>
        sessionStorage.getItem('id') ? (
            <Cmp {...props} />
        ) :
            <Redirect to={Routes.Signin.path}
            />
    }
/>


);

export default Protected;
