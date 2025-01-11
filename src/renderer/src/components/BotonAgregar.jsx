const BotonAgregar = ({ label, onClick }) => (
    <button
        className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
        onClick={onClick}
    >
        {label} +
    </button>
);

export default BotonAgregar
