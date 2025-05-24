import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import InputField from '../../components/InputField';
import { LoaderComponent } from '../../components/LoaderComponent';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';


const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isMember, setIsMember] = useState(false);
        const navigate = useNavigate();


    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);

        try {
            const {data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        is_member: isMember,
                        role: 'user',
                    },
                },
            });

         if (error) {
      console.error('Signup error:', error.message);
      alert('Signup failed: ' + error.message);
      return;
    }

    //'profiles' table
    const user = data?.user;
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id, // match the auth.user id
            full_name: fullName,
            is_member: isMember,
          },
        ]);

      if (profileError) {
        console.error('Error inserting profile:', profileError.message);
        alert('Signup succeeded, but profile saving failed.');
      } else {
        alert('Signup successful!');
        navigate('/dashboard');
      }
    } else {
      alert('Signup succeeded but no user returned.');
    }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Unexpected error:', error.message);
                alert('Unexpected error: ' + error.message);
            } else {
                console.error('Non-standard error thrown:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoaderComponent />;

    return (
        <section className='screen flex flex-col gap-6'>
        <Logo/>
            <p className='text-xl font-bold text-blue-dark self-start'>Create your Account</p>

            <form onSubmit={handleRegistration} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <InputField
                        label='Full Name '
                        placeholder='Full Name'
                        type='text'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <InputField
                        label='Email'
                        placeholder='Enter email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label='Password'
                        placeholder='Enter password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className='font-poppins text-blue-dark text-sm font-medium flex flex-row gap-2'>
                        <input
                            type="checkbox"
                            checked={isMember}
                            onChange={() => setIsMember(!isMember)}
                        />
                        Are you a sunfit member?
                    </label>
                </div>

               <Button
               text='Register'/>
                                <p className='font-poppins text-sm font-normal text-blue-dark'>Already registered? <span onClick={()=> navigate('/') } className='font-semibold text-blue-dark cursor-pointer '>Log in</span></p>

            </form>
        </section>
    );
};

export default SignUp;
