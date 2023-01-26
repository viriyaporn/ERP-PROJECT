export default function Switch({
  type = 'checkbox',
  variant = 'primary',
  size = 'md',
  label,
  name,
  id = null,
  inputClassName,
  switchClassName,
  onChange,
  value,
  ...props
}) {
  const switchSize = (() => {
    switch (size) {
      case 'sm': return 'w-9 h-5';
      case 'md': return 'w-11 h-6';
      case 'lg': return 'w-14 h-7';
      default: return 'w-11 h-6';
    }
  })();

  const baseClassName = `${switchSize} bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`;

  const variants = {
    success: 'peer-focus:ring-green-300 peer-checked:bg-green-600 dark:peer-focus:ring-green-800',
    primary: 'peer-focus:ring-blue-300 peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800',
    danger: 'peer-focus:ring-red-300 peer-checked:bg-red-600 dark:peer-focus:ring-red-800',
    warning: 'peer-focus:ring-orange-300 peer-checked:bg-orange-600 dark:peer-focus:ring-orange-800',
    info: 'peer-focus:ring-cyan-300 peer-checked:bg-cyan-600 dark:peer-focus:ring-cyan-800',
  };

  switchClassName = typeof switchClassName === 'string' ? switchClassName.split(' ') : switchClassName ?? [];
  switchClassName = [...baseClassName.split(' '), ...variants[variant].split(' '), ...switchClassName].join(' ');

  props = {
    id,
    name,
    type: type,
    value,
    onChange,
    ...props
  };

  return (
    <label htmlFor={props.id || ''} className="inline-flex relative items-center cursor-pointer">
      <input {...props} className={`sr-only peer ${inputClassName}`} />
      <div className={switchClassName}></div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{typeof label === 'function' ? label() : label}</span>
      )}
    </label>
  )
}