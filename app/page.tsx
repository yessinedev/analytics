import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to My Analytics SDK</h1>
      <p className="mt-4 text-lg">
        This is a simple analytics SDK built with Next.js and MongoDB.
      </p>
      <Image
        src="/analytics.png"
        alt="Analytics Image"
        width={500}
        height={300}
        className="mt-6 rounded-lg"
      />
      <p className="mt-4">
        Explore the code to see how it works!
      </p>
    </div>
  );
}
