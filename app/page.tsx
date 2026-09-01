import HeroBanner from "@/components/hero-banner";
import MoiveGrid from "@/components/movie-grid";
import PageHeader from "@/components/page-header";
import { MovieType } from "@/types/global";

async function fetchlist(path:"popular"|"upcoming"):Promise<MovieType[]>{
  const res=await fetch(`https://api.themoviedb.org/3/movie/${path}`,{
    headers:{
      Authorization:`Bearer ${process.env.TMDB_TOKEN}`
    },
});
    const data=await res.json();
    return data.results??[];
}

export default async function Home(){
  const [popular,upcoming]=await Promise.all([
    fetchlist("popular"),
    fetchlist("upcoming"),
  ]);
  const [featured,...restPopular]=popular;
  return (
    <div>
      <h1 className="sr-only">Next Movie</h1>
      {featured&&<HeroBanner movie={featured}/>}
      <section>
        <PageHeader
        as="h2"
        eyebrow="In rotation"
        title="Popular now"
        description="What people are watching with this week."
        />
        <MoiveGrid movies={restPopular}/>
      </section>
      <section className="mt-12 sm:mt-16">
        <PageHeader
          as="h2"
        eyebrow="Coming soon"
        title="Upcoming"
        description="Titles headed to screens next."
        />
        <MoiveGrid movies={upcoming}/>
      </section>
    </div>
  );
}