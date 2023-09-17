import { clsx } from 'clsx'
import { ImCross } from 'react-icons/im/index.js'
import { AiFillDelete } from 'react-icons/ai/index.js'
interface Props {
  libList: string[]
  removeAllFromLibList: () => void
  removeFromLibList: (lib: string) => void
}

function Component({
  libList,
  removeFromLibList,
  removeAllFromLibList,
}: Props) {
  return (
    <div className={clsx('p-2', 'flex flex-row flex-wrap gap-3')}>
      {libList.map((lib) => {
        return (
          <div
            key={lib}
            className={clsx('p-2 outline', 'flex flex-row items-center gap-2')}
          >
            <span> {lib}</span>
            <span
              onClick={() => {
                removeFromLibList(lib)
              }}
            >
              <ImCross></ImCross>
            </span>
          </div>
        )
      })}

      <div
        onClick={() => {
          removeAllFromLibList()
        }}
        className={clsx('p-2 outline', 'flex flex-row items-center gap-2')}
      >
        <span>clear</span>
        <span>
          <AiFillDelete></AiFillDelete>
        </span>
      </div>
    </div>
  )
}

export default Component
