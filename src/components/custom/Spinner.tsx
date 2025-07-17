function Spinner() {
  return (
    <div className="flex items-center justify-center mt-8">
      <svg
        className="animate-spin h-10 w-10 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 0112 20v-4a4.002 4.002 0 00-3.07-3.93l-2.07 2.07zM20 12a8.003 8.003 0 01-6.93 7.07l2.07-2.07A4.002 4.002 0 0020 12h4zM12 20a8.003 8.003 0 01-7.07-6.93l2.07-2.07A4.002 4.002 0 0012 16v4zM12 4a8.003 8.003 0 016.93 7.07l-2.07-2.07A4.002 4.002 0 0012 8V4z"
        ></path>
      </svg>
    </div>
  );
}

export default Spinner;
