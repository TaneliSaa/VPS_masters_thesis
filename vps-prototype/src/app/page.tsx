import Link from 'next/link'

export default async function Home() {

  return (
    <div>
      <Link
        href={`/pages/login`}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Simulation
      </Link>

    </div>
  )
}
