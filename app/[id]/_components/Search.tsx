import { Input } from '@/components/ui/input'

export default function Search() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Search</h2>
      <Input placeholder="Search for cards..."></Input>
    </div>
  )
}
