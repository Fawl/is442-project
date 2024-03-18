import { LineChart as RechartsLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// const data = [{
//     "name": "Page A",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   }];

export default function LineChart({data}: any) {

    return(
    <div className='mt-3 text-center sm:ml-0 sm:mt-0 sm:text-left border rounded-lg border-gray-300 p-4 shadow-md'>
      <p className='mb-5'>
        Event Sales Dashboard
      </p>
      <ResponsiveContainer width="99%" height={400}>
      <RechartsLineChart id="id" width={730} height={400} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="orange" />
      </RechartsLineChart>
      </ResponsiveContainer>
    </div>
    )
}




