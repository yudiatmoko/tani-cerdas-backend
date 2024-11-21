const Alert = ({ message, type }) => {
  const alertClasses = {
    success: "text-green-700 bg-green-100 border-green-400",
    error: "text-red-700 bg-red-100 border-red-400",
    loading: "text-blue-700 bg-blue-100 border-blue-400",
  };

  return (
    message && (
      <div className={`mb-4 p-4 ${alertClasses[type]} border rounded`}>
        {message}
      </div>
    )
  );
};

export default Alert;