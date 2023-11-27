import { ModeToggle } from "./mode-toggle";

const NavBar: React.FC = () => {
  return (
    <div className='flex justify-between items-center space-x-4 lg:space-x-6 p-2'>
      <div className=' text-2xl font-bold'>Dad Jokes TTS</div>
      <div className=''>
        {" "}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
