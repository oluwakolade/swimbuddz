import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ParticipantCard from '../../components/ParticipantCard';
import AppToast from '../../components/AppToast';
import { HiCheckCircle, HiLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


type Participant = {
    id: string;
    full_name: string;
    has_registered: boolean;
};

const RegisterPage = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [manualName, setManualName] = useState('');
    const navigate = useNavigate();


    const fetchParticipants = async () => {
        const { data, error } = await supabase.from('participants').select('*');
        if (error) {
            console.error('Error fetching participants:', error.message);
            return;
        }
        setParticipants(data);
    };


    const handleRegister = async () => {
        if (!selectedId && !manualName.trim()) {
            alert('Please select a name or enter one manually');
            return;
        }

        setLoading(true);

        if (manualName.trim()) {
            const { error } = await supabase.from('participants').insert([
                {
                    full_name: manualName.trim(),
                    has_registered: true,
                },
            ]);
            if (error) {
                alert('Error adding name!');
                setLoading(false);
                return;
            }
        } else {
            const { error } = await supabase
                .from('participants')
                .update({ has_registered: true })
                .eq('id', selectedId);
            if (error) {
                alert('Error registering!');
                setLoading(false);
                return;
            }
        }

        setShowToast(true);
        setManualName('');
        setSelectedId(null);
        fetchParticipants();
        setLoading(false);
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    const filteredParticipants = participants.filter((p) =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const registered = filteredParticipants.filter(p => p.has_registered);
    const unregistered = filteredParticipants.filter(p => !p.has_registered);

    const getNextSaturday = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = (6 - day + 7) % 7 || 7;
        const nextSaturday = new Date(today.getTime() + diff * 86400000);
        return nextSaturday.toLocaleDateString();
    };

    return (
        <div className="screen bg-white text-blue-dark">
            <div className='flex flex-row justify-between items-center'>
                <Logo />
                <button
                    type='submit'
                    onClick={() => navigate('/checkin')
                    }
                    className='flex flex-row  gap-2 cursor-pointer p-2 rounded-md border border-surface text-surface font-playfair text-sm font-medium'
                >                                        <HiLogin className='h-5 w-5' />

                    Check In

                </button>
            </div>
            <h1 className="header pb-2">Register for Saturday Check-in</h1>

            <InputField
                type="text"
                placeholder="Search your name"
                value={searchTerm}
                label=""
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <p className="my-2">Select your name to register:</p>

            {/* <div className="flex flex-col gap-2">
        {filteredParticipants.map((p) => (
          <ParticipantCard
            key={p.id}
            id={p.id}
            name={p.full_name}
            isSelected={selectedId === p.id}
            onClick={(id) => setSelectedId(id)}
          />
        ))}
      </div> */}

            <div className="flex flex-col gap-2">
                {unregistered.length > 0 && (
                    <>
                        <h2 className="text-lg font-semibold mt-4 mb-2">Not Registered</h2>
                        {unregistered.map((p) => (
                            <ParticipantCard
                                key={p.id}
                                id={p.id}
                                name={p.full_name}
                                isSelected={selectedId === p.id}
                                onClick={(id) => setSelectedId(id)}
                                isRegistered={false}
                            />
                        ))}
                    </>
                )}

                {registered.length > 0 && (
                    <>
                        <h2 className="text-lg font-semibold mt-6 mb-2 text-green-700">
                            Registered (For: {getNextSaturday()})
                        </h2>
                        {registered.map((p) => (
                            <ParticipantCard
                                key={p.id}
                                id={p.id}
                                name={p.full_name}
                                isSelected={selectedId === p.id}
                                onClick={(id) => setSelectedId(id)}
                                isRegistered={true}
                            />
                        ))}
                    </>
                )}
            </div>


            <div className="my-6">
                <p className="text-sm mb-2 font-poppins">Can’t find your name? Enter it here:</p>
                <InputField
                    type="text"
                    placeholder="Full Name"
                    value={manualName}
                    label=""
                    onChange={(e) => setManualName(e.target.value)}
                />
            </div>

            <button
                className="w-full mt-2 mb-8 cursor-pointer bg-background hover:bg-blue-dark py-2 rounded font-bold text-white"
                onClick={handleRegister}
                disabled={loading}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>

            {showToast && (
                <div className='fixed top-4 right-4 cursor-pointer p-4'>

                    <AppToast
                        icon={<HiCheckCircle className='h-5 w-5' />}
                        message="Registration successful!"
                    />
                </div>

            )}
        </div>
    );
};

export default RegisterPage;
