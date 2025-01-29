import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

function UnderlineText({children,className}:{children:ReactNode,className?:string}) {
  return (
   <span className={cn("underline underline-offset-4 decoration-dashed decoration-sky-400 ",className)}>
    {children}
   </span>
  )
}

export default UnderlineText
