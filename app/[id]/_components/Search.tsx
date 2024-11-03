import { Input } from '@/components/ui/input'

export default function Search() {
  return (
    <div className="p-4 space-y-4">
      <Input placeholder="Search for cards..." autoFocus></Input>
    </div>
  )
}
