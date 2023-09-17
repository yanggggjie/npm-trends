import { clsx } from 'clsx'
import * as QueryString from 'qs'
import sortObject from '@/utils/sortObject.js'
import useSWR from 'swr'
import * as React from 'react'
interface Props {
  searchText: string
  libList: string[]
  addToLibList: (lib: string) => void
}

function Component({ libList, searchText, addToLibList }: Props) {
  const url =
    '/proxy-npmjs-registry' +
    '/-/v1/search?' +
    QueryString.stringify(
      sortObject({
        text: searchText,
        size: 20,
      }),
    )
  const { isLoading, error, data } = useSWR(url)
  if (isLoading) return <div>loading...</div>
  if (error) return <div>error</div>
  const suggestLibList = data.objects.map((item) => {
    return {
      name: item.package.name,
      description: item.package.description,
    }
  })
  const filteredExistLibList = suggestLibList.filter((item) => {
    return !libList.includes(item.name)
  })

  function handleMouseDown(libName: string) {
    addToLibList(libName)
  }
  return (
    <div className={clsx('space-y-2')}>
      {filteredExistLibList.map((lib) => {
        return (
          <div
            key={lib.name}
            className={clsx('hover:bg-gray-200')}
            onMouseDown={() => {
              handleMouseDown(lib.name)
            }}
          >
            <div className={clsx('font-bold text-xl')}>{lib.name}</div>
            <div className={clsx('')}>{lib.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Component
