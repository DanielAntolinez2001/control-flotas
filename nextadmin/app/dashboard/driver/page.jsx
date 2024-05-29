"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/app/auth";
import { getRoutesByUser } from "@/app/lib/route";
import Mapa from "./(map)/map";

const RutasDelUsuario = () => {
  const [session, setSession] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndRoutes = async () => {
      try {
        const session = await auth(); // Ensure auth() is a valid async function
        setSession(session);

        if (session?.user?.email) {
          // Check if session, user, and email exist
          const userRoutes = await getRoutesByUser(session.user.email);
          setRoutes(userRoutes);
        }
      } catch (error) {
        console.error("Error fetching session or routes:", error);
        // Handle the error appropriately (e.g., display an error message to the user)
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndRoutes();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) return <div>Loading...</div>;

  if (!session || !session.user) {
    return <div>Please log in to see your routes.</div>;
  }

  // If everything is successful, render the map with the routes
  return <Mapa routes={routes} />;
};

export default RutasDelUsuario;
