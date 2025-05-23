

type ButtonProps = {
  text: string;
}
const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className='bg-blue-dark hover:bg-blue-950 cursor-pointer text-white font-bold font-poppins py-2 px-4 rounded'
    >
      {text}    </button>)
}

export default Button