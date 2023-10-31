import { useAccount, useEnsName } from "wagmi";
import Image from "next/image";
import { Account } from "../components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "../components/Navbar";
import Bell from "../assets/bell.svg";

export function Topbar() {
  const { isConnected } = useAccount();
  return (
    <div className="min-w-full h-[120px] flex flex-row justify-between py-10 pl-5 pr-[66px] items-center">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <>
              {(() => {
                if (!connected) {
                  return (
                    <>
                      <div></div>
                      <div className="flex flex-row">
                        <button className="p-2.5 bg-[#222121] rounded-[10px]">
                          <Bell />
                        </button>
                        <button
                          onClick={openConnectModal}
                          className="px-[24px] py-[7.5px] bg-[#222121] rounded-[10px] ml-[24px]"
                        >
                          Connect Wallet
                        </button>
                      </div>
                    </>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <>
                      <button
                        onClick={openChainModal}
                        className=" h-[23px] text-[18px] after:content-['<div />'] after:bg-[#75FF34] after:w-1 after:h-1 after:rounded-full flex after:ml-[2px] after:mt-1"
                      >
                        Wrong network
                      </button>
                      <div></div>
                    </>
                  );
                }

                return (
                  <div className="w-full h-[120px] flex flex-row justify-between items-center">
                    <button
                      onClick={openChainModal}
                      className=" h-[23px] text-[18px] after:content-['<div />'] after:bg-[#75FF34] after:w-1 after:h-1 after:rounded-full flex after:ml-[2px] after:mt-1"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name} Network
                    </button>
                    <div className="flex flex-row">
                      <button className="p-2.5 bg-[#222121] rounded-[10px]">
                        <Bell />
                      </button>
                      <button
                        onClick={openAccountModal}
                        className="px-[24px] py-[7.5px] bg-[#222121] rounded-[10px] ml-[24px]"
                      >
                        {account.address.slice(0, 5) +
                          "..." +
                          account.address.slice(-4)}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
