import { cn } from "@/lib/utils";
import bgUrl from "@/assets/bg.png";
import { Link } from "@/components/Link";

const navigations = [
  {
    name: "Face Matching Recognition",
    href: "/face-matching",
  },
  {
    name: "Face Expression Recognition",
    href: "/face-expression",
  },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <div
      id="sidebar"
      className={cn(
        "lg:py-5 w-full lg:items-end lg:pr-14 xl:pr-20 flex relative flex-col",
        className
      )}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b to-80% from-[rgba(253,249,233,0)] to-[#FEFAEA]"></div>
      <div className="relative">
        <div className="px-5">
          <Link href="/" className="items-center inline-flex gap-x-1 mt-8">
            <span className="w-3 h-3">
              <img src={"/favicon.png"} alt="icon" width={12} height={12} />
            </span>
            <span className="text-sm font-serif tracking-tight text-amber-800">
              Helmi Labs
            </span>
          </Link>

          <h2 className="lg:text-4xl text-2xl font-serif tracking-tight text-stone-700 mt-3 lg:mt-12">
            Helmi Satria.
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Experienced Software Engineer, <br /> currently{" "}
            <a
              href="https://www.linkedin.com/in/helmisatria"
              className="underline inline-flex items-center gap-x-1"
            >
              open to work
              <LinkIcon />
            </a>
          </p>
        </div>

        <nav className="lg:mt-[8.75rem] mt-6">
          <Link
            href="/"
            className="px-5 text-[0.5rem] tracking-[0.16rem] font-bold text-stone-400"
          >
            EXPERIMENTS
          </Link>

          <ul className="flex px-5 overflow-auto flex-row gap-x-3 mt-1 lg:mt-4 lg:flex-col gap-y-1 font-serif tracking-tighter text-sm lg:text-xl">
            {navigations.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className="data-[active]:text-stone-950 text-stone-500 relative group flex items-center"
                >
                  <div className="absolute group-data-[active]:opacity-100 opacity-0 left-0 w-full -bottom-px lg:bottom-auto lg:-left-3 rounded-full h-[3px] lg:w-[3px] lg:h-[22px] bg-amber-800"></div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function LinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66488 6.54C4.56552 6.64663 4.51143 6.78767 4.514 6.93339C4.51657 7.07912 4.57561 7.21816 4.67867 7.32122C4.78173 7.42428 4.92077 7.48331 5.06649 7.48588C5.21222 7.48845 5.35325 7.43436 5.45988 7.335L9.37488 3.42V4.6875C9.37488 4.83668 9.43415 4.97976 9.53964 5.08525C9.64513 5.19074 9.7882 5.25 9.93738 5.25C10.0866 5.25 10.2296 5.19074 10.3351 5.08525C10.4406 4.97976 10.4999 4.83668 10.4999 4.6875V2.0625C10.4999 1.91332 10.4406 1.77024 10.3351 1.66475C10.2296 1.55926 10.0866 1.5 9.93738 1.5H7.31238C7.1632 1.5 7.02013 1.55926 6.91464 1.66475C6.80915 1.77024 6.74988 1.91332 6.74988 2.0625C6.74988 2.21168 6.80915 2.35476 6.91464 2.46025C7.02013 2.56574 7.1632 2.625 7.31238 2.625H8.57988L4.66488 6.54Z"
        fill="#57534E"
      />
      <path
        d="M2.625 5.0625C2.625 4.545 3.045 4.125 3.5625 4.125H5.25C5.39918 4.125 5.54226 4.06574 5.64775 3.96025C5.75324 3.85476 5.8125 3.71168 5.8125 3.5625C5.8125 3.41332 5.75324 3.27024 5.64775 3.16475C5.54226 3.05926 5.39918 3 5.25 3H3.5625C3.01549 3 2.49089 3.2173 2.10409 3.60409C1.7173 3.99089 1.5 4.51549 1.5 5.0625V8.4375C1.5 8.98451 1.7173 9.50911 2.10409 9.89591C2.49089 10.2827 3.01549 10.5 3.5625 10.5H6.9375C7.48451 10.5 8.00911 10.2827 8.39591 9.89591C8.7827 9.50911 9 8.98451 9 8.4375V6.75C9 6.60082 8.94074 6.45774 8.83525 6.35225C8.72976 6.24676 8.58668 6.1875 8.4375 6.1875C8.28832 6.1875 8.14524 6.24676 8.03975 6.35225C7.93426 6.45774 7.875 6.60082 7.875 6.75V8.4375C7.875 8.955 7.455 9.375 6.9375 9.375H3.5625C3.045 9.375 2.625 8.955 2.625 8.4375V5.0625Z"
        fill="#57534E"
      />
    </svg>
  );
}
