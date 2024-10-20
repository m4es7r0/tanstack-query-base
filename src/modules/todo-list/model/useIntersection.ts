import { useCallback, useRef } from "react"

export const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => { })

  return useCallback(
    (element: HTMLElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect()
          }
        })
      })

      if (element) {
        observer.observe(element)
        unsubscribe.current = () => observer.disconnect()
      } else {
        unsubscribe.current()
      }
    },
    [],
  )
}