import React from 'react'

type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-poppins text-sm font-medium'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='border border-blue-dark px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-900 text-poppins text-blue-dark font-medium text-sm'
      />
    </div>
  );
};

export default InputField