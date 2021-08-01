import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? true : !!value
// 在一个函数中，改变传入的对象本身是不好的
export const clearnObject = (object: object) => {
  const result = { ...object }
  Object.keys(object).forEach(key => {
    // @ts-ignore
    const value = object[key]
    // 0
    if (!isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })

  return result
}

export const useMount = (cb : () => void) => {
  useEffect(() => {
    cb()
  },[])
}

// export const debounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       func()
//     }, delay);
//   }
// }

// const log = debounce(() => console.log('call'), 5000)

// log()
// log()
// log()

// 用泛型来推断类型
export const useDebounce = (value: unknown, delay?: number):any => {
  const [deboucedValue, setDeboudcedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDeboudcedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return deboucedValue
}