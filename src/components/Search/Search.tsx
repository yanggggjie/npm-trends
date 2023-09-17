import { clsx } from 'clsx'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import SuggestList from '@components/Search/SuggestList.js'
import * as React from 'react'
interface Props {
  libList: string[]
  addToLibList: (lib: string) => void
}

function Component({ libList, addToLibList }: Props) {
  const [searchText, setSearchText] = useState('vue')
  const [showSuggestList, setShowSuggestList] = useState(false)
  const debouncedSearchText = useDebounce(searchText, 500)

  function handleSearchTextChange(e) {
    setSearchText(e.target.value)
  }

  function handleSearchTextFocus() {
    setShowSuggestList(true)
  }
  function handleSearchTextBlur() {
    setShowSuggestList(false)
  }

  return (
    <div className={clsx('relative', 'p-2')}>
      <input
        className={clsx('w-96')}
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        onFocus={handleSearchTextFocus}
        onBlur={handleSearchTextBlur}
      />
      {showSuggestList && (
        <div
          className={clsx(
            'absolute bg-white z-10',
            'w-96 h-80 overflow-y-scroll',
          )}
        >
          <SuggestList
            libList={libList}
            addToLibList={addToLibList}
            searchText={debouncedSearchText}
          ></SuggestList>
        </div>
      )}
    </div>
  )
}

export default Component
