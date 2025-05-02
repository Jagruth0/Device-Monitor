
function Info(props) {
    

    if(props.loading) return <div>Loading...</div>;
    if(props.error) return <div>Error: {props.error}</div>;

    return (
        <div className="info">
            <h3>Device Info:</h3>
            <div>Model: Pi Zero 2W</div>
            <div>Platform: {props.info.platform}</div>
            <div>Architecture: Arch64</div>
            <div>CPU Count: {props.info.cpuno}</div>
            <div>Up Time: {props.info.uptime} sec</div>
            <div>Date: {props.info.locale}</div>
        </div>
    )
}

export default Info