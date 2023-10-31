import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Account } from "../components";
import { Navbar, Topbar } from "../components";
import Image from "next/image";
import Countdown from "react-countdown";
import Ticket from "../assets/ticket.svg";
import Monkex from "../assets/monkex.png";
import MetisDao from "../assets/metis_dao.png";
import ChipGray from "../assets/chip_gray.png";

function Page() {
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
      value: 0.13,
      sold: 30,
      type: "TOKEN",
      winners: 1,
      icon: MetisDao,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "$LUCK TOKEN",
      value: 0.13,
      sold: 150,
      type: "TOKEN",
      winners: 3,
      icon: ChipGray,
      end_time: new Date("2023-02-28 1:1:1"),
    },
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
      value: 0.13,
      sold: 30,
      type: "TOKEN",
      winners: 1,
      icon: MetisDao,
      end_time: new Date("2023-02-28 1:1:1"),
    },
    {
      name: "$LUCK TOKEN",
      value: 0.13,
      sold: 150,
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
          <div className="w-full h-full pl-5 pr-[66px] flex flex-row flex-wrap items-center justify-center gap-x-[45px] gap-y-[36px]">
            {raffles.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <div className="px-7 py-3 border-[3px] rounded-[10px]">
                  <div className=" text-[18px] leading-[23px]">{item.name}</div>
                </div>
                <div className="mt-[30px] bg-[#201F1F] rounded-[20px] flex flex-col p-6">
                  <div className="w-[227px] h-[227px] rounded-[10px] flex items-center justify-center bg-[#383838] overflow-hidden">
                    <Image alt={item.name} src={item.icon} />
                  </div>
                  <div className="flex flex-col mt-2.5  text-[12px] leading-[15px]">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center">
                        <Ticket />
                        <div className="ml-[3px]">{item.sold}</div>
                      </div>
                      <div>{item.winners} Winner</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center">
                        <div>Ends in:</div>
                      </div>
                      <div>
                        <Countdown
                          date={item.end_time}
                          renderer={(props) => (
                            <div>{`${props.days}D ${props.hours}H ${props.minutes}M ${props.seconds}S`}</div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue text-black  text-[18px] leading-[23px] rounded-[10px] mt-2.5 py-3 px-[60px]">
                    Join Raffle
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

export default Page;
