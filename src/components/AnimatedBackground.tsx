const AnimatedBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
    {/* Animated pill shapes */}
    <div className="absolute left-[-10%] top-[10%] w-[600px] h-[200px] rounded-full bg-gradient-to-r from-[#a084e8] to-transparent opacity-30 blur-2xl animate-moveX" />
    <div className="absolute right-[-10%] top-[30%] w-[500px] h-[150px] rounded-full bg-gradient-to-l from-[#635985] to-transparent opacity-20 blur-2xl animate-moveY" />
    <div className="absolute left-[20%] bottom-[5%] w-[700px] h-[220px] rounded-full bg-gradient-to-r from-[#fff] to-[#a084e8] opacity-10 blur-3xl animate-moveXrev" />
  </div>
);

export default AnimatedBackground; 