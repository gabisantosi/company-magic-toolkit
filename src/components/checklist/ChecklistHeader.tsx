const ChecklistHeader = () => {
  return (
    <div className="relative">
      <div className="relative text-center max-w-3xl mx-auto animate-fade-in">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/80 to-transparent rounded-3xl blur-3xl opacity-30 transform -translate-y-8" />
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent mb-6">
          Start Your Business Checklist
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Follow these steps systematically to establish your business in Sweden correctly.
        </p>
      </div>
    </div>
  );
};

export default ChecklistHeader;