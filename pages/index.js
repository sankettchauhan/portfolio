import Head from "next/head";

import Welcome from "../components/1. welcome/Welcome";
import Intro from "../components/2. intro/Intro";
import Nav from "../components/nav/Nav";
import WorkEx from "../components/4. workex/WorkEx";
import Projects from "../components/3. projects/Project";
import Footer from "../components/footer/Footer";
import Contact from "../components/contact/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <section>
        <Nav home />
        <Welcome />
        <Intro />
        <Projects />
        <WorkEx />
        <Contact />
        <Footer />
      </section>
    </>
  );
}
