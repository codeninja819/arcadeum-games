import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Account } from '../components';
import { Navbar, Topbar } from '../components';
import Link from 'next/link';

import styled from 'styled-components';
import Raffle from '../assets/raffle.svg';
import Coin from '../assets/coin.svg';
import Crash from '../assets/crash.svg';
import Dice from '../assets/dice.svg';
import Lotto from '../assets/lotto.svg';
import Roullette from '../assets/roullette.svg';

const ItemLinkDisable = styled.div`
  box-sizing: border-box;

  width: 238px;
  height: 229px;

  border: 1px solid #828282;
  color: #828282;
  border-radius: 20px;
`;

const ItemLink = styled(Link)`
  box-sizing: border-box;

  width: 238px;
  height: 229px;

  border: 1px solid white;
  border-radius: 20px;
`;

function Page() {
  const links = [
    {
      icon: <Coin />,
      title: 'Coinflip (Double or Nothing)',
      path: '/coinflip',
      alive: true,
    },
    { icon: <Raffle />, title: 'Raffle Draw', path: '/raffle', alive: false },
    { icon: <Crash />, title: 'Crash', path: '/crash', alive: false },
    { icon: <Dice />, title: 'Dice', path: '/dice', alive: false },
    { icon: <Lotto />, title: 'Lotto tickets', path: '/lotto', alive: false },
    {
      icon: <Roullette />,
      title: 'Roullette',
      path: '/roullette',
      alive: false,
    },
  ];
  return (
    <>
      <div className='flex flex-row'>
        <Navbar />
        <div
          className='flex flex-col w-full dash min-h-screen py-10'
          style={{ backgroundColor: '#140013' }}
        >
          <Topbar />
          <div className='w-full h-full mt-[76px] flex flex-row flex-wrap items-center justify-around gap-x-[45px] gap-y-[36px]'>
            {links.map((link, index) => (
              <ItemLink
                href={link.alive ? link.path : ''}
                className='relative bg-blue'
                key={index}
              >
                <div className='absolute left-[24px] top-[28px]'>
                  {link.icon}
                </div>
                <div className='absolute right-[24px] top-[28px]'>
                  0{index + 1}
                </div>
                <div className='absolute top-[186px] left-[12px]'>
                  {link.title}
                </div>
              </ItemLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
