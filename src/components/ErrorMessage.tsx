const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <>
      <h3 className="mb-3 mt-4 text-gray-500 text-2xl font-bold">⚠️ Invalid Pokemon Data ⚠️</h3>
      <p className="mb-4 mt-3 text-gray-500 text-xl font-bold">{message}</p>
    </>
  );
};

export default ErrorMessage;
