import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ParticipantCard from '../../components/ParticipantCard';
import AppToast from '../../components/AppToast';
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


type Participant = {
    id: string;
    full_name: string;
    has_checked_in: boolean;
    has_checked_out: boolean;
};

const isSaturday = new Date().getDay() === 6;

const CheckInPage = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    // const [loading, setLoading] = useState(false);
    const [checkInLoading, setCheckInLoading] = useState(false);
    const [checkOutLoading, setCheckOutLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();




    const fetchParticipants = async () => {
        const { data, error } = await supabase
            .from('participants')
            .select('*')
            .eq('has_registered', true);

        if (error) {
            console.error('Error fetching participants:', error.message);
            return;
        }
        setParticipants(data);
        console.log('Registered participants fetched:', data);
    };


    const filteredParticipants = participants.filter((p) =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleCheckIn = async () => {
        if (!selectedId) return alert('Please select a name');
        setCheckInLoading(true);
        const { error } = await supabase
            .from('participants')
            .update({ has_checked_in: true, check_in_time: new Date() })
            .eq('id', selectedId);
        if (error) {
            alert('Error checking in');
        } else {
            alert('Checked in successfully!');
            fetchParticipants();
            setShowToast(true);

        }
        setCheckInLoading(false);
    };

    const handleCheckOut = async () => {
        if (!selectedId) return alert('Please select a name');
        setCheckOutLoading(true);
        const { error } = await supabase
            .from('participants')
            .update({ has_checked_out: true, check_out_time: new Date() })
            .eq('id', selectedId);
        if (error) {
            alert('Error checking out');
        } else {
            alert('Checked out successfully!');
            fetchParticipants();
        }
        setCheckOutLoading(false);
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    const selected = participants.find(p => p.id === selectedId);

    return (
        <div className="screen  bg-white text-blue-dark">
            <div className='flex flex-row justify-between items-center'>
                <Logo />
                <button
                    type='submit'
                    onClick={() => navigate('/')
                    }
                    className=' flex flex-row  gap-2 cursor-pointer p-2 rounded-md border border-surface text-surface font-playfair text-sm font-medium'
                >
                    <HiArrowLeft className='h-5 w-5' />

                    Back
                </button>
            </div>
            <h1 className="header">Saturday Check In</h1>
            <InputField
                type='text'
                placeholder='Search Name'
                value={searchTerm}
                label=''
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="my-2">Select your name:</p>
            <p className="text-xs text-gray-500 italic pb-4">
                Only registered participants are allowed to check in.
            </p>

            <div className="flex flex-col gap-2 mb-4 max-h-96 overflow-y-auto">
                {filteredParticipants.map((p) => (
                    <ParticipantCard
                        key={p.id}
                        id={p.id}
                        name={p.full_name}
                        isSelected={selectedId === p.id}
                        hasCheckedIn={p.has_checked_in}
                        hasCheckedOut={p.has_checked_out}
                        onClick={(id) => setSelectedId(id)}
                    />
                ))}

            </div>

            {isSaturday ? (
                <div className='flex flex-row gap-4 mt-6'>
                    <button
                        className="cursor-pointer w-full border border-green-600 text-green-600 py-2 rounded-md font-playfair font-medium "
                        onClick={handleCheckIn}
                        disabled={checkInLoading || selected?.has_checked_in}
                    >
                        {checkInLoading ? 'Checking in...' : 'Check In'}
                    </button>
                    <button
                        className="cursor-pointer w-full border border-red-600 text-red-600 py-2 rounded-md font-playfair font-medium"
                        onClick={handleCheckOut}
                        disabled={checkOutLoading || !selected?.has_checked_in || selected?.has_checked_out}
                    >
                        {checkOutLoading ? 'Checking out...' : 'Check Out'}
                    </button>
                </div>
            ) : (
                <p className="text-yellow-400 text-sm">Check-in is only available on Saturdays.</p>
            )}

            {showToast && (
                <div className='fixed top-4 right-4 cursor-pointer p-4'>

                    <AppToast
                        icon={<HiCheckCircle className='h-5 w-5' />}
                        message="Check in successful!"
                    />
                </div>

            )}
        </div>
    );
};

export default CheckInPage;
