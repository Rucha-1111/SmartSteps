const Button = ({ label, onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`rounded-2xl py-2 px-4 font-semibold ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;
