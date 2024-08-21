import { CoinReply } from "@/components/coin/CoinReply";

export function CoinReplies() {
  let reply: Reply = {
    creator: {
      id: "1",
      address: "0x123",
      username: "user1",
    },
    likes: 0,
    message:
      "From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.",
    parentId: "",
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="px-4">
        <button className="bg-green-500 text-sm px-2 py-0 rounded-md">
          reply
        </button>
      </div>
      <CoinReply reply={reply} />
    </div>
  );
}
