const CircularProgress = ({ progress }) => {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the stroke-dashoffset based on progress
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex  justify-center items-center">
      <svg
        className="rotate-90"
        width="120"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb" // Light gray color for the background circle
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={`${progress >= 30 ? "#10b981":"#FF0000"}` }
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className={`absolute text-center font-bold text-xl ${progress >= 30 ? "text-green-500" :"text-red-500"} `}>
        {progress}%
      </div>
    </div>
  );
};

export default CircularProgress;
