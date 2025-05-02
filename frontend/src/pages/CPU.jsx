import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function CPU(props) {

    if(props.loading) return <div>Loading...</div>;
    if(props.error) return <div>Error: {props.error}</div>;

    return (
        <div className="cpuusage">
            <p>CPU Usage: {props.cpu}%</p>

            <div className="chart">
                <ResponsiveContainer width="90%" height={200}>
                    <LineChart data={props.cpuarr}>
                        <CartesianGrid stroke="" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis domain={[0,100]} tickFormatter={(tick)=> `${tick}%`} />
                        <Tooltip formatter={(val)=> `${val}%`}/>
                        <Line type="linear" isAnimationActive={false} dataKey="usage" stroke="#fff" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CPU