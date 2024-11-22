const ChecklistHeader = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
          alt="Swedish landscape"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative text-center max-w-3xl mx-auto mb-12 animate-fade-in py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-swedish-blue mb-6">
          Start Your Business Checklist
        </h1>
        <p className="text-xl text-gray-600">
          Follow these steps systematically to establish your business in Sweden correctly.
        </p>
      </div>
    </div>
  );
};

export default ChecklistHeader;