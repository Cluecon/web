import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {faker} from '@faker-js/faker'
import styles from '../../../styles/EventDashboard.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const LineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total sales this week',
    },
  },
}

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sartuday', 'Sunday']

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Seconday Sales',
      data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const SalesChart = () => {
  return (
    <>
      <div className={styles.lineChart}>
        <Line options={LineOptions} data={data} />
      </div>
    </>
  )
}

export default SalesChart
