import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  loadingTitle?: string;
  loading: boolean;
  className?: string;
  loaderIcon?: any;
  buttonIcon?: any;
  showIcon?: boolean;
};

const SubmitButton = ({
  title,
  loadingTitle = 'Saving please wait...',
  loading,
  className,
  loaderIcon,
  buttonIcon,
  showIcon = true
}: Props) => {
  const LoaderIcon = loaderIcon;
  const ButtonIcon = buttonIcon;
  return (
    <>
      {loading ? (
        <button
          disabled
          type='submit'
          className={cn(
            'flex w-full justify-center rounded-md bg-indigo-600/55 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            className
          )}
        >
          <div className='flex items-center'>
            <LoaderIcon className='mr-2 h-4 w-4 animate-spin' />
            <div>{loadingTitle}</div>
          </div>
        </button>
      ) : (
        <button
          type='submit'
          className={cn(
            'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            className
          )}
        >
          <div className='flex items-center'>
            {showIcon && <ButtonIcon className='mr-2 h-4 w-4' />}
            <div>{title}</div>
          </div>
        </button>
      )}
    </>
  );
};

export default SubmitButton;
