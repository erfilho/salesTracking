interface alertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAlert = ({ title, message, onConfirm, onCancel }: alertProps) => {
  return (
    <div className="bg-dark-1/50 fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-dark-1 w-[90%] max-w-md rounded-xl p-6 text-center text-white shadow-lg"
        role="alert"
      >
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="mb-4 text-lg">{message}</p>
        <div className="mt-4 flex justify-around space-x-4">
          <button
            onClick={onConfirm}
            className="cursor-pointer rounded bg-blue-700 px-4 py-2 text-lg text-white hover:bg-blue-800"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="cursor-pointer rounded bg-gray-600 px-4 py-2 text-lg text-white hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
