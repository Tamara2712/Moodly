import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#DEF5BA' }}>
      <div className="mb-4">
        <img
          src="/images/Logo.png"
          alt="Moodly Logo"
          width={128}
          height={128}
        />
      </div>

      {/* Text */}
      <div className="text-center mb-8 space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to Moodly</h1>
        <p className="text-gray-500">Your personal emotional diary</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-3 w-full max-w-xs px-4">
        <Link href="/register" passHref><Button style={{ backgroundColor: '#E9D5FF', color: 'white', height: '48px' }} className="w-full rounded-xl">Register</Button></Link>
        <Link href="/signin" passHref><Button variant="outline" className="w-full rounded-xl" style={{ backgroundColor: 'white', borderColor: '#E9D5FF', color: '#E9D5FF', height: '48px' }}>Sign In</Button></Link>
      </div>
    </div>
  ); // Corrected closing div tag position
}