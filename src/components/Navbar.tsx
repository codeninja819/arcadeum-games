import { useAccount, useEnsName } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/logo.png';
import Home from '../assets/home.svg';
import Raffle from '../assets/raffle.svg';
import Coin from '../assets/coin.svg';
import Crash from '../assets/crash.svg';
import Dice from '../assets/dice.svg';
import Lotto from '../assets/lotto.svg';
import Sports from '../assets/sports.svg';
import Roullette from '../assets/roullette.svg';
import { useRouter } from 'next/router';

export function Navbar() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const links = [
    { icon: <Home fill={'red'} />, title: 'Home', path: '/', alive: true },
    {
      icon: <Crash />,
      title: 'Original Games',
      path: '/coinflip',
      alive: true,
    },
    { icon: <Coin />, title: 'Casino', path: '/raffle', alive: false },
    { icon: <Raffle />, title: 'Lottery', path: '/crash', alive: false },
    { icon: <Dice />, title: 'Scratch Cards', path: '/dice', alive: false },
    {
      icon: <Lotto />,
      title: 'Abstract Betting',
      path: '/lotto',
      alive: false,
    },
    {
      icon: <Sports width='18' />,
      title: 'Sports',
      path: '/lotto',
      alive: false,
    },
  ];

  return (
    <>
      <div className='min-w-[280px]'></div>
      <div className='w-[280px] h-full min-h-screen border-solid border-r-[1px] border-[#666666] fixed overflow-scroll py-10'>
        <Link
          href='/'
          className='my-[50px] mx-[19px] flex flex-col justify-center items-center'
        >
          <Image
            src={Logo}
            alt='Logo-Image'
            className='rounded-[20px] w-[105px] h-full mb-[5px]'
          />
        </Link>

        {links.map((item, index) =>
          item.alive ? (
            <Link
              key={index}
              href={item.path}
              className={
                'w-[100%] pl-[29px] py-[15px] flex flex-row justify-start hover:text-blue hover:bg-gray-900' +
                (currentRoute === item.path ? ' text-blue' : '')
              }
            >
              {item.icon}
              <div className='ml-[10px]'>{item.title}</div>
            </Link>
          ) : (
            <div
              key={index}
              className='w-[100%] pl-[29px] py-[15px] flex flex-row justify-start text-[#888888] hover:bg-gray-700'
            >
              {item.icon}
              <div className='ml-[10px]'>{item.title}</div>
            </div>
          )
        )}
      </div>
    </>
  );
}
