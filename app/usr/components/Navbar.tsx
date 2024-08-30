import Image from "next/image";
import DarkMode from "./Partials/DarkMode";
import Profile from "./Partials/Profile";
import myImageLoader from "@@/src/utils/loader";

export default function Navbar() {
    return (
      <nav className='w-full py-2 bg-gradient-to-r dark:bg-white from-primary dark:from-dark via-primary/90 dark:via-dark/90 to-primary/70 dark:to-dark/80 px-5 text-white'>
        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-2">
            <Image 
              src={'/images/logometro.png'}
              alt="Logo Polres Metro Jakarta Utara"
              width={35}
              height={35}
              // placeholder={`data:image/${myImageLoader(50, 50)}`}
            />
            <div>
              <h1 className="text-white font-bold uppercase">Polres Jakarta Utara</h1>
              <p className="text-sm">AI</p>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <DarkMode />
            <Profile />
          </div>
        </div>
      </nav>
    )
  }
  