export default function SelectBox({
  name,
  id = null,
  className,
  children,
  ...props
}) {
  className = [
    'block',
    'w-full',
    'rounded-lg',
    'border',
    'border-slate-200',
    'py-1',
    'hover:border-blue-500',
    'focus:outline-none',
    'focus:ring',
    'focus:ring-blue-500/40',
    'active:ring',
    'active:ring-blue-500/40',
    'text-gray-800',
    'placeholder:font-extralight',
    'placeholder:text-gray-400',
    'placeholder:text-sm',
    // 'dark:bg-transparent',0
    'dark:bg-gray-700',
    'dark:border-gray-500',
    'dark:text-white',
    className,
  ].join(' ')

  props = {
    name: name,
    className,
    ...props
  };

  if (id) props.id = id;

  return <select {...props}>{children}</select>
}