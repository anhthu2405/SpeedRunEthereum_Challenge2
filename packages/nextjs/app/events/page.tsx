"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
  // BuyTokens Events
  const { data: buyTokenEvents, isLoading: isBuyEventsLoading } = useScaffoldEventHistory({
    contractName: "Vendor",
    eventName: "BuyTokens",
    fromBlock: 0n,
  });

  // SellTokens Events
  const { data: sellTokenEvents, isLoading: isSellEventsLoading } = useScaffoldEventHistory({
    contractName: "Vendor",
    eventName: "SellTokens",
    fromBlock: 0n,
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      {/* BuyTokens Events */}
      <div>
        <div className="text-center mb-4">
          <span className="block text-2xl font-bold">Buy Token Events</span>
        </div>
        {isBuyEventsLoading ? (
          <div className="flex justify-center items-center mt-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="bg-primary">Buyer</th>
                  <th className="bg-primary">Amount of Tokens</th>
                  <th className="bg-primary">Amount of ETH</th>
                </tr>
              </thead>
              <tbody>
                {!buyTokenEvents || buyTokenEvents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No events found
                    </td>
                  </tr>
                ) : (
                  buyTokenEvents.map((event, index) => {
                    const buyer = event.args?.buyer || '';
                    const amountOfTokens = event.args?.amountOfTokens || 0n;
                    const amountOfETH = event.args?.amountOfETH || 0n;

                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address={buyer} />
                        </td>
                        <td>{formatEther(amountOfTokens)}</td>
                        <td>{formatEther(amountOfETH)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SellTokens Events */}
      <div className="mt-14">
        <div className="text-center mb-4">
          <span className="block text-2xl font-bold">Sell Token Events</span>
        </div>
        {isSellEventsLoading ? (
          <div className="flex justify-center items-center mt-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="bg-primary">Seller</th>
                  <th className="bg-primary">Amount of Tokens</th>
                  <th className="bg-primary">Amount of ETH</th>
                </tr>
              </thead>
              <tbody>
                {!sellTokenEvents || sellTokenEvents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No events found
                    </td>
                  </tr>
                ) : (
                  sellTokenEvents.map((event, index) => {
                    const seller = event.args?.seller || '';
                    const amountOfTokens = event.args?.amountOfTokens || 0n;
                    const amountOfETH = event.args?.amountOfETH || 0n;

                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address={seller} />
                        </td>
                        <td>{formatEther(amountOfTokens)}</td>
                        <td>{formatEther(amountOfETH)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
