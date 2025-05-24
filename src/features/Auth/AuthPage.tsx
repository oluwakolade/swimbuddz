import { useState } from 'react';
import InputField from '../../components/InputField';
import { LoaderComponent } from '../../components/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo'
import Button from '../../components/Button';
import AppToast from '../../components/AppToast';
import { HiCheckCircle } from 'react-icons/hi';



const AuthPage = () => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const swimbuddzCode = 4444;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
           if (parseInt(code) === swimbuddzCode) {
        setShowToast(true);
        setTimeout(() => {
          navigate('/register');
        }, 1000);
      } else {
        alert('Incorrect code. Try again.');
      }
        }
        catch (error: unknown) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoaderComponent />;

    return (
        <section className='screen flex flex-col gap-6 '>
            <Logo />
            <p className='header'>Enter Code to Register</p>

            <form onSubmit={handleLogin} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <InputField
                        label='Code'
                        placeholder='Enter Code'
                        type='number'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <Button text='Enter' />
                {showToast && (
                    <div className='fixed top-4 right-4 -50'>
                        <AppToast
                            icon={<HiCheckCircle className='h-5 w-5' />}
                            message='Successful!'
                        />
                    </div>
                )}
            </form>
        </section>
    );
};

export default AuthPage;
