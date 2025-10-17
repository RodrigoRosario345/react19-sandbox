import { Link, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_METADATA } from "@/routes/routes.constants";

interface NavigationLink {
  path: string;
  label: string;
  icon: string;
}

const navigationLinks: NavigationLink[] = [
  {
    path: ROUTES.AUTH,
    label: ROUTE_METADATA[ROUTES.AUTH].title,
    icon: "🔐",
  },
  {
    path: ROUTES.TODO,
    label: ROUTE_METADATA[ROUTES.TODO].title,
    icon: "📝",
  },
  {
    path: ROUTES.CHARACTERS,
    label: ROUTE_METADATA[ROUTES.CHARACTERS].title,
    icon: "👑",
  },
  {
    path: ROUTES.PLANETS,
    label: ROUTE_METADATA[ROUTES.PLANETS].title,
    icon: "🌍",
  },
];

function Navigation(): React.JSX.Element {
  const location = useLocation();
  return (
    <nav className="sticky top-0 left-0 w-full py-2.5 bg-black/50 backdrop-blur-xs z-10 flex justify-center gap-6 font-saiyan">
      {navigationLinks.map((link: NavigationLink) => {
        const isActive: boolean = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`
              flex items-center gap-2 px-2 transition-all duration-200
              ${isActive
                ? "border-b-2 border-orange-400 text-orange-400"
                : "relative before:transition-all before:duration-200 before:absolute before:m-auto before:w-0 before:inset-0 before:border-b-2 before:border-orange-300 hover:before:w-full hover:text-orange-300 text-orange-100"
              }
            `}
          >
            {/* <span className="text-xl">{link.icon}</span> */}
            <span className="font-bold text-lg tracking-wider">
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navigation;
