const ChecklistHeader = () => {
  return (
    <div className="relative">
      <div className="relative text-center max-w-3xl mx-auto animate-fade-in">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/80 to-transparent rounded-3xl blur-3xl opacity-30 transform -translate-y-8" />
        <div className="relative group backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,106,167,0.2)] transition-all duration-500 before:absolute before:inset-0 before:rounded-2xl before:transition-all before:duration-500 before:opacity-0 before:bg-gradient-to-r before:from-swedish-blue/5 before:via-accent/10 before:to-swedish-yellow/5 group-hover:before:opacity-100 before:animate-pulse">
          <div className="absolute inset-[-2px] bg-gradient-to-r from-swedish-blue/10 via-accent/5 to-swedish-yellow/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105"></div>
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent mb-6 [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:[text-shadow:_0_4px_8px_rgb(0,106,167,0.2)]">
              Start Your Business Checklist
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto transform transition-all duration-300 group-hover:translate-y-[-2px] group-hover:text-gray-700">
              Follow these steps systematically to establish your business in Sweden correctly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistHeader;