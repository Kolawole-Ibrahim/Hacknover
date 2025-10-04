import { type ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
};

const Button = ({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  disabled = false,
  type = "button",
  title,
}: ButtonProps) => {
  const baseClasses = `
    relative overflow-hidden group
    inline-flex items-center justify-center gap-2
    font-medium transition-all duration-300 ease-out
    rounded-xl border backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    transform hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-blue-700 
      border-transparent text-white shadow-lg shadow-blue-500/25
      hover:shadow-xl hover:shadow-blue-500/40
      focus:ring-blue-500
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:to-blue-600 
      before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
    `,
    secondary: `
      bg-gradient-to-r from-gray-500 to-gray-700 
      border-transparent text-white shadow-lg shadow-gray-500/25
      hover:shadow-xl hover:shadow-gray-500/40
      focus:ring-gray-500
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-400 before:to-gray-600 
      before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
    `,
    outline: `
      bg-transparent border-2 border-blue-600 text-blue-600
      hover:bg-blue-50 hover:border-blue-700
      focus:ring-blue-500
      backdrop-blur-md
    `,
    ghost: `
      bg-white/5 border-white/10 text-white/90
      hover:bg-white/10 hover:text-white hover:border-white/20
      focus:ring-white/30
      backdrop-blur-md
    `,
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {icon && (
          <span className="transition-transform group-hover:scale-110">
            {icon}
          </span>
        )}
        {children}
      </span>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-xl -z-10" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} title={title}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
      title={title}
    >
      {content}
    </button>
  );
};

export default Button;
