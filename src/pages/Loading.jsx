import { Spinner } from "../ui/Spinner";

function Loading({
  size,
  color,
  className = "flex flexCenter g-center h-100",
}) {
  return (
    <div className={className}>
      <Spinner size={size} color={color} />
    </div>
  );
}

export default Loading;
