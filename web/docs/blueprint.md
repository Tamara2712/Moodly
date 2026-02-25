# **App Name**: Moodly

## Core Features:

- Welcome Screen: Welcome screen with links to signin and register pages.
- Registration Page: User registration page.
- Sign-in Page: User sign-in page.

## Style Guidelines:

- Background color: Use the existing 'bg-background' class for consistency.
- Text color: Use 'text-muted-foreground' for descriptive text.
- Accent color: Use a calming blue-green (#A7DBD8) to promote a sense of peace and reflection.
- Cards: Maintain a consistent card-based layout across all pages for a uniform look.
- Centering: Center all content vertically and horizontally for a balanced presentation.

## Original User Request:
i want to create three pages, first is welcome screen with this code:
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex flex-col items-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to Moodly</h1>
          <p className="text-sm text-muted-foreground">Your personal emotional diary.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Link href="/register">
              <Button className="w-full">Register</Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

second is singin and register page, but create them empty so i can send you code for them later
  