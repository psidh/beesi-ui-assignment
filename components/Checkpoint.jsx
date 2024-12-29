export default function Checkpoint({
  stepNumber,
  imageUrl,
  stepDescription,
  style,
  onMouseDown,
  onTouchStart,
}) {
  return (
    <div
      className="cursor-pointer text-[var(--primary-text-color)] bg-[var(--primary-color)] rounded-full p-4 flex flex-col items-center justify-evenly 
       h-40 w-40 absolute"
      style={style}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <img
        src={imageUrl}
        alt={`Image is about ${stepDescription}`}
        className="h-8 w-8"
      />
      <h1 className="font-semibold text-lg sm:text-base md:text-xl flex text-center">
        Step {stepNumber} <span>:</span>
      </h1>
      <p className="font-semibold text-sm sm:text-md text-center">
        {stepDescription}
      </p>
    </div>
  );
}
