import GradientWaves from "./GradientWaves";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <div className="auth-bg">
      <GradientWaves
        horizonColor="#0a4d8c"
        waveColor="#00a8ff"
        crestColor="#ffffff"
        backgroundColor="#0b0d12"
        speed={0.35}
        amplitude={2.5}
        relief={1}
        lightAngle={120}
        quality="medium"
        dpr={1.5}
        mouseInteraction
        swellOnClick
      />
    </div>
    <div className="auth-content">{children}</div>
  </div>
);

export default AuthLayout;