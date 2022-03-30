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
        <title>Sanket Chauhan - Front End Web Developer Portfolio</title>
        {/* Search Engine */}
        <meta
          name="description"
          content="Web developer. I am a self taught web developer who writes optimized code for responsive websites. Javascript. React.js. Node.js. Django. Python. And counting. "
        />
        <meta
          name="keywords"
          content="portfolio,, developer, sanket, chauhan, reactjs, javascript, web, nodejs, django"
        />

        {/* OG - Open Graph Protocol */}
        <meta
          property="og:title"
          content="Sanket Chauhan | Front End Web Developer"
        />
        <meta
          property="og:description"
          content="I am a self taught web developer who writes optimized code for responsive websites. Javascript. React.js. Node.js. Django. Python. And counting."
        />
        <meta property="og:image" content="./assets/images/sanket.webp" />
        <meta property="og:url" content="https://sanketchauhan.me/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="website" />
        <meta
          name="twitter:title"
          content="Sanket Chauhan - Front End Web Developer"
        />
        <meta
          name="twitter:description"
          content="I am a self taught web developer who writes optimized code for responsive websites. Javascript. React.js. Node.js. Django. Python. And counting."
        />
        <meta name="twitter:image" content="./assets/images/sanket.webp" />
        <meta name="twitter:creator" content="chauhan4_sanket" />

        <meta name="author" content="Sanket Chauhan" />
        <link rel="icon" href="favicon.ico" />
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
