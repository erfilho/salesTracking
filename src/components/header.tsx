interface HeaderProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

const Header = ({ title, bgColor, textColor, icon }: HeaderProps) => {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-purple-1"} ${textColor ? textColor : "text-white"} flex h-16 w-full flex-row items-center justify-center`}
    >
      <p className="flex w-full flex-row items-center justify-center gap-2 text-xl font-semibold">
        {" "}
        {title} {icon}{" "}
      </p>
    </div>
  );
};

export default Header;
