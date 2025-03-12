'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
// import SubmitButtonV2 from "../global/form-inputs/submit-button-v2";
import { Loader, LogIn } from 'lucide-react';
import PasswordTextInput from '@/components/password-text-input';
import SubmitButton from '@/components/submit-button';
const formSchema = z.object({
  username: z.string(),
  password: z.string()
});
const defaultValues = {
  username: 'test123',
  password: 'askbjbdatalabs'
};
export function SignInViewPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const authenticated = await signIn('credentials', {
        ...data,
        redirect: false
      });

      if (authenticated?.error) {
        const promise = () =>
          new Promise((resolve, reject) =>
            setTimeout(() => reject({ message: authenticated?.error }), 1000)
          );

        toast.promise(promise, {
          loading: 'Please wait...',
          success: (data: any) => {
            return `${data.message}`;
          },
          error: (data: any) => {
            return `${authenticated?.error}`;
          }
        });

        setIsLoading(false);
        return;
      }

      // data.imageUrl = imageUrl;
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ message: 'Login Successfully' }), 1000)
        );

      toast.promise(promise, {
        loading: 'Please wait...',
        success: (data: any) => {
          router.push('/chat-gpt');
          setIsLoading(false);
          return `${data.message}`;
        },
        error: 'Error'
      });
    } catch (error: any) {
      console.error('There was an error creating the data!', error);
      toast.error(`${error?.message}`);
    }
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Selamat Datang Kembali</CardTitle>
          <CardDescription>Masuk ke akun Acme Inc Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor='username'>Username</Label>
                        </FormLabel>

                        <FormControl>
                          <Input placeholder='Username...' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <PasswordTextInput
                    form={form}
                    name='password'
                    showGeneate={false}
                  />
                </div>

                <SubmitButton
                  title='Login'
                  loading={isLoading}
                  loadingTitle='Loading please wait..'
                  loaderIcon={Loader}
                  buttonIcon={LogIn}
                />
              </div>
              <div className='text-center text-sm'>
                Tidak punya akun?{' '}
                <Link href='/register' className='underline underline-offset-4'>
                  Register
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary'>
        Dengan mengklik lanjutkan, Anda menyetujui{' '}
        <a href='#'>Ketentuan Layanan</a> dan{' '}
        <a href='#'>Kebijakan Privasi kami</a>.
      </div>
    </div>
  );
}
