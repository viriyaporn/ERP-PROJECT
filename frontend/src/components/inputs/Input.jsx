export default function Input({
  type = 'text',
  name,
  id = null,
  className,
  ...props
}) {
  className = [
    type === 'file' ? 'rounded-full' : 'rounded-lg',
    type === 'file' ? 'px-1' : '',
    'block',
    'w-full',
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
    'file:outline-none',
    'file:text-sm',
    'file:mr-4',
    'file:py-2',
    'file:px-4',
    'file:rounded-full',
    'file:border-0',
    'file:text-sm',
    'file:font-semibold',
    'placeholder:font-extralight',
    'placeholder:text-gray-400',
    'placeholder:text-sm',
    // 'dark:bg-transparent',
    'dark:bg-gray-700',
    'dark:border-gray-500',
    'dark:text-white',
    'dark:read-only:text-gray-400',
    'dark:read-only:bg-gray-800',
    'dark:read-only:border-gray-700',
    'p-5',
    className,
  ].join(' ')

  props = {
    type: type,
    name: name,
    className,
    ...props
  };

  if (id) props.id = id;

  return <input {...props} />
}