import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useSigner,
  useProvider,
  useContract,
  useContractEvent,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import { Account } from "../components";
import { Navbar, Topbar } from "../components";
import Image from "next/image";
import Link from "next/link";
import Group from "../assets/group.png";
import Logo_Group from "../assets/logo1.png";
import { FaArrowLeft } from "react-icons/fa";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS, MAX_LOG_LENGTH } from "../constants";
import GhostCasino_ABI from "../abis/GhostCasino.json";
import { fantomTestnet } from "wagmi/chains";
import { toast } from "react-toastify";

function CoinFlip() {
  const account = useAccount();
  const provider = useProvider();
  const {
    data: signer,
    isError: signerError,
    isLoading: signerLoading,
  } = useSigner();
  const [, setRemount] = useState<boolean>(true);
  const forceRemount = () => setRemount((f) => !f);
  const [events, setEvents] = useState<any[]>([]);
  const [isFlipping, setFlipping] = useState<boolean>(false);

  const betList = [0.3, 0.5, 1, 2];

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: GhostCasino_ABI,
    signerOrProvider: provider,
  });
  useEffect(() => {
    (async () => {
      const filteredEvents = await contract?.queryFilter("CoinFlip");
      const latestEvents = filteredEvents
        ?.reverse()
        .slice(0, Math.min(MAX_LOG_LENGTH, filteredEvents?.length))
        .map((item: any) => ({
          player: item.args?.player,
          stake: ethers.utils.formatEther(item.args?.stake),
          win: item.args?.win,
          timestamp: new Date(Number(item.args?.timestamp) * 1000),
        }));
      setEvents(latestEvents ?? []);
      console.log("latestEvents :>> ", latestEvents);
    })();
  }, []);

  useContractEvent({
    chainId: fantomTestnet.id,
    address: CONTRACT_ADDRESS,
    abi: GhostCasino_ABI,
    eventName: "CoinFlip",
    listener: (
      player: string | unknown,
      stake: BigNumber | unknown,
      win: boolean | unknown,
      timestamp: BigNumber | unknown,
      blockinfo
    ) => {
      const newEvent = {
        player,
        stake: ethers.utils.formatEther(stake as BigNumber),
        win,
        timestamp: new Date(Number(timestamp) * 1000),
      };
      console.log("newEvent :>> ", newEvent);
      if (events[0] === newEvent) return;
      events.unshift(newEvent);
      if (events.length > MAX_LOG_LENGTH) events.pop();
      forceRemount();
    },
  });
  const [isHead, setIsHead] = useState<boolean>(true);
  const [amountIndex, setAmountIndex] = useState<number>(0);
  const { config: flipCoinConfig, error: flipCoinError } =
    usePrepareContractWrite({
      address: CONTRACT_ADDRESS,
      abi: GhostCasino_ABI,
      functionName: "flipCoin",
      overrides: {
        value: ethers.utils.parseEther(betList[amountIndex].toString()),
      },
    });
  const { write: flipCoin } = useContractWrite({
    ...flipCoinConfig,
    onSuccess: async (result) => {
      const id = toast.loading("Please wait...");
      const receipt = await result.wait();
      console.log("result :>> ", result);
      console.log("receipt :>> ", receipt);
      if (receipt.status === 1) {
        const win = contract?.interface.parseLog({
          topics: receipt.logs[0].topics,
          data: receipt.logs[0].data,
        })?.args.win;
        toast.update(id, {
          render: win ? "😊 You won! 😊" : "😢 You lost! 😭",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      } else
        toast.update(id, {
          render: "🤷‍♀️ Transaction failed. Try to increase gas limit. 🤷‍♀️",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      setFlipping(false);
    },
    onError: (err) => {
      console.log(err);
      toast(err.message, {
        type: "error",
      });
      setFlipping(false);
    },
  });

  // const {
  //   data: betAmount,
  //   isError: betAmountError,
  //   isLoading: betAmountLoading,
  //   refetch: betAmountRefetch,
  // } = useContractRead({
  //   chainId: fantomTestnet.id,
  //   address: CONTRACT_ADDRESS,
  //   abi: GhostCasino_ABI,
  //   functionName: "players",
  //   args: [0],
  //   onSuccess(data) {
  //     console.log("Success", data);
  //   },
  // });

  const flip = async () => {
    if (flipCoinError) {
      toast((flipCoinError as any).data.message as string, { type: "warning" });
      console.log("flipCoinError :>> ", flipCoinError);
      setFlipping(false);
      return;
    }
    if (account.address === undefined) {
      toast("Please connect wallet first.", { type: "warning" });
    } else {
      setFlipping(true);
      flipCoin?.();
    }
  };

  const percent = ["left-0", "left-[25%]", "left-[50%]", "left-[75%]"];
  return (
    <>
      <div className="flex flex-row select-none">
        <Navbar />
        <div className="flex flex-col w-full min-h-screen">
          <Topbar />
          <div className="w-full h-full pl-5 pr-[66px] flex flex-col items-center back">
            <div className="relative">
              <Image
                src={Group}
                alt="ClipGray"
                className="w-[140px] h-[140px]"
              ></Image>
              <Image
                src={Logo_Group}
                alt="Logo-Group"
                className="absolute left-[32px] top-[32px]"
              />
            </div>
            <div className="mt-5 p-5 border-[2px] border-[#585858] rounded-[30px] text-[23px] leading-[29px] flex flex-col items-center">
              <div className="">AMOUNT</div>
              <div className="bg-[#4B4B4B] rounded-[15px]  mt-3 px-1 py-1 w-[440px]">
                <div className="flex flex-row justify-between items-center relative ">
                  <div
                    className={`absolute ${percent[amountIndex]} top-0 w-[25%] h-full bg-[#5E42F4] rounded-[10px] flex justify-center items-center transition-all`}
                  />
                  {betList.map((item, index) => (
                    <div
                      key={item}
                      className={`w-[25%] flex justify-center items-center cursor-pointer transition relative z-20 px-2 py-[11px] `}
                      onClick={() => setAmountIndex(index)}
                    >
                      {item} FTM
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3">I CHOOSE</div>
              <div className="mt-3 flex flex-row w-full text-[30px] leading-[38px] justify-center">
                <button
                  className={
                    "px-[68px] py-2 rounded-[8px] transition duration-300" +
                    (isHead ? " bg-[#5E42F4]" : " bg-[#4B4B4B]")
                  }
                  onClick={(e) => setIsHead(true)}
                >
                  HEAD
                </button>
                <button
                  className={
                    "ml-3 px-[68px] py-2 rounded-[8px] transition duration-300" +
                    (isHead ? " bg-[#4B4B4B]" : " bg-[#5E42F4]")
                  }
                  onClick={(e) => setIsHead(false)}
                >
                  TAIL
                </button>
              </div>
            </div>
            {isFlipping ? (
              <div className="mt-5 px-[88px] py-[9px] flex flex-row text-[30px] leading-[38px] font-[700] text-center justify-center animate-pulse">
                Flipping in progress...
              </div>
            ) : (
              <button
                className="shadow-[0_0_500px_20px_#5E42F4_inset] text-white hover:shadow-[0_0_10px_0_#5E42F4_inset,0_0_10px_2px_#5E42F4] hover:text-white mt-5 px-[88px] py-[9px] flex flex-row text-[30px] leading-[38px] font-[700] text-center justify-center rounded-[15px] transition duration-200"
                onClick={flip}
              >
                DOUBLE OR NOTHING
              </button>
            )}
            <div className="mt-[66px] py-6 px-10 border-[2px] flex flex-col items-center justify-center border-[#5E42F4] bg-[#2E2E2E] rounded-[20px]">
              <div className="font-[700] text-[30px] leading-[38px]">
                RECENT PLAYS
              </div>
              <table className="mt-[34px] w-[660px] font-[400] text-[18px] leading-[23px]">
                <tbody>
                  {events.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div
                          className={`whitespace-nowrap flex flex-row${
                            index > 0 ? " mt-2" : ""
                          }`}
                        >
                          {`${item.player.slice(0, 5)}...${item.player.slice(
                            -3
                          )}`}{" "}
                          fliped
                          <div
                            className={
                              item.win
                                ? "text-[#75FF34] mx-[4px]"
                                : "text-[#FF3434] mx-[4px]"
                            }
                          >
                            {item.stake} FTM
                          </div>
                          and {item.win ? "doubled" : "lost"}.
                        </div>
                      </td>
                      <td>
                        <div>
                          <ReactTimeAgo
                            date={item.timestamp}
                            timeStyle="round"
                            locale="en-US"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoinFlip;
