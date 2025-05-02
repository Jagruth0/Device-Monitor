import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function Temp(props) {

    if(props.loading) return <div>Loading...</div>;
    if(props.error) return <div>Error: {props.error}</div>;

    return (
        <div className='temp'>
            <p>Temp: {props.temp}'C</p>

            <div className="chart">
                <ResponsiveContainer width="90%" height={200}>
                    <LineChart data={props.temparr}>
                        <CartesianGrid stroke="" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis domain={[0,100]} tickFormatter={(tick)=> `${tick}'C`} />
                        <Tooltip formatter={(val)=> `${val}'C`}/>
                        <Line type="linear" isAnimationActive={false} dataKey="usage" stroke="#fff" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Temp