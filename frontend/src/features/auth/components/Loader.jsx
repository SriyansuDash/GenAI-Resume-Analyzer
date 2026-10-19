import CrystalizedBall from "./CrystalizedBall";
import "./CrystalizedBall.css";

const Loader = () => (
    <main
        style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            background: "#0b0d12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <div style={{ width: "100%", maxWidth: "400px", height: "400px", position: "relative" }}>
            <CrystalizedBall
                preset="plasma"
                color="#0080bb"
                size={0.8}
                crackle={0.85}
                fill={0.5}
                interactive
                hoverStrength={0.7}
            />
            <p style={{textAlign: "center", font: "bolder" , fontSize:"x-large"}}>Loading...</p>
        </div>
    </main>
);

export default Loader;