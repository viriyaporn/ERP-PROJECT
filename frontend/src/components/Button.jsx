import React from 'react'

export default function Button({
  className,
  type = 'button',
  variant = 'default',
  onClick,
  label,
  children,
  ...props
}) {
  const baseClassName = "text-sm px-3 sm:px-4 py-2 ring-opacity-50 active:ring-2 active:ring-offset-1"
  const variants = {
    success: 'bg-lime-500 hover:bg-lime-600 active:bg-lime-700 text-black ring-lime-600',
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white ring-blue-600',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-700 text-white ring-red-600',
    warning: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white ring-orange-600',
    info: 'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white ring-cyan-500',
    secondary: 'bg-gray-400 hover:bg-blue-300 active:bg-blue-500 text-black ring-blue-300',
    light: 'bg-white hover:bg-gray-200 active:bg-gray-300 text-black ring-gray-200',
    default: 'bg-sky-200 hover:bg-sky-300 active:bg-sky-400 text-black ring-sky-300',
  };

  className = typeof className === 'string' ? className.split(' ') : className ?? [];
  className = [...baseClassName.split(' '), ...variants[variant].split(' '), ...className].join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      {...props}
    >
      {children ?? (typeof label === 'function' ? label() : label)}
    </button>
  )
}
