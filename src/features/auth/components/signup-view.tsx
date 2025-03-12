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

import { Loader, LogIn } from 'lucide-react';
import { registerUser } from '@/api/auth';
import PasswordTextInput from '@/components/password-text-input';
import SubmitButton from '@/components/submit-button';
export const registerSchema = z
  .object({
    firstName: z
      .string({ required_error: 'FirstName is required' })
      .min(3, { message: 'FirstName must be at least 1 characters' }),
    lastName: z
      .string({ required_error: 'LastName is required' })
      .min(1, { message: 'LastName must be at least 1 characters' }),
    email: z
      .string()
      .min(2, {
        message: 'email must be at least 2 characters.'
      })
      .email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string({ required_error: 'Confirm Password is required' })
      .min(6, { message: 'Confirm Password must be at least 6 characters' }),
    companyName: z
      .string({ required_error: 'CompanyName is required' })
      .min(3, { message: 'CompanyName must be at least 1 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'] // Error will be associated with confirmPassword field
  });

export function SignUpViewPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true);

    try {
      const result = await registerUser({
        ...data
      });
      form.reset();
      toast.success(result?.message);
      router.push('/login');
    } catch (err: any) {
      console.log('Error:', err.response?.data || err.message);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Register</CardTitle>
          <CardDescription>Register untuk langganan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor='firstName'>Nama Depan</Label>
                        </FormLabel>

                        <FormControl>
                          <Input placeholder='Nama Depan...' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor='lastName'>Nama Belakang</Label>
                        </FormLabel>

                        <FormControl>
                          <Input placeholder='Nama Belakang...' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor='companyName'>Nama Usaha</Label>
                        </FormLabel>

                        <FormControl>
                          <Input placeholder='Nama Usaha...' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor='email'>Email</Label>
                        </FormLabel>

                        <FormControl>
                          <Input placeholder='Email..' {...field} />
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
                <div className='grid gap-2'>
                  <PasswordTextInput
                    form={form}
                    name='confirmPassword'
                    title='Konfirmasi Passowrd'
                    showGeneate={false}
                  />
                </div>
                <SubmitButton
                  title='Register'
                  loading={isLoading}
                  loadingTitle='Loading please wait..'
                  loaderIcon={Loader}
                  buttonIcon={LogIn}
                />
              </div>
              <div className='text-center text-sm'>
                Punya Akun?{' '}
                <Link href='/login' className='underline underline-offset-4'>
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
