import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Account } from "../components";
import { Navbar, Topbar } from "../components";
import Image from "next/image";
import Link from "next/link";
import Countdown from "react-countdown";
import Ticket from "../assets/ticket.svg";
import Monkex from "../assets/monkex.png";
import MetisDao from "../assets/metis_dao.png";
import ChipGray from "../assets/chip_gray.png";
import { FaArrowLeft } from "react-icons/fa";

function Raffle() {
  const raffles = [
    {
      name: "MONKEX",
      value: 0.3,
      sold: 50,
      type: "NFT",
      winners: 1,
      icon: Monkex,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "METIS DAO",
      price: 0.13,
      tickets: 30,
      type: "TOKEN",
      winners: 1,
      icon: MetisDao,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "$LUCK TOKEN",
      price: 0.13,
      tickets: 150,
      type: "TOKEN",
      winners: 3,
      icon: ChipGray,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "MONKEX",
      price: 0.3,
      tickets: 50,
      type: "NFT",
      winners: 1,
      icon: Monkex,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "METIS DAO",
      price: 0.13,
      tickets: 30,
      type: "TOKEN",
      winners: 1,
      icon: MetisDao,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "$LUCK TOKEN",
      price: 0.13,
      tickets: 150,
      type: "TOKEN",
      winners: 3,
      icon: ChipGray,
      end_time: new Date("2023-02-28 1:1:1"),
    },
  ];
  return (
    <>
      <div className="flex flex-row">
        <Navbar />
        <div className="flex flex-col w-full">
          <Topbar />
          <Link
            className="top-0 left-0 flex flex-row justify-center items-center text-[18px] leading-[23px] px-6 py-3 rounded-r-[10px] bg-[#222121] w-fit"
            href="/"
          >
            <FaArrowLeft />
            <div className="ml-3">Back</div>
          </Link>
          <div className="w-full h-full pl-5 pr-[66px] flex flex-col items-center">
            {[raffles[0]].map((item, index) => (
              <div
                key={index}
                className="mt-70 border-[1px] p-8 border-[#535353] rounded-[40px] flex flex-row justify-center items-center"
              >
                <div className="w-[367px] h-[367px]">
                  <Image
                    src={Monkex}
                    alt="Monkex"
                    className="rounded-[20px] w-full h-full"
                  />
                </div>
                <div className="ml-5 flex flex-col font-[400] text-[16.5px] leading-[21px] justify-center items-center">
                  <div className="font-[500] text-[20px] leading-[25px] self-start">
                    Description:
                  </div>
                  <div className="mt-[10px] text-[15px] leading-[19px] self-start">
                    A PFP collection for the Monkex community
                  </div>
                  <div className="my-4 border-[1.5px] border-[#3D3D3D] w-[360px] h-0"></div>
                  <div className="mt-[6px] flex flex-row justify-between w-full">
                    <div>Ends in:</div>
                    <div className="font-[700]">
                      <Countdown
                        date={item.end_time}
                        renderer={(props) => (
                          <div>{`${props.days}d ${props.hours}h ${props.minutes}m ${props.seconds}s`}</div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-[6px] flex flex-row justify-between w-full">
                    <div>Raffle Type:</div>
                    <div className="font-[700]">{item.type}</div>
                  </div>
                  <div className="mt-[6px] flex flex-row justify-between w-full">
                    <div>Value</div>
                    <div className="font-[700]">{item.value} Fantom</div>
                  </div>
                  <div className="mt-[6px] flex flex-row justify-between w-full">
                    <div>Total winners</div>
                    <div className="font-[700]">{item.winners}</div>
                  </div>
                  <div className="mt-[6px] flex flex-row justify-between w-full">
                    <div className=" flex flex-row items-center">
                      <div>Tickets sold</div>
                      <Ticket className="ml-[3px]" />
                    </div>
                    <div className="font-[700]">{item.sold}</div>
                  </div>
                  <div className="my-4 border-[1.5px] border-[#3D3D3D] w-[360px] h-0"></div>
                  <div className="mt-[6px] flex flex-row justify-between w-full">
                    <div>My Tickets:</div>
                    <div className="font-[700]">0</div>
                  </div>
                  <button className="bg-blue rounded-[15px] text-[20px] mt-[43px] px-[140px] py-[17px] text-black">
                    Buy ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Raffle;
