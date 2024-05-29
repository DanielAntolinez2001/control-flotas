import { useRouter } from "next/router";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard"); // Redirect immediately
  }, [router]); // Dependency on router to prevent infinite loop

  // This content won't be rendered, but it's good practice to include it
  return <div>Redirecting...</div>;
};

export default Homepage;
