'use client';

import React from 'react';
import BottomNavigationBar from '@/components/BottomNavigationBar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleFeatureToggle = (
    featureName: string,
    isChecked: boolean,
    callback: () => void
  ) => {
    toast({
      title: `${featureName} ${isChecked ? 'enabled' : 'disabled'}`,
      action: <ToastAction altText="OK">OK</ToastAction>,
    });

    callback();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#DEF5BA] items-center relative">
      {/* Dugme za nazad u gornjem levom uglu */}
      <button
        className="absolute top-4 left-4 text-white z-10"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Naslov stranice */}
      <h1 className="text-white text-2xl font-bold mt-4">Report Settings</h1>

      {/* Settings Card */}
      <Card className="w-full max-w-md mx-auto mt-8 bg-[#E9D5FF] shadow-none border-none">
        <CardHeader>
          <CardTitle>Report Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="mb-4 grid grid-cols-[25px_auto] items-start pb-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Allow email notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new reports.
                </p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-[25px_auto] items-start pb-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Allow push notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="report" className="flex flex-col space-y-1">
              <span>Email me monthly reports</span>
              <span className="font-normal leading-none text-muted-foreground">
                Receive monthly reports on your activity.
              </span>
            </Label>
            <Switch
              id="report"
              onCheckedChange={(isChecked) =>
                handleFeatureToggle('Monthly reports', isChecked, () => {
                  // logic for saving if needed
                })
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="social" className="flex flex-col space-y-1">
              <span>Include social interactions in reports</span>
              <span className="font-normal leading-none text-muted-foreground">
                Include data from social features in your reports.
              </span>
            </Label>
            <Switch
              id="social"
              onCheckedChange={(isChecked) =>
                handleFeatureToggle('Social interactions in reports', isChecked, () => {
                  // logic for saving if needed
                })
              }
            />
          </div>
        </CardContent>
        <CardFooter />
      </Card>

      <BottomNavigationBar />
      <Toaster />
    </div>
  );
};

export default Page;