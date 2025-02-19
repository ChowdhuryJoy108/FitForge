import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from '../../assets/fitforge.png'
const LINKS = [
  {
    title: "Product",
    items: [
      { name: "Classes", path: "/classes" },
      { name: "Trainers", path: "/trainers" },
      { name: "Forums", path: "/forum" },
      { name: "Dashboard", path: "/dashboard" },
    ],
  },
  {
    title: "Dev Information",
    items: [
      { name: "Facebook", path: "https://www.facebook.com/share/1BkA741HaF/" },
      { name: "LinkedIn", path: "https://www.linkedin.com/in/joy-chowdhury798/" },
      { name: "GitHub", path: "https://github.com/ChowdhuryJoy108" },
    ],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="mt-[100px]">
      <footer className="relative w-full">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <div>
            <Typography variant="h5" className="mb-6">
              Fit Forge
            </Typography>
            <img src={Logo} alt="Company logo" className="w-[250px] h-[220px] rounded-t-full rounded-br-full shadow-xl" />
            </div>
            <div className="grid grid-cols-3 justify-between gap-4">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-medium opacity-40 dark:text-white"
                  >
                    {title}
                  </Typography>
                  {items.map(({ name, path }) => (
                    <li key={name}>
                      <Typography
                        as={Link}
                        to={path}
                        color="gray"
                        className="py-1.5 font-normal transition-colors hover:text-blue-gray-900 dark:text-white"
                      >
                        {name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-blue-gray-900 dark:text-white md:mb-0"
            >
              &copy; {currentYear}{" "}
              <Link to="/">Fit Forge @joyChowdhury</Link>. All Rights Reserved.
            </Typography>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
