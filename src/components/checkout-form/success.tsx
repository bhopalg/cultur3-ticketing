export default function Success() {
  return (
    <div className="bg-opacity-50 flex items-center justify-center z-50 mt-6">
      <div className="bg-white rounded-lg p-8 mx-4 text-center animate-slideUp">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Success! 🌟</h2>
        <p className="text-gray-600 mb-4">
          You have successfully brought a ticket!
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please check your email for confirmation and further details.
        </p>
      </div>
    </div>
  );
}
