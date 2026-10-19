import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 3200);
    return () => clearTimeout(t);
  }, []);

  if (loading || !minTimePassed) return <Loader />;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default Protected;