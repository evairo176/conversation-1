import Select from 'react-select';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

type Option = {
  label: string;
  value: string;
};

type SelectWithTooltipProps = {
  control: any;
  name: string;
  options: Option[];
  placeholder?: string;
  tooltipText?: string;
  buttonUrl: string;
};
const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    fontSize: 15
  })
};
const SelectWithTooltip: React.FC<SelectWithTooltipProps> = ({
  control,
  name,
  options,
  placeholder = 'Select an option',
  tooltipText = 'Add new option',
  buttonUrl
}) => {
  const router = useRouter();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            <div className='flex w-full items-center gap-2'>
              <Select
                className='w-full'
                options={options}
                isClearable
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
                placeholder={placeholder}
                value={
                  options.find((option) => option.value === field.value) || null
                }
                styles={customStyles}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => router.push(buttonUrl)}
                      className='w-12'
                      size='icon'
                      variant='outline'
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithTooltip;
