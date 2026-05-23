import { useLoaderData } from 'react-router-dom'
import { 
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
 } from 'chart.js';
import { Line } from 'react-chartjs-2';

const API_URL = import.meta.env.VITE_API_URL;


const Chart = () => {
  const weight_history = useLoaderData();
  // console.log(weight_history);
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Chart',
      },
    },
  };

//   const labels = weight_history.map(weight_instance => weight_instance.date);

  const labels = weight_history.map(w =>
    new Date(w.dateTime).toLocaleDateString()
    );

  const data = {
    labels,
    datasets: [
      {
        label: 'Weight',
        data: weight_history.map(weight_history => Number(weight_history.weight) ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  return (
    <div>
      {/* {weight_history.map(weight_instance => {
        return <h2 key={weight_instance.date}>{weight_instance.dateTime}</h2>
      })} */}

      <Line options={options} data={data} />
    </div>
  )
}
export default Chart

export const weightHistoryLoader = async ({params}) => {
  const weight_history = await fetch(`${API_URL}/api/Residents/GetWeightHistory?id=${params.id}`, {
    credentials: "include"
  });
  // return params.id;
  return weight_history.json();
}