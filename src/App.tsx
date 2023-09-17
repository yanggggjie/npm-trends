import Title from '@components/Title.js'
import Search from '@components/Search/Search.js'
import { useSearchParams } from 'react-router-dom'
import Tags from '@components/Tags.js'
import Downloads from '@components/Downloads/Downloads.js'

function Component() {
  const [searchParams, setSearchParams] = useSearchParams({
    libString: '',
  })

  const libString = searchParams.get('lib-string')
  const libList = libString ? libString.split('vs') : []
  function setLibList(libList: string[]) {
    if (libList.length === 0) return setSearchParams({ 'lib-string': '' })
    setSearchParams({ 'lib-string': libList.join('vs') })
  }

  function addToLibList(lib: string) {
    if (libList.includes(lib)) return
    setLibList([...libList, lib])
  }

  function removeFromLibList(lib: string) {
    if (!libList.includes(lib)) return
    setLibList(
      libList.filter((item) => {
        return item !== lib
      }),
    )
  }

  function removeAllFromLibList() {
    setLibList([])
  }

  return (
    <div>
      <Title></Title>
      <Search libList={libList} addToLibList={addToLibList}></Search>
      <Tags
        libList={libList}
        removeAllFromLibList={removeAllFromLibList}
        removeFromLibList={removeFromLibList}
      ></Tags>
      <Downloads libList={libList}></Downloads>
    </div>
  )
}

export default Component
