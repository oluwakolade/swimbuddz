import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

type ParticipantCardProps = {
    id: string;
    name: string;
    isSelected: boolean;
    onClick: (id: string) => void;
    isRegistered?: boolean;
    hasCheckedIn?: boolean;
    hasCheckedOut?: boolean;
};

const ParticipantCard = ({
    id,
    name,
    isSelected,
    onClick,
    isRegistered,
    hasCheckedIn,
    hasCheckedOut,
}: ParticipantCardProps) => {
    const bgColor = isSelected
        ? 'bg-blue-950'
        : hasCheckedOut
            ? 'bg-red-300'
            : hasCheckedIn
                ? 'bg-green-300'
                : isRegistered ? 'bg-green-600' : 'bg-background';

    const icon = hasCheckedOut ? (
        <HiXCircle className="h-5 w-5 text-red-500" />
    ) : hasCheckedIn ? (
        <HiCheckCircle className="h-5 w-5 text-green-600" />
    ) : null;

    return (



        <div
            onClick={() => onClick(id)}
            className={`cursor-pointer rounded-lg p-2 shadow-md  ${bgColor}
     
 hover:bg-blue-dark transition flex flex-row items-center justify-between`}
        >
            <p className="font-poppins text-sm text-white font-medium">{name}</p>
            {icon && <div>{icon}</div>}

        </div>
    );
};

export default ParticipantCard;
