interface CoinReplyProps {
  reply: Reply;
}

export function CoinReply({ reply }: CoinReplyProps) {
  return (
    <div className="flex flex-col gap-y-2 px-4">
      <div className="flex gap-2 items-center text-gray-500">
        <span className="">243kknk34</span>
        <span className="">20:08:01</span>
        <span className="flex gap-2 items-center">
          <span className="">#389438934</span>
          <span className="underline">reply</span>
        </span>
      </div>
      <p className="text-gray-400 text-sm">{reply?.message}</p>
    </div>
  );
}
