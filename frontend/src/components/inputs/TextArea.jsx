export default function TextArea({
  name,
  id = null,
  className,
  value,
  ...props
}) {
  className = [
    'rounded-lg',
    'border',
    'border-slate-200',
    'px-3',
    'py-1',
    'hover:border-blue-500',
    'focus:outline-none',
    'focus:ring',
    'focus:ring-blue-500/40',
    'active:ring',
    'active:ring-blue-500/40',
    'placeholder:font-extralight',
    'placeholder:text-gray-400',
    'placeholder:text-sm',
    'dark:bg-gray-700',
    'dark:border-gray-500',
    'dark:text-white',
    className,
  ].join(' ')

  props = {
    name,
    className,
    value,
    ...props
  };

  if (id) props.id = id;

  return <textarea {...props}/>
}