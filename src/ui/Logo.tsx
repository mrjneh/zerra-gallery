type LogoProps = {
  color?: "white" | undefined; // optional, only "white" is allowed
};

export default function Logo({ color }: LogoProps) {
  return (
    <img
      src={`/Logo${color === "white" ? "White" : ""}.png`}
      alt="logo"
      className="w-full h-full object-contain mx-auto"
    />
  );
}
