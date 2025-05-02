
function Process(props) {
    
    if(props.loading) return <div>Loading...</div>;
    if(props.error) return <div>Error: {props.error}</div>;

    return (
        <div className="process">
            <table>
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>CPU %</th>
                        <th>Memory %</th>
                        <th>cmd</th>
                        <th>Up Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.process.map((ele,ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ele.PID}</td>
                                <td>{ele["%CPU"]}</td>
                                <td>{ele["%MEM"]}</td>
                                <td>{ele.COMMAND}</td>
                                <td>{ele.START}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Process