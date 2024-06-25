import { twMerge } from 'tailwind-merge'

import { WrapperProps } from './types'

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return (
    <div
      className={twMerge(
        'mx-auto h-full w-full max-w-[1568px] px-8',
        props.className,
      )}
    >
      {children}
    </div>
  )
}

export default Wrapper
