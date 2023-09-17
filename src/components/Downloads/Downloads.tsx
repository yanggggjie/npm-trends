import useSWRInfinite from 'swr/infinite'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import globalFetcher from '@/globalFetcher.js'
import { zip } from 'lodash-es'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import index2color from '@/index2color.js'

interface Props {
  libList: string[]
}

function createRanges() {
  const ranges = []
  const end = dayjs()

  let left = dayjs('2015-01-10')
  let right = left.add(550, 'day')
  while (right.isBefore(end)) {
    ranges.push(`${left.format('YYYY-MM-DD')}:${right.format('YYYY-MM-DD')}`)
    left = right
    right = right.add(550, 'day')
  }
  ranges.push(`${left.format('YYYY-MM-DD')}:${end.format('YYYY-MM-DD')}`)

  return ranges
}

function Component({ libList }: Props) {
  const ranges = createRanges()

  function keyLoader(index) {
    return ranges.map((range) => {
      return `/proxy-npmjs-api` + `/downloads/range/${range}/${libList[index]}`
    })
  }

  function multiFetcher(urls: string[]) {
    return Promise.all(
      urls.map((url) => {
        return globalFetcher(url)
      }),
    )
  }
  const { setSize, isLoading, error, data } = useSWRInfinite(
    keyLoader,
    multiFetcher,
    {
      parallel: true,
    },
  )
  useEffect(() => {
    setSize(libList.length)
  }, [libList, setSize])

  if (isLoading) return <div>loading...</div>
  if (error) return <div>error</div>
  const downloadList = data.map((item) => {
    return item
      .map((item) => {
        return item.downloads
      })
      .flat()
      .filter((_, index) => {
        // 7天取一次
        return index % 100 === 0
      })
  })
  const tableData = zip(...downloadList).map((colItems) => {
    const newItem = {
      day: colItems[0].day,
    }
    colItems.forEach((colItem, index) => {
      console.log('colItem', colItem)
      newItem[libList[index]] = colItem.downloads
    })
    return newItem
  })
  console.log('tableData', tableData)
  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={tableData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {libList.map((lib, index) => {
          return (
            <Line
              type="monotone"
              dataKey={lib}
              stroke={index2color(index)}
              activeDot={{ r: 8 }}
            />
          )
        })}
      </LineChart>
    </div>
  )
}

export default Component
