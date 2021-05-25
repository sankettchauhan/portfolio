import Head from "next/head";

import Welcome from "@components/1. welcome/Welcome";
import Intro from "@components/2. intro/Intro";
import Nav from "@components/nav/Nav";
import WorkEx from "@components/4. workex/WorkEx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <div>
        <Nav />
        <Welcome />
        <Intro />
        <WorkEx />
      </div>
    </>
  );
}
