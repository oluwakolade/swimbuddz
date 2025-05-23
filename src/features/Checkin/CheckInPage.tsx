import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ParticipantCard from '../../components/ParticipantCard';

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
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchParticipants = async () => {
        const { data, error } = await supabase.from('participants').select('*');
        if (error) {
            console.error('Error fetching participants:', error.message);
            return;
        }
        setParticipants(data);
    };

const filteredParticipants = participants.filter((p) =>
  p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
);
    const handleCheckIn = async () => {
        if (!selectedId) return alert('Please select a name');
        setLoading(true);
        const { error } = await supabase
            .from('participants')
            .update({ has_checked_in: true, check_in_time: new Date() })
            .eq('id', selectedId);
        if (error) {
            alert('Error checking in');
        } else {
            alert('Checked in successfully!');
            fetchParticipants();
        }
        setLoading(false);
    };

    const handleCheckOut = async () => {
        if (!selectedId) return alert('Please select a name');
        setLoading(true);
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
        setLoading(false);
    };

    useEffect(() => {
        fetchParticipants();
    }, []);
const selected = participants.find(p => p.id === selectedId);

    return (
        <div className="screen  bg-white text-blue-dark">
            <Logo />
            <h1 className="text-2xl font-bold mb-4">Saturday Check In</h1>
            <InputField
                type='text'
                placeholder='Search Name'
  value={searchTerm}
                label=''
  onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="my-2">Select your name:</p>



            {/* <select
        className="w-full p-2 mb-4 text-black"
        onChange={(e) => setSelectedId(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select your name</option>

        {participants.map((p) => (
          <option key={p.id} value={p.id}>
            {p.full_name}
          </option>
        ))}
      </select> */}

            <div className='flex flex-col gap-2'>
                {/* {participants.map((p) => (
                    <ParticipantCard
                        key={p.id}
                        id={p.id}
                        name={p.full_name}
                        isSelected={selectedId === p.id}
                        onClick={(id) => setSelectedId(id)}
                    />

                ))} */}
                {filteredParticipants.map((p) => (
  <ParticipantCard
    key={p.id}
    id={p.id}
    name={p.full_name}
    isSelected={selectedId === p.id}
    onClick={(id) => setSelectedId(id)}
  />
))}

            </div>

            {isSaturday ? (
                <>
                    <button
                        className="w-full bg-green-600 py-2 rounded mb-2"
                        onClick={handleCheckIn}
  disabled={loading || selected?.has_checked_in}
                    >
                        {loading ? 'Checking in...' : 'Check In'}
                    </button>
                    <button
                        className="w-full bg-red-600 py-2 rounded"
                        onClick={handleCheckOut}
  disabled={loading || selected?.has_checked_in}
                    >
                        {loading ? 'Checking out...' : 'Check Out'}
                    </button>
                </>
            ) : (
                <p className="text-yellow-400 text-sm">Check-in is only available on Saturdays.</p>
            )}
        </div>
    );
};

export default CheckInPage;
