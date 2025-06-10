// import { useState } from 'react';
// import { supabase } from '../../services/supabaseClient';
// import InputField from '../../components/InputField';
// import { LoaderComponent } from '../../components/LoaderComponent';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../../components/Logo'
// import Button from '../../components/Button';



// const Login = () => {
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();


//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const { error } = await supabase.auth.signInWithPassword({
//                 email,
//                 password,
//             });

//             if (error) {
//                 console.error('Login error:', error.message);
//                 alert('Login failed: ' + error.message);
//             } else {
//                 alert('Login successful!');
//                 //  after successful login:
//                 navigate('/dashboard');
//             }
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 console.error('Unexpected error:', error.message);
//                 alert('Unexpected error: ' + error.message);
//             } else {
//                 console.error('Non-standard error thrown:', error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <LoaderComponent />;

//     return (
//         <section className='screen flex flex-col gap-6 '>
//         <Logo/>

//             <p className='header'>Login to your Account</p>

//             <form onSubmit={handleLogin} className='flex flex-col gap-6'>
//                 <div className='flex flex-col gap-4'>
//                     <InputField
//                         label='Email'
//                         placeholder='Enter email'
//                         type='email'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <InputField
//                         label='Password'
//                         placeholder='Enter password'
//                         type='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//              <Button
//              text='Log in'/>
//                 <p className='font-poppins text-sm font-normal text-blue-dark'>Don't have an Account? <span onClick={()=> navigate('/register') } className='font-semibold text-blue-dark cursor-pointer '>Register</span></p>
//             </form>
//         </section>
//     );
// };

// export default Login;
