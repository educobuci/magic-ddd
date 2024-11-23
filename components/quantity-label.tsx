export default function QuantityLabel({ quantity }: { quantity: number }) {
  return (
    <span className="rounded-full border flex justify-center items-center w-5 h-5 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xs">
      {quantity}
    </span>
  )
}
