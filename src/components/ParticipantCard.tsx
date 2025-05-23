
type ParticipantCardProps = {
    id: string;
    name: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

const ParticipantCard = ({ id, name, isSelected, onClick }: ParticipantCardProps) => {
    return (
        <div
            onClick={() => onClick(id)}

            className={`cursor-pointer rounded-lg p-2 shadow-md border ${isSelected ? 'border-blue-dark' : 'border-transparent'
                } bg-background hover:bg-surface transition`}>
            <p className="font-poppins text-sm text-blue-dark font-medium">{name}</p>
        </div>
    )
}

export default ParticipantCard

