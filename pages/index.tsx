import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Hero } from "react-daisyui";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sansürsüz Sözlük</title>
        <meta name="description" content="Sansürsüz Sözlük" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero className="h-screen">
          <Hero.Overlay className="bg-opacity-50" />
          <Hero.Content className="text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-white">
                Sansürsüz Sözlük
              </h1>
              <p className="mt-2">
                Block Zinciri Teknolojisi ile üretilmiş, kontrol edilmeyen,
                <strong className="text-lg">
                  <i> sansürsüz sözlük.</i>
                </strong>
              </p>
              <Button color="primary" className="m-5" size="md">
                Meta Mask ile Giriş Yap
              </Button>
            </div>
          </Hero.Content>
        </Hero>
      </main>
    </div>
  );
};

export default Home;
