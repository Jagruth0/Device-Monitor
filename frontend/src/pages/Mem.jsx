import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function Mem(props) {

    if(props.loading) return <div>Loading...</div>;
    if(props.error) return <div>Error: {props.error}</div>;

    return (
        <div className="memo">
            <p>Free Memory: {props.freemem}/{props.totalmem}MB</p>

            <div className="chart">
                <ResponsiveContainer width="90%" height={200}>
                    <LineChart data={props.memarr}>
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

export default Mem