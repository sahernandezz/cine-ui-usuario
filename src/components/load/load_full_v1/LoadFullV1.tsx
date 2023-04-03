import Load from "../Load";

const LoadFullV1 = () => {

    const style: Object = {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10px",
    }

    return (
        <div style={style} className="my-8">
            <Load/>
        </div>
    )
}

export default LoadFullV1;