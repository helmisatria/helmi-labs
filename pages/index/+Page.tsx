import { Link } from "@/components/Link";

export default Page;

const projects = [
  { title: "Face Matching Recognition", img: "", href: "/face-matching" },
  { title: "Face Emotion Recognition", img: "", href: "/face-expression" },
];

function Page() {
  return (
    <article className="max-w-lg mx-auto pt-24">
      <h1 className="text-lg tracking-tighter font-serif text-stone-800">
        Experiments
      </h1>
      <p className="text-sm text-stone-600 mt-2">
        This project started out of curiosity about rebuilding the face
        recognition system of Garuda ID from PSSI (Indonesia).
      </p>

      <ul className="mt-12 flex flex-wrap gap-10">
        {projects.map((project) => {
          return (
            <li key={project.href} className="flex flex-col flex-1">
              <Link href={project.href}>
                <h2 className="font-serif text-base text-stone-800">
                  {project.title}
                </h2>
                <div className="w-full h-36 border border-amber-800 border-opacity-20 mt-3 rounded-lg">
                  <img src="" alt="" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
