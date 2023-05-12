import { classNames } from '../utils'

const Button = ({
  size,
  children = 'Button Text',
  className,
}) => {
  if (size === 'large') {
    return (
      <button
        type="button"
        className={classNames(
          className,
          'rounded-md border-2 text-green-600 border-green-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:text-white active:bg-green-500'
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
        className,
        'rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:bg-green-600'
      )}
    >
      {children}
    </button>
  )
}

export default Button
