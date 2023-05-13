import { classNames } from '../utils'

const Button = ({
  size,
  children = 'Button Text',
  className,
  ...args
}) => {
  if (size === 'large') {
    return (
      <button
        {...args}
        type="button"
        className={classNames(
          'rounded-md border-2 text-green-600 border-green-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:text-white active:bg-green-500  w-48 h-12',
          className
        )}
      >
        {children}
      </button>
    )
  }

  if (size === 'medium') {
    return (
      <button
        {...args}
        type="button"
        className={classNames(
          'rounded-md border-2 text-gray-600 border-gray-400 px-3.5  text-sm font-semibold shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 hover:text-white active:bg-gray-600  w-48 h-9',
          className
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={classNames(
        'rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:bg-green-600 w-36 h-9',
        className
      )}
      {...args}
    >
      {children}
    </button>
  )
}

export default Button
