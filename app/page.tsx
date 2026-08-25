import Link from "next/link";

export default function Home(){
  return <main>
    <meta httpEquiv="refresh" content="0; url=/roadmaps/water"/>
    <p>Opening the <Link href="/roadmaps/water">Water roadmap</Link>…</p>
  </main>;
}
