import React, { useState, useEffect } from "react";
import { auth } from "@/app/lib/auth";
import { getRoutesByUser } from "@/app/lib/route";
import Mapa from "./map"; // Asumiendo que Mapa es el componente del mapa que creamos en la segunda parte

const RutasDelUsuario = () => {
  const [session, setSession] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndRoutes = async () => {
      try {
        const session = await auth();
        setSession(session);
        
        if (session && session.user) {
          const userRoutes = await getRoutesByUser(session.user.email);
          setRoutes(userRoutes);
        }
      } catch (error) {
        console.error("Error fetching session or routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndRoutes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>Please log in to see your routes.</div>;

  return <Mapa routes={routes} />;
};

export default RutasDelUsuario;
